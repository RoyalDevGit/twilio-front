import { FC } from 'react'

import CloseBigLightSvg from 'icons/Close/svg/closebigicon_light.svg'
import CloseLightSvg from 'icons/Close/svg/closeicon_light.svg'
import CloseDarkSvg from 'icons/Close/svg/closeicon_dark.svg'
import CloseBigDarkSvg from 'icons/Close/svg/closebigicon_dark.svg'
import { Icon, IconProps } from 'icons'

export const CloseCircleIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={CloseLightSvg} DarkSvg={CloseDarkSvg} {...props} />
)

export const CloseBigIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={CloseBigLightSvg} DarkSvg={CloseBigDarkSvg} {...props} />
)
