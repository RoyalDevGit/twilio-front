/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { AccountInformationPage } from 'pageComponents/Settings/Account'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'

export default AccountInformationPage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale } = ctx
    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.Settings,
          ])
        )),
      },
    }
  },
  { fetchUserDetails: true, allowGuests: false }
)
