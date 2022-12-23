/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'querystring'

import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import {
  OrderDetailPage,
  OrderDetailPageProps,
} from 'pageComponents/Orders/OrderDetail'
import { OrderApi } from 'apis/OrderApi'

export default OrderDetailPage

interface Params extends ParsedUrlQuery {
  orderId: string
}

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale, req } = ctx
  const params = ctx.params as Params
  const { orderId } = params

  let pageProps: OrderDetailPageProps | null = null

  const orderResult = await OrderApi.setServerRequest(req).getById(orderId)

  if (orderResult.ok()) {
    pageProps = {
      initialOrder: await orderResult.getData(),
    }
  }

  return {
    notFound: !orderResult.ok(),
    props: {
      ...pageProps,
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespaceBundle.AppShell,
          LocaleNamespace.OrderDetailPage,
          LocaleNamespace.OrderDetailCard,
          LocaleNamespace.Common,
        ])
      )),
    },
  }
})
