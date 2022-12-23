import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { ReactNode, useState } from 'react'
import { DateTime } from 'luxon'
import MenuItem from '@mui/material/MenuItem'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useMount, useUnmount } from 'react-use'

import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { AppShell } from 'components/AppShell'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import {
  DateCardBox,
  CustomUserAvatar,
  ExpertName,
  SessionInformationSection,
  RecordingsSection,
  SessionDateContainer,
  SessionDetailsBody,
  SessionDetailsButtonBox,
  SessionDetailsButtons,
  SessionDetailsChatContainer,
  SessionDetailsContainer,
  SessionDetailsDivider,
  SessionDetailsHeader,
  SessionDetailsPageContainer,
  SessionDetailsTitle,
  SessionInformation,
  SessionLabels,
  BadgeSection,
  TitleSection,
  CheckInButton,
  ActionLink,
  ExpertSection,
  ExpertInformation,
  ExpertiseText,
  ActionSection,
  SessionDetailsSection,
  SessionCostSection,
  SessionCostAndNotesLabel,
  SessionCostValue,
  SessionNotesSection,
  SessionNotes,
  SessionCardMenu,
  ActionMenu,
  SessionMenuSection,
} from 'pageComponents/Schedule/SessionDetails/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { CalendarIcon } from 'icons/Calendar/Standard'
import { ClockIcon } from 'icons/Clock'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { SessionChatHistory } from 'pageComponents/Schedule/SessionChatHistory'
import { SessionRecording } from 'components/SessionRecording'
import { Session, SessionStatus } from 'interfaces/Session'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'
import { Link } from 'components/Link'
import { RateSession } from 'components/RateSession'
import { Video } from 'interfaces/Video'
import { User } from 'interfaces/User'
import { Expert } from 'interfaces/Expert'
import { isSessionJoinable } from 'utils/sessions/isSessionJoinable'
import { SessionStatusBadge } from 'components/SessionStatusBadge'
import { AvatarSection } from 'components/Calendar/SessionCard/styles'
import { KebabIcon } from 'icons/KebabIcon'
import { RescheduleSessionDialog } from 'components/Dialogs/RescheduleSessionDialog'
import { CancelSessionDialog } from 'components/Dialogs/CancelSessionDialog'
import { usePreventChatPopup } from 'hooks/usePreventChatPopup'
import { MobileChatModal } from 'components/Messaging/MobileChatModal'
import { isPaymentUpdateNeeded } from 'utils/sessions/isPaymentUpdateNeeded'

export interface SessionDetailsPageProps {
  session: Session
}

