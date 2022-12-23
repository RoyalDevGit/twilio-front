/* eslint-disable import/no-default-export */
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { DateTime } from 'luxon'

import { NotificationsApi } from 'apis/NotificationsApi'
import {
  NotificationsPage,
  NotificationsPageProps,
} from 'pageComponents/Notifications'
import { requireAuth } from 'utils/auth/requireAuth'
import {
  getLocaleNamespaces,
  LocaleNamespace,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import {
  TrayNotification,
  NotificationStatus,
} from 'interfaces/TrayNotification'

export default NotificationsPage

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale, req } = ctx
  const fromDate = DateTime.now().plus({ weeks: -2 })
  const toDate = DateTime.now().endOf('day')

  let notifications: TrayNotification[] = []
  const notificationsResult = await NotificationsApi.setServerRequest(
    req
  ).query({
    page: 1,
    limit: 10,
    from: fromDate,
    to: toDate,
    status: [NotificationStatus.Sent, NotificationStatus.Read],
    sort: 'createdAt',
    sortDirection: 'desc',
  })

  if (notificationsResult.ok()) {
    const notificationsData = await notificationsResult.getData()
    notifications = notificationsData.items
  }

  const props: NotificationsPageProps = {
    initialNotifications: notifications || 'null',
  }

  return {
    props: {
      ...props,
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespaceBundle.AppShell,
          LocaleNamespace.Notifications,
          LocaleNamespace.Common,
        ])
      )),
    },
  }
})
