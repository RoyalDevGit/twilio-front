import { FC, SVGProps } from 'react'

import UnknownCardSmallLight from 'icons/PaymentCards/UnknownCard/svg/unknown_small_light.svg'
import UnknownCardSmallDark from 'icons/PaymentCards/UnknownCard/svg/unknown_small_dark.svg'
import UnknownCardBig from 'icons/PaymentCards/UnknownCard/svg/unknown_big.svg'
import { Icon, IconProps } from 'icons'

export const UnknownCardSmallIcon: FC<IconProps> = (props) => (
  <Icon
    LightSvg={UnknownCardSmallLight}
    DarkSvg={UnknownCardSmallDark}
    {...props}
  />
)
export const UnknownCardBigIcon: FC<SVGProps<SVGElement>> = (props) => (
  <UnknownCardBig {...props} />
)
