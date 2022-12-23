import { closeSnackbar, CustomContentProps } from 'notistack'
import React, { useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import IconButton from '@mui/material/IconButton'
import { useSetRecoilState } from 'recoil'

import { ChannelMessage } from 'interfaces/ChannelMessage'
import { getStorageBucketFileUrl } from 'utils/url/getStorageBucketFileUrl'
import {
  NotificationsSnackbar,
  NotificationSnackContainer,
  NotificationLabel,
  NotificationSnackBox,
  NotificationSnackAvatar,
  NotificationSnackLabel,
  NotificationsCard,
  NotificationsSnackbarActions,
} from 'components/Snacks/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { CloseBigIcon } from 'icons/Close'
import { selectedChatState } from 'state/selectedChatState'
import { MessagingApi } from 'apis/MessagingApi'
import { MessagingChannel } from 'interfaces/MessagingChannel'

interface MessageSnackProps extends CustomContentProps {
  incomingMessage: ChannelMessage
}

export const MessageSnack = React.forwardRef<HTMLDivElement, MessageSnackProps>(
  (props, ref) => {
    const { message, incomingMessage, ...other } = props
    const { t } = useTranslation(LocaleNamespace.Snacks)
    const setSelectedChannel = useSetRecoilState(selectedChatState)

    const handleDismiss: React.MouseEventHandler<HTMLButtonElement> =
      useCallback(
        (e) => {
          closeSnackbar(props.id)
          e.stopPropagation()
        },
        [props.id, closeSnackbar]
      )

    const openChat = async () => {
      closeSnackbar(props.id)
      const result = await MessagingApi.getChannelByArn(
        incomingMessage.chimeChatChannelArn
      )
      if (!result.ok()) {
        return
      }
      const channel = await result.getData()
      setSelectedChannel(channel)

      // send DOM event
      const event = new CustomEvent<MessagingChannel>('messageSnackClick', {
        detail: channel,
      })
      document.dispatchEvent(event)
    }

    return (
      <NotificationsSnackbar
        ref={ref}
        role="alert"
        {...other}
        id={incomingMessage.id}
        onClick={openChat}
      >
        <NotificationsCard>
          <NotificationSnackContainer>
            <NotificationsSnackbarActions>
              <NotificationLabel>{t('newMessageLabel')}</NotificationLabel>
              <IconButton size="small" onClick={handleDismiss}>
                <CloseBigIcon />
              </IconButton>
            </NotificationsSnackbarActions>
            <NotificationSnackBox>
              <NotificationSnackAvatar
                src={
                  incomingMessage.sender.profilePictureKey
                    ? getStorageBucketFileUrl(
                        incomingMessage.sender.profilePictureKey
                      )
                    : undefined
                }
                firstName={incomingMessage.sender.firstName}
                lastName={incomingMessage.sender.lastName}
                width={24}
                height={24}
              />
              <NotificationSnackLabel>{message}</NotificationSnackLabel>
            </NotificationSnackBox>
          </NotificationSnackContainer>
        </NotificationsCard>
      </NotificationsSnackbar>
    )
  }
)

MessageSnack.displayName = 'MessageSnack'
