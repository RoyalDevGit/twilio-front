/* eslint-disable import/no-default-export */
import { ParsedUrlQuery } from 'querystring'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  ExpertVideoPage,
  ExpertVideoPageProps,
} from 'pageComponents/ExpertProfile/Videos'
import { ExpertApi } from 'apis/ExpertApi'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespaceBundle,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'
import { VideoApi } from 'apis/VideoApi'

export default ExpertVideoPage

interface Params extends ParsedUrlQuery {
  expertId: string
}

export const getServerSideProps = requireAuth(async (ctx) => {
  const {
    locale,
    req,
    query: { page },
  } = ctx
  const params = ctx.params as Params
  const { expertId } = params

  let pageProps: ExpertVideoPageProps | null = null

  const expertResult = await ExpertApi.setServerRequest(req).getById(expertId)

  if (expertResult.ok()) {
    const videosResult = await VideoApi.setServerRequest(req).query({
      limit: 10,
      page: typeof page === 'string' ? parseInt(page) : 1,
      expertId: expertId,
    })

    if (videosResult.ok()) {
      pageProps = {
        initialExpert: await expertResult.getData(),
        videos: await videosResult.getData(),
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
          LocaleNamespace.VideoThumbnailList,
        ])
      )),
    },
  }

  return rtn
})
