/* eslint-disable import/no-default-export */
import { ParsedUrlQuery } from 'querystring'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { SessionApi } from 'apis/SessionApi'
import {
  SessionDetails,
  SessionDetailsPageProps,
} from 'pageComponents/Schedule/SessionDetails'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'

export default SessionDetails

interface Params extends ParsedUrlQuery {
  sessionId: string
}

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale, req } = ctx
  const params = ctx.params as Params
  const { sessionId } = params

  const sessionResult = await SessionApi.setServerRequest(req).getById(
    sessionId
  )

  if (!sessionResult.ok()) {
    return {
      notFound: true,
    }
  }

  const pageProps: SessionDetailsPageProps = {
    session: await sessionResult.getData(),
  }

  const rtn = {
    props: {
      ...pageProps,
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespaceBundle.AppShell,
          LocaleNamespaceBundle.SessionList,
          LocaleNamespace.UpcomingSessions,
          LocaleNamespace.SessionDetails,
        ])
      )),
    },
  }

  return rtn
})
