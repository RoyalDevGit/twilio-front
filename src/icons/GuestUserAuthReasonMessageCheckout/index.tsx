import { FC } from 'react'

import LightModeSvg from 'icons/GuestUserAuthReasonMessageCheckout/svg/light-mode.svg'
import DarkModeSvg from 'icons/GuestUserAuthReasonMessageCheckout/svg/dark-mode.svg'
import { Icon, IconProps } from 'icons'

export const GuestUserAuthReasonMessageCheckoutIcon: FC<IconProps> = (
  props
) => <Icon LightSvg={LightModeSvg} DarkSvg={DarkModeSvg} {...props} />
