import { FC } from 'react'

import LightSvg from 'icons/Navigation/Filter/svg/filter-icon-light.svg'
import DarkSvg from 'icons/Navigation/Filter/svg/filter-icon-dark.svg'
import { Icon, IconProps } from 'icons'

export const FilterIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
