import { closeSnackbar, CustomContentProps } from 'notistack'
import React, { useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import IconButton from '@mui/material/IconButton'

import {
  NotificationsSnackbar,
  NotificationSnackContainer,
  NotificationLabel,
  NotificationSnackBox,
  NotificationSnackAvatar,
  NotificationsCard,
  NotificationAvatar,
  NotificationsSnackbarActions,
  MessageBox,
} from 'components/Snacks/styles'
import { TrayNotification } from 'interfaces/TrayNotification'
import { getUserPictureUrl } from 'utils/user/getUserPictureUrl'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { NotificationLogoIcon } from 'icons/NotificationLogo'
import { CloseBigIcon } from 'icons/Close'
import { renderNotificationCTA } from 'components/NotificationCTAs/renderNotificationCTA'

interface NotificationSnackProps extends CustomContentProps {
  notification: TrayNotification
}

export const NotificationSnack = React.forwardRef<
  HTMLDivElement,
  NotificationSnackProps
>((props, ref) => {
  const { t } = useTranslation(LocaleNamespace.Snacks)
  const { message, notification, ...other } = props

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id)
  }, [props.id, closeSnackbar])

  return (
    <NotificationsSnackbar
      ref={ref}
      role="alert"
      {...other}
      id={notification.id}
    >
      <NotificationsCard>
        <NotificationSnackContainer>
          <NotificationsSnackbarActions>
            <NotificationLabel>{t('newNotificationLabel')}</NotificationLabel>
            <IconButton size="small" onClick={handleDismiss}>
              <CloseBigIcon />
            </IconButton>
          </NotificationsSnackbarActions>
          <NotificationSnackBox>
            {!!notification.referencedUser && (
              <NotificationSnackAvatar
                src={getUserPictureUrl(notification.referencedUser)}
                firstName={notification.referencedUser?.firstName || ''}
                lastName={notification.referencedUser?.lastName || ''}
                width={32}
                height={32}
              />
            )}
            {!notification.referencedUser && (
              <NotificationAvatar>
                <NotificationLogoIcon />
              </NotificationAvatar>
            )}
            {/* <NotificationSnackLabel>{message}</NotificationSnackLabel>
            {renderNotificationCTA(notification)} */}
            <MessageBox>
              {message} <span>{renderNotificationCTA(notification)}</span>
            </MessageBox>
          </NotificationSnackBox>
        </NotificationSnackContainer>
      </NotificationsCard>
    </NotificationsSnackbar>
  )
})

NotificationSnack.displayName = 'NotificationSnack'
