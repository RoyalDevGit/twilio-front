/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { UserApi } from 'apis/UserApi'
import { MorePage, MorePageProps } from 'pageComponents/More'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'

export default MorePage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req, user } = ctx
    if (!user) {
      return {
        notFound: true,
      }
    }

    const sessionCountResult = await UserApi.setServerRequest(
      req
    ).getSessionCounts(user.id)
    const sessionCounts = await sessionCountResult.getData()

    const props: MorePageProps = {
      sessionCounts,
    }

    return {
      props: {
        ...props,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.MorePage,
            LocaleNamespace.Common,
          ])
        )),
      },
    }
  },
  { allowGuests: true }
)
