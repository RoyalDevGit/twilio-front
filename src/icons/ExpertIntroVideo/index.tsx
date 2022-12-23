import { FC } from 'react'

import PlayLightSvg from 'icons/ExpertIntroVideo/svg/playbutton_light.svg'
import PlayDarkSvg from 'icons/ExpertIntroVideo/svg/playbutton_dark.svg'
import { Icon, IconProps } from 'icons'

export const ExpertIntroVideoIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={PlayLightSvg} DarkSvg={PlayDarkSvg} {...props} />
)
