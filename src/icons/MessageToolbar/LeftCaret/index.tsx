import { FC } from 'react'

import LightSvg from 'icons/MessageToolbar/LeftCaret/svg/arrow_left_light.svg'
import DarkSvg from 'icons/MessageToolbar/LeftCaret/svg/arrow_left_dark.svg'
import { Icon, IconProps } from 'icons'

export const LeftCaretIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
