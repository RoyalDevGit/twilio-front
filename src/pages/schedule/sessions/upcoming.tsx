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
import { SessionStatus } from 'interfaces/Session'

const UpcomingSessionsPage = (props: SessionListPageProps) => (
  <SessionListPage {...props} />
)

export default UpcomingSessionsPage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req } = ctx
    const status = [SessionStatus.NotStarted, SessionStatus.Active]
    const fromDate = DateTime.now().startOf('day')
    const minEndDate = DateTime.now()
    let pageProps: SessionListPageProps | null = null

    const sessionsResult = await SessionApi.setServerRequest(req).query({
      page: 1,
      limit: 5,
      status,
      from: fromDate,
      minEndDate: minEndDate,
      sort: 'session.startDate.date',
      sortDirection: 'asc',
    })

    const paginationResult = await sessionsResult.getData()
    pageProps = {
      mode: 'upcoming',
      status,
      initialSessionsResult: paginationResult,
      from: fromDate.toISO(),
      minEndDate: minEndDate.toISO(),
      sort: 'session.startDate.date',
      sortDirection: 'asc',
    }

    return {
      props: {
        ...pageProps,
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.UpcomingSessions,
            LocaleNamespace.Schedule,
            LocaleNamespaceBundle.SessionList,
          ])
        )),
      },
    }
  },
  { allowGuests: false }
)
