import { FC, useState } from 'react'
import { DateTime } from 'luxon'

import {
  VideoDetailsBox,
  VideoIconButton,
  VideoRecordingContainer,
  VideoRecordingDetails,
  VideoRecordingThumbnail,
  SessionRecordingDialog,
  VideoPlayerBox,
  SessionRecordingVideoPlayer,
  VideoPlayerCloseButton,
  VideoCloseIcon,
} from 'components/SessionRecording/styles'
import { PlayIcon } from 'icons/Play'
import { Video } from 'interfaces/Video'
import { getVideoThumbnailUrl } from 'utils/videos/getVideoThumbnailUrl'
import { getVideoUrl } from 'utils/url/getVideoUrl'

export interface SessionRecordingProps {
  recording: Video
}

export const SessionRecording: FC<SessionRecordingProps> = ({ recording }) => {
  const [videoPlayerIsOpen, setVideoPlayerIsOpen] = useState(false)
  const recordingDate = recording.uploaded
    ? DateTime.fromISO(recording.uploaded).toLocaleString(
        DateTime.DATE_MED_WITH_WEEKDAY
      )
    : ''
  const openVideoDialog = () => {
    setVideoPlayerIsOpen(true)
  }

  const closeVideoDialog = () => {
    setVideoPlayerIsOpen(false)
  }
  return (
    <VideoRecordingContainer>
      <VideoRecordingThumbnail
        src={getVideoThumbnailUrl(recording)}
        onClick={openVideoDialog}
      >
        <VideoIconButton>
          <PlayIcon />
        </VideoIconButton>
      </VideoRecordingThumbnail>
      <VideoDetailsBox>
        <VideoRecordingDetails>{recordingDate}</VideoRecordingDetails>
      </VideoDetailsBox>
      <SessionRecordingDialog
        open={videoPlayerIsOpen}
        onClose={closeVideoDialog}
      >
        <VideoPlayerCloseButton onClick={closeVideoDialog}>
          <VideoCloseIcon />
        </VideoPlayerCloseButton>
        <VideoPlayerBox>
          <SessionRecordingVideoPlayer
            src={getVideoUrl(recording)}
            preload="auto"
            autoPlay
            controls
            controlsList="nodownload"
          />
        </VideoPlayerBox>
      </SessionRecordingDialog>
    </VideoRecordingContainer>
  )
}
