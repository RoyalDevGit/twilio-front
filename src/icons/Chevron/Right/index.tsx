import { FC, SVGProps } from 'react'

import LightIcon from 'icons/Chevron/Right/svg/right-caret-light.svg'
import DarkIcon from 'icons/Chevron/Right/svg/right-caret-dark.svg'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

export const ChevronRightIcon: FC<SVGProps<SVGElement>> = (props) => {
  const isDarkMode = usePrefersDarkMode()
  if (isDarkMode) {
    return <DarkIcon {...props} />
  }
  return <LightIcon {...props} />
}
