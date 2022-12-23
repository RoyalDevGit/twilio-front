import { NextPage } from 'next'
import { useState } from 'react'
import { DateTime } from 'luxon'
import { useTranslation } from 'next-i18next'

import { SessionCard } from 'components/SessionCard'
import {
  ConsumerSchedulePage,
  ConsumerSchedulePageProps,
} from 'pageComponents/Schedule'
import {
  NoSessionBookedLabelBox,
  NoSessionsBookedButton,
  NoSessionsBookedContainer,
  NoSessionsBookedLabel,
  SessionsContainer,
} from 'pageComponents/Schedule/SessionList/styles'
import { Session, SessionStatus } from 'interfaces/Session'
import { QueryResponse } from 'interfaces/Query'
import { QueryResponsePagination } from 'components/QueryResponsePagination'
import { SessionApi } from 'apis/SessionApi'
import { useApiPagination } from 'hooks/useApiPagination'
import { CancelSessionDialog } from 'components/Dialogs/CancelSessionDialog'
import { RescheduleSessionDialog } from 'components/Dialogs/RescheduleSessionDialog'
import { PageContainer } from 'components/PageContainer/styles'
import { CalendarCross } from 'icons/CalendarCross'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Link } from 'components/Link'
import { MessagingChannel } from 'interfaces/MessagingChannel'
import { ResponsiveChatPopup } from 'components/Messaging/ResponsiveChatPopup'

export interface SessionListPageProps extends ConsumerSchedulePageProps {
  mode: 'upcoming' | 'past' | 'cancelled'
  initialSessionsResult: QueryResponse<Session>
  status?: SessionStatus[]
  from?: string
  to?: string
  minEndDate?: string
  sort?: string
  sortDirection?: 'asc' | 'desc'
}

export const SessionListPage: NextPage<SessionListPageProps> = ({
  mode,
  initialSessionsResult,
  status,
  from,
  to,
  minEndDate,
  sort,
  sortDirection,
  ...props
}) => {
  const { t } = useTranslation(LocaleNamespace.SessionList)
  const sessionPagination = useApiPagination<Session>({
    initialValue: initialSessionsResult,
    dataFetcher: async (page, limit) => {
      const sessionsResult = await SessionApi.query({
        page,
        limit,
        status,
        from: from ? DateTime.fromISO(from) : undefined,
        to: to ? DateTime.fromISO(to) : undefined,
        minEndDate: minEndDate ? DateTime.fromISO(minEndDate) : undefined,
        sort,
        sortDirection,
      })

      const paginationResult = await sessionsResult.getData()
      return paginationResult
    },
  })

  const [onCancelSession, setOnCancelSession] = useState(false)
  const [open, setOpen] = useState(false)
  const [sessions, setSessions] = useState(sessionPagination.value?.items)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)

  const handleClickOpen = (session: Session) => {
    setSelectedSession(session)
    setOpen(true)
  }

  const handleCancelSessionClick = (session: Session) => {
    setSelectedSession(session)
    setOnCancelSession(true)
  }

  const handleClose = () => {
    setOpen(false)
    setOnCancelSession(false)
  }

  const setRescheduledSession = (session: Session) => {
    setSelectedSession(session)
    setSessions((prevSessions) => {
      if (prevSessions) {
        const prevSessionIndex = prevSessions.findIndex(
          (s) => s.id === session.id
        )
        if (prevSessionIndex > -1) {
          prevSessions[prevSessionIndex] = session
          return prevSessions.sort((a, b) => {
            const dateA = DateTime.fromISO(a.startDate.date)
            const dateB = DateTime.fromISO(b.startDate.date)
            return dateA.diff(dateB).toMillis()
          })
        }
      }
      return prevSessions
    })
  }

  const removeCanceledSession = (session: Session) => {
    setSessions((prevSessions) => {
      if (prevSessions) {
        return prevSessions.filter((s) => s.id !== session.id)
      }
      return prevSessions
    })
  }

  let emptyStateLabel = ''
  switch (mode) {
    case 'upcoming':
      emptyStateLabel = t('noUpcomingSessions')
      break
    case 'past':
      emptyStateLabel = t('noPastSessions')
      break
    case 'cancelled':
      emptyStateLabel = t('noCancelledSessions')
      break
  }

  const [openMessage, setOpenMessage] = useState(false)

  const [selectedChannel, setSelectedChannel] = useState<
    MessagingChannel | undefined
  >()

  const handleMessageSend = (channel: MessagingChannel) => {
    setSelectedChannel(channel)
    setOpenMessage(true)
  }

  const noSessionsBooked = (
    <NoSessionsBookedContainer>
      <CalendarCross />
      <NoSessionBookedLabelBox>
        <NoSessionsBookedLabel variant="h6">
          {emptyStateLabel}
        </NoSessionsBookedLabel>
        <Link href="/explore">
          <NoSessionsBookedButton color="primary" variant="outlined">
            {t('browseExpertsButtonLabel')}
          </NoSessionsBookedButton>
        </Link>
      </NoSessionBookedLabelBox>
    </NoSessionsBookedContainer>
  )

  return (
    <ConsumerSchedulePage {...props}>
      <PageContainer>
        <SessionsContainer maxWidth="laptop">
          {sessions && sessions.length ? (
            <>
              {sessions.map((session) => (
                <SessionCard
                  session={session}
                  key={session.id}
                  onOpenMenu={handleClickOpen}
                  onCancelSession={handleCancelSessionClick}
                  onMessageSend={handleMessageSend}
                />
              ))}

              <QueryResponsePagination
                queryResponse={sessionPagination.value}
                onPageChange={sessionPagination.onPageChange}
                onRowsPerPageChange={sessionPagination.onRowsPerPageChange}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </>
          ) : (
            noSessionsBooked
          )}
          <RescheduleSessionDialog
            session={selectedSession}
            open={open}
            onClose={handleClose}
            onSessionReschedule={setRescheduledSession}
          />
          <CancelSessionDialog
            session={selectedSession}
            open={onCancelSession}
            onClose={handleClose}
            onCancellation={removeCanceledSession}
            onRescheduling={() => setOpen(true)}
          />
        </SessionsContainer>
      </PageContainer>
      <ResponsiveChatPopup
        open={openMessage}
        channel={selectedChannel}
        onClose={() => setOpenMessage(false)}
        onTransitionEnd={() => setSelectedChannel(undefined)}
      />
    </ConsumerSchedulePage>
  )
}
