import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export const EmailVerificationContainer = styled(Container)`
  text-align: center;
`

export const EmailVerificationMain = styled.main`
  padding-top: 15%;
`

export const EmailVerifiedSuccessfully = styled(Container)`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(20)};
  padding: ${({ theme }) => theme.spacing(0)};
`

export const VerifiedHeader = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 300;
  margin-top: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const EmailVerificationMessage = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`
