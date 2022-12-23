import { FC } from 'react'

import LightSvg from 'icons/NotificationKebabMenu/svg/notification-mobile-menu-light.svg'
import DarkSvg from 'icons/NotificationKebabMenu/svg/notification-mobile-menu-dark.svg'
import { Icon, IconProps } from 'icons'

export const NotificationMobileMenuIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
