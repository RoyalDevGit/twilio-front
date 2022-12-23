import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'

import { useRouter } from 'hooks/useRouter'
import { MobileCheckoutStepProps } from 'components/MobileCheckout/Steps/MobileCheckoutStep'
import { StepButton, StepTitle } from 'components/MobileCheckout/Steps/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  AvailabilityStepContainer,
  StaticCalendar,
  TimeSlotPickerSection,
} from 'components/MobileCheckout/Steps/AvailabilityStep/styles'
import { AvailableSessionDurationPicker } from 'components/AvailableSessions/AvailableSessionDurationPicker'
import { AvailableSessionTimeSlotPicker } from 'components/AvailableSessions/AvailableSessionTimeSlotPicker'
import { ExpertAvailability } from 'interfaces/ExpertAvailability'
import { useCurrentUser } from 'hooks/useCurrentUser'
import { isGuestUser } from 'utils/user/isGuestUser'
import { Link } from 'components/Link'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { AuthReason } from 'interfaces/AuthReason'

const AvailabilityStepHeader: FC<MobileCheckoutStepProps> = () => {
  const { t } = useTranslation(LocaleNamespace.MobileCheckout)
  return <StepTitle>{t('availableSessionsLabel')}</StepTitle>
}

interface AvailabilityStepBodyProps extends MobileCheckoutStepProps {
  isLoading: boolean
  availability?: ExpertAvailability
  date?: DateTime
  duration?: number
  timeSlot?: string
  onDateChange?: (date: DateTime) => unknown
  onDateRangeChange?: (from: DateTime, to: DateTime) => unknown
  onDurationChange?: (duration: number) => unknown
  onTimeSlotChange?: (timeSlotId: string) => unknown
}

interface AvailabilityStepFooterProps extends AvailabilityStepBodyProps {
  timeSlot?: string
}

const AvailabilityStepBody: FC<AvailabilityStepBodyProps> = ({
  date,
  duration,
  timeSlot,
  availability,
  onDateRangeChange,
  onDateChange,
  onDurationChange,
  onTimeSlotChange,
  isLoading,
}) => (
  <AvailabilityStepContainer>
    <StaticDatePicker
      displayStaticWrapperAs="desktop"
      views={['day']}
      minDate={DateTime.now().startOf('day')}
      value={date}
      shouldDisableDate={(value: unknown) => {
        const date = value as DateTime
        return !availability?.dates.some((d) =>
          DateTime.fromISO(d).equals(date)
        )
      }}
      onChange={(newValue: unknown) => {
        const dateTime = newValue as DateTime
        if (onDateChange) {
          onDateChange(dateTime)
        }
      }}
      onMonthChange={(value: unknown) => {
        if (onDateRangeChange) {
          const dateTime = value as DateTime
          onDateRangeChange(dateTime, dateTime.plus({ months: 1 }))
        }
      }}
      renderInput={(params) => <StaticCalendar {...params} />}
    />
    {!!date && (
      <AvailableSessionDurationPicker
        isLoading={!duration && isLoading}
        availability={availability}
        onChange={onDurationChange}
        value={duration}
      />
    )}
    {!!duration && (
      <TimeSlotPickerSection>
        <AvailableSessionTimeSlotPicker
          isLoading={isLoading}
          availability={availability}
          onChange={onTimeSlotChange}
          value={timeSlot}
        />
      </TimeSlotPickerSection>
    )}
  </AvailabilityStepContainer>
)

const AvailabilityStepFooter: FC<AvailabilityStepFooterProps> = ({
  timeSlot,
  onContinue,
}) => {
  const router = useRouter()
  const user = useCurrentUser()
  const { t } = useTranslation(LocaleNamespace.MobileCheckout)

  const isGuest = isGuestUser(user)

  const signupLink = urlJoinWithQuery('/signup', {
    as: 'consumer',
    authReason: AuthReason.SessionBooking,
    redirectTo: router.asPath,
  })

  return isGuest ? (
    <Link href={signupLink}>
      <StepButton
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        disabled={!timeSlot}
      >
        {t('continueButtonLabel')}
      </StepButton>
    </Link>
  ) : (
    <StepButton
      variant="contained"
      color="secondary"
      size="large"
      fullWidth
      onClick={onContinue}
      disabled={!timeSlot}
    >
      {t('continueButtonLabel')}
    </StepButton>
  )
}

export const AvailabilityStep = {
  Header: AvailabilityStepHeader,
  Body: AvailabilityStepBody,
  Footer: AvailabilityStepFooter,
}
