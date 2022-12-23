import { FC } from 'react'

import FilterMiniIconSvg from 'icons/LoginAndSignupWallpaper/FilterMini/svg/filter-mini.svg'
import { Icon, IconProps } from 'icons'

export const FilterMiniIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={FilterMiniIconSvg} {...props} />
)
