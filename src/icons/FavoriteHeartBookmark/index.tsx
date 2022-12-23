import { FC } from 'react'

import FavoriteIconSvg from 'icons/FavoriteHeartBookmark/svg/favorite_bookmark.svg'
import { Icon, IconProps } from 'icons'

export const FavoriteHeartBookmarkIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={FavoriteIconSvg} {...props} />
)
