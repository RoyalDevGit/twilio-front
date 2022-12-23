/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { DateTime } from 'luxon'

import { SessionApi } from 'apis/SessionApi'
import {
  SessionListPageProps,
  SessionListPage,
} from 'pageComponents/Schedule/SessionList'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespaceBundle,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'

const PastSessionsPage = (props: SessionListPageProps) => (
  <SessionListPage {...props} />
)

export default PastSessionsPage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req } = ctx

    const toDate = DateTime.now()
    let pageProps: SessionListPageProps | null = null

    const sessionsResult = await SessionApi.setServerRequest(req).query({
      page: 1,
      limit: 5,
      to: toDate,
      sort: 'session.startDate.date',
      sortDirection: 'desc',
    })

    const paginationResult = await sessionsResult.getData()
    pageProps = {
      mode: 'past',
      initialSessionsResult: paginationResult,
      to: toDate.toISO(),
      sort: 'session.startDate.date',
      sortDirection: 'desc',
    }

    return {
      props: {
        ...pageProps,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.Schedule,
            LocaleNamespaceBundle.SessionList,
          ])
        )),
      },
    }
  },
  { allowGuests: false }
)
