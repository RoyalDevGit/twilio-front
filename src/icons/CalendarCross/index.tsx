import { FC } from 'react'

import CalendarCrossLight from 'icons/CalendarCross/svg/calendar-cross-light.svg'
import CalendarCrossDark from 'icons/CalendarCross/svg/calendar-cross-dark.svg'
import { Icon, IconProps } from 'icons'

export const CalendarCross: FC<IconProps> = (props) => (
  <Icon LightSvg={CalendarCrossLight} DarkSvg={CalendarCrossDark} {...props} />
)
