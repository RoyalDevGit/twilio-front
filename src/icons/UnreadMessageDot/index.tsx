import { FC } from 'react'

import UnreadMessageDarkSvg from 'icons/UnreadMessageDot/svg/blue-dot-dark.svg'
import UnreadMessageLightSvg from 'icons/UnreadMessageDot/svg/blue-dot-light.svg'
import { Icon, IconProps } from 'icons'

export const UnreadMessageIcon: FC<IconProps> = (props) => (
  <Icon
    DarkSvg={UnreadMessageDarkSvg}
    LightSvg={UnreadMessageLightSvg}
    {...props}
  />
)
