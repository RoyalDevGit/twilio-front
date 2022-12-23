import { FC, SVGProps } from 'react'

import CircularArrowLightSvg from 'icons/CircularArrow/svg/circular-arrow-light.svg'
import CircularArrowDarkSvg from 'icons/CircularArrow/svg/circular-arrow-dark.svg'
import { LightOrDark } from 'components/LightOrDark'

export const CircularArrowIcon: FC<SVGProps<SVGElement>> = (props) => (
  <LightOrDark
    light={<CircularArrowLightSvg {...props} />}
    dark={<CircularArrowDarkSvg {...props} />}
  />
)
