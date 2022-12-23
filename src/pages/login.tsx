/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { LoginPage } from 'pageComponents/Login'
import { disallowAuth } from 'utils/auth/disallowAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'

export default LoginPage

export const getServerSideProps = disallowAuth(async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      getLocaleNamespaces([
        LocaleNamespace.Common,
        LocaleNamespace.LoginPage,
        LocaleNamespace.GuestUserAuthReasonMessage,
      ])
    )),
  },
}))
