import { FC } from 'react'

import SelectExpertDarkSvg from 'icons/HomePageSeeWhatIsPossible/SearchExpert/svg/search-expert-dark.svg'
import SelectExpertLightSvg from 'icons/HomePageSeeWhatIsPossible/SearchExpert/svg/search-expert-light.svg'
import { Icon, IconProps } from 'icons'

export const HomePageSearchExpert: FC<IconProps> = (props) => (
  <Icon
    DarkSvg={SelectExpertDarkSvg}
    LightSvg={SelectExpertLightSvg}
    {...props}
  />
)
