import { FC } from 'react'

import CloseLightSvg from 'icons/Close/small/svg/closeicon_light.svg'
import CloseDarkSvg from 'icons/Close/small/svg/closeicon_dark.svg'
import { Icon, IconProps } from 'icons'

export const SmallCloseIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={CloseLightSvg} DarkSvg={CloseDarkSvg} {...props} />
)
