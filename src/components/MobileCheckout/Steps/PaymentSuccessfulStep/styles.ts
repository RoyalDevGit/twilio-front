import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { ExpertAvatar } from 'components/ExpertAvatar'
import { Button } from 'components/Button'

export const PaymentSuccessfulTitle = styled(Typography)`
  font-size: 1.063rem;
`

export const PaymentSuccessfulStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3.75)};
`

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.3)};
`

export const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const SessionConfirmedLabel = styled(Typography)`
  font-size: 2rem;
`

export const CustomExpertAvatar = styled(ExpertAvatar)`
  .MuiAvatar-root {
    border: 2px solid #5c6e9f;
  }
`

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.375)};
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    gap: ${({ theme }) => theme.spacing(1)};
  }
`

export const SessionConfirmedInformation = styled(Typography)`
  font-size: 1.125rem;
`

export const SendAMessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.25)};
`

export const SendAMessageLabel = styled(Button)`
  font-size: 1.063rem;
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 0.938rem;
  }
`
