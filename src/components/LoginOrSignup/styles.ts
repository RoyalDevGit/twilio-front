import styled from '@emotion/styled'

import { Button } from 'components/Button'

export const LoginOrSignupContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(1)};
  padding-right: ${({ theme }) => theme.spacing(1.5)};
  white-space: pre;

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    width: 100%;
    justify-content: flex-end;
    margin-right: ${({ theme }) => theme.spacing(-3.75)};
    gap: ${({ theme }) => theme.spacing(0)};
  }
`

export const LoginButtonLight = styled(Button)`
  color: #3365ef;
  background-color: #ffffff;
`

export const LoginButtonDark = styled(Button)`
  color: #ffffff;
`

export const SignupButtonDark = styled(Button)`
  background: #abd1f5 !important;
`
