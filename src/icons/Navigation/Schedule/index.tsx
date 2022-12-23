import { FC } from 'react'

import DarkSvg from 'icons/Navigation/Schedule/svg/schedule-icon-dark.svg'
import LightSvg from 'icons/Navigation/Schedule/svg/schedule-icon-light.svg'
import { Icon, IconProps } from 'icons'

export const ScheduleIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
