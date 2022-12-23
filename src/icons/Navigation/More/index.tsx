import { FC } from 'react'

import DarkSvg from 'icons/Navigation/More/svg/hamburger-menu-icon-dark.svg'
import LightSvg from 'icons/Navigation/More/svg/hamburger-menu-icon-light.svg'
import { Icon, IconProps } from 'icons'

export const MoreIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
