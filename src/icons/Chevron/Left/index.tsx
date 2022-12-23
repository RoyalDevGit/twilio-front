import { FC, SVGProps } from 'react'

import LightIcon from 'icons/Chevron/Left/svg/left-caret-light.svg'
import DarkIcon from 'icons/Chevron/Left/svg/left-caret-dark.svg'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

export const ChevronLeftIcon: FC<SVGProps<SVGElement>> = (props) => {
  const isDarkMode = usePrefersDarkMode()
  if (isDarkMode) {
    return <DarkIcon {...props} />
  }
  return <LightIcon {...props} />
}
