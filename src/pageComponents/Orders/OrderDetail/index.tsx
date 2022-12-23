import { NextPage } from 'next'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'

import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { AppShell } from 'components/AppShell'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { OrderDetailCard } from 'pageComponents/Orders/OrderDetailCard'
import {
  OrderDetailCardSection,
  OrderDetailContainer,
} from 'pageComponents/Orders/OrderDetail/styles'
import { Button } from 'components/Button'
import { Order } from 'interfaces/Order'
import { Link } from 'components/Link'

export interface OrderDetailPageProps {
  initialOrder: Order
}

export const OrderDetailPage: NextPage<OrderDetailPageProps> = (props) => {
  const { initialOrder } = props
  const { t } = useTranslation([
    LocaleNamespace.OrderDetailPage,
    LocaleNamespace.OrderDetailCard,
    LocaleNamespace.Common,
  ])
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

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
      <OrderDetailContainer>
        <Typography variant="h4">{t('pageTitle')}</Typography>
        <OrderDetailCardSection>
          <OrderDetailCard initialOrder={initialOrder} />
        </OrderDetailCardSection>
        <Link href={`/orders`}>
          <Button>
            <Typography variant="h5">{t('backToOrderHistory')}</Typography>
          </Button>
        </Link>
      </OrderDetailContainer>
    </AppShell>
  )
}
