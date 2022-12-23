import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import FormControl from '@mui/material/FormControl'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { DateTime } from 'luxon'

import {
  SelectToLabel,
  TimeRangeOptionContainer,
  SelectContainer,
  CustomTimePicker,
  CloseIconButton,
  CustomError,
} from 'components/AvailabilityOptions/TimeRangeList/TimeRangeOption/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { CloseCircleIcon } from 'icons/Close'
import { AvailabilityTimeRange } from 'interfaces/AvailabilityOption'
import { parseAvailabilityOptionTime } from 'utils/date/parseAvailabilityOptionTime'

export interface AvailabilityTimeRangeBuffer
  extends Omit<Partial<AvailabilityTimeRange>, 'startTime' | 'endTime'> {
  tempId?: string
  startTime: string | null
  endTime: string | null
}

export type TimeRangeOptionOnChange = (time: string | null) => unknown

interface TimeRangeOptionProps {
  range: AvailabilityTimeRangeBuffer
  onStartTimeChange: TimeRangeOptionOnChange
  onEndTimeChange: TimeRangeOptionOnChange
  onDelete: () => unknown
  error?: string
}

export const TimeRangeOption: FC<TimeRangeOptionProps> = ({
  range,
  onStartTimeChange,
  onEndTimeChange,
  onDelete,
  error,
}) => {
  const { t } = useTranslation(LocaleNamespace.ExpertAvailabilitySettings)
  const [startTime, setStartTime] = useState<DateTime | null | undefined>()
  const [endTime, setEndTime] = useState<DateTime | null | undefined>()
  const handleStartTimeChange = (date: DateTime | null) => {
    if (!onStartTimeChange) {
      return
    }
    onStartTimeChange(date && date.toFormat('H:m'))
  }

  const handleEndTimeChange = (date: DateTime | null) => {
    if (!onEndTimeChange) {
      return
    }
    onEndTimeChange(date && date.toFormat('H:m'))
  }

  useEffect(() => {
    if (range.startTime) {
      const startTime = parseAvailabilityOptionTime(range.startTime)
      const start = DateTime.now()
        .startOf('day')
        .plus({ hours: startTime.hours, minutes: startTime.minutes })
      setStartTime(start)
    } else {
      setStartTime(null)
    }

    if (range.endTime) {
      const endTime = parseAvailabilityOptionTime(range.endTime)
      const end = DateTime.now()
        .startOf('day')
        .plus({ hours: endTime.hours, minutes: endTime.minutes })
      setEndTime(end)
    } else {
      setEndTime(null)
    }
  }, [range])

  return (
    <div>
      <TimeRangeOptionContainer>
        <SelectContainer>
          <FormControl>
            <MobileTimePicker
              minutesStep={15}
              value={startTime}
              onChange={(dt) => setStartTime(dt)}
              onAccept={handleStartTimeChange}
              renderInput={(params) => (
                <CustomTimePicker error={!!error} {...params} />
              )}
            />
          </FormControl>
          <SelectToLabel>{t('timeToLabel')}</SelectToLabel>
          <FormControl>
            <MobileTimePicker
              minutesStep={15}
              value={endTime}
              onChange={(dt) => setEndTime(dt)}
              onAccept={handleEndTimeChange}
              renderInput={(params) => (
                <CustomTimePicker error={!!error} {...params} />
              )}
            />
          </FormControl>
          <CloseIconButton onClick={onDelete}>
            <CloseCircleIcon />
          </CloseIconButton>
        </SelectContainer>
      </TimeRangeOptionContainer>
      {!!error && <CustomError>{error}</CustomError>}
    </div>
  )
}
