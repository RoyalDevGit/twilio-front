import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Container from '@mui/material/Container'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'

import { Button } from 'components/Button'
import { ArrowButtonContainer } from 'components/HorizontalScrollableContainer/styles'

export const PickerSkeleton = styled(Skeleton)`
  border-radius: 5px;
  width: 72px;
  height: 85px;
  flex: 0 0 auto;
`

export const TimeSlotPickerSkeleton = styled(Skeleton)`
  border-radius: 5px;
  width: 83px;
  height: 35px;
  flex: 0 0 auto;
`

export const AvailableSessionsContainer = styled(Container)`
  padding: ${({ theme }) => theme.spacing(2.5)};
  border-radius: 10px;
  width: 376px;
  min-width: 376px;
  height: fit-content;
  border: ${({ theme }) =>
    theme.customComponents.availableSessions.availableSessionsContainer
      .styleOverrides.border};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 360px;
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    width: 310px;
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    width: 255px;
    height: 460px;
  }
`

export const AvailableDatesContainer = styled.div`
  text-align: left;
  padding: 0 24px;
  padding-top: 9px;

  ${ArrowButtonContainer} {
    width: 20px;
  }
`

export const AvailableTimesContainer = styled.div`
  text-align: left;
`

export const AvailableTimes = styled.div`
  flex-wrap: wrap;
  text-align: left;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    justify-content: center;
  }
`

export const ConnectWithExpertButton = styled(Button)`
  width: 376px;
  height: 48px;
  border-radius: 5px;
  color: #090b1b;
  margin-bottom: ${({ theme }) => theme.spacing(3.75)};
  background: ${({ theme }) =>
    theme.customComponents.availableSessions.connectWithExpertButton
      .styleOverrides.background};
  border: ${({ theme }) =>
    theme.customComponents.availableSessions.connectWithExpertButton
      .styleOverrides.border};
  :hover {
    background-color: ${({ theme }) =>
      theme.customComponents.availableSessions.connectWithExpertButton
        .styleOverrides.backgroundColor};
  }
`

export const BookSessionButton = styled(Button)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(2.5)};
  height: 45px;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    font-size: 0.875rem;
  }
`

export const AvailabilitySectionHeader = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2.5)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-size: 1.125rem;
  border-bottom: ${({ theme }) =>
    theme.customComponents.availableSessions.availabilitySectionHeader
      .styleOverrides.borderBottom};
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing(1.5)};
  display: inline-flex;
  justify-content: space-between;
  svg {
    align-self: center;
  }
`

export const SessionDayOfTheWeekText = styled(Typography)`
  font-size: 0.688rem;
  letter-spacing: ${({ theme }) => theme.spacing(0.25)};
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 0.625rem;
  }
  padding-top: 3px;
`

export const SessionDateTextMonth = styled(Typography)`
  font-size: 1rem;
  width: inherit;
  font-weight: 500;
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    font-size: 0.813rem;
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 0.75rem;
  }
`

export const SessionDateTextDay = styled(Typography)`
  font-size: 1.25rem;
  width: inherit;
  font-weight: 500;
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    font-size: 0.813rem;
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 0.75rem;
  }
`

interface AvailabilityOptionButtonProps {
  selected: boolean
  darkmode?: string
}

export const AvailabilityOptionButton = styled(
  ButtonBase
)<AvailabilityOptionButtonProps>`
  width: 72px;
  padding: 5px;
  min-width: fit-content;
  min-height: 85px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  flex-direction: column;
  background: ${({ theme }) => theme.palette.background.paper};
  border: ${({ darkmode, theme }) =>
    darkmode === 'false'
      ? theme.customComponents.availableSessions.availableDate.styleOverrides
          .border
      : '1px solid rgb(184 206 227 / 60%)'};
  ${({ selected, darkmode }) =>
    selected &&
    darkmode &&
    css`
      color: #1a1a1a;
    `};

  ${({ selected, theme }) =>
    selected &&
    css`
      background: ${theme.customComponents.availableSessions
        .availableSessionButton.styleOverrides.background};
      border: none;

      color: #1a1a1a;
    `};
`

export const AvailabilitySessionsHeader = styled.div`
  font-size: 1.125rem;
  border-bottom: ${({ theme }) =>
    theme.customComponents.availableSessions.availabilitySectionHeader
      .styleOverrides.borderBottom};
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing(1.5)};
  display: inline-flex;
  justify-content: space-between;
  svg {
    align-self: center;
  }
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const AvailableTime = styled(AvailabilityOptionButton)`
  min-width: 83px;
  width: 83px;
  min-height: 35px;
  height: 35px;
`

export const NoAvailabilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`
export const NoAvailabilityTitle = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 500;
`

export const AvailabilityLoadingContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const CustomSkeleton = styled(Skeleton)`
  border-radius: 5px;
`
