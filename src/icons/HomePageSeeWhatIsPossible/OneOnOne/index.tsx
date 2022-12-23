import { FC } from 'react'

import OneOnOneDarkIcon from 'icons/HomePageSeeWhatIsPossible/OneOnOne/svg/one-on-one-dark.svg'
import OneOnOneLightIcon from 'icons/HomePageSeeWhatIsPossible/OneOnOne/svg/one-on-one-light.svg'
import { Icon, IconProps } from 'icons'

export const HomePageOneOnOneIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={OneOnOneDarkIcon} LightSvg={OneOnOneLightIcon} {...props} />
)
