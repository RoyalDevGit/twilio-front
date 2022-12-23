import styled from '@emotion/styled'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'

export const InstantSessionDurationStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const SelectDurationLabel = styled(Typography)`
  font-size: 1rem;
`

export const DurationAndRatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const AvailableSessions = styled(ButtonBase)`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.background.paper : '#E6ECF2'};
  padding: ${({ theme }) => theme.spacing(1.5)};
`

export const SessionDurationContainer = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
`

export const SessionInformation = styled(Typography)`
  font-size: 1.625rem;
`

export const SessionDurationType = styled(Typography)`
  font-size: 1rem;
`
