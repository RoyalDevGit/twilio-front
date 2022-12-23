import { FC } from 'react'

import MaximizeLightSvg from 'icons/PopupChat/Maximize/svg/maximize-icon-light.svg'
import MaximizeDarkSvg from 'icons/PopupChat/Maximize/svg/maximize-icon-dark.svg'
import { Icon, IconProps } from 'icons'

export const MaximizeIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={MaximizeLightSvg} DarkSvg={MaximizeDarkSvg} {...props} />
)
