import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { UserAvatar } from 'components/UserAvatar'

export const RescheduleSuccessfulStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: ${({ theme }) => theme.spacing(1)};
`

export const SessionConfirmedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .MuiAvatar-root {
    border: 2px solid;
    border-color: ${({ theme }) => theme.palette.tertiary.main};
  }
`

export const SessionConfirmedLabel = styled(Typography)`
  font-size: 2rem;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 1.5rem;
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 1.3rem;
  }
`

export const SessionConfirmedExpertLabel = styled(Typography)`
  font-size: 1.75rem;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 1.2rem;
  }
`

export const CustomUserAvatar = styled(UserAvatar)``

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    gap: 8px;
  }
`

export const SessionConfirmedInformation = styled(Typography)`
  font-size: 1.125rem;
`
export const AvatarContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(0.8, 0)};
`
