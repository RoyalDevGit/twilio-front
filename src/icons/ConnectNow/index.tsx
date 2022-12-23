import { FC } from 'react'

import ConnectIcon from 'icons/ConnectNow/svg/connect_now.svg'
import { Icon, IconProps } from 'icons'

export const ConnectNowIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={ConnectIcon} {...props} />
)
