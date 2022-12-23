/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { SettingsPageProps } from 'pageComponents/Settings'
import { PreferencesPage } from 'pageComponents/Settings/Preferences'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'

export default PreferencesPage

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale } = ctx

  const props: SettingsPageProps = {}

  return {
    props: {
      ...props,
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespaceBundle.AppShell,
          LocaleNamespace.Settings,
        ])
      )),
    },
  }
})
