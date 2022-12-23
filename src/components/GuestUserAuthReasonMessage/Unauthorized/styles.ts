import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const MessageSection = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.spacing(1.5)};
  background: ${({ theme }) =>
    theme.customComponents.guestUserAuthReasonMessage.messageSection
      .styleOverrides.background};
  border-radius: 5px;
  padding: ${({ theme }) => theme.spacing(2, 3)};
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    padding: ${({ theme }) => theme.spacing(2, 2)};
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    padding: ${({ theme }) => theme.spacing(1.25, 2)};
  }
`

export const LoginMessage = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.35;
  color: ${({ theme }) => theme.palette.text.primary};
`
