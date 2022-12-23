import { FC } from 'react'

import MiniProfileCardsSvg from 'icons/LoginAndSignupWallpaper/MiniProfileCards/svg/mini-profile-cards.svg'
import { Icon, IconProps } from 'icons'

export const MiniProfileCardsIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={MiniProfileCardsSvg} {...props} />
)
