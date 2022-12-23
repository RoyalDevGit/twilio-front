import { FC } from 'react'

import BackArrowDark from 'icons/Arrow/Back/svg/back_arrow_dark.svg'
import BackArrowLight from 'icons/Arrow/Back/svg/back_arrow_light.svg'
import { IconProps, Icon } from 'icons'

export const BackArrowIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={BackArrowLight} DarkSvg={BackArrowDark} {...props} />
)
