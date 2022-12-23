import { FC } from 'react'

import FavoriteIconFilledSvgDark from 'icons/Heart/Filled/svg/dark/favoriteicon_filled.svg'
import FavoriteIconFilledSvgLight from 'icons/Heart/Filled/svg/light/favoriteicon_filled.svg'
import { Icon, IconProps } from 'icons'

export const HeartIconFilled: FC<IconProps> = (props) => (
  <Icon
    LightSvg={FavoriteIconFilledSvgLight}
    DarkSvg={FavoriteIconFilledSvgDark}
    {...props}
  />
)
