/* eslint-disable import/no-default-export */
import { ParsedUrlQuery } from 'querystring'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import {
  EventDetailPage,
  EventDetailPageProps,
} from 'pageComponents/EventDetail'
import { requireAuth } from 'utils/auth/requireAuth'
import { EventApi } from 'apis/EventApi'
import {
  getLocaleNamespaces,
  LocaleNamespaceBundle,
  LocaleNamespace,
} from 'utils/locale/LocaleNamespace'

export default EventDetailPage

interface Params extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale, req } = ctx
  const params = ctx.params as Params
  const { id } = params

  const eventResult = await EventApi.setServerRequest(req).getById(id)

  let pageProps: EventDetailPageProps | null = null

  if (eventResult.ok()) {
    pageProps = {
      initialEvent: await eventResult.getData(),
    }
  }

  const rtn = {
    notFound: !eventResult.ok(),
    props: {
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespaceBundle.AppShell,
          LocaleNamespace.EventDetail,
          LocaleNamespace.EventList,
          LocaleNamespace.EventReservationCancellationDialog,
          LocaleNamespace.EventConfirmationDialog,
        ])
      )),
    },
  }

  if (pageProps) {
    rtn.props = { ...rtn.props, ...pageProps }
  }

  return rtn
})
