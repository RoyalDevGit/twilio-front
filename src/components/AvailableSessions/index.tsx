import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import { DateTime } from 'luxon'
import Stack from '@mui/material/Stack'

import {
  AvailabilityLoadingContainer,
  AvailabilitySectionHeader,
  AvailabilitySessionsHeader,
  AvailableSessionsContainer,
  BookSessionButton,
  ConnectWithExpertButton,
  NoAvailabilityContainer,
  NoAvailabilityTitle,
  CustomSkeleton,
} from 'components/AvailableSessions/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { AvailableSessionDatePicker } from 'components/AvailableSessions/AvailableSessionDatePicker'
import { AvailableSessionTimeSlotPicker } from 'components/AvailableSessions/AvailableSessionTimeSlotPicker'
import { AvailableSessionDurationPicker } from 'components/AvailableSessions/AvailableSessionDurationPicker'
import { Expert } from 'interfaces/Expert'
import { ExpertAvailability } from 'interfaces/ExpertAvailability'
import { ConnectNowIcon } from 'icons/ConnectNow'
import { SessionCheckoutHook } from 'hooks/api/commerce/useSessionCheckout'
import { useCurrentUser } from 'hooks/useCurrentUser'
import { isGuestUser } from 'utils/user/isGuestUser'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { useRouter } from 'hooks/useRouter'
import { Link } from 'components/Link'
import { AuthReason } from 'interfaces/AuthReason'

interface AvailableSessionsProps {
  expert: Expert
  sessionCheckout: SessionCheckoutHook
  availability?: ExpertAvailability
  date?: DateTime
  duration?: number
  timeSlot?: string
  onDateChange?: (date: DateTime) => unknown
  onDurationChange?: (duration: number) => unknown
  onTimeSlotChange?: (timeSlotId: string) => unknown
  onInstantSession?: () => unknown
  onBookingClick?: () => unknown
}

export const AvailableSessions: FC<AvailableSessionsProps> = ({
  expert,
  date,
  duration,
  timeSlot,
  availability,
  onDateChange,
  onDurationChange,
  onTimeSlotChange,
  onInstantSession,
  onBookingClick,
  sessionCheckout,
}) => {
  const { t } = useTranslation(LocaleNamespace.AvailableSessions)
  const router = useRouter()
  const user = useCurrentUser()
  const isGuest = isGuestUser(user)

  if (!availability) {
    return (
      <AvailabilityLoadingContainer>
        <Stack spacing={2}>
          <CustomSkeleton variant="rectangular" width={376} height={48} />
          <CustomSkeleton variant="rectangular" width={376} height={417} />
        </Stack>
      </AvailabilityLoadingContainer>
    )
  }

  const hasSessionAvailability = !!availability?.dates.length

  const renderConnectNowButton = () => {
    if (!hasSessionAvailability || !availability?.instant.durations.length) {
      return null
    }

    if (isGuest) {
      const signupLink = urlJoinWithQuery('/signup', {
        as: 'consumer',
        authReason: AuthReason.InstantSession,
        redirectTo: router.asPath,
      })
      return (
        <Link href={signupLink}>
          <ConnectWithExpertButton
            startIcon={<ConnectNowIcon />}
            type="submit"
            size="large"
            onClick={onInstantSession}
          >
            {t('connectWith', { expertFirstName: expert.user.firstName })}
          </ConnectWithExpertButton>
        </Link>
      )
    }

    return (
      <ConnectWithExpertButton
        startIcon={<ConnectNowIcon />}
        type="submit"
        size="large"
        onClick={onInstantSession}
      >
        {t('connectWith', { expertFirstName: expert.user.firstName })}
      </ConnectWithExpertButton>
    )
  }

  return (
    <>
      {renderConnectNowButton()}
      <AvailableSessionsContainer>
        {hasSessionAvailability && (
          <>
            <AvailabilitySessionsHeader>
              {t('availableDatesHeader')}
            </AvailabilitySessionsHeader>
            <AvailableSessionDatePicker
              isLoading={
                !sessionCheckout.selectedDate && sessionCheckout.isLoading
              }
              availability={availability}
              onChange={onDateChange}
              value={date}
            />

            {!!date && (
              <>
                <AvailabilitySectionHeader>
                  {t('availableDurationHeader')}
                </AvailabilitySectionHeader>
                <AvailableSessionDurationPicker
                  isLoading={
                    !sessionCheckout.selectedDuration &&
                    sessionCheckout.isLoading
                  }
                  availability={availability}
                  onChange={onDurationChange}
                  value={duration}
                />
              </>
            )}

            {!!duration && (
              <>
                <AvailabilitySectionHeader>
                  {t('availableTimesHeader')}
                </AvailabilitySectionHeader>
                <AvailableSessionTimeSlotPicker
                  isLoading={sessionCheckout.isLoading}
                  availability={availability}
                  onChange={onTimeSlotChange}
                  value={timeSlot}
                />
              </>
            )}
            <BookSessionButton
              state={
                timeSlot && sessionCheckout.isUpdating ? 'loading' : 'normal'
              }
              disabled={!timeSlot || sessionCheckout.isUpdating}
              onClick={onBookingClick}
              size="large"
              variant="contained"
              color="primary"
            >
              {date
                ? t('bookSessionOn', {
                    date: date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY),
                  })
                : t('bookSession')}
            </BookSessionButton>
          </>
        )}
        {!hasSessionAvailability && (
          <NoAvailabilityContainer>
            <NoAvailabilityTitle>
              {t('noAvailableTimesTitle')}
            </NoAvailabilityTitle>
            <Typography> {t('noAvailableTimesDescription')}</Typography>
          </NoAvailabilityContainer>
        )}
      </AvailableSessionsContainer>
    </>
  )
}
