import { FC } from 'react'

import LightSvg from 'icons/Navigation/Explore/svg/explore-icon-light.svg'
import DarkSvg from 'icons/Navigation/Explore/svg/explore-icon-dark.svg'
import { Icon, IconProps } from 'icons'

export const ExploreIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
