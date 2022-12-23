import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const AuthenticationControlContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const AuthenticationModeToggle = styled.div`
  display: flex;
  align-items: center;
`

export const AuthenticationModeToggleLabel = styled(Typography)`
  font-weight: 600;
  font-size: 0.875rem;
`

export const AuthenticationModeToggleButton = styled(Button)`
  font-weight: 600;
  font-size: 0.875rem;
`

export const ControlContainer = styled.div``

// Login Control styles

export const LoginFormContainer = styled.div``

// Signup Control styles

export const SignupFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`
