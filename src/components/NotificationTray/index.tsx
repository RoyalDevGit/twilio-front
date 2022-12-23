import { FC, useState } from 'react'
import { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useMount, useUpdateEffect } from 'react-use'
import { DateTime } from 'luxon'
import { useTranslation } from 'next-i18next'
import IconButton from '@mui/material/IconButton'

import {
  CustomMenu,
  NotificationsEmptyState,
  NotificationsEmptyStateLabel,
  NotificationsTitle,
  StyledBadge,
} from 'components/NotificationTray/styles'
import { NotificationItem } from 'components/NotificationItem'
import {
  TrayNotification,
  NotificationStatus,
} from 'interfaces/TrayNotification'
import { NotificationsApi } from 'apis/NotificationsApi'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { NotificationIcon } from 'icons/Navigation/Notification'
import { useUserSocket } from 'hooks/useUserSocket'

interface NotificationTrayProps extends MenuProps {
  isHomePage?: boolean
}

export const NotificationTray: FC<NotificationTrayProps> = () => {
  const { t } = useTranslation(LocaleNamespace.Notifications)
  const [notifications, setNotifications] = useState<TrayNotification[]>([])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const loadNotifications = async () => {
    const fromDate = DateTime.now().plus({ weeks: -2 })
    const toDate = DateTime.now().endOf('day')

    const notificationsResult = await NotificationsApi.query({
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
      setNotifications(notificationsData.items)
    }
  }
  useMount(() => {
    loadNotifications()
  })

  const markNotificationsAsRead = async () => {
    const notificationIds: string[] = []
    notifications?.forEach((notification) =>
      notificationIds.push(notification.id)
    )
    await NotificationsApi.markAsRead(notificationIds)
    loadNotifications()
  }

  useUpdateEffect(() => {
    if (open) {
      loadNotifications()
    } else {
      markNotificationsAsRead()
    }
  }, [open])

  const NotificationMenuEmptyState = (
    <NotificationsEmptyState>
      <NotificationsEmptyStateLabel>
        {t('notificationMenuEmptyState')}
      </NotificationsEmptyStateLabel>
    </NotificationsEmptyState>
  )

  useUserSocket({
    onNotificationReceived: (notification) => {
      setNotifications((current) => [notification, ...current])
    },
  })

  let notificationsCount = 0
  notifications.forEach((n) => {
    if (n.status === NotificationStatus.Sent) {
      notificationsCount = notificationsCount + 1
    }
  })

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <StyledBadge badgeContent={notificationsCount}>
          <NotificationIcon />
        </StyledBadge>
      </IconButton>
      <CustomMenu
        id="basic-menu"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {!notifications?.length ? (
          NotificationMenuEmptyState
        ) : (
          <>
            <NotificationsTitle variant="h6">
              {t('notificationsTitle')}
            </NotificationsTitle>
            {notifications?.map((notification) => (
              <MenuItem key={notification.id} disableRipple={true}>
                <NotificationItem notification={notification} />
              </MenuItem>
            ))}
          </>
        )}
      </CustomMenu>
    </>
  )
}
