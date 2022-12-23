import { FC } from 'react'

import PlusLightSvg from 'icons/CirclePlus/svg/plus_icon_light.svg'
import PlusDarkSvg from 'icons/CirclePlus/svg/plus_icon_dark.svg'
import { Icon, IconProps } from 'icons'

export const CirclePlusIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={PlusLightSvg} DarkSvg={PlusDarkSvg} {...props} />
)
