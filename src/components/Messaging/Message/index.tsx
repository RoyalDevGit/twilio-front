import { FC, useState } from 'react'
import { DateTime } from 'luxon'
import { useMount } from 'react-use'
import Linkify from 'linkify-react'

import {
  ChatContactContainerBox,
  ChatContactAvatar,
  ChatContactBox,
  ChatContactName,
  ChatContactMessageBox,
  MessageText,
  ChatContactNameBox,
  ChatContactTime,
  MessageContainer,
} from 'components/Messaging/Message/styles'
import { ChannelMessage } from 'interfaces/ChannelMessage'
import { getStorageBucketFileUrl } from 'utils/url/getStorageBucketFileUrl'
import { MessagingApi } from 'apis/MessagingApi'
import { FileTracker } from 'interfaces/FileTracker'
import { Attachments } from 'components/Messaging/Message/Attachments'

export interface MessageProps {
  className?: string
  message: ChannelMessage
  onPreviewDisplay?: (filePreview: FileTracker, message: ChannelMessage) => void
}

export const Message: FC<MessageProps> = ({
  className,
  message,
  onPreviewDisplay,
}) => {
  const [attachments, setAttachments] = useState<FileTracker[]>([])

  const getAttachments = async () => {
    const metadataRequest = await MessagingApi.getMessageMetadata(message.id)
    if (metadataRequest.ok()) {
      const metadataResponse = await metadataRequest.getData()
      setAttachments(metadataResponse.attachments)
    }
  }

  useMount(() => {
    if (message.attachmentCount > 0) {
      getAttachments()
    }
  })

  const displayPreviewMedia = (filePreview: FileTracker) =>
    onPreviewDisplay && onPreviewDisplay(filePreview, message)

  return (
    <ChatContactContainerBox className={className}>
      <div>
        <ChatContactAvatar
          src={
            message.sender.profilePictureKey
              ? getStorageBucketFileUrl(message.sender.profilePictureKey)
              : undefined
          }
          firstName={message.sender.firstName}
          lastName={message.sender.lastName}
          width={40}
          height={40}
        />
      </div>
      <ChatContactBox>
        <ChatContactNameBox>
          <ChatContactName>{`${message.sender.firstName} ${message.sender.lastName}`}</ChatContactName>
          <ChatContactTime>
            {DateTime.fromISO(message.createdAt).toLocaleString(
              DateTime.TIME_SIMPLE
            )}
          </ChatContactTime>
        </ChatContactNameBox>
        <ChatContactMessageBox>
          <MessageContainer>
            {!message.attachmentsOnly && (
              <MessageText>
                <Linkify
                  tagName="span"
                  options={{
                    target: {
                      url: '_blank',
                    },
                  }}
                >
                  {message.content}
                </Linkify>
              </MessageText>
            )}
          </MessageContainer>
          {attachments.length > 0 && (
            <Attachments
              fileTrackers={attachments}
              onAttachmentClick={displayPreviewMedia}
            />
          )}
        </ChatContactMessageBox>
      </ChatContactBox>
    </ChatContactContainerBox>
  )
}
