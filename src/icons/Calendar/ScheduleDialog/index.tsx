import { FC } from 'react'

import CalendarDark from 'icons/Calendar/ScheduleDialog/svg/calendar-modal-icon.svg'
import CalendarLight from 'icons/Calendar/Standard/svg/calendar-icon.svg'
import { Icon, IconProps } from 'icons'

export const ScheduleDialogCalendarIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={CalendarDark} LightSvg={CalendarLight} {...props} />
)
