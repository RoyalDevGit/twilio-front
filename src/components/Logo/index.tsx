import { FC } from 'react'

import { LogoContainer, LogoMark, LogoText } from 'components/Logo/styles'
import { LogoIcon, LogoTextIcon } from 'icons/Logo'

export const Logo: FC = (props) => (
  <LogoContainer {...props}>
    <LogoMark>
      <LogoIcon width="42" height="42" viewBox="0 -20 300 400" />
    </LogoMark>
    <LogoText>
      <LogoTextIcon viewBox="0 0 167 25" />
    </LogoText>
  </LogoContainer>
)
