import { FC } from 'react'
import { DateTime } from 'luxon'

import {
  AvailableDatesContainer,
  SessionDateTextMonth,
  SessionDateTextDay,
  SessionDayOfTheWeekText,
  AvailabilityOptionButton,
  PickerSkeleton,
} from 'components/AvailableSessions/styles'
import { HorizontalScrollableContainer } from 'components/HorizontalScrollableContainer'
import { ExpertAvailability } from 'interfaces/ExpertAvailability'
import {
  BackButton,
  ForwardButton,
} from 'components/AvailableSessions/ScrollableButtons'
import { createRange } from 'utils/array/createRange'
import { useDelayLoading } from 'hooks/useDelayLoading'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

interface AvailableSessionDatePickerProps {
  isLoading?: boolean
  availability?: ExpertAvailability
  onChange?: (date: DateTime) => unknown
  value?: DateTime
}

export const AvailableSessionDatePicker: FC<
  React.PropsWithChildren<AvailableSessionDatePickerProps>
> = ({ isLoading, availability, onChange, value }) => {
  const delayedLoading = useDelayLoading(isLoading)
  const isDarkMode = usePrefersDarkMode()
  const renderSessions = () => {
    if (delayedLoading) {
      return createRange(5).map((n) => (
        <PickerSkeleton key={n} variant="rectangular" animation="wave" />
      ))
    }
    return availability?.dates.map((isoDate) => {
      const date = DateTime.fromISO(isoDate).startOf('day')
      return (
        <AvailabilityOptionButton
          key={date.toISO()}
          selected={value ? value.startOf('day').equals(date) : false}
          onClick={() => onChange && onChange(date)}
          darkmode={isDarkMode.toString()}
        >
          <SessionDayOfTheWeekText>
            {date.toFormat('EEE').toUpperCase()}
          </SessionDayOfTheWeekText>
          <SessionDateTextMonth>{date.toFormat('MMM')}</SessionDateTextMonth>
          <SessionDateTextDay>{date.toFormat('d')}</SessionDateTextDay>
        </AvailabilityOptionButton>
      )
    })
  }
  return (
    <AvailableDatesContainer>
      <HorizontalScrollableContainer
        fadeOutRadius={20}
        BackButton={BackButton}
        ForwardButton={ForwardButton}
      >
        {renderSessions()}
      </HorizontalScrollableContainer>
    </AvailableDatesContainer>
  )
}
