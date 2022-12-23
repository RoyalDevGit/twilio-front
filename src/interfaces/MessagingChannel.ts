import { ChannelMessage } from 'interfaces/ChannelMessage'
import { FileTracker } from 'interfaces/FileTracker'
import { Model, ModelRef } from 'interfaces/Model'
import { Session } from 'interfaces/Session'
import { User } from 'interfaces/User'

export enum MessagingChannelStatus {
  Open = 'open',
  Minimized = 'minimized',
  Closed = 'closed',
  Deleted = 'deleted',
}

export interface MessagingChannel extends Model {
  chimeChatChannelArn: string
  participants: ModelRef<User>[]
  unreadCount: number
  status: MessagingChannelStatus
  lastMessage?: ChannelMessage
  session?: Session
}

export interface ChannelMessageMetadata extends Model {
  channel: ModelRef<MessagingChannel>
  chimeMessageId?: string
  attachments: FileTracker[]
  sender: User
}
