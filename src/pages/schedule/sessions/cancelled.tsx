/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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

const CancelledSessionsPage = (props: SessionListPageProps) => (
  <SessionListPage {...props} />
)

export default CancelledSessionsPage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req } = ctx
    const status = [SessionStatus.Cancelled]
    let pageProps: SessionListPageProps | null = null

    const sessionsResult = await SessionApi.setServerRequest(req).query({
      page: 1,
      limit: 5,
      status,
      sort: 'session.startDate.date',
      sortDirection: 'desc',
    })

    const paginationResult = await sessionsResult.getData()
    pageProps = {
      mode: 'cancelled',
      status,
      initialSessionsResult: paginationResult,
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
