import { FC } from 'react'

import LightSvg from 'icons/Navigation/Favorites/svg/heart-icon-light.svg'
import DarkSvg from 'icons/Navigation/Favorites/svg/heart-icon-dark.svg'
import { Icon, IconProps } from 'icons'

export const FavoritesIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
