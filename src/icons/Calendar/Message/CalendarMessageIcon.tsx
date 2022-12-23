import { FC, SVGProps } from 'react'

import MessageIconLight from 'icons/Calendar/Message/svg/messages-icon-light.svg'
import MessageIconDark from 'icons/Calendar/Message/svg/messages-icon-dark.svg'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

export const CalendarMessageIcon: FC<SVGProps<SVGElement>> = (props) => {
  const isDarkMode = usePrefersDarkMode()
  if (isDarkMode) {
    return <MessageIconDark {...props} />
  }
  return <MessageIconLight {...props} />
}
