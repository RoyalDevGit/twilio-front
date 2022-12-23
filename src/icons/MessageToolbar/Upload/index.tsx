import { FC } from 'react'

import UploadIconDark from 'icons/MessageToolbar/Upload/svg/upload_dark.svg'
import UploadIconLight from 'icons/MessageToolbar/Upload/svg/upload_light.svg'
import { Icon, IconProps } from 'icons'

export const UploadIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={UploadIconDark} LightSvg={UploadIconLight} {...props} />
)
