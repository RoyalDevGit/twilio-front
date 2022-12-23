/* eslint-disable import/no-default-export */

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  ExpertVideosPage,
  ExpertVideosPageProps,
} from 'pageComponents/Settings/Expert/Videos'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespaceBundle,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'
import { VideoApi } from 'apis/VideoApi'

export default ExpertVideosPage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req, expert } = ctx

    if (!expert) {
      return {
        notFound: true,
      }
    }

    const videosResult = await VideoApi.setServerRequest(req).query({
      limit: 100,
      page: 1,
      expertId: expert.id,
    })

    let pageProps: ExpertVideosPageProps | null = null

    if (videosResult.ok()) {
      const videoQueryResult = await videosResult.getData()
      pageProps = {
        initialVideos: videoQueryResult.items,
      }
    }

    return {
      notFound: !videosResult.ok(),
      props: {
        ...pageProps,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.ExpertVideos,
            LocaleNamespace.VideoEditorDialog,
            LocaleNamespace.VideoDeletionConfirmationDialog,
          ])
        )),
      },
    }
  },
  { fetchUserDetails: true, allowGuests: false }
)
