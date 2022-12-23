import { FC } from 'react'

import BlueDotIconSvg from 'icons/MessageDot/svg/blue-dot.svg'
import { Icon, IconProps } from 'icons'

export const BlueDotIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={BlueDotIconSvg} {...props} />
)
