import { FC } from 'react'

import LightSvg from 'icons/NotificationKebabMenu/svg/notification-kebab-menu-light.svg'
import DarkSvg from 'icons/NotificationKebabMenu/svg/notification-kebab-menu-dark.svg'
import { Icon, IconProps } from 'icons'

export const NotificationKebabMenuIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
