import { FC, SVGProps } from 'react'

import MasterCardSmall from 'icons/PaymentCards/MasterCard/svg/mastercard_small.svg'
import MasterCardBig from 'icons/PaymentCards/MasterCard/svg/mastercard_big.svg'

export const MasterCardSmallIcon: FC<SVGProps<SVGElement>> = (props) => (
  <MasterCardSmall {...props} />
)
export const MasterCardBigIcon: FC<SVGProps<SVGElement>> = (props) => (
  <MasterCardBig {...props} />
)
