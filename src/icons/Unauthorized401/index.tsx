import { FC } from 'react'

import LightSvg from 'icons/Unauthorized401/svg/unauthorized-401-light.svg'
import DarkSvg from 'icons/Unauthorized401/svg/unauthorized-401-dark.svg'
import { Icon, IconProps } from 'icons'

export const Unauthorized401Icon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
