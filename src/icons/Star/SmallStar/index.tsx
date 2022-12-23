import { FC } from 'react'

import DarkSvg from 'icons/Star/SmallStar/svg/dark/star_icon.svg'
import LightSvg from 'icons/Star/SmallStar/svg/light/star_icon.svg'
import { Icon, IconProps } from 'icons'

export const StarIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
