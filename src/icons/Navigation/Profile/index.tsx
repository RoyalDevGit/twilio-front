import { FC } from 'react'

import DarkSvg from 'icons/Navigation/Profile/svg/profile-icon-dark.svg'
import LightSvg from 'icons/Navigation/Profile/svg/profile-icon-light.svg'
import { Icon, IconProps } from 'icons'

export const ProfileIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
