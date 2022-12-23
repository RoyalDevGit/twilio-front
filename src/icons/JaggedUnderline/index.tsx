import { FC } from 'react'

import LightSvg from 'icons/JaggedUnderline/svg/jagged_underline_light.svg'
import DarkSvg from 'icons/JaggedUnderline/svg/jagged_underline_dark.svg'
import { Icon, IconProps } from 'icons'

export const JaggedUnderlineIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={DarkSvg} LightSvg={LightSvg} {...props} />
)
