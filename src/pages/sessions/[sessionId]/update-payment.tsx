/* eslint-disable import/no-default-export */
import { ParsedUrlQuery } from 'querystring'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { SessionApi } from 'apis/SessionApi'
import {
  UpdatePaymentPage,
  UpdatePaymentPageProps,
} from 'pageComponents/UpdatePayment'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'
import { OrderPaymentStatus } from 'interfaces/Order'

export default UpdatePaymentPage

interface Params extends ParsedUrlQuery {
  sessionId: string
}

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale, req } = ctx
  const params = ctx.params as Params
  const { sessionId } = params

  const sessionResult = await SessionApi.setServerRequest(req).getById(
    sessionId
  )

  if (!sessionResult.ok()) {
    return {
      notFound: true,
    }
  }

  const session = await sessionResult.getData()
  const pageProps: UpdatePaymentPageProps = {
    initialSession: session,
  }

  if (session.order.paymentStatus !== OrderPaymentStatus.FailedAuthorization) {
    return {
      redirect: {
        destination: `/schedule/sessions/${session.id}`,
        permanent: false,
      },
    }
  }

  const rtn = {
    props: {
      ...pageProps,
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespace.UpdatePaymentPage,
          LocaleNamespace.PaymentMethodSelector,
        ])
      )),
    },
  }

  return rtn
})
