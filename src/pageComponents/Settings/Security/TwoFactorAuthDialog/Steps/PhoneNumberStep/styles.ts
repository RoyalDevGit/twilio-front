import styled from '@emotion/styled'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'

export const PhoneSection = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
  }
`

export const InformationSection = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
  }
`

export const LearnMore = styled(Typography)``

export const PhoneNumberLabel = styled(Typography)`
  font-size: 0.813rem;
  font-weight: 500;
  color: ${({ theme }) =>
    theme.customComponents.phoneNumberStep.phoneNumberLabel.styleOverrides
      .color};
`

export const LastParagraph = styled.div``
