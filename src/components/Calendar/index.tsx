import { FC, useEffect, useState } from 'react'
import {
  ViewState,
  AppointmentModel,
  EditingState,
  IntegratedEditing,
  ChangeSet,
} from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  Appointments,
  Toolbar,
  MonthView,
  DateNavigator,
  // TodayButton,
  // DragDropProvider,
  AllDayPanel,
  AppointmentTooltip,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui'
import { DateTime } from 'luxon'
import { useTranslation } from 'next-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { PickersDayProps } from '@mui/x-date-pickers/PickersDay'

import {
  CalendarContainer,
  CalendarSide,
  CurrentDate,
  CurrentDayOfWeek,
  CustomPickersDay,
  DesktopContainer,
  DotContainer,
  MobileContainer,
  MobileCurrentDate,
  MobileDateField,
  MobileDatePicker,
  MobileSessionListToolbar,
  SessionList,
  SessionListContainer,
  SessionListToolbar,
  SplitCalendar,
} from 'components/Calendar/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { SessionCard } from 'components/Calendar/SessionCard'
import { Session } from 'interfaces/Session'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { getOtherSessionUser } from 'utils/sessions/getOtherSessionUser'
import { getUserFullName } from 'utils/user/getUserFullName'
import { EmptySessionDisplay } from 'components/Calendar/EmptySessionDisplay'
import { UnreadMessageIcon } from 'icons/UnreadMessageDot'
import { CalendarNavigator } from 'components/Calendar/Navigator'

enum ViewType {
  DAY = 'Day',
  MONTH = 'Month',
}
export interface CalendarProps {
  sessions: Session[]
  onMonthChange?: (monthStart?: DateTime, monthEnd?: DateTime) => unknown
  instanceUse: 'Expert' | 'Consumer'
}

