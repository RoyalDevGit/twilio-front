import { FC, ReactElement } from 'react'
import { useHover } from 'react-use'

import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

export interface LightOrDarkProps {
  inverted?: boolean
  light?: ReactElement
  dark?: ReactElement
  lightHover?: ReactElement
  darkHover?: ReactElement
}

export const LightOrDark: FC<React.PropsWithChildren<LightOrDarkProps>> = ({
  inverted,
  light,
  dark,
  lightHover,
  darkHover,
}) => {
  const prefersDarkMode = usePrefersDarkMode({ inverted })

  const element = (hovered: boolean) => {
    if (hovered) {
      return prefersDarkMode
        ? darkHover || dark || lightHover || light || null
        : lightHover || light || darkHover || dark || null
    } else {
      return prefersDarkMode ? dark || light || null : light || dark || null
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [hoverable] = useHover(element)

  return hoverable
}
