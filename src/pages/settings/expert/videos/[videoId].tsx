/* eslint-disable import/no-default-export */
import { ParsedUrlQuery } from 'querystring'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  ExpertVideoPageProps,
  ExpertVideoPage,
} from 'pageComponents/Settings/Expert/VideoDetail'
import { requireAuth } from 'utils/auth/requireAuth'
import { VideoApi } from 'apis/VideoApi'
import {
  getLocaleNamespaces,
  LocaleNamespaceBundle,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'

export default ExpertVideoPage

interface Params extends ParsedUrlQuery {
  videoId: string
}

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req, expert } = ctx
    const params = ctx.params as Params
    const { videoId } = params

    if (!expert) {
      return {
        notFound: true,
      }
    }

    const videoResult = await VideoApi.setServerRequest(req).getById(videoId)

    let pageProps: ExpertVideoPageProps | null = null

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
            LocaleNamespace.ExpertVideoDetail,
            LocaleNamespace.VideoDeletionConfirmationDialog,
          ])
        )),
      },
    }

    if (pageProps) {
      rtn.props = { ...rtn.props, ...pageProps }
    }

    return rtn
  },
  { fetchUserDetails: true, allowGuests: false }
)
