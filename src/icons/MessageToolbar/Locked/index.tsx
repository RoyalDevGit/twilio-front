import { FC } from 'react'

import LockedIconDark from 'icons/MessageToolbar/Locked/svg/locked_dark.svg'
import LockedIconLight from 'icons/MessageToolbar/Locked/svg/locked_light.svg'
import { Icon, IconProps } from 'icons'

export const LockedIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={LockedIconDark} LightSvg={LockedIconLight} {...props} />
)
