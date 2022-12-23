/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { SignupPage } from 'pageComponents/Signup'
import { disallowAuth } from 'utils/auth/disallowAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'

export default SignupPage

export const getServerSideProps = disallowAuth(async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      getLocaleNamespaces([
        LocaleNamespace.Common,
        LocaleNamespace.Password,
        LocaleNamespace.SignupPage,
        LocaleNamespace.SignupAs,
        LocaleNamespace.LoginPage,
        LocaleNamespace.AvailableSessions,
        LocaleNamespace.GuestUserAuthReasonMessage,
      ])
    )),
  },
}))
