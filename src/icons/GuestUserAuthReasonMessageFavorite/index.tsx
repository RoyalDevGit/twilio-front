import { FC } from 'react'

import LightModeSvg from 'icons/GuestUserAuthReasonMessageFavorite/svg/light-mode.svg'
import DarkModeSvg from 'icons/GuestUserAuthReasonMessageFavorite/svg/dark-mode.svg'
import { Icon, IconProps } from 'icons'

export const GuestUserAuthReasonMessageFavoriteIcon: FC<IconProps> = (
  props
) => <Icon LightSvg={LightModeSvg} DarkSvg={DarkModeSvg} {...props} />
