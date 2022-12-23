import { FC } from 'react'

import LightSvg from 'icons/SessionTimePickers/RightCaret/svg/arrow_right_light.svg'
import DarkSvg from 'icons/SessionTimePickers/RightCaret/svg/arrow_right_dark.svg'
import { Icon, IconProps } from 'icons'

export const RightCaretIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
