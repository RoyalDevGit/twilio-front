import Card from '@mui/material/Card'
import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { UserAvatar } from 'components/UserAvatar'
import { Button } from 'components/Button'

export const UpcomingAppointment = styled(Card)`
  border: ${({ theme }) =>
    theme.customComponents.upcomingAppointmentCard.appointmentCardBorder
      .styleOverrides.border};
  border-radius: 5px;
  box-shadow: none;
  padding: ${({ theme }) => theme.spacing(2)};
  padding-top: ${({ theme }) => theme.spacing(1.5)};
  padding-bottom: ${({ theme }) => theme.spacing(1.5)};
  overflow: unset;

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    min-width: 264px;
  }
  background-color: ${({ theme }) =>
    theme.customComponents.upcomingAppointmentCard.appointmentCardBackground
      .styleOverrides.background};
`

export const UpcomingAppointmentContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
`

export const UpcomingAppointmentContentBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
  height: 100%;
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    flex-direction: column;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing(3)};
    gap: ${({ theme }) => theme.spacing(1)};
  }
`

export const ExpertAvatarContainer = styled.div``

export const CustomUserAvatar = styled(UserAvatar)``

export const UpcomingAppointmentInformation = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre;
  gap: ${({ theme }) => theme.spacing(0.5)};
  ${({ theme }) => theme.breakpoints.up('laptop')} {
    padding-right: ${({ theme }) => theme.spacing(3)};
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    align-items: center;
  }
`

export const UpcomingAppointmentDateTime = styled(Typography)`
  font-size: 0.875rem;
`

export const ExpertiseTitle = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 400;
  :empty::before {
    content: '';
    display: inline-block;
  }
`

export const ActionContainer = styled.div`
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    width: 100%;
  }
`

export const UpcomingAppointmentButton = styled(Button)`
  font-weight: 600;
  padding-left: ${({ theme }) => theme.spacing(1)};
  padding-right: ${({ theme }) => theme.spacing(1)};
`
