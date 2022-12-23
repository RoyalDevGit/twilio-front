import { ChannelMessage as ChimeChannelMessage } from '@aws-sdk/client-chime-sdk-messaging'

import {
  ChannelMessage,
  ChannelMessageEmbeddedMetadata,
} from 'interfaces/ChannelMessage'

export const convertChimeMessageToChannelMessage = (
  chimeMessage: ChimeChannelMessage
): ChannelMessage => {
  const metadata = JSON.parse(
    chimeMessage.Metadata || '{}'
  ) as ChannelMessageEmbeddedMetadata
  return {
    id: chimeMessage.MessageId as string,
    metadataId: metadata.id,
    attachmentCount: metadata.attachmentCount,
    attachmentsOnly: metadata.attachmentsOnly,
    sender: metadata.sender,
    content: chimeMessage.Content as string,
    createdAt: chimeMessage.CreatedTimestamp as unknown as string,
    updatedAt: chimeMessage.LastUpdatedTimestamp as unknown as string,
    chimeChatChannelArn: chimeMessage.ChannelArn as string,
  }
}
