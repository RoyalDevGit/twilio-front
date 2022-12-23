/* eslint-disable import/no-default-export */
import { DateTime } from 'luxon'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { OrderApi } from 'apis/OrderApi'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import { OrderStatus } from 'interfaces/Order'
import { OrdersPage, OrdersPageProps } from 'pageComponents/Orders'
import { SessionStatus } from 'interfaces/Session'

export default OrdersPage

const generateProps = (path: string) => {
  if (path === '/orders/upcoming') {
    return {
      sessionStart: DateTime.now(),
      sessionEnd: DateTime.now().plus({ days: 31 }),
    }
  }
  return {}
}

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale, req, resolvedUrl } = ctx

  const fromDate = DateTime.now().plus({ days: -31 })
  const toDate = DateTime.now().plus({ days: 31 })

  let status: OrderStatus[] = []
  let sessionStatus: SessionStatus[] | null = null
  switch (resolvedUrl) {
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

  const OrdersResult = await OrderApi.setServerRequest(req).query({
    page: 1,
    limit: 10,
    status,
    sessionStatus,
    from: fromDate,
    to: toDate,
    only: 'parents',
    ...generateProps(resolvedUrl),
  })

  const paginationResult = await OrdersResult.getData()
  const pageProps: OrdersPageProps = {
    initialOrderResult: paginationResult,
    from: fromDate.toISO(),
    to: toDate.toISO(),
    status,
    sessionStatus,
  }

  return {
    props: {
      ...pageProps,
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespaceBundle.AppShell,
          LocaleNamespace.OrdersPage,
          LocaleNamespace.OrderCard,
          LocaleNamespace.Common,
        ])
      )),
    },
  }
})
