import { FC } from 'react'

import PinPointLightSvg from 'icons/PinPoint/svg/pinpoint_light.svg'
import PinPointDarkSvg from 'icons/PinPoint/svg/pinpoint_dark.svg'
import { Icon, IconProps } from 'icons'

export const PinPointIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={PinPointLightSvg} DarkSvg={PinPointDarkSvg} {...props} />
)
