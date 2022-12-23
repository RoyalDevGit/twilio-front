import { FC } from 'react'

import FavoriteIconFilledSvgDark from 'icons/FavoriteButtonHeart/Filled/svg/dark/favoriteicon_filled.svg'
import FavoriteIconFilledSvgLight from 'icons/FavoriteButtonHeart/Filled/svg/light/favoriteicon_filled.svg'
import { Icon, IconProps } from 'icons'

export const FavoriteButtonHeartIconFilled: FC<IconProps> = (props) => (
  <Icon
    LightSvg={FavoriteIconFilledSvgLight}
    DarkSvg={FavoriteIconFilledSvgDark}
    {...props}
  />
)
