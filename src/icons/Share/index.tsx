import { FC } from 'react'

import DarkSvg from 'icons/Share/svg/shareicon_dark.svg'
import DarkHoverSvg from 'icons/Share/svg/shareicon_dark_hover.svg'
import LightSvg from 'icons/Share/svg/shareicon_light.svg'
import LightHoverSvg from 'icons/Share/svg/shareicon_light_hover.svg'
import { Icon, IconProps } from 'icons'

export const ShareIcon: FC<IconProps> = (props) => (
  <Icon
    LightSvg={LightSvg}
    DarkSvg={DarkSvg}
    DarkHoverSvg={DarkHoverSvg}
    LightHoverSvg={LightHoverSvg}
    {...props}
  />
)
