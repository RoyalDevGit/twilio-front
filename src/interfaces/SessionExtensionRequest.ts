import { Model } from 'interfaces/Model'
import { Session } from 'interfaces/Session'
import { User } from 'interfaces/User'

export enum SessionExtensionRequestStatus {
  Requested = 'requested',
  Withdrawn = 'withdrawn',
  Declined = 'declined',
  Accepted = 'accepted',
  Complete = 'complete',
}

export interface SessionExtensionRequest extends Model {
  session: Session
  status: SessionExtensionRequestStatus
  maxDuration?: number
  duration?: number
  requester: User
  replier?: User
}
