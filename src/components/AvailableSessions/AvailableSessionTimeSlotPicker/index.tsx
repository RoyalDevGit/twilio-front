import { FC } from 'react'
import { DateTime } from 'luxon'

import {
  AvailableTime,
  AvailableTimes,
  AvailableTimesContainer,
  TimeSlotPickerSkeleton,
} from 'components/AvailableSessions/styles'
import { ExpertAvailability } from 'interfaces/ExpertAvailability'
import { createRange } from 'utils/array/createRange'
import { useDelayLoading } from 'hooks/useDelayLoading'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

interface AvailableSessionTimeSlotPickerProps {
  isLoading?: boolean
  availability?: ExpertAvailability
  onChange?: (id: string) => unknown
  value?: string
}

export const AvailableSessionTimeSlotPicker: FC<
  AvailableSessionTimeSlotPickerProps
> = ({ isLoading, availability, onChange, value }) => {
  const delayedLoading = useDelayLoading(isLoading)
  const isDarkMode = usePrefersDarkMode()
  const renderTimeSlots = () => {
    if (delayedLoading) {
      return createRange(6).map((n) => (
        <TimeSlotPickerSkeleton
          key={n}
          variant="rectangular"
          animation="wave"
        />
      ))
    }

    return availability?.timeSlots.map((timeSlot) => (
      <AvailableTime
        key={timeSlot.id}
        selected={value === timeSlot.id}
        onClick={() => onChange && onChange(timeSlot.id)}
        darkmode={isDarkMode.toString()}
      >
        {DateTime.fromISO(timeSlot.startDate).toFormat('h:mm a')}
      </AvailableTime>
    ))
  }

  return (
    <AvailableTimesContainer>
      <AvailableTimes>{renderTimeSlots()}</AvailableTimes>
    </AvailableTimesContainer>
  )
}
