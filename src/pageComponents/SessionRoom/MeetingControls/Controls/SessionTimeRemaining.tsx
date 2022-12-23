import { DateTime } from 'luxon'
import { FC, useEffect, useState } from 'react'

import {
  SessionTimeRemainingContainer,
  SessionTimeRemainingTimer,
  SessionTimeRemainingTitle,
} from 'pageComponents/SessionRoom/MeetingControls/styles'
import { Session } from 'interfaces/Session'

interface SessionTimeRemainingProps {
  session: Session
  onEnd: () => unknown
}

export const SessionTimeRemaining: FC<SessionTimeRemainingProps> = ({
  session,
  onEnd,
}) => {
  const [minutesRemaining, setMinutesRemaining] = useState(0)
  const [secondsRemaining, setSecondsRemaining] = useState(0)

  useEffect(() => {
    const endDateTime = DateTime.fromISO(session.endDate.date)
    const initialTimeDiff = endDateTime.diffNow(['minutes', 'seconds'])
    const countdown = (minutes: number, seconds: number) => {
      setMinutesRemaining(minutes)
      setSecondsRemaining(Math.floor(seconds))
    }

    const remainingMinutes = initialTimeDiff.minutes
    const remainingSeconds = Math.floor(initialTimeDiff.seconds)

    countdown(remainingMinutes, remainingSeconds)
    const interval = setInterval(async () => {
      const { milliseconds: millisLeft } = endDateTime.diffNow()
      const newTimeDiff = endDateTime.diffNow([
        'minutes',
        'seconds',
        'milliseconds',
      ])

      countdown(newTimeDiff.minutes, newTimeDiff.seconds)

      if (millisLeft <= 0) {
        clearInterval(interval)
        onEnd()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [session])

  return (
    <SessionTimeRemainingContainer>
      <SessionTimeRemainingTitle>Remaining</SessionTimeRemainingTitle>
      <SessionTimeRemainingTimer>{`${minutesRemaining}:${
        secondsRemaining >= 10 ? secondsRemaining : `0${secondsRemaining}`
      }`}</SessionTimeRemainingTimer>
    </SessionTimeRemainingContainer>
  )
}
