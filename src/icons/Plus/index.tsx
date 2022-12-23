import { FC } from 'react'

import PlusLightSvg from 'icons/Plus/svg/plus_icon_light.svg'
import PlusDarkSvg from 'icons/Plus/svg/plus_icon_dark.svg'
import { Icon, IconProps } from 'icons'

export const PlusIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={PlusLightSvg} DarkSvg={PlusDarkSvg} {...props} />
)
