import { FC } from 'react'

import LightKebabSvg from 'icons/KebabIcon/svg/kebabicon_light.svg'
import DarkKebabSvg from 'icons/KebabIcon/svg/kebabicon_dark.svg'
import { Icon, IconProps } from 'icons'

export const KebabIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightKebabSvg} DarkSvg={DarkKebabSvg} {...props} />
)
