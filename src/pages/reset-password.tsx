/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ResetPassword } from 'pageComponents/ResetPassword'
import { disallowAuth } from 'utils/auth/disallowAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'

export default ResetPassword

export const getServerSideProps = disallowAuth(async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      getLocaleNamespaces([
        LocaleNamespace.Common,
        LocaleNamespace.SignupPage,
        LocaleNamespace.ResetPassword,
        LocaleNamespace.Password,
      ])
    )),
  },
}))
