import React, { useCallback, useEffect, useId, useState } from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { closeSnackbar, CustomContentProps } from 'notistack'
import { useMount } from 'react-use'
import { DateTime } from 'luxon'

import {
  MainSection,
  ActionSection,
  IconSection,
  TextSection,
  HoursText,
  UpcomingSessionSection,
  HoursSection,
  DurationSection,
} from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionExpert/styles'
import { SessionExtensionIcon } from 'icons/SessionExtension'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  NegativeResponseButton,
  PositiveResponseButton,
  SnackBody,
} from 'pageComponents/SessionRoom/ExtensionPrompts/styles'
import {
  NotificationsSnackbar,
  NotificationsCard,
} from 'components/Snacks/styles'
import { Session, SessionStatus } from 'interfaces/Session'
import { SessionExtensionRequest } from 'interfaces/SessionExtensionRequest'
import { SessionApi } from 'apis/SessionApi'
import { getOtherSessionUser } from 'utils/sessions/getOtherSessionUser'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { humanizeMinutes } from 'utils/duration/humanizeMinutes'
import { ExpertInstantAvailability } from 'interfaces/ExpertAvailability'

interface ExtendSessionExpertSnackProps extends CustomContentProps {
  session: Session
  availability: ExpertInstantAvailability
  extensionRequest?: SessionExtensionRequest
}

export const ExtendSessionExpertSnack = React.forwardRef<
  HTMLDivElement,
  ExtendSessionExpertSnackProps
>(({ session, extensionRequest, availability, ...props }, ref) => {
  const { t } = useTranslation(LocaleNamespace.ExtensionPrompts)
  const id = useId()
  const user = useCurrentUserAsserted()

  const [selectedDuration, setSelectedDuration] = useState<number>(0)
  const [upcomingSession, setUpcomingSession] = useState<Session | undefined>()

  useEffect(() => {
    if (selectedDuration || !availability.durations.length) {
      return
    }
    setSelectedDuration(availability.durations[0].minutes)
  }, [selectedDuration, availability])

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id)
  }, [props.id, closeSnackbar])

  useMount(() => {
    const loadUpcomingSession = async () => {
      const upcomingSessionsResult = await SessionApi.query({
        page: 1,
        limit: 1,
        status: [SessionStatus.NotStarted],
        from: DateTime.now(),
        to: DateTime.now().plus({ days: 1 }),
        sort: 'session.startDate.date',
        sortDirection: 'asc',
      })

      if (!upcomingSessionsResult.ok()) {
        return
      }

      const resultSet = await upcomingSessionsResult.getData()
      if (!resultSet.items.length) {
        return
      }
      setUpcomingSession(resultSet.items[0])
    }
    loadUpcomingSession()
  })

  const handlePositiveResponse = async () => {
    if (!selectedDuration) {
      return
    }
    if (extensionRequest) {
      await SessionApi.acceptSessionExtensionRequest(
        extensionRequest.session.id,
        {
          maxDuration: selectedDuration,
        }
      )
    } else {
      await SessionApi.createSessionExtensionRequest(session.id, {
        maxDuration: selectedDuration,
      })
    }

    handleDismiss()
  }

  const handleNegativeResponse = async () => {
    if (extensionRequest) {
      await SessionApi.declineSessionExtensionRequest(
        extensionRequest.session.id
      )
    }
    handleDismiss()
  }

  const otherUser = extensionRequest
    ? getOtherSessionUser(user, extensionRequest.session)
    : null

  const renderUpcomingSession = () => {
    if (!upcomingSession) {
      return null
    }
    const sessionStartDate = DateTime.fromISO(upcomingSession.startDate.date)
    return (
      <UpcomingSessionSection>
        <HoursSection>
          <Typography variant="body2">{t('upcomingSessionIn')} </Typography>
          <HoursText variant="body2">{sessionStartDate.toRelative()}</HoursText>
        </HoursSection>
      </UpcomingSessionSection>
    )
  }

  return (
    <NotificationsSnackbar ref={ref} role="alert" {...props} id={id}>
      <NotificationsCard>
        <SnackBody>
          <MainSection>
            <IconSection>
              <SessionExtensionIcon />
            </IconSection>
            <TextSection>
              <Typography variant="body2">
                {extensionRequest
                  ? t('consumerRequestedExtension', {
                      name: otherUser?.firstName,
                    })
                  : t('sessionAboutToExpire')}
              </Typography>
              <Typography variant="subtitle1">
                {t(extensionRequest ? 'acceptOffer' : 'extendSessionOffer')}
              </Typography>
              {renderUpcomingSession()}
              <DurationSection>
                <Typography variant="body2">{t('durationUpTo')}</Typography>
                <Select
                  value={selectedDuration}
                  MenuProps={{ style: { zIndex: 1600 } }}
                  onChange={(event) => {
                    setSelectedDuration(+(event.target.value as number))
                  }}
                >
                  {availability.durations.map((duration) => {
                    const humanizedMinutes = humanizeMinutes(duration.minutes)
                    return (
                      <MenuItem value={duration.minutes} key={duration.minutes}>
                        {humanizedMinutes.value} {humanizedMinutes.unit}
                      </MenuItem>
                    )
                  })}
                </Select>
              </DurationSection>
            </TextSection>
          </MainSection>
        </SnackBody>
        <ActionSection>
          <PositiveResponseButton
            disabled={!selectedDuration}
            onClick={handlePositiveResponse}
          >
            {t(extensionRequest ? 'acceptButton' : 'offerButton')}
          </PositiveResponseButton>
          <NegativeResponseButton onClick={handleNegativeResponse}>
            {t(extensionRequest ? 'declineButton' : 'cancelButton')}
          </NegativeResponseButton>
        </ActionSection>
      </NotificationsCard>
    </NotificationsSnackbar>
  )
})

ExtendSessionExpertSnack.displayName = 'ExtendSessionExpertSnack'
