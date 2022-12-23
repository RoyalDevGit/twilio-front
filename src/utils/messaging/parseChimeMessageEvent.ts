import { ChannelMessage as ChimeChannelMessage } from '@aws-sdk/client-chime-sdk-messaging'
import MessageEvent from 'amazon-chime-sdk-js/build/message/Message'

export const parseChimeMessageEvent = (messageEvent: MessageEvent) => {
  const chimeMessage = JSON.parse(messageEvent.payload) as ChimeChannelMessage
  return chimeMessage
}
