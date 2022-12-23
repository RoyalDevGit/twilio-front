import { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import groupBy from 'lodash/groupBy'
import { DateTime } from 'luxon'

import {
  ChatDate,
  ChatMessageByDateContainer,
  ChatMessagesSection,
  ChatMessagingExpiring,
  ChatMessagingExpiringIconBox,
  ExpiringLabel,
  NewMessagesContainer,
  NewMessagesLabel,
  NewMessagesPlaceholder,
} from 'components/Messaging/MessageList/styles'
import { Message } from 'components/Messaging/Message'
import { MessageBubbleSmallIcon } from 'icons/MessageBubble'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { ChannelMessage } from 'interfaces/ChannelMessage'
import { MessagingChannel } from 'interfaces/MessagingChannel'
import { User } from 'interfaces/User'
import { PreviewBoxDialog } from 'components/Dialogs/PreviewBoxDialog'
import { FileTracker } from 'interfaces/FileTracker'
import { RestoreIcon } from 'icons/Restore'
import { isMessagingChannelLocked } from 'utils/messaging/isMessagingChannelLocked'

interface ChatMessageByDateSectionProps {
  date: string
  messages: ChannelMessage[]
  className?: string
  onShowPreview?: (filePreview: FileTracker, message: ChannelMessage) => void
}

const ChatMessageByDateSection: FC<ChatMessageByDateSectionProps> = ({
  className,
  date,
  messages,
  onShowPreview,
}) => (
  <ChatMessageByDateContainer>
    <ChatDate>{date}</ChatDate>
    {messages.map((message) => (
      <Message
        key={message.id}
        className={className}
        message={message}
        onPreviewDisplay={onShowPreview}
      />
    ))}
  </ChatMessageByDateContainer>
)

export interface MessageListProps {
  className?: string
  messages: ChannelMessage[]
  channel: MessagingChannel
}

export const MessageList: FC<MessageListProps> = ({ messages, channel }) => {
  const [fileToPreview, setFileToPreview] = useState<FileTracker | null>(null)
  const [messageToPreview, setMessageToPreview] =
    useState<ChannelMessage | null>(null)
  const [openPreview, setOpenPreview] = useState(false)
  const { t } = useTranslation(LocaleNamespace.MessagesPage)
  const user = useCurrentUserAsserted()

  const messagesByDate = groupBy(messages, (message) =>
    DateTime.fromISO(message.createdAt).toLocaleString(DateTime.DATE_FULL)
  )

  const displayUser = channel.participants.find(
    (p) => (p as User).id !== user.id
  ) as User | undefined

  const showPreview = (filePreview: FileTracker, message: ChannelMessage) => {
    setFileToPreview(filePreview)
    setMessageToPreview(message)
    setOpenPreview(true)
  }

  const handlePreviewClose = () => {
    setOpenPreview(false)
  }

  const NewMessagesScreen = (
    <NewMessagesContainer>
      <MessageBubbleSmallIcon />
      <NewMessagesPlaceholder>
        {t('popupChatNewMessagePlaceholder', {
          contactName: displayUser?.firstName,
        })}
      </NewMessagesPlaceholder>
      <NewMessagesLabel>{t('popupChatNewMessageLabel')}</NewMessagesLabel>
    </NewMessagesContainer>
  )

  const isLocked = isMessagingChannelLocked(channel)

  return (
    <ChatMessagesSection>
      {!isLocked && !!messages.length && (
        <ChatMessagingExpiring>
          <ChatMessagingExpiringIconBox>
            <RestoreIcon />
          </ChatMessagingExpiringIconBox>
          <ExpiringLabel>{t('chatMessagingExpiring')}</ExpiringLabel>
        </ChatMessagingExpiring>
      )}
      {!messages.length
        ? NewMessagesScreen
        : Object.entries(messagesByDate).map(([date, messages]) => (
            <ChatMessageByDateSection
              key={date}
              date={date}
              messages={messages}
              onShowPreview={showPreview}
            />
          ))}
      <PreviewBoxDialog
        open={openPreview}
        onClose={handlePreviewClose}
        filePreview={fileToPreview}
        message={messageToPreview}
      />
    </ChatMessagesSection>
  )
}
