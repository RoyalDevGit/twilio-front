import { FC } from 'react'

import SearchProfileSvg from 'icons/LoginAndSignupWallpaper/SearchProfile/svg/search-profile.svg'
import { Icon, IconProps } from 'icons'

export const SearchProfileIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={SearchProfileSvg} {...props} />
)
