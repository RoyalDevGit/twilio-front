/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ExpertApi } from 'apis/ExpertApi'
import { ConsumerHomePage, ConsumerHomePageProps } from 'pageComponents/Home'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import { CategoryApi } from 'apis/CategoryApi'

export default ConsumerHomePage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req } = ctx

    const pageProps: ConsumerHomePageProps = {
      initialFeaturedExperts: [],
      initialRecommendedExperts: [],
      upcomingSessions: [],
      recentSessions: [],
      recommendedCategories: [],
    }

    const getFeaturedExperts = async () => {
      const featuredExpertsFetch = await ExpertApi.setServerRequest(
        req
      ).queryFeatured({
        page: 1,
        limit: 10,
      })
      if (!featuredExpertsFetch.ok()) {
        return
      }

      const featuredExpertsData = await featuredExpertsFetch.getData()
      pageProps.initialFeaturedExperts = featuredExpertsData.items
    }

    // const getRecommendedExperts = async () => {
    //   const recommendedExpertsFetch = await ExpertApi.setServerRequest(
    //     req
    //   ).queryRecommended({
    //     page: 1,
    //     limit: 5,
    //   })
    //   if (!recommendedExpertsFetch.ok()) {
    //     return
    //   }
    //   const recommendedExpertsData = await recommendedExpertsFetch.getData()
    //   pageProps.initialRecommendedExperts = recommendedExpertsData.items
    // }

    const getRecommendedCategories = async () => {
      const categoriesResult = await CategoryApi.setServerRequest(
        req
      ).queryRecommended({
        page: 1,
        limit: 10,
      })
      if (!categoriesResult.ok()) {
        return
      }

      const data = await categoriesResult.getData()
      pageProps.recommendedCategories = data.items
    }

    await Promise.all([
      getFeaturedExperts(),
      // getRecommendedExperts(),
      getRecommendedCategories(),
    ])

    return {
      props: {
        ...pageProps,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.HomePage,
            LocaleNamespace.ConsumerWizard,
            LocaleNamespace.ExpertCard,
            LocaleNamespace.CategoryCard,
            LocaleNamespace.UpcomingAppointmentCard,
            LocaleNamespace.FilterBy,
            LocaleNamespace.FeaturedExpertCard,
            LocaleNamespace.Notifications,
            LocaleNamespace.Common,
            LocaleNamespace.GuestHomePageHero,
            LocaleNamespace.GuestHomePageFooter,
            LocaleNamespace.LoginOrSignUp,
          ])
        )),
      },
    }
  },
  { allowGuests: true }
)
