/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { FavoritesVideoPage } from 'pageComponents/Favorites/Videos'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import { FavoritesPageProps } from 'pageComponents/Favorites'

export default FavoritesVideoPage

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale } = ctx

  const props: FavoritesPageProps = {}

  return {
    props: {
      selectedPage: 'Videos',
      ...props,
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespaceBundle.AppShell,
          LocaleNamespace.FavoritesPage,
          LocaleNamespace.Home,
          LocaleNamespace.ExpertVideoCard,
          LocaleNamespace.FilterBy,
          LocaleNamespace.Common,
        ])
      )),
    },
  }
})
