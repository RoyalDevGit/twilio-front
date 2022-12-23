import { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import { useRecoilState } from 'recoil'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  MessageTrayMenu,
  MessageTrayBox,
  MessageTrayTitle,
  MessageTrayLabel,
  MessageTrayContactContainer,
  MessageTrayEmptyState,
  MessageTrayEmptyStateLabel,
} from 'components/Messaging/MessageTray/styles'
import { Link } from 'components/Link'
import { MessagesIcon } from 'icons/Navigation/Messages'
import { MessagingChannelSelector } from 'components/Messaging/MessagingChannelSelector'
import { useMessagingChannels } from 'hooks/useMessagingChannels'
import {
  MessagingChannel,
  MessagingChannelStatus,
} from 'interfaces/MessagingChannel'
import { useOpenChats } from 'hooks/useOpenChats'
import { selectedChatState } from 'state/selectedChatState'
import { MessagingApi } from 'apis/MessagingApi'

export const MessageTray: FC = () => {
  const { t } = useTranslation(LocaleNamespace.MessagesPage)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { channels } = useMessagingChannels()
  const { openChats } = useOpenChats()
  const [selectedChannel, setSelectedChannel] =
    useRecoilState(selectedChatState)

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const selectChannel = async (channel: MessagingChannel) => {
    if (selectedChannel) {
      MessagingApi.setChannelStatus(
        selectedChannel.id,
        MessagingChannelStatus.Closed
      )
    }
    const result = await MessagingApi.setChannelStatus(
      channel.id,
      MessagingChannelStatus.Open
    )
    if (!result.ok()) {
      return
    }

    const updatedChannel = await result.getData()
    handleClose()
    setSelectedChannel(updatedChannel)
  }

  const InboxEmptyState = (
    <MessageTrayEmptyState>
      <MessageTrayEmptyStateLabel>
        {t('inboxEmptyStateLabel')}
      </MessageTrayEmptyStateLabel>
    </MessageTrayEmptyState>
  )

  let totalUnread = 0
  channels.forEach((channel) => {
    if (openChats.find((c) => c.id === channel.id)) {
      return
    }

    const channelUnreadCount = channel.unreadCount || 0
    totalUnread = totalUnread + channelUnreadCount
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
        <Badge color="secondary" badgeContent={totalUnread}>
          <MessagesIcon />
        </Badge>
      </IconButton>
      <MessageTrayMenu
        id="basic-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {!channels.length ? (
          InboxEmptyState
        ) : (
          <span>
            <MessageTrayBox>
              <MessageTrayTitle>{t('messageTrayTitle')}</MessageTrayTitle>
              <Link href="/messages" id="header-messages-button">
                <MessageTrayLabel>{t('messageTrayLabel')}</MessageTrayLabel>
              </Link>
            </MessageTrayBox>
            <MessageTrayContactContainer>
              {channels.map((channel) => (
                <MessagingChannelSelector
                  key={channel.id}
                  channel={channel}
                  onSelect={selectChannel}
                  selected={channel === selectedChannel}
                />
              ))}
            </MessageTrayContactContainer>
          </span>
        )}
      </MessageTrayMenu>
    </>
  )
}
