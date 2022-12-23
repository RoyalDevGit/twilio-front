import { FC, SVGProps } from 'react'

import CaretLightSvg from 'icons/Caret/Down/svg/caret-icon-light.svg'
import CaretDarkSvg from 'icons/Caret/Down/svg/caret-icon-dark.svg'
import { LightOrDark } from 'components/LightOrDark'

export const DownCaretIcon: FC<SVGProps<SVGElement>> = (props) => (
  <LightOrDark
    light={<CaretLightSvg {...props} />}
    dark={<CaretDarkSvg {...props} />}
  />
)
