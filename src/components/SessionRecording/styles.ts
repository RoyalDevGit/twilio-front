import styled from '@emotion/styled'
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { ResponsiveDialog } from 'components/ResponsiveDialog'
import { CloseCircleIcon } from 'icons/Close'

export const VideoRecordingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) =>
    theme.customComponents.sessionCard.sessionCardBackground.styleOverrides
      .background};
  border-radius: 5px;
  padding: 10px;
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    flex-direction: column;
  }
  border: ${({ theme }) =>
    theme.customComponents.sessionRecording.videoRecordingContainer
      .styleOverrides.border};
`

interface VideoRecordingThumbnail extends ButtonBaseProps {
  src: string
}

export const VideoRecordingThumbnail = styled(
  ButtonBase
)<VideoRecordingThumbnail>`
  width: 112px;
  height: 64px;
  background-image: url('${({ src }) => src}');
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const VideoIconButton = styled.div`
  position: absolute;
`

export const VideoDetailsBox = styled.div`
  display: flex;
  gap: 10px;
`

export const VideoRecordingDetails = styled(Typography)``

export const SessionRecordingDialog = styled(ResponsiveDialog)`
  .MuiPaper-root {
    background: black;
    height: 100%;
  }
`

export const VideoPlayerBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
`

export const SessionRecordingVideoPlayer = styled.video`
  width: 100%;
  height: 100%;
`

export const VideoPlayerCloseButton = styled(IconButton)`
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 1;
`

export const VideoCloseIcon = styled(CloseCircleIcon)``
