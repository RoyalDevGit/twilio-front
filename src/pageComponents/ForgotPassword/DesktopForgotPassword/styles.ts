import styled from '@emotion/styled'

import { LoginPageHeader } from 'pageComponents/Login/DesktopLogin/styles'

export const ForgotPasswordHeader = styled(LoginPageHeader)`
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    text-align: center;
  }
`

export const ForgotPasswordHeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
  text-align: center;
`
