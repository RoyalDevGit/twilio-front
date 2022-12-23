import { FC } from 'react'

import FavoriteIconLight from 'icons/FavoriteButtonHeart/Empty/svg/light/favoriteicon.svg'
import FavoriteIconDark from 'icons/FavoriteButtonHeart/Empty/svg/dark/favoriteicon.svg'
import { Icon, IconProps } from 'icons'

export const FavoriteButtonHeartIconEmpty: FC<IconProps> = (props) => (
  <Icon LightSvg={FavoriteIconLight} DarkSvg={FavoriteIconDark} {...props} />
)
