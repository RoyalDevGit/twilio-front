import { Model } from 'interfaces/Model'

export interface ChannelMessageSenderInfo {
  id: string
  firstName: string
  lastName: string
  profilePictureKey?: string
}

export interface ChannelMessageEmbeddedMetadata extends Model {
  sender: ChannelMessageSenderInfo
  attachmentCount: number
  attachmentsOnly: boolean
}

export interface ChannelMessage extends Model {
  id: string
  metadataId?: string
  content: string
  sender: ChannelMessageSenderInfo
  attachmentCount: number
  attachmentsOnly: boolean
  createdAt: string
  updatedAt: string
  chimeChatChannelArn: string
}
