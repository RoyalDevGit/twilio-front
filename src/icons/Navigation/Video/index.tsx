import { FC } from 'react'

import LightSvg from 'icons/Navigation/Video/svg/video-icon-light.svg'
import DarkSvg from 'icons/Navigation/Video/svg/video-icon-dark.svg'
import { Icon, IconProps } from 'icons'

export const VideoIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
