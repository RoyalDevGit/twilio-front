import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'

export const RescheduleStepContainer = styled.div``

export const RescheduleSessionDialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const RescheduleSessionLabel = styled(Typography)`
  font-weight: 500;
`

export const RescheduleSessionTypography = styled(Typography)``

export const SessionTimeContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: ${({ theme }) => theme.spacing(1)};
`
export const SessionTimeBox = styled.div`
  display: flex;
  gap: 8px;
  max-width: 200px;
`

export const IconBox = styled.div``

export const RescheduleSessionDialogBody = styled.div`
  margin: ${({ theme }) => theme.spacing(2, 0)};
`

export const CalendarSection = styled.div`
  .MuiPickerStaticWrapper-root,
  .MuiPickerStaticWrapper-content,
  .MuiPickersDay-root {
    background: transparent;
  }
  .MuiPickersDay-root.Mui-selected {
    background-color: ${({ theme }) =>
      theme.customComponents.sessionDetails.dialogs?.calendar.styleOverrides
        .backgroundColor};
  }
  .MuiPickersDay-root.MuiPickersDay-today {
    background-color: transparent;
    color: ${({ theme }) =>
      theme.customComponents.sessionDetails.dialogs?.calendar.styleOverrides
        .backgroundColor};
    border: ${({ theme }) =>
      `1px solid ${theme.customComponents.sessionDetails.dialogs?.calendar.styleOverrides.backgroundColor}`};
  }
`
export const StaticCalendarContainer = styled(StaticDatePicker)``

export const StaticCalendar = styled(TextField)``

export const TimePickerLabel = styled(Typography)`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`
export const TimeSlotPickerSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing(-5)};
`
