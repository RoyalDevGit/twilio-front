import { FC } from 'react'

import LightSvg from 'icons/MessageToolbar/Download/svg/download_light.svg'
import DarkSvg from 'icons/MessageToolbar/Download/svg/download_dark.svg'
import { Icon, IconProps } from 'icons'

export const DownloadIcon: FC<IconProps> = (props) => (
  <Icon LightSvg={LightSvg} DarkSvg={DarkSvg} {...props} />
)