export const SessionDetails: NextPage<SessionDetailsPageProps> = ({
  session,
}) => {
  const { t } = useTranslation(LocaleNamespace.SessionDetails)
  const user = useCurrentUserAsserted()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [rescheduleDialogIsOpen, setRescheduleDialogIsOpen] = useState(false)
  const [cancelDialogIsOpen, setCancelDialogIsOpen] = useState(false)
  const [detailedSession, setDetailedSession] = useState(session)
  const openMenu = Boolean(anchorEl)
  const { preventChatPopup, allowChatPopup } = usePreventChatPopup()

  useMount(() => {
    preventChatPopup(session.messagingChannel)
  })

  useUnmount(() => {
    allowChatPopup(session.messagingChannel)
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))
  const [openMessage, setOpenMessage] = useState(false)

  const openChat = () => {
    setOpenMessage(true)
  }

  const closeChat = () => {
    setOpenMessage(false)
  }

  const handleOpenMessage = () => {
    if (openChat) {
      openChat()
    }
  }

  const handleReschedule = () => {
    setAnchorEl(null)
    setRescheduleDialogIsOpen(true)
  }

  const handleCancel = () => {
    setAnchorEl(null)
    setCancelDialogIsOpen(true)
  }

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDialogClose = () => {
    setRescheduleDialogIsOpen(false)
    setCancelDialogIsOpen(false)
  }

  const openRescheduleFromCancel = () => {
    handleDialogClose()
    setRescheduleDialogIsOpen(true)
  }

  let displayUserIsExpert = false
  const expert = detailedSession.expert as Expert
  const hourlyRate = expert.hourlyRate || 0
  const consumer = detailedSession.consumer as User

  const sessionCost =
    Math.ceil((hourlyRate * detailedSession.duration) / 60) || 0

  let displayUser: User
  if (user.id === consumer.id) {
    displayUser = expert.user
    displayUserIsExpert = true
  } else {
    displayUser = consumer
  }

  const paymentUpdateNeeded = isPaymentUpdateNeeded(detailedSession)

  const joinableResult = isSessionJoinable(detailedSession)

  const startDate = DateTime.fromISO(
    detailedSession.started || detailedSession.startDate.date
  )
  const endDate = DateTime.fromISO(
    detailedSession.ended || detailedSession.endDate.date
  )

  const formattedStartDate = startDate.toLocaleString(
    DateTime.DATE_MED_WITH_WEEKDAY
  )
  const formattedStartTime = startDate.toFormat('h:mm a')
  const formattedEndTime = endDate.toFormat('h:mm a')

  const recordings = detailedSession.recordings as Video[] | undefined
  const sessionEnded = joinableResult.reason === 'ended'
  const isUpcoming =
    !joinableResult.joinable && joinableResult.reason === 'too_early'

  let backLink: ReactNode
  let pageTitle: ReactNode
  if (detailedSession.status === SessionStatus.Active) {
    pageTitle = (
      <TitleSection>
        <SessionDetailsTitle>
          {t('activeSessionTitle')}
          <Link href={`/experts/${expert.id}`}>
            {displayUser.firstName} {displayUser.lastName}
          </Link>
        </SessionDetailsTitle>
        <BadgeSection>
          <SessionStatusBadge session={detailedSession} />
        </BadgeSection>
      </TitleSection>
    )
    backLink = (
      <Link href={`/schedule/sessions/upcoming`}>
        <SessionDetailsButtons variant="text">
          {t('backToUpcomingLabel')}
        </SessionDetailsButtons>
      </Link>
    )
  } else if (isUpcoming) {
    pageTitle = (
      <TitleSection>
        <SessionDetailsTitle>
          {t('upcomingSessionTitle')}
          <Link href={`/experts/${expert.id}`}>
            {displayUser.firstName} {displayUser.lastName}
          </Link>
        </SessionDetailsTitle>
        <BadgeSection>
          <SessionStatusBadge session={detailedSession} />
        </BadgeSection>
      </TitleSection>
    )
    backLink = (
      <Link href={`/schedule/sessions/upcoming`}>
        <SessionDetailsButtons variant="text">
          {t('backToUpcomingLabel')}
        </SessionDetailsButtons>
      </Link>
    )
  } else {
    pageTitle = (
      <TitleSection>
        <SessionDetailsTitle>
          {t('pastSessionTitle')}
          <Link href={`/experts/${expert.id}`}>
            {displayUser.firstName} {displayUser.lastName}
          </Link>
        </SessionDetailsTitle>
        <BadgeSection>
          <SessionStatusBadge session={detailedSession} />
        </BadgeSection>
      </TitleSection>
    )
    backLink = (
      <Link href={`/schedule/sessions/past`}>
        <SessionDetailsButtons variant="text">
          {t('backToPastSessionsLabel')}
        </SessionDetailsButtons>
      </Link>
    )
  }

  return (
    <AppShell
      drawer={
        <ConsumerDrawer
          open={drawerIsOpen}
          onClose={handleDrawerMenuClose}
          onToggleClick={handleDrawerMenuClick}
        />
      }
      mobileNavigation={
        <ConsumerMobileNavigation onDrawerMenuClick={handleDrawerMenuClick} />
      }
      onDrawerMenuClick={handleDrawerMenuClick}
    >
      <SessionDetailsPageContainer>
        <SessionDetailsHeader>
          {pageTitle}
          <SessionDetailsButtonBox>
            {backLink}
            <SessionDetailsDivider orientation="vertical" flexItem />
            <Link href={`/schedule`}>
              <SessionDetailsButtons variant="text">
                {t('backToScheduleLabel')}
              </SessionDetailsButtons>
            </Link>
          </SessionDetailsButtonBox>
        </SessionDetailsHeader>

        <SessionDetailsBody>
          <SessionDetailsContainer chatHistory={false}>
            <AvatarSection>
              <Link href={`/experts/${expert.id}`}>
                <CustomUserAvatar
                  firstName={displayUser.firstName}
                  lastName={displayUser.lastName}
                  src={getUserProfilePictureUrl(displayUser)}
                  width={80}
                  height={80}
                />
              </Link>
            </AvatarSection>
            <SessionDetailsSection>
              <ExpertSection>
                <ExpertInformation>
                  <ExpertName
                    variant="h4"
                    href={`/experts/${expert.id}`}
                  >{`${displayUser.firstName} ${displayUser.lastName}`}</ExpertName>
                  {displayUserIsExpert && (
                    <ExpertiseText>
                      {t('expertIn', { expertise: expert.mainAreaOfExpertise })}
                    </ExpertiseText>
                  )}
                </ExpertInformation>
                <SessionDateContainer>
                  <DateCardBox>
                    <CalendarIcon />
                    <SessionInformation>
                      {formattedStartDate}
                    </SessionInformation>
                  </DateCardBox>
                  <DateCardBox>
                    <ClockIcon />
                    {!!formattedStartTime && !!formattedEndTime && (
                      <SessionInformation variant="subtitle1">
                        {`${formattedStartTime} - ${formattedEndTime}`}
                      </SessionInformation>
                    )}
                    {!formattedStartTime && !formattedEndTime && (
                      <SessionInformation variant="subtitle1">
                        {t('notStarted')}
                      </SessionInformation>
                    )}
                  </DateCardBox>
                </SessionDateContainer>
                <SessionCostSection>
                  <SessionCostAndNotesLabel>
                    {t('sessionCostLabel')}
                  </SessionCostAndNotesLabel>
                  <SessionCostValue>${sessionCost}</SessionCostValue>
                </SessionCostSection>
                {!!detailedSession.notes && (
                  <SessionNotesSection>
                    <SessionCostAndNotesLabel>
                      {t('sessionNotesLabel')}
                    </SessionCostAndNotesLabel>
                    <SessionNotes>{detailedSession.notes}</SessionNotes>
                  </SessionNotesSection>
                )}
              </ExpertSection>
              <SessionInformationSection>
                {sessionEnded && (
                  <>
                    <SessionDetailsDivider />
                    <SessionLabels>{t('pastSessionRateLabel')}</SessionLabels>
                    <RateSession session={detailedSession} />
                  </>
                )}
                {!!recordings?.length && (
                  <>
                    <SessionDetailsDivider />
                    <SessionLabels>{t('savedRecordingsLabel')}</SessionLabels>
                    {recordings?.map((recording) => (
                      <>
                        <RecordingsSection key={recording.id}>
                          <SessionRecording recording={recording} />
                        </RecordingsSection>
                      </>
                    ))}
                  </>
                )}
              </SessionInformationSection>
              {paymentUpdateNeeded && (
                <ActionSection>
                  <ActionLink
                    href={`/sessions/${detailedSession.id}/update-payment`}
                  >
                    <CheckInButton variant="contained" color="secondary">
                      {t('updatePaymentMethodButton')}
                    </CheckInButton>
                  </ActionLink>
                </ActionSection>
              )}
              {!paymentUpdateNeeded && (isUpcoming || joinableResult.joinable) && (
                <ActionSection>
                  {joinableResult.joinable && (
                    <ActionLink href={`/sessions/${detailedSession.id}/room`}>
                      <CheckInButton variant="contained" color="secondary">
                        {t('joinButton')}
                      </CheckInButton>
                    </ActionLink>
                  )}
                  {!joinableResult.joinable && (
                    <CheckInButton
                      disabled
                      variant="contained"
                      color="secondary"
                    >
                      {t('joinButton')}
                    </CheckInButton>
                  )}
                  {isMobile && (
                    <CheckInButton
                      variant="outlined"
                      color="primary"
                      onClick={handleOpenMessage}
                    >
                      {t('sendMessage')}
                    </CheckInButton>
                  )}
                </ActionSection>
              )}
            </SessionDetailsSection>
            {!joinableResult.joinable && joinableResult.reason === 'too_early' && (
              <SessionMenuSection>
                <SessionCardMenu onClick={handleMenuClick}>
                  <KebabIcon />
                </SessionCardMenu>
                <ActionMenu
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
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleReschedule}>
                    {t('sessionCard:rescheduleLabel')}
                  </MenuItem>
                  <MenuItem onClick={handleCancel}>
                    {t('sessionCard:cancelLabel')}
                  </MenuItem>
                </ActionMenu>
              </SessionMenuSection>
            )}
          </SessionDetailsContainer>
          {!isMobile && (
            <SessionDetailsChatContainer>
              <SessionChatHistory session={session} />
            </SessionDetailsChatContainer>
          )}
        </SessionDetailsBody>
        <RescheduleSessionDialog
          session={detailedSession}
          open={rescheduleDialogIsOpen}
          onClose={handleDialogClose}
          onSessionReschedule={setDetailedSession}
        />
        <CancelSessionDialog
          session={detailedSession}
          open={cancelDialogIsOpen}
          onClose={handleDialogClose}
          onCancellation={setDetailedSession}
          onRescheduling={openRescheduleFromCancel}
        />
      </SessionDetailsPageContainer>
      <MobileChatModal
        open={openMessage}
        channel={session.messagingChannel}
        onClose={closeChat}
      />
    </AppShell>
  )
}
