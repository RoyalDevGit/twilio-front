import { FC } from 'react'

import ClipIconDark from 'icons/MessageToolbar/Clip/svg/clip_dark.svg'
import ClipIconLight from 'icons/MessageToolbar/Clip/svg/clip_light.svg'
import { Icon, IconProps } from 'icons'

export const ClipIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={ClipIconDark} LightSvg={ClipIconLight} {...props} />
)
