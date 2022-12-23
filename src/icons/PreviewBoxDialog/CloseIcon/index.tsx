import { FC } from 'react'

import Svg from 'icons/PreviewBoxDialog/CloseIcon/svg/close_icon.svg'
import { Icon, IconProps } from 'icons'

export const CloseIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={Svg} DarkSvg={Svg} {...props} />
)
