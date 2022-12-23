/* eslint-disable import/no-default-export */
import { ParsedUrlQuery } from 'querystring'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  ExpertReviewsPage,
  ExpertReviewsPageProps,
} from 'pageComponents/ExpertProfile/Reviews'
import { CommentApi } from 'apis/CommentApi'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespaceBundle,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'
import { ExpertApi } from 'apis/ExpertApi'
import { CommentEntityType, CommentType } from 'interfaces/Comment'

export default ExpertReviewsPage

interface Params extends ParsedUrlQuery {
  expertId: string
}

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { req, locale } = ctx
    const params = ctx.params as Params
    const { expertId } = params

    let pageProps: ExpertReviewsPageProps | null = null

    const expertResult = await ExpertApi.setServerRequest(req).getById(expertId)

    if (expertResult.ok()) {
      const reviewsResult = await CommentApi.setServerRequest(req).query({
        entityId: expertId,
        commentType: CommentType.Review,
        entityType: CommentEntityType.Expert,
        page: 1,
        limit: 10,
      })

      if (reviewsResult.ok()) {
        const reviewsFetch = await reviewsResult.getData()
        const eligibilityFetch = await ExpertApi.getReviewEligibiity(expertId)
        pageProps = {
          initialExpert: await expertResult.getData(),
          initialReviews: reviewsFetch.items,
          moreReviews: reviewsFetch.hasNextPage,
          canReview:
            eligibilityFetch.ok() && (await eligibilityFetch.getData()),
        }
      }
    }

    const rtn = {
      notFound: !expertResult.ok(),
      props: {
        expertId,
        ...pageProps,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.ExpertProfile,
            LocaleNamespace.Comments,
            LocaleNamespace.StarRating,
          ])
        )),
      },
    }

    return rtn
  },
  { allowGuests: true }
)
