import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'

import { Calendar } from 'components/Calendar'
import { Session } from 'interfaces/Session'
import { SessionApi } from 'apis/SessionApi'
import { ConsumerSchedulePage } from 'pageComponents/Schedule'
import { CalendarContainer } from 'components/Calendar/styles'
import { useCurrentUser } from 'hooks/useCurrentUser'
import { UserRole } from 'interfaces/User'

export interface CalendarPageProps {
  initialSessions: Session[]
}

export const CalendarPage: NextPage<CalendarPageProps> = ({
  initialSessions,
}) => {
  const user = useCurrentUser()
  const [sessions, setSessions] = useState(initialSessions)
  const [refreshCalendar, setRefreshCalendar] = useState(false)
  const loadData = async (fromDate?: DateTime, toDate?: DateTime) => {
    const sessionsResult = await SessionApi.query({
      limit: 31,
      from: fromDate ? fromDate : DateTime.now().startOf('month'),
      to: toDate ? toDate : DateTime.now().plus({ months: 1 }).endOf('month'),
      page: 1,
      sort: 'session.startDate.date',
      sortDirection: 'desc',
    })

    const sessionsFetch = await sessionsResult.getData()
    setSessions(sessionsFetch.items)
  }

  useEffect(() => {
    if (!refreshCalendar) {
      return
    }
    setRefreshCalendar(false)
    const callLoad = async () => await loadData()
    callLoad()
  }, [refreshCalendar])

  return (
    <ConsumerSchedulePage>
      <CalendarContainer>
        <Calendar
          sessions={sessions}
          onMonthChange={loadData}
          instanceUse={
            user?.roles?.indexOf(UserRole.Expert) !== -1 ? 'Expert' : 'Consumer'
          }
        />
      </CalendarContainer>
    </ConsumerSchedulePage>
  )
}
