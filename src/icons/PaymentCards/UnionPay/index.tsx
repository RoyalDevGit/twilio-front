import { FC, SVGProps } from 'react'

import UnionPayCardSmall from 'icons/PaymentCards/UnionPay/svg/unionpay_small.svg'
import UnionPayCardBig from 'icons/PaymentCards/UnionPay/svg/unionpay_big.svg'

export const UnionPayCardSmallIcon: FC<SVGProps<SVGElement>> = (props) => (
  <UnionPayCardSmall {...props} />
)
export const UnionPayCardBigIcon: FC<SVGProps<SVGElement>> = (props) => (
  <UnionPayCardBig {...props} />
)
