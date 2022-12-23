import { FC, SVGProps } from 'react'

import VisaCardSmall from 'icons/PaymentCards/Visa/svg/visa_small.svg'
import VisaCardBig from 'icons/PaymentCards/Visa/svg/visa_big.svg'

export const VisaCardSmallIcon: FC<SVGProps<SVGElement>> = (props) => (
  <VisaCardSmall {...props} />
)
export const VisaCardBigIcon: FC<SVGProps<SVGElement>> = (props) => (
  <VisaCardBig {...props} />
)
