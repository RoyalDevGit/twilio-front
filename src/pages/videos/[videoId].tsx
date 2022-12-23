/* eslint-disable import/no-default-export */
import { ParsedUrlQuery } from 'querystring'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { VideoPage, VideoPageProps } from 'pageComponents/Video'
import { requireAuth } from 'utils/auth/requireAuth'
import { VideoApi } from 'apis/VideoApi'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'

export default VideoPage

interface Params extends ParsedUrlQuery {
  videoId: string
}

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale, req } = ctx
  const params = ctx.params as Params
  const { videoId } = params

  const videoResult = await VideoApi.setServerRequest(req).getById(videoId)

  let pageProps: VideoPageProps | null = null

  if (videoResult.ok()) {
    pageProps = {
      initialVideo: await videoResult.getData(),
    }
  }

  const rtn = {
    notFound: !videoResult.ok(),
    props: {
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespaceBundle.AppShell,
          LocaleNamespace.VideoDetail,
          LocaleNamespaceBundle.Comments,
          LocaleNamespace.StarRating,
        ])
      )),
    },
  }

  if (pageProps) {
    rtn.props = { ...rtn.props, ...pageProps }
  }

  return rtn
})
