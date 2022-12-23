import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { DateTime, Interval } from 'luxon'
import { useDebounce } from 'react-use'

import { useRouter } from 'hooks/useRouter'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { AppShell } from 'components/AppShell'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import {
  FadedDivider,
  OrdersContainer,
  OrdersNavigationSection,
  OrdersNavigationTabs,
  OrdersTitle,
  OrdersPageBody,
  OrderPageTabButton,
} from 'pageComponents/Orders/styles'
import { QueryResponsePagination } from 'components/QueryResponsePagination'
import { OrderGrid } from 'pageComponents/Orders/OrderGrid'
import { OrderApi } from 'apis/OrderApi'
import { useApiPagination } from 'hooks/useApiPagination'
import { Order, OrderStatus } from 'interfaces/Order'
import { QueryResponse } from 'interfaces/Query'
import { OrderDateRangeSelection } from 'pageComponents/Orders/OrderDateRangeSelection'
import { SessionStatus } from 'interfaces/Session'
import { PageContainer } from 'components/PageContainer/styles'
import { Button } from 'components/Button'

export interface OrdersPageProps {
  initialOrderResult: QueryResponse<Order>
  from: string
  to: string
  status: OrderStatus[] | null
  sessionStatus: SessionStatus[] | null
}

export const OrdersPage: NextPage<OrdersPageProps> = ({
  initialOrderResult,
  from,
  to,
  status,
  sessionStatus,
}) => {
  const { t } = useTranslation([
    LocaleNamespace.OrdersPage,
    LocaleNamespace.OrderCard,
    LocaleNamespace.Common,
  ])
  const router = useRouter()
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const [fromDate, setFromDate] = useState<DateTime | null>(
    DateTime.fromISO(from)
  )
  const [toDate, setToDate] = useState<DateTime | null>(DateTime.fromISO(to))

  const handleDateRangeChange = (
    from: DateTime | null,
    to: DateTime | null
  ) => {
    setFromDate(from)
    setToDate(to)
  }

  const tabs = [
    {
      path: '/orders',
      label: t('allOrdersTab'),
    },
    {
      path: '/orders/upcoming',
      label: t('upcomingTab'),
    },
    {
      path: '/orders/completed',
      label: t('completedTab'),
    },
    {
      path: '/orders/cancelled',
      label: t('cancelledTab'),
    },
  ]

  const generateProps = (path: string) => {
    if (path === '/orders/upcoming') {
      return {
        sessionStart: DateTime.now(),
        sessionEnd: DateTime.now().plus({ days: 31 }),
      }
    }
    return {}
  }

  const loadData = useCallback(
    async (page: number, limit: number) => {
      if (!fromDate || !toDate) {
        throw new Error('Date is missing')
      }
      if (!fromDate.isValid) {
        throw new Error('From date is invalid')
      }
      if (!toDate.isValid) {
        throw new Error('To date is invalid')
      }
      const startDate = fromDate.startOf('day')
      const endDate = toDate.endOf('day')
      if (!Interval.fromDateTimes(startDate, endDate).isValid) {
        throw new Error('Date range is invalid')
      }

      switch (router.pathname) {
        case '/orders':
          status = [OrderStatus.Complete, OrderStatus.Submitted]
          break
        case '/orders/upcoming':
          status = [OrderStatus.Complete, OrderStatus.Submitted]
          sessionStatus = [SessionStatus.NotStarted]
          break
        case '/orders/completed':
          status = [OrderStatus.Complete, OrderStatus.Submitted]
          sessionStatus = [SessionStatus.Ended]
          break
        case '/orders/cancelled':
          status = [OrderStatus.Cancelled]
          break
      }

      const ordersResult = await OrderApi.query({
        page,
        limit,
        status,
        sessionStatus,
        from: startDate,
        to: endDate,
        only: 'parents',
        ...generateProps(router.pathname),
      })

      const paginationResult = await ordersResult.getData()
      return paginationResult
    },
    [fromDate, toDate, router]
  )

  const ordersPagination = useApiPagination<Order>({
    initialValue: initialOrderResult,
    dataFetcher: loadData,
  })

  useDebounce(
    () => {
      if (!toDate || !fromDate) {
        return
      }
      ordersPagination.refresh()
    },
    500,
    [toDate, fromDate, router.asPath]
  )

  return (
    <AppShell
      drawer={
        <ConsumerDrawer
          open={drawerIsOpen}
          onClose={handleDrawerMenuClose}
          onToggleClick={handleDrawerMenuClick}
        />
      }
      mobileNavigation={
        <ConsumerMobileNavigation onDrawerMenuClick={handleDrawerMenuClick} />
      }
      onDrawerMenuClick={handleDrawerMenuClick}
    >
      <PageContainer>
        <OrdersContainer>
          <>
            <OrdersTitle variant="h4">{t('pageTitle')}</OrdersTitle>
            <OrdersNavigationSection>
              <OrdersNavigationTabs>
                {tabs.map((tab) => {
                  const isActive = tab.path === router.pathname
                  return (
                    <OrderPageTabButton
                      key={tab.path}
                      href={tab.path}
                      className={isActive ? 'active' : ''}
                    >
                      <Button>
                        <span>{tab.label}</span>
                      </Button>
                    </OrderPageTabButton>
                  )
                })}
              </OrdersNavigationTabs>
            </OrdersNavigationSection>
            <FadedDivider />
          </>
          <OrdersPageBody>
            <OrderDateRangeSelection
              from={fromDate}
              to={toDate}
              onChange={handleDateRangeChange}
              error={ordersPagination.error}
            />
            <OrderGrid orders={ordersPagination.value?.items} />
            {ordersPagination.value?.items?.length && (
              <QueryResponsePagination
                queryResponse={ordersPagination.value}
                onPageChange={ordersPagination.onPageChange}
                onRowsPerPageChange={ordersPagination.onRowsPerPageChange}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            )}
          </OrdersPageBody>
        </OrdersContainer>
      </PageContainer>
    </AppShell>
  )
}
