import { FC } from 'react'

import LightSvg from 'icons/Navigation/Subscriptions/svg/subscriptions-icon-light.svg'
import DarkSvg from 'icons/Navigation/Subscriptions/svg/subscriptions-icon-dark.svg'
import { Icon, IconProps } from 'icons'

export const SubscriptionIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
