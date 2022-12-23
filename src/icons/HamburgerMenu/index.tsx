import { FC } from 'react'

import DarkHamburgerSvg from 'icons/HamburgerMenu/svg/hamburger-menu-icon-dark.svg'
import LightHamburgerSvg from 'icons/HamburgerMenu/svg/hamburger-menu-icon-light.svg'
import { Icon, IconProps } from 'icons'

export const HamburgerMenuIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightHamburgerSvg} DarkSvg={DarkHamburgerSvg} {...props} />
)
