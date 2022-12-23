import { FC } from 'react'

import BrowseProfileIconDark from 'icons/HomePageSeeWhatIsPossible/BrowseProfiles/svg/browse-profile-dark.svg'
import BrowseProfileIconLight from 'icons/HomePageSeeWhatIsPossible/BrowseProfiles/svg/browse-profile-light.svg'
import { Icon, IconProps } from 'icons'

export const HomePageSearchProfileIcon: FC<IconProps> = (props) => (
  <Icon
    DarkSvg={BrowseProfileIconDark}
    LightSvg={BrowseProfileIconLight}
    {...props}
  />
)
