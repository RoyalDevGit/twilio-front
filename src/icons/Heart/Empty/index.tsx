import { FC } from 'react'

import FavoriteIconLight from 'icons/Heart/Empty/svg/light/favoriteicon.svg'
import FavoriteIconDark from 'icons/Heart/Empty/svg/dark/favoriteicon.svg'
import FavoriteIconHoverLight from 'icons/Heart/Empty/svg/light/favoriteicon_hover.svg'
import FavoriteIconHoverDark from 'icons/Heart/Empty/svg/dark/favoriteicon_hover.svg'
import { Icon, IconProps } from 'icons'

export const HeartIconEmpty: FC<IconProps> = (props) => (
  <Icon
    LightSvg={FavoriteIconLight}
    LightHoverSvg={FavoriteIconHoverLight}
    DarkSvg={FavoriteIconDark}
    DarkHoverSvg={FavoriteIconHoverDark}
    {...props}
  />
)
