/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { SearchApi } from 'apis/SearchApi'
import {
  SearchResultsPage,
  SearchResultsPageProps,
} from 'pageComponents/SearchResults'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import { Expert } from 'interfaces/Expert'
import { GlobalSearchIndex } from 'interfaces/Search'
import { getFiltersFromServerRequest } from 'utils/filters/getFiltersFromServerRequest'

export default SearchResultsPage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req, query: queryObject } = ctx
    const requestFilters = getFiltersFromServerRequest(queryObject)
    const searchText = (queryObject.query || '') as string
    const recommendedExperts: Expert[] = []
    const searchIndices: GlobalSearchIndex[] = ['experts']

    const initialPage = 1
    const initialLimit = 12

    if (!searchText) {
      return {
        redirect: {
          destination: '/explore',
          permanent: false,
        },
      }
    }

    const result = await SearchApi.setServerRequest(req).globalSearch({
      query: searchText,
      page: initialPage,
      limit: initialLimit,
      index: searchIndices,
      ...requestFilters,
    })
    const searchResult = await result.getData()

    // const recommendedExpertsFetch = await ExpertApi.setServerRequest(
    //   req
    // ).queryRecommended({
    //   page: 1,
    //   limit: 20,
    // })
    // if (recommendedExpertsFetch.ok()) {
    //   const recommendedExpertsData = await recommendedExpertsFetch.getData()
    //   recommendedExperts = recommendedExpertsData.items
    // }

    const props: SearchResultsPageProps = {
      initialSearchResult: searchResult,
      initialRecommendedExperts: recommendedExperts,
      initialPage,
      initialLimit,
      indices: searchIndices,
    }

    return {
      props: {
        ...props,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.SearchResults,
            LocaleNamespace.VerifiedExpertBadge,
            LocaleNamespace.ExpertCard,
            LocaleNamespace.FilterBy,
            LocaleNamespace.FeaturedExpertCard,
          ])
        )),
      },
    }
  },
  { allowGuests: true }
)
