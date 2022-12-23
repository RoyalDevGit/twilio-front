import { ChimeSDKMeetings } from 'aws-sdk'

import { EventDate } from 'interfaces/Event'
import { Expert } from 'interfaces/Expert'
import { MessagingChannel } from 'interfaces/MessagingChannel'
import { Model, ModelRef } from 'interfaces/Model'
import { Order } from 'interfaces/Order'
import { User } from 'interfaces/User'
import { Video } from 'interfaces/Video'

export enum SessionStatus {
  NotStarted = 'not_started',
  Active = 'active',
  Ended = 'ended',
  Cancelled = 'cancelled',
}

export enum SessionAttendanceResult {
  NoneShowed = 'none_showed',
  NoShowExpert = 'no_show_expert',
  NoShowConsumer = 'no_show_consumer',
  AllPresent = 'all_present',
}

export interface Session extends Model {
  status: SessionStatus
  currentChimeMeeting?: ChimeSDKMeetings.Meeting
  chimeMeetings: ChimeSDKMeetings.Meeting[]
  chimeMediaCapturePipelines: AWS.Chime.MediaCapturePipeline[]
  currentMediaCapturePipeline?: AWS.Chime.MediaCapturePipeline
  order: Order
  consumer: ModelRef<User>
  expert: ModelRef<Expert>
  startDate: EventDate
  endDate: EventDate
  duration: number
  started?: string
  ended?: string
  totalMilliseconds?: number
  createdAt: string
  createdBy: ModelRef<User>
  recordings: ModelRef<Video>[]
  instant: boolean
  notes?: string
  messagingChannel: MessagingChannel
  attendanceResult?: SessionAttendanceResult
}

export interface SessionAttendee extends Model {
  session: Session
  user: User
  chimeAttendee?: ChimeSDKMeetings.Attendee
}