export const Calendar: FC<React.PropsWithChildren<CalendarProps>> = ({
  sessions,
  onMonthChange = undefined,
  instanceUse,
}) => {
  const { t } = useTranslation(LocaleNamespace.Calendar)
  const currentUser = useCurrentUserAsserted()
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.MONTH)
  const [appointments, setAppointments] = useState<AppointmentModel[]>([])
  const [selectedDate, setSelectedDate] = useState(
    DateTime.now().startOf('day')
  )
  const [selectedDateSessions, setSelectedDateSessions] = useState<Session[]>(
    []
  )
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('laptop'))

  useEffect(() => {
    const filteredSessions =
      currentView === ViewType.MONTH
        ? sessions
        : sessions.filter((s) => {
            const sessionDate = DateTime.fromISO(s.startDate.date)
            return sessionDate.toISODate() === selectedDate.toISODate()
          })
    setSelectedDateSessions(filteredSessions)
  }, [selectedDate, sessions])

  const onCommitChanges = (changeSet: ChangeSet) => {
    const { changed, deleted } = changeSet
    let newAppointments = []
    if (changed) {
      newAppointments = appointments.map((appointment) =>
        changed[appointment.id as string]
          ? { ...appointment, ...changed[appointment.id as string] }
          : appointment
      )
    }
    if (deleted !== undefined) {
      newAppointments = appointments.filter(
        (appointment) => appointment.id !== deleted
      )
    }
    setAppointments(newAppointments)
  }

  const CalendarRightSidePanel: FC<React.PropsWithChildren> = (props) => (
    <div
      style={{
        width: isMobile ? '100%' : '27%',
        paddingRight: isMobile ? '0px' : '24px',
      }}
    >
      {props.children}
    </div>
  )

  const CalendarSessionContainer: FC<React.PropsWithChildren> = (props) => {
    if (!isMobile) {
      return (
        <div style={{ overflowY: 'auto', maxHeight: '70vh' }}>
          {props.children}
        </div>
      )
    }
    return <>{props.children}</>
  }

  const MonthTimeTableCell: FC<
    React.PropsWithChildren<MonthView.TimeTableCellProps>
  > = (props) => (
    <MonthView.TimeTableCell
      {...props}
      onClick={() => handleSelectedDay(props.startDate)}
    />
  )

  const handleSelectedDay = (startDate?: Date) => {
    if (startDate) {
      const formattedDate = `${
        startDate.getMonth() + 1
      }/${startDate.getDate()}/${startDate.getFullYear()}`
      const date = DateTime.fromFormat(formattedDate, 'M/d/yyyy')
      setSelectedDate(date.startOf('day'))
      setCurrentView(ViewType.DAY)
    }
  }

  useEffect(() => {
    const systemOffset = new Date().getTimezoneOffset()
    const newAppointments: AppointmentModel[] = sessions.map((s) => {
      const startDate = DateTime.fromISO(s.startDate.date)

      const endDate = startDate.plus({ minutes: s.duration })
      const allDay = false
      const otherUser = getOtherSessionUser(currentUser, s)

      // having to shift the time manually since reactive calendar does not
      // support non system timezones at the moment (https://github.com/DevExpress/devextreme-reactive/issues/3154)
      const userOffset = startDate.offset
      const offset = systemOffset + userOffset
      const apptStartDate = startDate.plus({ minutes: offset })
      const apptEndDate = endDate.plus({ minutes: offset })
      const newAppointment: AppointmentModel = {
        id: s.id,
        startDate: apptStartDate.toJSDate(),
        endDate: apptEndDate.toJSDate(),
        title: t('sessionWith', { name: getUserFullName(otherUser) }),
        allDay: allDay,
        s,
      }
      return newAppointment
    })
    setAppointments(newAppointments)
  }, [sessions])

  const renderSessionCards = () =>
    selectedDateSessions.map((s) => (
      <SessionCard
        key={s.id}
        sessionUser={getOtherSessionUser(currentUser, s)}
        session={s}
      />
    ))

  const handleDateChange = async (date: DateTime) => {
    if (onMonthChange !== undefined) {
      await onMonthChange(date.startOf('month'), date.endOf('month'))
    }
    setSelectedDate(date)
    setCurrentView(ViewType.MONTH)
  }

  const renderWeekPickerDay = (
    date: DateTime,
    _selectedDates: unknown[],
    pickersDayProps: PickersDayProps<unknown>
  ) => {
    const dateStart = date.startOf('day')
    const hasSession = sessions.some((s) =>
      DateTime.fromISO(s.startDate.date).startOf('day').equals(dateStart)
    )
    return (
      <CustomPickersDay {...pickersDayProps}>
        <div>{date.day}</div>
        <DotContainer>{hasSession && <UnreadMessageIcon />}</DotContainer>
      </CustomPickersDay>
    )
  }

  return (
    <CalendarContainer className={`calendar-view-${currentView.toLowerCase()}`}>
      <SplitCalendar>
        <CalendarSide>
          {!isMobile && (
            <DesktopContainer>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Scheduler data={appointments} height={800}>
                <ViewState
                  defaultCurrentViewName="Month"
                  currentDate={selectedDate.toJSDate()}
                  onCurrentDateChange={(date) => {
                    handleDateChange(DateTime.fromJSDate(date))
                  }}
                />
                <MonthView timeTableCellComponent={MonthTimeTableCell} />
                <Toolbar />
                <EditingState onCommitChanges={onCommitChanges} />
                <IntegratedEditing />
                <DateNavigator rootComponent={CalendarNavigator} />
                <AllDayPanel />
                <Appointments />
                <AppointmentTooltip visible={false} />
                <CurrentTimeIndicator />
              </Scheduler>
            </DesktopContainer>
          )}
          {isMobile && (
            <MobileContainer>
              <MobileDatePicker
                displayStaticWrapperAs="desktop"
                value={selectedDate}
                onChange={(value) => {
                  const date = value as DateTime
                  handleDateChange(date)
                }}
                renderInput={(params) => <MobileDateField {...params} />}
                renderDay={(date, selectedDays, pickersDayProps) =>
                  renderWeekPickerDay(
                    date as DateTime,
                    selectedDays,
                    pickersDayProps
                  )
                }
              />
            </MobileContainer>
          )}
        </CalendarSide>
        <CalendarRightSidePanel>
          {selectedDateSessions.length > 0 && (
            <SessionListContainer>
              <>
                {!isMobile && (
                  <SessionListToolbar>
                    <CurrentDayOfWeek variant="h4">
                      {currentView === ViewType.MONTH
                        ? 'All Sessions'
                        : selectedDate.weekdayLong}
                    </CurrentDayOfWeek>
                    {currentView === ViewType.MONTH ? (
                      <CurrentDate variant="body1">{`${selectedDate.monthShort}, ${selectedDate.year}`}</CurrentDate>
                    ) : (
                      <CurrentDate variant="body1">{`${selectedDate.monthShort} ${selectedDate.day}, ${selectedDate.year}`}</CurrentDate>
                    )}
                  </SessionListToolbar>
                )}
                {isMobile && (
                  <MobileSessionListToolbar>
                    <MobileCurrentDate variant="body1">{`${selectedDate.weekdayLong}, ${selectedDate.monthShort} ${selectedDate.day}, ${selectedDate.year}`}</MobileCurrentDate>
                  </MobileSessionListToolbar>
                )}
                <CalendarSessionContainer>
                  <SessionList>{renderSessionCards()}</SessionList>
                </CalendarSessionContainer>
              </>
            </SessionListContainer>
          )}
          {selectedDateSessions.length === 0 && (
            <EmptySessionDisplay instanceUse={instanceUse} />
          )}
        </CalendarRightSidePanel>
      </SplitCalendar>
    </CalendarContainer>
  )
}
