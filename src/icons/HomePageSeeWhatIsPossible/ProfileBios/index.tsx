import { FC } from 'react'

import ProfileBiosDarkSvg from 'icons/HomePageSeeWhatIsPossible/ProfileBios/svg/profile-bios-dark.svg'
import ProfileBiosLightSvg from 'icons/HomePageSeeWhatIsPossible/ProfileBios/svg/profile-bios-light.svg'
import { Icon, IconProps } from 'icons'

export const HomepageProfileBiosIcon: FC<IconProps> = (props) => (
  <Icon
    DarkSvg={ProfileBiosDarkSvg}
    LightSvg={ProfileBiosLightSvg}
    {...props}
  />
)
