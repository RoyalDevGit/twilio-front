import { FC } from 'react'

import DarkSvg from 'icons/Navigation/Home/svg/home-icon-dark.svg'
import LightSvg from 'icons/Navigation/Home/svg/home-icon-light.svg'
import { Icon, IconProps } from 'icons'

export const HomeIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
