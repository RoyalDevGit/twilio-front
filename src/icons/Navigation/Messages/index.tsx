import { FC } from 'react'

import LightSvg from 'icons/Navigation/Messages/svg/messages-icon-light.svg'
import DarkSvg from 'icons/Navigation/Messages/svg/messages-icon-dark.svg'
import { Icon, IconProps } from 'icons'

export const MessagesIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
