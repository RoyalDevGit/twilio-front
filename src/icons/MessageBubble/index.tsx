import { FC, SVGProps } from 'react'

import MessageBubbleSmallLightSvg from 'icons/MessageBubble/svg/message-bubble-small-light.svg'
import MessageBubbleLightSvg from 'icons/MessageBubble/svg/message-bubble-light.svg'
import MessageBubbleDarkSvg from 'icons/MessageBubble/svg/message-bubble-dark.svg'
import MessageBubbleSmallDarkSvg from 'icons/MessageBubble/svg/message-bubble-small-dark.svg'
import { LightOrDark } from 'components/LightOrDark'

export const MessageBubbleIcon: FC<SVGProps<SVGElement>> = (props) => (
  <LightOrDark
    light={<MessageBubbleLightSvg {...props} />}
    dark={<MessageBubbleDarkSvg {...props} />}
  />
)

export const MessageBubbleSmallIcon: FC<SVGProps<SVGElement>> = (props) => (
  <LightOrDark
    light={<MessageBubbleSmallLightSvg {...props} />}
    dark={<MessageBubbleSmallDarkSvg {...props} />}
  />
)
