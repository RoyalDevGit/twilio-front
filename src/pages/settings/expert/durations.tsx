/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ExpertApi } from 'apis/ExpertApi'
import {
  ExpertDurationSettingsPage,
  ExpertDurationSettingsPageProps,
} from 'pageComponents/Settings/Expert/SessionSettings'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespaceBundle,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'

export default ExpertDurationSettingsPage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, expert, req } = ctx

    if (!expert) {
      return {
        notFound: true,
      }
    }

    const durationOptionsResult = await ExpertApi.setServerRequest(
      req
    ).getSessionDurationOptions(expert.id)

    const props: ExpertDurationSettingsPageProps = {
      initialSessionDurationOptions: await durationOptionsResult.getData(),
    }

    return {
      props: {
        selectedPage: 'Reviews',
        ...props,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.Settings,
            LocaleNamespace.Schedule,
            LocaleNamespace.ExpertDurationSettings,
            LocaleNamespace.SessionDurationOptions,
          ])
        )),
      },
    }
  },
  { fetchUserDetails: true, allowGuests: false }
)
