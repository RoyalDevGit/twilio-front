import { FC } from 'react'

import EmailDarkSvg from 'icons/Email/svg/email-dark.svg'
import { Icon, IconProps } from 'icons'

export const EmailIcon: FC<IconProps> = (props) => (
  <Icon DarkSvg={EmailDarkSvg} {...props} />
)
