import { FC, SVGProps } from 'react'

import AmexSmall from 'icons/PaymentCards/Amex/svg/amex_small.svg'
import AmexBig from 'icons/PaymentCards/Amex/svg/amex_big.svg'

export const AmexCardSmallIcon: FC<SVGProps<SVGElement>> = (props) => (
  <AmexSmall {...props} />
)

export const AmexCardBigIcon: FC<SVGProps<SVGElement>> = (props) => (
  <AmexBig {...props} />
)
