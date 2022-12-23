import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'

export const MOBILE_CALENDAR_BREAKPOINT = 'tablet'

export const CalendarContainer = styled.div``

export const CustomPickersDay = styled(PickersDay)`
  display: flex;
  flex-direction: column;
`

export const DotContainer = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing(2.5)};
`

export const SplitCalendar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    flex-direction: column;
    gap: 0px;
  }
`

export const CalendarSide = styled.div`
  flex: 1 1 auto;
  flex-basis: 70%;

  && {
    .MuiPaper-root {
      background: transparent;
      box-shadow: none;
    }
    .MuiToolbar-root {
      border: none;
      padding-left: 0;
    }
    .MainLayout-header,
    .MainLayout-ordinaryHeaderBorder {
      background: transparent;
      border: none;
      margin-bottom: 10px;
    }

    .MainLayout-ordinaryHeaderBorder {
      .MuiTableCell-body {
        border: none;
      }
    }
    .Cell-dayOfWeek {
      font-weight: 500;
      font-size: 0.875rem;
      text-transform: uppercase;
      color: ${({ theme }) =>
        theme.customComponents.calendar.calendar.calendar.styleOverrides.color};
    }
    .Cell-text {
      text-align: left;
    }

    .Cell-today {
      margin: 0;
      margin-left: 10px;
      margin-top: 4px;
    }

    .MainLayout-relativeContainer {
      border: 1px solid #484a5c;
      border-collapse: collapse;
      border-radius: 1em;
      overflow: hidden;
    }

    .Root-Root {
      .MuiButtonBase-root {
      }
    }
  }
`

export const SessionListContainer = styled.div`
  flex: 1 1 auto;
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    background-color: ${({ theme }) =>
      theme.customComponents.calendar.sessionListContainer.mobileState
        .styleOverrides.backgroundColor};
  }
`

export const SessionListToolbar = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(184, 206, 227, 0.4);
  margin: ${({ theme }) => theme.spacing(1)};
`

export const MobileSessionListToolbar = styled.div`
  background-color: ${({ theme }) =>
    theme.customComponents.calendar.sessionListContainer.mobileState
      .styleOverrides.color};
  padding-top: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
`

export const CurrentDayOfWeek = styled(Typography)`
  flex: 1 1 auto;
`

export const CurrentDate = styled(Typography)`
  font-weight: 300;
  font-size: 0.875rem;
  margin-bottom: -8px;
`
export const MobileCurrentDate = styled(Typography)`
  font-weight: 700;
  margin-left: 16px;
  font-size: 1rem;
`

export const SessionList = styled.div`
  padding: 12px 0;
  margin: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-top: 0;
    padding: 0;
    margin: 5px 0;
  }
`

export const DesktopContainer = styled.div`
  display: flex;
  margin-left: ${({ theme }) => theme.spacing(2.2)};

  .TodayButton-button {
    font-size: 1.15rem;
  }

  .OpenButton-textButton {
    font-weight: 400;
    font-size: 1.5625rem;
    line-height: 1.235;
    color: ${({ theme }) =>
      theme.customComponents.calendar.calendar.calendar.styleOverrides.color};
    pointer-events: none;
    cursor: none;
  }

  div.Appointment-appointment {
    background-color: ${({ theme }) =>
      theme.customComponents.calendar.calendar.appointments?.styleOverrides
        .background};
    .HorizontalAppointment-title {
      color: ${({ theme }) =>
        theme.customComponents.calendar.calendar.appointments?.styleOverrides
          .color};
    }
  }
`

export const MobileContainer = styled.div`
  display: block;

  .MuiPickerStaticWrapper-root,
  .MuiPickersDay-root {
    background: transparent;
  }
  .MuiPickersDay-root.Mui-selected {
    background-color: #3fa3ff;
  }
  .MuiPickersDay-root.MuiPickersDay-today {
    background-color: transparent;
    color: #3fa3ff;
    border: 1px solid #3fa3ff;
  }

  margin-bottom: ${({ theme }) => theme.spacing(-6)};
  background: ${({ theme }) => theme.palette.background.paper};
`

export const MobileDatePicker = styled(StaticDatePicker)`
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    div.PrivatePickersFadeTransitionGroup-root {
      font-size: 26px;
      div {
        font-size: 26px;
      }
    }
  }
`

export const MobileDateField = styled(TextField)``
