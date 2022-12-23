/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ParsedUrlQuery } from 'querystring'

import {
  CheckoutConfirmationPage,
  CheckoutConfirmationPageProps,
} from 'pageComponents/Checkout/Confirmation'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import { OrderApi } from 'apis/OrderApi'

export default CheckoutConfirmationPage

interface Params extends ParsedUrlQuery {
  orderId: string
}

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale, req } = ctx

  const params = ctx.params as Params
  const { orderId } = params

  const orderResult = await OrderApi.setServerRequest(req).getById(orderId)

  if (!orderResult.ok()) {
    return {
      notFound: true,
    }
  }

  const props: CheckoutConfirmationPageProps = {
    order: await orderResult.getData(),
  }

  return {
    props: {
      ...props,
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespaceBundle.AppShell,
          LocaleNamespace.CheckoutConfirmationPage,
        ])
      )),
    },
  }
})
