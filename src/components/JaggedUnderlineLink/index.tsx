import { FC } from 'react'

import { LinkProps } from 'components/Link'
import {
  CustomLink,
  LoginLinkContainer,
} from 'components/JaggedUnderlineLink/styles'
import { JaggedUnderlineIcon } from 'icons/JaggedUnderline'

export const JaggedUnderlinedLink: FC<React.PropsWithChildren<LinkProps>> = (
  props
) => (
  <LoginLinkContainer>
    <CustomLink {...props} />
    <JaggedUnderlineIcon />
  </LoginLinkContainer>
)
