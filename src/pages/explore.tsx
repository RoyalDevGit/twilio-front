/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ExpertApi } from 'apis/ExpertApi'
import { ExplorePage, ExplorePageProps } from 'pageComponents/Explore'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import { CategoryApi } from 'apis/CategoryApi'
import { getFiltersFromServerRequest } from 'utils/filters/getFiltersFromServerRequest'

export default ExplorePage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req, query } = ctx
    const requestFilters = getFiltersFromServerRequest(query)

    const pageProps: ExplorePageProps = {
      initialRecommendedExperts: [],
      initialBrowseSectionExperts: [],
      initialFeaturedExperts: [],
      recommendedCategories: [],
    }

    const getFeaturedExperts = async () => {
      const featuredExpertsFetch = await ExpertApi.setServerRequest(
        req
      ).queryFeatured({
        page: 1,
        limit: 10,
        ...requestFilters,
      })
      if (featuredExpertsFetch.ok()) {
        const featuredExpertsData = await featuredExpertsFetch.getData()
        pageProps.initialFeaturedExperts = featuredExpertsData.items
      }
    }

    const getBrowseSectionExperts = async () => {
      const allExpertsFetch = await ExpertApi.setServerRequest(req).query({
        page: 1,
        limit: 10,
        ...requestFilters,
      })
      if (allExpertsFetch.ok()) {
        const allExpertsData = await allExpertsFetch.getData()
        pageProps.initialBrowseSectionExperts = allExpertsData.items
      }
    }

    // const getRecommendedExperts = async () => {
    //   const recommendedExpertsFetch = await ExpertApi.setServerRequest(
    //     req
    //   ).queryRecommended({
    //     page: 1,
    //     limit: 5,
    //     ...requestFilters,
    //   })
    //   if (recommendedExpertsFetch.ok()) {
    //     const recommendedExpertsData = await recommendedExpertsFetch.getData()
    //     pageProps.initialRecommendedExperts = recommendedExpertsData.items
    //   }
    // }

    const getRecommendedCategories = async () => {
      const categoriesResult = await CategoryApi.setServerRequest(
        req
      ).queryRecommended({
        page: 1,
        limit: 10,
      })
      if (categoriesResult.ok()) {
        const data = await categoriesResult.getData()
        pageProps.recommendedCategories = data.items
      }
    }

    await Promise.all([
      getFeaturedExperts(),
      getBrowseSectionExperts(),
      // getRecommendedExperts(),
      getRecommendedCategories(),
    ])

    return {
      props: {
        ...pageProps,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespace.ExplorePage,
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.Home,
            LocaleNamespace.ExpertCard,
            LocaleNamespace.FilterBy,
            LocaleNamespace.FeaturedExpertCard,
            LocaleNamespace.CategoryCard,
            LocaleNamespace.ExploreEmptyState,
            LocaleNamespace.Common,
          ])
        )),
      },
    }
  },
  { allowGuests: true }
)
