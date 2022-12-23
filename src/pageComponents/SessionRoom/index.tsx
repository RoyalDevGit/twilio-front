import { NextPage } from 'next'
import {
  useMeetingManager,
  MeetingManagerJoinOptions,
  useMeetingStatus,
  MeetingStatus,
  DeviceLabels,
} from 'amazon-chime-sdk-component-library-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { motion } from 'framer-motion'
import { enqueueSnackbar, closeSnackbar, SnackbarKey } from 'notistack'
import { DateTime } from 'luxon'

import { Session } from 'interfaces/Session'
import { SessionApi } from 'apis/SessionApi'
import {
  SessionPageContainer,
  SessionRoomBody,
  PostSessionContainer,
  SessionRoomContainer,
  SessionChatContainer,
  SessionChatHeader,
  SessionRoomGrid,
  ExtendSessionButton,
} from 'pageComponents/SessionRoom/styles'
import { ApiError, ApiErrorCode } from 'utils/error/ApiError'
import { VideoTileGrid } from 'pageComponents/SessionRoom/VideoTileGrid'
import { MeetingControls } from 'pageComponents/SessionRoom/MeetingControls'
import { PostSessionRating } from 'pageComponents/SessionRoom/MeetingStates/PostSessionRating'
import { SessionExpired } from 'pageComponents/SessionRoom/MeetingStates/Expired'
import { SessionFailed } from 'pageComponents/SessionRoom/MeetingStates/Failed'
import { SessionLoading } from 'pageComponents/SessionRoom/MeetingStates/Loading'
import { SessionTerminalFailure } from 'pageComponents/SessionRoom/MeetingStates/TerminalFailure'
import { SessionJoinedAnotherDevice } from 'pageComponents/SessionRoom/MeetingStates/JoinedAnotherDevice'
import { SessionJoinedEarly } from 'pageComponents/SessionRoom/MeetingStates/JoinedEarly'
import { SessionJoinableResult } from 'utils/sessions/isSessionJoinable'
import { SessionCancelled } from 'pageComponents/SessionRoom/MeetingStates/Cancelled'
import { SessionTimeRemaining } from 'pageComponents/SessionRoom/MeetingControls/Controls/SessionTimeRemaining'
import { Chat } from 'components/Messaging/Chat'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { usePreventChatPopup } from 'hooks/usePreventChatPopup'
import { SessionExtensionIcon } from 'icons/SessionExtension'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { useUserSocket } from 'hooks/useUserSocket'
import { isSessionExpert } from 'utils/sessions/isSessionExpert'
import {
  SessionExtensionRequest,
  SessionExtensionRequestStatus,
} from 'interfaces/SessionExtensionRequest'
import { Config } from 'utils/config'
import { useExpertInstantSessionAvailability } from 'hooks/api/expert/useExpertInstantSessionAvailability'
import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'

const EXTEND_SESSION_PROMPT_WINDOW_BEGIN = Config.getDuration(
  'EXTEND_SESSION_PROMPT_WINDOW_BEGIN'
)
const EXTEND_SESSION_PROMPT_WINDOW_END = Config.getDuration(
  'EXTEND_SESSION_PROMPT_WINDOW_END'
)

const extendSessionPromptWindowBeginMs =
  EXTEND_SESSION_PROMPT_WINDOW_BEGIN.as('milliseconds')
const extendSessionPromptWindowEndMs =
  EXTEND_SESSION_PROMPT_WINDOW_END.as('milliseconds')

const ALLOW_CONSUMER_EXTEND_SESSION = Config.getBoolean(
  'ALLOW_CONSUMER_EXTEND_SESSION'
)

export interface SessionRoomPageProps {
  initialSession: Session
}

