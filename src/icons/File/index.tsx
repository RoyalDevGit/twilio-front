import { FC } from 'react'

import DarkSvg from 'icons/File/svg/file-dark.svg'
import LightSvg from 'icons/File/svg/file-light.svg'
import { Icon, IconProps } from 'icons'

export const FileIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={DarkSvg} LightSvg={LightSvg} {...props} />
)
