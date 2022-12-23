import { FC } from 'react'

import ProfileBiosSvg from 'icons/LoginAndSignupWallpaper/ProfileBios/svg/profile-bios.svg'
import { Icon, IconProps } from 'icons'

export const ProfileBiosIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={ProfileBiosSvg} {...props} />
)
