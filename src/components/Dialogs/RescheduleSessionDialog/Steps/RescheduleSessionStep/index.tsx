import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'
import Divider from '@mui/material/Divider'

import {
  CalendarSection,
  IconBox,
  RescheduleSessionDialogBody,
  RescheduleSessionDialogHeader,
  RescheduleSessionLabel,
  RescheduleSessionTypography,
  RescheduleStepContainer,
  SessionTimeBox,
  SessionTimeContainer,
  StaticCalendar,
  StaticCalendarContainer,
  TimePickerLabel,
  TimeSlotPickerSection,
} from 'components/Dialogs/RescheduleSessionDialog/Steps/RescheduleSessionStep/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ExpertAvailability } from 'interfaces/ExpertAvailability'
import { AvailableSessionTimeSlotPicker } from 'components/AvailableSessions/AvailableSessionTimeSlotPicker'
import { Session } from 'interfaces/Session'
import { ScheduleDialogClockIcon } from 'icons/Clock/ScheduleDialog'
import { ScheduleDialogCalendarIcon } from 'icons/Calendar/ScheduleDialog'

interface RescheduleSessionStepProps {
  availability: ExpertAvailability | undefined
  date?: DateTime
  timeslot: string
  updating: boolean
  session: Session | null
  name: string
  onDateChange: (date: DateTime) => unknown
  onDateRangeChange: (to: DateTime) => unknown
  onTimeslotChange: (timeSlotId: string) => unknown
}

export const RescheduleSessionStep: FC<RescheduleSessionStepProps> = ({
  availability,
  date,
  timeslot,
  updating,
  session,
  name,
  onDateChange,
  onDateRangeChange,
  onTimeslotChange,
}) => {
  const { t } = useTranslation(LocaleNamespace.UpcomingSessions)
  const displayDate = session
    ? DateTime.fromISO(session.startDate.date)
    : DateTime.now()

  return (
    <RescheduleStepContainer>
      <RescheduleSessionDialogHeader>
        <RescheduleSessionLabel variant="h5">
          {t('rescheduleSessionLabel')}
        </RescheduleSessionLabel>
        <RescheduleSessionTypography variant="body1">
          {`${t('rescheduleSessionWithLabel')} ${name}`}
        </RescheduleSessionTypography>
        <SessionTimeContainer>
          <SessionTimeBox>
            <IconBox>
              <ScheduleDialogCalendarIcon />
            </IconBox>
            <RescheduleSessionTypography>
              {`${displayDate.weekdayShort}, ${displayDate.monthShort} ${displayDate.day} ${displayDate.year}`}
            </RescheduleSessionTypography>
          </SessionTimeBox>
          <SessionTimeBox>
            <IconBox>
              <ScheduleDialogClockIcon />
            </IconBox>
            <RescheduleSessionTypography>
              {session &&
                `${displayDate.toFormat('hh:mm a')} - ${displayDate
                  .plus({ minutes: session.duration })
                  .toFormat('hh:mm a')} `}
            </RescheduleSessionTypography>
          </SessionTimeBox>
        </SessionTimeContainer>
      </RescheduleSessionDialogHeader>
      <Divider />
      <RescheduleSessionDialogBody>
        <RescheduleSessionTypography>
          {t('rescheduleSessionCalendarLabel')}
        </RescheduleSessionTypography>
        <CalendarSection>
          <StaticCalendarContainer
            displayStaticWrapperAs="desktop"
            value={date}
            minDate={DateTime.now().startOf('day')}
            onChange={(newValue) => {
              if (newValue) {
                onDateChange(newValue as DateTime)
              }
            }}
            onMonthChange={(value: unknown) => {
              const dateTime = value as DateTime
              onDateRangeChange(dateTime.plus({ months: 1 }))
            }}
            renderInput={(params) => <StaticCalendar {...params} />}
          />
        </CalendarSection>
        {availability && (
          <TimeSlotPickerSection>
            <TimePickerLabel>
              {t('rescheduleSessionTimePickerLabel')}
            </TimePickerLabel>
            <AvailableSessionTimeSlotPicker
              isLoading={updating}
              availability={availability}
              onChange={onTimeslotChange}
              value={timeslot}
            />
          </TimeSlotPickerSection>
        )}
      </RescheduleSessionDialogBody>
    </RescheduleStepContainer>
  )
}
