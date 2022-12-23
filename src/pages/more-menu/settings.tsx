/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { MorePageSettings } from 'pageComponents/More/Settings'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'

export default MorePageSettings

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale } = ctx

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespaceBundle.AppShell,
          LocaleNamespace.MorePage,
          LocaleNamespace.Common,
        ])
      )),
    },
  }
})
