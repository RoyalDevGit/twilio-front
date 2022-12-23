import { FC } from 'react'

import CardIconSvg from 'icons/Card/svg/card-icon.svg'
import { Icon, IconProps } from 'icons'

export const CardIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={CardIconSvg} {...props} />
)
