import { useTranslation } from 'next-i18next'
import {
  useRosterState,
  RosterAttendeeType,
} from 'amazon-chime-sdk-component-library-react'
import { FC, useCallback, useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip'

import { Session } from 'interfaces/Session'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { SessionApi } from 'apis/SessionApi'
import {
  MeetingControlButton,
  MeetingControl,
} from 'pageComponents/SessionRoom/MeetingControls/styles'
import { RecordingOnIcon } from 'icons/RecordingOn'
import { RecordingOffIcon } from 'icons/RecordingOff'

export interface RecordingControlProps {
  session: Session
}

const isAttendeeMediaPipeline = (attendee: RosterAttendeeType) =>
  attendee.externalUserId?.toLowerCase().includes('mediapipeline')

export const RecordingControl: FC<RecordingControlProps> = ({ session }) => {
  const { t } = useTranslation([LocaleNamespace.SessionRoom])

  const [isRecording, setIsRecording] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const { roster } = useRosterState()

  const attendees = Object.values(roster) as RosterAttendeeType[]

  useEffect(() => {
    if (isUpdating) {
      return
    }
    const newIsRecording = attendees.some((attendee) =>
      isAttendeeMediaPipeline(attendee)
    )
    setIsRecording(newIsRecording)
  }, [attendees.length])

  const toggleRecording = useCallback(async () => {
    try {
      setIsUpdating(true)
      if (isRecording) {
        setIsRecording(false)
        await SessionApi.stopRecording(session.id)
        return
      }
      setIsRecording(true)
      await SessionApi.startRecording(session.id)
    } finally {
      setIsUpdating(false)
    }
  }, [isRecording])

  return (
    <MeetingControl>
      <Tooltip
        title={isRecording ? t('stopRecording') : t('startRecording')}
        placement="top"
      >
        <MeetingControlButton onClick={toggleRecording}>
          {isRecording ? <RecordingOnIcon /> : <RecordingOffIcon />}
        </MeetingControlButton>
      </Tooltip>
    </MeetingControl>
  )
}
