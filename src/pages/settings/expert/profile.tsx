/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ExpertEditProfilePage } from 'pageComponents/Settings/Expert/Profile'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'

export default ExpertEditProfilePage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, expert, user } = ctx

    if (!expert || !user) {
      return {
        notFound: true,
      }
    }

    const rtn = {
      props: {
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.Settings,
            LocaleNamespace.ExpertProfileSettings,
          ])
        )),
      },
    }

    return rtn
  },
  { fetchUserDetails: true, allowGuests: false }
)
