/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { DateTime } from 'luxon'

import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespaceBundle,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'
import { SessionApi } from 'apis/SessionApi'
import {
  CalendarPage,
  CalendarPageProps,
} from 'pageComponents/Schedule/Calendar'

export default CalendarPage

export const getServerSideProps = requireAuth(
  async (ctx) => {
    const { locale, req, query } = ctx
    const { from, to } = query

    let pageProps: CalendarPageProps | null = null

    let fromDate: DateTime
    let toDate: DateTime
    if (from) {
      fromDate = DateTime.fromSQL(from as string)
      if (!fromDate.isValid) {
        fromDate = DateTime.now().startOf('day')
      }
    } else {
      fromDate = DateTime.now().startOf('month')
    }
    if (to) {
      toDate = DateTime.fromSQL(to as string)
      if (!toDate.isValid) {
        toDate = DateTime.now().plus({ months: 1 }).startOf('day')
      }
    } else {
      toDate = DateTime.now().endOf('month')
    }

    const sessionsResult = await SessionApi.setServerRequest(req).query({
      limit: 31,
      to: toDate,
      from: fromDate,
      page: 1,
      sort: 'session.startDate.date',
      sortDirection: 'desc',
    })

    pageProps = {
      initialSessions: (await sessionsResult.getData()).items,
    }

    const rtn = {
      notFound: !sessionsResult.ok(),
      props: {
        ...(await serverSideTranslations(
          locale,
          getLocaleNamespaces([
            LocaleNamespaceBundle.AppShell,
            LocaleNamespace.Calendar,
            LocaleNamespace.EventEditorDialog,
            LocaleNamespace.Schedule,
            LocaleNamespace.SessionCard,
          ])
        )),
      },
    }

    if (pageProps) {
      rtn.props = { ...rtn.props, ...pageProps }
    }

    return rtn
  },
  { allowGuests: false }
)
