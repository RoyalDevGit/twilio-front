import { FC } from 'react'

import {
  Divider,
  DurationContainer,
  DurationLengthText,
  DurationPrice,
  DurationTimeTypeText,
} from 'components/AvailableSessions/AvailableSessionDurationPicker/styles'
import {
  AvailabilityOptionButton,
  PickerSkeleton,
} from 'components/AvailableSessions/styles'
import { HorizontalScrollableContainer } from 'components/HorizontalScrollableContainer'
import { ExpertAvailability } from 'interfaces/ExpertAvailability'
import { humanizeMinutes } from 'utils/duration/humanizeMinutes'
import { formatPrice } from 'utils/currency/formatPrice'
import {
  BackButton,
  ForwardButton,
} from 'components/AvailableSessions/ScrollableButtons'
import { createRange } from 'utils/array/createRange'
import { useDelayLoading } from 'hooks/useDelayLoading'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

interface AvailableSessionDurationPickerProps {
  isLoading?: boolean
  availability?: ExpertAvailability
  onChange?: (duration: number) => unknown
  value?: number
  isInstantSession?: boolean
}

function capitalizeFirstLetter(str: string | undefined) {
  if (!str) {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const AvailableSessionDurationPicker: FC<
  AvailableSessionDurationPickerProps
> = ({ isLoading, availability, onChange, value, isInstantSession }) => {
  const delayedLoading = useDelayLoading(isLoading)
  const isDarkMode = usePrefersDarkMode()
  const renderDurations = () => {
    if (delayedLoading) {
      return createRange(5).map((n) => (
        <PickerSkeleton key={n} variant="rectangular" animation="wave" />
      ))
    }

    const durations = isInstantSession
      ? availability?.instant.durations
      : availability?.durations
    return durations?.map((duration) => {
      const humanizedMinutes = humanizeMinutes(duration.minutes)
      return (
        <AvailabilityOptionButton
          key={duration.minutes}
          selected={value === duration.minutes}
          onClick={() => onChange && onChange(duration.minutes)}
          darkmode={isDarkMode.toString()}
        >
          <DurationLengthText>{humanizedMinutes.value}</DurationLengthText>
          <DurationTimeTypeText>
            {capitalizeFirstLetter(humanizedMinutes.unit)}
          </DurationTimeTypeText>
          <Divider />
          <DurationPrice>{formatPrice(duration.price)}</DurationPrice>
        </AvailabilityOptionButton>
      )
    })
  }

  return (
    <DurationContainer>
      <HorizontalScrollableContainer
        fadeOutRadius={20}
        BackButton={BackButton}
        ForwardButton={ForwardButton}
      >
        {renderDurations()}
      </HorizontalScrollableContainer>
    </DurationContainer>
  )
}
