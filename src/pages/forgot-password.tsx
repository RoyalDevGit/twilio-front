/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ForgotPasswordPage } from 'pageComponents/ForgotPassword'
import { disallowAuth } from 'utils/auth/disallowAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'

export default ForgotPasswordPage

export const getServerSideProps = disallowAuth(async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      getLocaleNamespaces([
        LocaleNamespace.Common,
        LocaleNamespace.ForgotPassword,
        LocaleNamespace.LoginPage,
      ])
    )),
  },
}))
