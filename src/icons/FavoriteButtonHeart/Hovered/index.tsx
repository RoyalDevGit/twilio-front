import { FC } from 'react'

import FavoriteIconHoverLight from 'icons/FavoriteButtonHeart/Hovered/svg/light/favoriteicon_hover.svg'
import FavoriteIconHoverDark from 'icons/FavoriteButtonHeart/Hovered/svg/dark/favoriteicon_hover.svg'
import { Icon, IconProps } from 'icons'

export const FavoriteButtonHeartIconHovered: FC<IconProps> = (props) => (
  <Icon
    LightSvg={FavoriteIconHoverLight}
    DarkSvg={FavoriteIconHoverDark}
    {...props}
  />
)
