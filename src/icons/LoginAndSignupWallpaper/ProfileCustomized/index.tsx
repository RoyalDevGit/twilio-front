import { FC } from 'react'

import ProfileCustomizedSvg from 'icons/LoginAndSignupWallpaper/ProfileCustomized/svg/profile-customized.svg'
import { Icon, IconProps } from 'icons'

export const ProfileCustomizedIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={ProfileCustomizedSvg} {...props} />
)
