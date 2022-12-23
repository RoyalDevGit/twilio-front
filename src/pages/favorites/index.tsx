/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import {
  FavoriteExpertsPageProps,
  FavoritesHomePage,
} from 'pageComponents/Favorites/Home'
import { ExpertApi } from 'apis/ExpertApi'
import { getFiltersFromServerRequest } from 'utils/filters/getFiltersFromServerRequest'

export default FavoritesHomePage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req, query } = ctx
    const requestFilters = getFiltersFromServerRequest(query)

    const favoriteExpertsResult = await ExpertApi.setServerRequest(
      req
    ).queryFavorites({
      page: 1,
      limit: 50,
      ...requestFilters,
    })

    const props: FavoriteExpertsPageProps = {
      initialFavoriteExperts: await favoriteExpertsResult.getData(),
    }

    return {
      props: {
        ...props,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.FavoritesPage,
            LocaleNamespace.ExpertCard,
            LocaleNamespace.FilterBy,
            LocaleNamespace.Common,
          ])
        )),
      },
    }
  },
  { allowGuests: false }
)
