import { FC } from 'react'

import MinimalCalendarDarkSvg from 'icons/Calendar/MinimalCalendar/svg/minimal_calendar_dark.svg'
import MinimalCalendarLightSvg from 'icons/Calendar/MinimalCalendar/svg/minimal_calendar_light.svg'
import { Icon, IconProps } from 'icons'

export const MinimalCalendar: FC<IconProps> = (props) => (
  <Icon
    DarkSvg={MinimalCalendarDarkSvg}
    LightSvg={MinimalCalendarLightSvg}
    {...props}
  />
)
