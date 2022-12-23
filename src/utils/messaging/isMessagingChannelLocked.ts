import { DateTime } from 'luxon'

import { MessagingChannel } from 'interfaces/MessagingChannel'
import { Config } from 'utils/config'

const POST_SESSION_MESSAGING_RESTRICTION_DURATION = Config.getDuration(
  'POST_SESSION_MESSAGING_RESTRICTION_DURATION'
)

const maxHours = POST_SESSION_MESSAGING_RESTRICTION_DURATION.as('hours')

export const isMessagingChannelLocked = (channel: MessagingChannel) => {
  if (!channel.session) {
    return false
  }

  const { session } = channel

  const endDate = DateTime.fromISO(session.endDate.date)

  const { hours: hoursElapsed } = DateTime.now().diff(endDate, ['hours'])

  return hoursElapsed >= maxHours
}
