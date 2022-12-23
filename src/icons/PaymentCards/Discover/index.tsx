import { FC, SVGProps } from 'react'

import DiscoverSmall from 'icons/PaymentCards/Discover/svg/discover_small.svg'
import DiscoverBig from 'icons/PaymentCards/Discover/svg/discover_big.svg'

export const DiscoverCardSmallIcon: FC<SVGProps<SVGElement>> = (props) => (
  <DiscoverSmall {...props} />
)

export const DiscoverCardBigIcon: FC<SVGProps<SVGElement>> = (props) => (
  <DiscoverBig {...props} />
)
