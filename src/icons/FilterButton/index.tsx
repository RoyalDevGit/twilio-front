import { FC } from 'react'

import LightSvg from 'icons/FilterButton/svg/filter-icon-light.svg'
import DarkSvg from 'icons/FilterButton/svg/filter-icon-dark.svg'
import { Icon, IconProps } from 'icons'

export const FilterButtonIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
