import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import { DateTime } from 'luxon'

import {
  UpcomingAppointmentContent,
  UpcomingAppointmentButton,
  UpcomingAppointment,
  ExpertAvatarContainer,
  CustomUserAvatar,
  UpcomingAppointmentInformation,
  ActionContainer,
  UpcomingAppointmentDateTime,
  ExpertiseTitle,
  UpcomingAppointmentContentBox,
} from 'components/UpcomingAppointmentCard/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Session } from 'interfaces/Session'
import { User } from 'interfaces/User'
import { Expert } from 'interfaces/Expert'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { Link } from 'components/Link'
import { isSessionJoinable } from 'utils/sessions/isSessionJoinable'
import { isPaymentUpdateNeeded } from 'utils/sessions/isPaymentUpdateNeeded'

export interface UpcomingAppointmentCardProps {
  session: Session
}

export const UpcomingAppointmentCard: FC<
  React.PropsWithChildren<UpcomingAppointmentCardProps>
> = ({ session }) => {
  const { t } = useTranslation(LocaleNamespace.UpcomingAppointmentCard)
  const user = useCurrentUserAsserted()
  const consumer = session.consumer as User
  const expert = session.expert as Expert

  let displayUser: User
  let currentUserIsExpert = false
  if (user.id === consumer.id) {
    displayUser = expert.user
    currentUserIsExpert = true
  } else {
    displayUser = consumer
  }

  const sessionDate = DateTime.fromISO(session.startDate.date).toLocaleString(
    DateTime.DATE_MED_WITH_WEEKDAY
  )

  const sessionStartTime = DateTime.fromISO(session.startDate.date).toFormat(
    'h:mm a'
  )

  const sessionEndTime = DateTime.fromISO(session.startDate.date)
    .plus({ minutes: session.duration })
    .toFormat('h:mm a')

  const { joinable } = isSessionJoinable(session)
  const paymentUpdateNeeded = isPaymentUpdateNeeded(session)

  return (
    <UpcomingAppointment>
      <UpcomingAppointmentContent>
        <UpcomingAppointmentContentBox>
          <ExpertAvatarContainer>
            <CustomUserAvatar
              firstName={displayUser.firstName}
              lastName={displayUser.lastName}
              src={getUserProfilePictureUrl(displayUser)}
              width={85}
              height={85}
            />
          </ExpertAvatarContainer>
          <UpcomingAppointmentInformation>
            <Typography variant="h5" fontWeight={500}>
              {displayUser.firstName} {displayUser.lastName}
            </Typography>
            {!!currentUserIsExpert && (
              <ExpertiseTitle>{expert.mainAreaOfExpertise}</ExpertiseTitle>
            )}
            <UpcomingAppointmentDateTime>
              {sessionDate}
            </UpcomingAppointmentDateTime>
            <UpcomingAppointmentDateTime>
              {sessionStartTime} - {sessionEndTime}
            </UpcomingAppointmentDateTime>
          </UpcomingAppointmentInformation>
        </UpcomingAppointmentContentBox>
        <ActionContainer>
          {paymentUpdateNeeded && (
            <Link href={`/sessions/${session.id}/update-payment`}>
              <UpcomingAppointmentButton
                fullWidth
                variant="contained"
                color="secondary"
              >
                {t('updatePaymentMethodButton')}
              </UpcomingAppointmentButton>
            </Link>
          )}
          {!paymentUpdateNeeded && (
            <>
              {joinable ? (
                <Link href={`/sessions/${session.id}/room`}>
                  <UpcomingAppointmentButton
                    fullWidth
                    variant="contained"
                    color="secondary"
                  >
                    {t('joinButton')}
                  </UpcomingAppointmentButton>
                </Link>
              ) : (
                <Link href={`/schedule/sessions/${session.id}`}>
                  <UpcomingAppointmentButton
                    size="small"
                    fullWidth
                    variant="contained"
                    color="secondary"
                  >
                    {t('seeDetailsButton')}
                  </UpcomingAppointmentButton>
                </Link>
              )}
            </>
          )}
        </ActionContainer>
      </UpcomingAppointmentContent>
    </UpcomingAppointment>
  )
}