export const SessionRoomPage: NextPage<SessionRoomPageProps> = ({
  initialSession,
}) => {
  const { t } = useTranslation(LocaleNamespace.SessionRoom)
  // do not render on server side
  if (typeof window === 'undefined') {
    return null
  }

  const [session, setSession] = useState(initialSession)
  const activeSnackRef = useRef<SnackbarKey>()
  const meetingManager = useMeetingManager()
  const meetingStatus = useMeetingStatus()
  const user = useCurrentUserAsserted()

  const instantSessionAvailability = useExpertInstantSessionAvailability(
    session.expert as Expert,
    { ignoreActiveSession: true }
  )

  const { availability } = instantSessionAvailability

  const isExpert = isSessionExpert(session, user)

  const canExtendSession = ALLOW_CONSUMER_EXTEND_SESSION ? true : isExpert

  const [joinError, setJoinError] =
    useState<ApiError<SessionJoinableResult> | null>(null)
  const [isChatOpen, setChatIsOpen] = useState(false)
  const [totalSessionExtSnacks, setTotalExtSnacks] = useState(0)
  const [extendSessionWindowIsOpen, setExtendSessionWindowIsOpen] =
    useState(false)

  const handleChatToggle = useCallback(() => {
    setChatIsOpen(!isChatOpen)
  }, [isChatOpen])

  const { preventChatPopup, allowChatPopup } = usePreventChatPopup()

  const openChat = () => {
    setChatIsOpen(true)
  }

  const closeChat = () => {
    setChatIsOpen(false)
  }

  const queueSnack: typeof enqueueSnackbar = (options) => {
    if (activeSnackRef.current) {
      closeSnackbar(activeSnackRef.current)
    }

    setTotalExtSnacks((current) => current + 1)
    const key = enqueueSnackbar({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...options,
      onExited: () => {
        setTotalExtSnacks((current) => current - 1)
      },
    })
    activeSnackRef.current = key
    return key
  }

  const beginExtensionRequest = async (
    extensionRequest?: SessionExtensionRequest
  ) => {
    if (isSessionExpert(session, user)) {
      const availabilityResult = await ExpertApi.getInstantSessionAvailability(
        (session.expert as Expert).id,
        {
          ignoreActiveSession: true,
        }
      )
      const latestAvailability = await availabilityResult.getData()
      if (!latestAvailability?.durations.length) {
        return
      }
      queueSnack({
        variant: 'extendSessionExpert',
        persist: true,
        extensionRequest,
        session,
        availability: latestAvailability,
      })
    } else {
      queueSnack({
        variant: 'extendSessionConsumer',
        persist: true,
        extensionRequest,
        session,
      })
    }
  }

  const showPendingExtensionRequest = (
    extensionRequest: SessionExtensionRequest
  ) => {
    queueSnack({
      variant: 'extendSessionPending',
      persist: true,
      extensionRequest,
    })
  }

  const showExtensionRequestDeclined = (
    extensionRequest: SessionExtensionRequest
  ) => {
    queueSnack({
      variant: 'extendSessionDeclined',
      extensionRequest,
    })
  }

  const showExtensionAcceptance = (
    extensionRequest: SessionExtensionRequest
  ) => {
    if (isSessionExpert(session, user)) {
      queueSnack({
        variant: 'extendSessionPending',
        persist: true,
        extensionRequest,
      })
    } else {
      queueSnack({
        variant: 'extendSessionCheckout',
        persist: true,
        extensionRequest,
      })
    }
  }

  const showExtensionWithdrawal = (
    extensionRequest: SessionExtensionRequest
  ) => {
    queueSnack({
      variant: 'extendSessionWithdrawn',
      extensionRequest,
    })
  }

  const showExtensionCompletion = (
    extensionRequest: SessionExtensionRequest
  ) => {
    setSession(extensionRequest.session)
    queueSnack({
      variant: 'extendSessionSuccessful',
      extensionRequest,
    })
  }

  useUserSocket({
    onSessionExtensionCreated: (request) => {
      if (request.requester.id === user.id) {
        showPendingExtensionRequest(request)
      } else {
        beginExtensionRequest(request)
      }
    },
    onSessionExtensionDeclined: showExtensionRequestDeclined,
    onSessionExtensionAccepted: showExtensionAcceptance,
    onSessionExtensionWithdrawn: showExtensionWithdrawal,
    onSessionExtensionComplete: showExtensionCompletion,
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('laptop'))
  const ongoingSessionExtension = !!totalSessionExtSnacks

  const openExtensionWindowTimeoutRef = useRef<NodeJS.Timeout | undefined>(
    undefined
  )
  const closeExtensionWindowTimeoutRef = useRef<NodeJS.Timeout | undefined>(
    undefined
  )

  const clearSessionExtensionPrompts = () => {
    if (activeSnackRef.current) {
      closeSnackbar(activeSnackRef.current)
    }
    if (openExtensionWindowTimeoutRef.current) {
      clearTimeout(openExtensionWindowTimeoutRef.current)
    }
    if (closeExtensionWindowTimeoutRef.current) {
      clearTimeout(closeExtensionWindowTimeoutRef.current)
    }
  }

  const startExtensionCountdownWindowMonitor = () => {
    setExtendSessionWindowIsOpen(false)
    if (openExtensionWindowTimeoutRef.current) {
      clearTimeout(openExtensionWindowTimeoutRef.current)
    }
    if (closeExtensionWindowTimeoutRef.current) {
      clearTimeout(closeExtensionWindowTimeoutRef.current)
    }

    if (!canExtendSession || !availability?.durations.length) {
      return
    }

    const sessionEndDate = DateTime.fromISO(session.endDate.date)
    const { milliseconds: millisUntilEnd } = sessionEndDate.diff(DateTime.now())

    const millisUntilPrompt = millisUntilEnd - extendSessionPromptWindowBeginMs
    const millisUntilExtensionWindowClose =
      millisUntilEnd - extendSessionPromptWindowEndMs

    const windowIsOpen =
      millisUntilEnd <= extendSessionPromptWindowBeginMs &&
      millisUntilEnd > extendSessionPromptWindowEndMs

    const openExtensionWindow = () => {
      setExtendSessionWindowIsOpen(true)
      closeExtensionWindowTimeoutRef.current = setTimeout(() => {
        setExtendSessionWindowIsOpen(false)
      }, millisUntilExtensionWindowClose)
    }

    if (millisUntilPrompt > 0) {
      openExtensionWindowTimeoutRef.current = setTimeout(() => {
        beginExtensionRequest()
        openExtensionWindow()
      }, millisUntilPrompt)
    } else if (windowIsOpen) {
      openExtensionWindow()
    }
  }

  useEffect(startExtensionCountdownWindowMonitor, [session, availability])

  const handleEnd = async () => {
    await SessionApi.end(session.id)
    clearSessionExtensionPrompts()
  }

  const joinMeeting = async () => {
    meetingManager.getAttendee = async (chimeAttendeeId: string) => {
      const attendeeResult = await SessionApi.getAttendeeById(
        session.id,
        chimeAttendeeId
      )
      if (!attendeeResult.ok()) {
        return {
          name: '',
        }
      }
      const attendee = await attendeeResult.getData()

      return {
        name: `${attendee.user.firstName} ${attendee.user.lastName}`,
        user: attendee.user,
      }
    }
    const joinResult = await SessionApi.join(session.id)
    if (joinResult.ok()) {
      const joinInfo = await joinResult.getData()
      const meetingSessionConfiguration = new MeetingSessionConfiguration(
        joinInfo.session.currentChimeMeeting,
        joinInfo.attendee.chimeAttendee
      )
      const options: MeetingManagerJoinOptions = {
        enableWebAudio: true,
        deviceLabels: DeviceLabels.AudioAndVideo,
      }
      await meetingManager.join(meetingSessionConfiguration, options)

      // At this point you could let users setup their devices, or by default
      // the SDK will select the first device in the list for the kind indicated
      // by `deviceLabels` (the default value is DeviceLabels.AudioAndVideo)

      // Start the `MeetingSession` to join the meeting
      await meetingManager.start()
      meetingManager.audioVideo?.realtimeMuteLocalAudio()
    } else {
      const error =
        (await joinResult.getError()) as ApiError<SessionJoinableResult>
      setJoinError(error)
    }
  }

  const loadCurrentExtensionRequest = async () => {
    const result = await SessionApi.getCurrentSessionExtensionRequest(
      session.id
    )
    if (!result.ok()) {
      return
    }
    const extRequest = await result.getData()
    if (!extRequest) {
      return
    }
    switch (extRequest.status) {
      case SessionExtensionRequestStatus.Requested:
        if (extRequest.requester.id === user.id) {
          showPendingExtensionRequest(extRequest)
        } else {
          beginExtensionRequest(extRequest)
        }
        break
      case SessionExtensionRequestStatus.Accepted:
        showExtensionAcceptance(extRequest)
        break
    }
  }

  useEffect(() => {
    const handleMessageSnackClick = () => {
      openChat()
    }
    preventChatPopup(session.messagingChannel)
    joinMeeting()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.addEventListener('messageSnackClick', handleMessageSnackClick)

    loadCurrentExtensionRequest()

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.removeEventListener('messageSnackClick', handleMessageSnackClick)

      clearSessionExtensionPrompts()

      if (activeSnackRef.current) {
        closeSnackbar(activeSnackRef.current)
      }
      allowChatPopup(session.messagingChannel)
      meetingManager.leave()
    }
  }, [])

  const renderMeetingState = () => {
    if (joinError) {
      if (joinError.code === ApiErrorCode.Expired) {
        return (
          <SessionRoomContainer>
            <SessionExpired session={session} />
          </SessionRoomContainer>
        )
      }

      if (joinError.data) {
        if (joinError.data.reason === 'too_early') {
          return (
            <SessionRoomContainer>
              <SessionJoinedEarly />
            </SessionRoomContainer>
          )
        }

        if (joinError.data.reason === 'cancelled') {
          return (
            <SessionRoomContainer>
              <SessionCancelled session={session} />
            </SessionRoomContainer>
          )
        }

        if (
          joinError.data.reason === 'ended' ||
          joinError.data.reason === 'past'
        ) {
          return (
            <SessionRoomContainer>
              <SessionExpired session={session} />
            </SessionRoomContainer>
          )
        }
      }

      return (
        <SessionRoomContainer>
          <SessionTerminalFailure />
        </SessionRoomContainer>
      )
    }

    if (meetingStatus === MeetingStatus.Succeeded) {
      return (
        <>
          <SessionTimeRemaining session={session} onEnd={handleEnd} />
          <SessionRoomBody>
            <SessionRoomGrid isChatOpen={isChatOpen}>
              <VideoTileGrid />
              {!isMobile && (
                <motion.div
                  initial={false}
                  animate={{
                    width: isChatOpen ? 400 : 0,
                    opacity: isChatOpen ? 1 : 0,
                  }}
                  style={{ height: '100%', overflow: 'hidden' }}
                >
                  <SessionChatContainer>
                    <SessionChatHeader>
                      {t('sessionChatLabel')}
                    </SessionChatHeader>
                    <Chat
                      messageToolbarForceDark={true}
                      channel={session.messagingChannel}
                    />
                  </SessionChatContainer>
                </motion.div>
              )}
            </SessionRoomGrid>

            <MeetingControls
              session={session}
              isChatOpen={isChatOpen}
              onChatToggle={handleChatToggle}
              onChatOpen={openChat}
              onChatClose={closeChat}
              onEnd={handleEnd}
            />
          </SessionRoomBody>
          {canExtendSession && (
            <motion.div
              initial={false}
              animate={{
                right:
                  !extendSessionWindowIsOpen || ongoingSessionExtension
                    ? -100
                    : 0,
              }}
              style={{
                position: 'fixed',
                top: '24px',
                right: 0,
              }}
            >
              <ExtendSessionButton onClick={() => beginExtensionRequest()}>
                <SessionExtensionIcon />
              </ExtendSessionButton>
            </motion.div>
          )}
        </>
      )
    }

    if (meetingStatus === MeetingStatus.Ended) {
      return (
        <PostSessionContainer>
          <PostSessionRating session={session} exitReason="ended" />
        </PostSessionContainer>
      )
    }

    if (meetingStatus === MeetingStatus.Left) {
      return (
        <PostSessionContainer>
          <PostSessionRating session={session} exitReason="left" />
        </PostSessionContainer>
      )
    }

    if (meetingStatus === MeetingStatus.Failed) {
      return (
        <SessionRoomContainer>
          <SessionFailed />
        </SessionRoomContainer>
      )
    }

    if (meetingStatus === MeetingStatus.JoinedFromAnotherDevice) {
      return (
        <SessionRoomContainer>
          <SessionJoinedAnotherDevice />
        </SessionRoomContainer>
      )
    }

    if (meetingStatus === MeetingStatus.Loading) {
      return (
        <SessionRoomContainer>
          <SessionLoading />
        </SessionRoomContainer>
      )
    }
  }

  return <SessionPageContainer>{renderMeetingState()}</SessionPageContainer>
}
