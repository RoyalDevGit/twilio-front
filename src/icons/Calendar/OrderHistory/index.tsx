import { FC } from 'react'

import CalendarDark from 'icons/Calendar/OrderHistory/svg/order-history-calendar-icon-dark.svg'
import CalendarLight from 'icons/Calendar/OrderHistory/svg/order-history-calendar-icon-light.svg'
import { Icon, IconProps } from 'icons'

export const CalendarOrderHistoryIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={CalendarDark} LightSvg={CalendarLight} {...props} />
)
