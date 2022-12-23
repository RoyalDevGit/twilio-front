/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ExpertApi } from 'apis/ExpertApi'
import {
  ExpertAvailabilitySettingsPage,
  ExpertAvailabilitySettingsPageProps,
} from 'pageComponents/Settings/Expert/Availability'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespaceBundle,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'

export default ExpertAvailabilitySettingsPage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, expert, req } = ctx

    if (!expert) {
      return {
        notFound: true,
      }
    }

    const availabilityOptionsResult = await ExpertApi.setServerRequest(
      req
    ).getAvailabilityOptions(expert.id)

    const blockoutDatesResult = await ExpertApi.setServerRequest(
      req
    ).getBlockoutDates(expert.id)

    const props: ExpertAvailabilitySettingsPageProps = {
      initialAvailabilityOptions: await availabilityOptionsResult.getData(),
      initialBlockoutDates: await blockoutDatesResult.getData(),
    }

    return {
      props: {
        ...props,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.Settings,
            LocaleNamespace.Schedule,
            LocaleNamespace.ExpertAvailabilitySettings,
            LocaleNamespace.TimeZoneDialog,
          ])
        )),
      },
    }
  },
  { fetchUserDetails: true, allowGuests: false }
)
