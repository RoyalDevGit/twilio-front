import { FC, MouseEventHandler, useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import { DateTime } from 'luxon'
import Portal from '@mui/material/Portal'
import { useTranslation } from 'next-i18next'

import { getUserFullName } from 'utils/user/getUserFullName'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import {
  AvatarContainer,
  LastSeen,
  PopupChatContainer,
  PopupChatHeader,
  PopupChatIconsContainer,
  SelectedContactAvatar,
  SelectedContactName,
  SelectedContactNameBox,
} from 'components/Messaging/DesktopChatPopup/styles'
import { CloseBigIcon } from 'icons/Close'
import {
  MessagingChannel,
  MessagingChannelStatus,
} from 'interfaces/MessagingChannel'
import { User } from 'interfaces/User'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'
import { Chat } from 'components/Messaging/Chat'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { MessagingApi } from 'apis/MessagingApi'
import { MaximizeIcon } from 'icons/PopupChat/Maximize'
import { MinimizeIcon } from 'icons/PopupChat/Minimize'

export interface DesktopChatPopupProps {
  open: boolean
  onClose?: () => void
  channel?: MessagingChannel | null
}

export const DesktopChatPopup: FC<DesktopChatPopupProps> = ({
  open,
  channel: initialChannel,
  onClose,
}) => {
  const { t } = useTranslation(LocaleNamespace.MessagesPage)
  const user = useCurrentUserAsserted()
  const [channel, setChannel] = useState(initialChannel)
  const displayUser = channel?.participants.find(
    (p) => (p as User).id !== user.id
  ) as User | undefined

  let formattedSeenDate = ''

  if (displayUser) {
    formattedSeenDate = DateTime.fromISO(displayUser.lastSeen).toLocaleString(
      DateTime.DATETIME_MED
    )
  }

  const handleMinimize: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.stopPropagation()
    if (!channel) {
      return
    }
    if (channel.status === MessagingChannelStatus.Minimized) {
      return
    }
    const result = await MessagingApi.setChannelStatus(
      channel.id,
      MessagingChannelStatus.Minimized
    )
    if (!result.ok()) {
      return
    }

    const updatedChannel = await result.getData()
    setChannel(updatedChannel)
  }

  const handleClose: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation()
    if (!channel) {
      return
    }
    if (channel.status === MessagingChannelStatus.Closed) {
      return
    }
    MessagingApi.setChannelStatus(channel.id, MessagingChannelStatus.Closed)
    if (onClose) {
      onClose()
    }
  }

  const handleRestore = async () => {
    if (!channel) {
      return
    }
    if (channel.status === MessagingChannelStatus.Open) {
      return
    }
    const result = await MessagingApi.setChannelStatus(
      channel.id,
      MessagingChannelStatus.Open
    )
    if (!result.ok()) {
      return
    }

    const updatedChannel = await result.getData()
    setChannel(updatedChannel)
  }

  useEffect(() => {
    setChannel(initialChannel)
  }, [initialChannel])

  return (
    <Portal>
      <PopupChatContainer open={open} status={channel?.status}>
        {!!channel && (
          <>
            <PopupChatHeader>
              <AvatarContainer>
                <SelectedContactAvatar
                  src={
                    displayUser
                      ? getUserProfilePictureUrl(displayUser)
                      : undefined
                  }
                  firstName={displayUser?.firstName || ''}
                  lastName={displayUser?.lastName || ''}
                  width={40}
                  height={40}
                />
                <SelectedContactNameBox>
                  <SelectedContactName>
                    {displayUser ? getUserFullName(displayUser) : ''}
                  </SelectedContactName>
                  <LastSeen variant="body2">
                    {t('lastSeenLabel', {
                      lastSeen: formattedSeenDate,
                    })}
                  </LastSeen>
                </SelectedContactNameBox>
              </AvatarContainer>
              <PopupChatIconsContainer>
                {channel.status !== MessagingChannelStatus.Minimized ? (
                  <IconButton onClick={handleMinimize}>
                    <MinimizeIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleRestore}>
                    <MaximizeIcon />
                  </IconButton>
                )}
                <IconButton onClick={handleClose}>
                  <CloseBigIcon />
                </IconButton>
              </PopupChatIconsContainer>
            </PopupChatHeader>
            <Chat channel={channel} />
          </>
        )}
      </PopupChatContainer>
    </Portal>
  )
}
