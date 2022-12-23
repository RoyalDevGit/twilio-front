import { FC } from 'react'

import RestoreIconDark from 'icons/Restore/svg/restore-icon-dark.svg'
import { Icon, IconProps } from 'icons'

export const RestoreIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={RestoreIconDark} {...props} />
)
