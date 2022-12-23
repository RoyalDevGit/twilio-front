import { FC } from 'react'

import DarkSvg from 'icons/Navigation/ActiveIndicator/svg/active_icon_dark.svg'
import LightSvg from 'icons/Navigation/ActiveIndicator/svg/active_icon_light.svg'
import { Icon, IconProps } from 'icons'

export const ActiveNavigationIndicatorIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
