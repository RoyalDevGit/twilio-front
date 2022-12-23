import { FC } from 'react'
import { DateTime } from 'luxon'
import { useTranslation } from 'next-i18next'
import { useTheme } from '@emotion/react'

import {
  ActionSection,
  AvatarSection,
  DetailsSection,
  SessionCardContainer,
  SessionCardAvatar,
  SessionCardContent,
  SessionTime,
  OtherParticipantName,
  DetailsButton,
  MessageContainer,
  MessageContainerText,
} from 'components/Calendar/SessionCard/styles'
import { Session } from 'interfaces/Session'
import { User } from 'interfaces/User'
import { getUserPictureUrl } from 'utils/user/getUserPictureUrl'
import { getUserFullName } from 'utils/user/getUserFullName'
import { Link } from 'components/Link'
import { isSessionJoinable } from 'utils/sessions/isSessionJoinable'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Button } from 'components/Button'
import { Expert } from 'interfaces/Expert'
import { isPaymentUpdateNeeded } from 'utils/sessions/isPaymentUpdateNeeded'
import { CalendarMessageIcon } from 'icons/Calendar/Message/CalendarMessageIcon'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

interface SessionCardProps {
  sessionUser: User
  session: Session
}

export const SessionCard: FC<React.PropsWithChildren<SessionCardProps>> = ({
  sessionUser,
  session,
}) => {
  const { t } = useTranslation(LocaleNamespace.SessionCard)
  const startTime = DateTime.fromISO(session.startDate.date)
  const endTime = startTime.plus({ minutes: session.duration })
  const { joinable } = isSessionJoinable(session)
  const expert = session.expert as Expert
  const paymentUpdateNeeded = isPaymentUpdateNeeded(session)
  const theme = useTheme()
  const isDarkMode = usePrefersDarkMode()

  return (
    <SessionCardContainer
      style={{
        background: isDarkMode ? theme.palette.background.paper : 'white',
        border: isDarkMode
          ? theme.customComponents.calendar.sessionCard.sessionCard
              ?.styleOverrides?.border
          : 'white',
      }}
    >
      <SessionCardContent>
        <AvatarSection>
          <Link href={`/experts/${expert.id}`}>
            <SessionCardAvatar
              firstName={sessionUser.firstName}
              lastName={sessionUser.lastName}
              src={getUserPictureUrl(sessionUser)}
              width={45}
              height={45}
            />
          </Link>
        </AvatarSection>
        <DetailsSection>
          {startTime.weekdayShort}, {startTime.monthLong}, {startTime.day}
          <SessionTime>{`${startTime.toLocaleString(
            DateTime.TIME_SIMPLE
          )} - ${endTime.toLocaleString(DateTime.TIME_SIMPLE)}`}</SessionTime>
          <OtherParticipantName href={`/experts/${expert.id}`}>
            {getUserFullName(sessionUser)}
          </OtherParticipantName>
          <Link href={`/schedule/sessions/${session.id}`}>
            <MessageContainer>
              <CalendarMessageIcon />{' '}
              <MessageContainerText>
                Message {expert.user.firstName}
              </MessageContainerText>
            </MessageContainer>
          </Link>
        </DetailsSection>
        <ActionSection>
          {paymentUpdateNeeded && (
            <Link href={`/sessions/${session.id}/update-payment`}>
              <Button fullWidth variant="contained" color="primary">
                {t('updatePaymentMethodButton')}
              </Button>
            </Link>
          )}
          {!paymentUpdateNeeded && (
            <>
              {joinable ? (
                <Link href={`/sessions/${session.id}/room`}>
                  <Button variant="contained" color="primary">
                    {t('joinButton')}
                  </Button>
                </Link>
              ) : (
                <Link href={`/schedule/sessions/${session.id}`}>
                  <DetailsButton variant="contained" color="primary">
                    {t('seeDetailsButton')}
                  </DetailsButton>
                </Link>
              )}
            </>
          )}
          <Link href={`/schedule/sessions/${session.id}`}>
            <Button variant="text" style={{ fontWeight: 'bold' }}>
              {t('modifyLabel')}
            </Button>
          </Link>
        </ActionSection>
      </SessionCardContent>
    </SessionCardContainer>
  )
}
