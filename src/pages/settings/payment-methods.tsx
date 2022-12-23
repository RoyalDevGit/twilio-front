/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { PaymentMethodApi } from 'apis/PaymentMethodApi'
import {
  PaymentMethodsPage,
  PaymentMethodsPageProps,
} from 'pageComponents/Settings/PaymentMethods'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import { PaymentMethodStatus } from 'interfaces/PaymentMethod'

export default PaymentMethodsPage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req } = ctx

    const paymentMethodResult = await PaymentMethodApi.setServerRequest(
      req
    ).query({
      page: 1,
      limit: 50,
      status: [PaymentMethodStatus.Ready],
    })

    const props: PaymentMethodsPageProps = {
      initialPaymentMethodResult: await paymentMethodResult.getData(),
    }

    return {
      props: {
        ...props,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.Settings,
            LocaleNamespace.PaymentMethodsPage,
            LocaleNamespace.PaymentMethodSelector,
            LocaleNamespace.AddPaymentMethodDialog,
          ])
        )),
      },
    }
  },
  { fetchUserDetails: true, allowGuests: false }
)
