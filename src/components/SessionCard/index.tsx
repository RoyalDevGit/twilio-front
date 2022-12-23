import { FC, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'
import Typography from '@mui/material/Typography'

import {
  AvatarLink,
  ExpertName,
  SessionCardContainer,
  CustomUserAvatar,
  SessionCardBody,
  SessionCardDate,
  SessionCardButton,
  SessionCardMenu,
  SessionCardDateContainer,
  SessionCardBox,
  SeeDetailsSection,
  ExpertNameSection,
  BadgeSection,
  CustomMenu,
  CustomLink,
} from 'components/SessionCard/styles'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { CalendarIcon } from 'icons/Calendar/Standard'
import { ClockIcon } from 'icons/Clock'
import { KebabIcon } from 'icons/KebabIcon'
import { CameraRecordingIcon } from 'icons/CameraRecording'
import { Link } from 'components/Link'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Session } from 'interfaces/Session'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'
import { Expert } from 'interfaces/Expert'
import { User } from 'interfaces/User'
import { isSessionJoinable } from 'utils/sessions/isSessionJoinable'
import { SessionStatusBadge } from 'components/SessionStatusBadge'
import { hasExpertRole } from 'utils/user/hasExpertRole'
import { MessagingChannel } from 'interfaces/MessagingChannel'
import { isPaymentUpdateNeeded } from 'utils/sessions/isPaymentUpdateNeeded'

interface SessionCardProps {
  onOpenMenu?: (session: Session) => unknown
  onCancelSession?: (session: Session) => unknown
  session: Session
  onMessageSend: (channel: MessagingChannel) => unknown
}

export const SessionCard: FC<SessionCardProps> = ({
  onOpenMenu,
  onCancelSession,
  session,
  onMessageSend,
}) => {
  const { t } = useTranslation(LocaleNamespace.SessionCard)
  const user = useCurrentUserAsserted()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const paymentUpdateNeeded = isPaymentUpdateNeeded(session)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleReschedule = () => {
    setAnchorEl(null)
    if (onOpenMenu) {
      onOpenMenu(session)
    }
  }
  const handleCancel = () => {
    setAnchorEl(null)
    if (onCancelSession) {
      onCancelSession(session)
    }
  }

  const handleOpenMessage = () => {
    if (onMessageSend) {
      onMessageSend(session.messagingChannel)
    }
  }

  const startDate = DateTime.fromISO(session.started || session.startDate.date)
  const endDate = DateTime.fromISO(session.ended || session.endDate.date)

  const formattedStartDate = startDate.toLocaleString(
    DateTime.DATE_MED_WITH_WEEKDAY
  )
  const formattedStartTime = startDate.toFormat('h:mm a')
  const formattedEndTime = endDate.toFormat('h:mm a')

  const expert = session.expert as Expert
  const consumer = session.consumer as User

  let isProfileClickable: boolean
  let displayUser: User
  if (user.id === consumer.id) {
    displayUser = expert.user
    isProfileClickable = true
  } else {
    displayUser = consumer
    isProfileClickable = hasExpertRole(displayUser)
  }

  const joinableResult = isSessionJoinable(session)

  return (
    <SessionCardContainer>
      <AvatarLink
        isclickable={isProfileClickable}
        linkTo={`/experts/${expert.id}`}
      >
        <CustomUserAvatar
          firstName={displayUser.firstName}
          lastName={displayUser.lastName}
          src={getUserProfilePictureUrl(displayUser)}
          width={80}
          height={80}
        />
      </AvatarLink>
      <SessionCardBody>
        <ExpertNameSection>
          <ExpertName
            isclickable={isProfileClickable}
            linkTo={`/experts/${expert.id}`}
          >
            <Typography variant="h5">
              {displayUser.firstName} {displayUser.lastName}
            </Typography>
          </ExpertName>
          <BadgeSection>
            <BadgeSection>
              <SessionStatusBadge session={session} />
            </BadgeSection>
          </BadgeSection>
        </ExpertNameSection>
        <SessionCardDateContainer>
          <SessionCardBox>
            <CalendarIcon />
            <SessionCardDate variant="subtitle1">
              {formattedStartDate}
            </SessionCardDate>
          </SessionCardBox>
          <SessionCardBox>
            <ClockIcon />
            {!!formattedStartTime && !!formattedEndTime && (
              <SessionCardDate variant="subtitle1">
                {`${formattedStartTime} - ${formattedEndTime}`}
              </SessionCardDate>
            )}
            {!formattedStartTime && !formattedEndTime && (
              <SessionCardDate variant="subtitle1">
                {t('notStarted')}
              </SessionCardDate>
            )}
          </SessionCardBox>
          {!!session.recordings?.length && (
            <SessionCardBox>
              <CameraRecordingIcon />
              <SessionCardDate variant="subtitle1">
                {t('recordingsLabel', {
                  totalRecordings: session.recordings.length,
                })}
              </SessionCardDate>
            </SessionCardBox>
          )}
        </SessionCardDateContainer>
      </SessionCardBody>
      {paymentUpdateNeeded && (
        <SeeDetailsSection>
          <Link href={`/sessions/${session.id}/update-payment`}>
            <SessionCardButton variant="contained" color="secondary">
              {t('updatePaymentMethodButton')}
            </SessionCardButton>
          </Link>
        </SeeDetailsSection>
      )}

      {!paymentUpdateNeeded && (
        <>
          {joinableResult.joinable && (
            <SeeDetailsSection>
              <Link href={`/sessions/${session.id}/room`}>
                <SessionCardButton variant="contained" color="secondary">
                  {t('joinButton')}
                </SessionCardButton>
              </Link>
            </SeeDetailsSection>
          )}
          {!joinableResult.joinable && joinableResult.reason !== 'too_early' && (
            <SeeDetailsSection>
              <Link href={`/schedule/sessions/${session.id}`}>
                <SessionCardButton variant="outlined" color="primary">
                  {t('seeDetailsButton')}
                </SessionCardButton>
              </Link>
            </SeeDetailsSection>
          )}
          {!joinableResult.joinable && joinableResult.reason === 'too_early' && (
            <>
              <SessionCardMenu onClick={handleClick}>
                <KebabIcon />
              </SessionCardMenu>
              <CustomMenu
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem>
                  <CustomLink href={`/schedule/sessions/${session.id}`}>
                    {t('seeSessionDetails')}
                  </CustomLink>
                </MenuItem>
                <MenuItem onClick={handleOpenMessage}>
                  {t('sendAMessageLabel')}
                </MenuItem>
                <MenuItem onClick={handleReschedule}>
                  {t('rescheduleLabel')}
                </MenuItem>
                <MenuItem onClick={handleCancel}>{t('cancelLabel')}</MenuItem>
              </CustomMenu>
            </>
          )}
        </>
      )}
    </SessionCardContainer>
  )
}
