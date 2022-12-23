import { DateTime } from 'luxon'

import { Session, SessionStatus } from 'interfaces/Session'
import { Config } from 'utils/config'
import { Order, OrderPaymentStatus } from 'interfaces/Order'

const SESSION_ALLOWED_EARLY_ARRIVAL_DURATION = Config.getDuration(
  'SESSION_ALLOWED_EARLY_ARRIVAL_DURATION'
)

type SessionNotJoinableReason =
  | 'ended'
  | 'cancelled'
  | 'past'
  | 'too_early'
  | 'no_payment'
  | 'failed_payment'

export interface SessionJoinableResult {
  joinable: boolean
  reason?: SessionNotJoinableReason
}

export const isSessionJoinable = (
  session: Session,
  order?: Order
): SessionJoinableResult => {
  const sessionOrder = order || session.order
  if (sessionOrder.paymentStatus === OrderPaymentStatus.FailedAuthorization) {
    return { joinable: false, reason: 'failed_payment' }
  }
  if (session.ended) {
    return { joinable: false, reason: 'ended' }
  }
  if (session.status === SessionStatus.Cancelled) {
    return { joinable: false, reason: 'cancelled' }
  }

  const startDate = DateTime.fromISO(session.startDate.date)
  const endDate = DateTime.fromISO(session.endDate.date)

  // if end date is in the past
  if (endDate.diffNow().milliseconds < 0) {
    return { joinable: false, reason: 'past' }
  }

  if (session.status === SessionStatus.Active) {
    return { joinable: true }
  }

  const secondsUntilStart = startDate.diffNow(['seconds']).seconds

  const isEarlyJoin =
    secondsUntilStart > SESSION_ALLOWED_EARLY_ARRIVAL_DURATION.as('seconds')
  if (isEarlyJoin) {
    return { joinable: false, reason: 'too_early' }
  }

  if (sessionOrder.paymentStatus !== OrderPaymentStatus.Authorized) {
    return { joinable: false, reason: 'no_payment' }
  }

  return {
    joinable: true,
  }
}
