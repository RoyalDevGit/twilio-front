import { FC } from 'react'

import ClockDark from 'icons/Clock/ScheduleDialog/svg/clock-modal-icon.svg'
import ClockLight from 'icons/Clock/svg/clock-icon.svg'
import { Icon, IconProps } from 'icons'

export const ScheduleDialogClockIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={ClockDark} LightSvg={ClockLight} {...props} />
)
