import { FC, SVGProps } from 'react'

import DinnersClubCardSmall from 'icons/PaymentCards/DinnersClub/svg/dinnersclub_small.svg'
import DinnersClubCardBig from 'icons/PaymentCards/DinnersClub/svg/dinnersclub_big.svg'

export const DinnersClubCardSmallIcon: FC<SVGProps<SVGElement>> = (props) => (
  <DinnersClubCardSmall {...props} />
)

export const DinnersClubCardBigIcon: FC<SVGProps<SVGElement>> = (props) => (
  <DinnersClubCardBig {...props} />
)
