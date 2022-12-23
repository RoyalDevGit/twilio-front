import { FC } from 'react'

import MinimizeLightSvg from 'icons/PopupChat/Minimize/svg/minimize-icon-light.svg'
import MinimizeDarkSvg from 'icons/PopupChat/Minimize/svg/minimize-icon-dark.svg'
import { Icon, IconProps } from 'icons'

export const MinimizeIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={MinimizeLightSvg} DarkSvg={MinimizeDarkSvg} {...props} />
)
