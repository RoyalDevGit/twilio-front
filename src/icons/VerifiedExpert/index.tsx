import { FC } from 'react'

import VerifiedExpertLightSvg from 'icons/VerifiedExpert/svg/verified-expert-light.svg'
import VerifiedExpertDarkSvg from 'icons/VerifiedExpert/svg/verified-expert-dark.svg'
import { Icon, IconProps } from 'icons'

export const VerifiedExpertIcon: FC<IconProps> = (props) => (
  <Icon
    LightSvg={VerifiedExpertLightSvg}
    DarkSvg={VerifiedExpertDarkSvg}
    {...props}
  />
)
