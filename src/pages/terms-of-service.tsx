/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { TermsOfServicePage } from 'pageComponents/TermsOfService'
import { disallowAuth } from 'utils/auth/disallowAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'

export default TermsOfServicePage

export const getServerSideProps = disallowAuth(async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      getLocaleNamespaces([
        LocaleNamespace.Common,
        LocaleNamespace.TermsOfService,
      ])
    )),
  },
}))
