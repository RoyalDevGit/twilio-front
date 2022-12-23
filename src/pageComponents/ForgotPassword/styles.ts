import styled from '@emotion/styled'

import { LoginPageHeader } from 'pageComponents/Login/DesktopLogin/styles'

export const ForgotPasswordHeader = styled(LoginPageHeader)`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    margin-bottom: ${({ theme }) => theme.spacing(0.5)};
    text-align: center;
  }
`
