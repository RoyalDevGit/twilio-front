import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useMount } from 'react-use'

import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { AppShell } from 'components/AppShell'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { NotificationItem } from 'components/NotificationItem'
import { PageContainer } from 'components/PageContainer/styles'
import {
  NotificationsContainer,
  NotificationsTitle,
  StyledList,
} from 'pageComponents/Notifications/styles'
import { TrayNotification } from 'interfaces/TrayNotification'
import { NotificationsApi } from 'apis/NotificationsApi'

export interface NotificationsPageProps {
  initialNotifications?: TrayNotification[]
}

export const NotificationsPage: NextPage<NotificationsPageProps> = ({
  initialNotifications,
}) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const markNotificationsAsRead = async () => {
    const notificationIds: string[] = []
    initialNotifications?.forEach((notification) =>
      notificationIds.push(notification.id)
    )
    await NotificationsApi.markAsRead(notificationIds)
  }

  useMount(() => {
    markNotificationsAsRead()
  })

  return (
    <AppShell
      drawer={
        <ConsumerDrawer
          open={drawerIsOpen}
          onClose={handleDrawerMenuClose}
          onToggleClick={handleDrawerMenuClick}
        />
      }
      mobileNavigation={
        <ConsumerMobileNavigation onDrawerMenuClick={handleDrawerMenuClick} />
      }
      onDrawerMenuClick={handleDrawerMenuClick}
    >
      <PageContainer>
        <NotificationsContainer>
          <NotificationsTitle>{t('notificationsTitle')}</NotificationsTitle>
          {initialNotifications?.map((notification) => (
            <StyledList key={notification.id}>
              <NotificationItem
                notification={notification}
                displayMobileKebab={true}
              />
            </StyledList>
          ))}
        </NotificationsContainer>
      </PageContainer>
    </AppShell>
  )
}
