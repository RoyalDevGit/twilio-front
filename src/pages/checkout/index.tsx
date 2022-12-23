/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { OrderApi } from 'apis/OrderApi'
import { CheckoutPage, CheckoutPageProps } from 'pageComponents/Checkout'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import { OrderItem, SessionOrderItem } from 'interfaces/Order'
import { ExpertApi } from 'apis/ExpertApi'

export default CheckoutPage

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale, req } = ctx

  const currentOrderResult = await OrderApi.setServerRequest(req).getCurrent()

  if (!currentOrderResult.ok()) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const currentOrder = await currentOrderResult.getData()
  if (!currentOrder || !currentOrder.items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionItem = currentOrder.items[0] as OrderItem<SessionOrderItem>
  const expertResult = await ExpertApi.setServerRequest(req).getById(
    sessionItem.data.expert
  )
  const expert = await expertResult.getData()

  const props: CheckoutPageProps = {
    currentOrder,
    expert,
  }

  return {
    props: {
      ...props,
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespaceBundle.AppShell,
          LocaleNamespace.CheckoutPage,
          LocaleNamespace.PaymentMethodSelector,
          LocaleNamespace.AddPaymentMethodDialog,
        ])
      )),
    },
  }
})
