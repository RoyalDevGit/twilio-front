import { FC } from 'react'

import CalendarDark from 'icons/Calendar/DottedCalendar/svg/dotted_calendar_dark.svg'
import CalendarLight from 'icons/Calendar/DottedCalendar/svg/dotted_calendar_light.svg'
import { Icon, IconProps } from 'icons'

export const CalendarDottedIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={CalendarDark} LightSvg={CalendarLight} {...props} />
)
