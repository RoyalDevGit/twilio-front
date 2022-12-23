import { FC, SVGProps } from 'react'

import JcbCardSmall from 'icons/PaymentCards/Jcb/svg/jcb_small.svg'
import JcbCardBig from 'icons/PaymentCards/Jcb/svg/jcb_big.svg'

export const JcbCardSmallIcon: FC<SVGProps<SVGElement>> = (props) => (
  <JcbCardSmall {...props} />
)
export const JcbCardBigIcon: FC<SVGProps<SVGElement>> = (props) => (
  <JcbCardBig {...props} />
)
