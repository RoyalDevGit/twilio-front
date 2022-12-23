import { FC } from 'react'

import DarkSvg from 'icons/ExploreEmptyStateMagnifier/svg/magnifier-dark.svg'
import LightSvg from 'icons/ExploreEmptyStateMagnifier/svg/magnifier-light.svg'
import { Icon, IconProps } from 'icons'

export const ExploreEmptyStateMagnifierIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={DarkSvg} LightSvg={LightSvg} {...props} />
)
