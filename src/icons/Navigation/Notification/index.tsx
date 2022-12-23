import { FC } from 'react'

import LightSvg from 'icons/Navigation/Notification/svg/notifications-icon-light.svg'
import DarkSvg from 'icons/Navigation/Notification/svg/notifications-icon-dark.svg'
import { Icon, IconProps } from 'icons'

export const NotificationIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
