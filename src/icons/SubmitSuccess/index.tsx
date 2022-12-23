import { FC, SVGProps } from 'react'

import LightSvg from 'icons/SubmitSuccess/svg/submit-success-light.svg'
import DarkSvg from 'icons/SubmitSuccess/svg/submit-success-dark.svg'
import { LightOrDark } from 'components/LightOrDark'

export const SubmitSuccessIcon: FC<SVGProps<SVGElement>> = (props) => (
  <LightOrDark light={<LightSvg {...props} />} dark={<DarkSvg {...props} />} />
)
