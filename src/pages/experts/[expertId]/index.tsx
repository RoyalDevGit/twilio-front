/* eslint-disable import/no-default-export */
import { ParsedUrlQuery } from 'querystring'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  ExpertHomePage,
  ExpertHomePageProps,
} from 'pageComponents/ExpertProfile/Home'
import { requireAuth } from 'utils/auth/requireAuth'
import { ExpertApi } from 'apis/ExpertApi'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import { CommentApi } from 'apis/CommentApi'
import { CommentEntityType, CommentType } from 'interfaces/Comment'
// import { getFiltersFromServerRequest } from 'utils/filters/getFiltersFromServerRequest'

export default ExpertHomePage

interface Params extends ParsedUrlQuery {
  expertId: string
}

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req } = ctx
    const params = ctx.params as Params
    const { expertId } = params
    //const requestFilters = getFiltersFromServerRequest(req)

    const pageProps = {
      recommendedExperts: [],
      initialOrder: null,
      reviewComments: [],
      moreReviews: false,
    } as Partial<ExpertHomePageProps>

    const getExpert = async () => {
      const expertResult = await ExpertApi.setServerRequest(req).getById(
        expertId
      )
      if (!expertResult.ok()) {
        return
      }
      pageProps.initialExpert = await expertResult.getData()
    }

    // const getRecommendedExperts = async () => {
    //   const recommendedExpertsResult = await ExpertApi.setServerRequest(
    //     req
    //   ).queryRecommended({
    //     page: 1,
    //     limit: 20,
    //     ...requestFilters,
    //   })
    //   if (!recommendedExpertsResult.ok()) {
    //     return
    //   }
    //   pageProps.recommendedExperts = (
    //     await recommendedExpertsResult.getData()
    //   ).items
    // }

    // const getCurrentOrder = async () => {
    //   const currentOrderResult = await OrderApi.setServerRequest(
    //     req
    //   ).getCurrent()
    //   if (!currentOrderResult.ok()) {
    //     return
    //   }
    //   pageProps.initialOrder = await currentOrderResult.getData()
    // }

    const getReviews = async () => {
      const reviewsResult = await CommentApi.setServerRequest(req).query({
        entityId: expertId,
        commentType: CommentType.Review,
        entityType: CommentEntityType.Expert,
        page: 1,
        limit: 10,
      })
      if (!reviewsResult.ok()) {
        return
      }
      const reviewFetch = await reviewsResult.getData()
      pageProps.reviewComments = reviewFetch.items
      pageProps.moreReviews = reviewFetch.hasNextPage
    }

    await Promise.all([
      getExpert(),
      // getRecommendedExperts(),
      // getCurrentOrder(),
      getReviews(),
    ])

    const rtn = {
      notFound: !pageProps.initialExpert,
      props: {
        ...pageProps,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.ExpertProfile,
            LocaleNamespaceBundle.MobileCheckout,
            LocaleNamespace.AvailableSessions,
            LocaleNamespace.ExpertCard,
            LocaleNamespace.ExpertVideoCard,
            LocaleNamespaceBundle.Comments,
            LocaleNamespace.VideoThumbnailList,
          ])
        )),
      },
    }

    return rtn
  },
  { allowGuests: true }
)
