import styled from '@emotion/styled'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { ResponsiveDialog } from 'components/ResponsiveDialog'

export const StyledDialog = styled(ResponsiveDialog)``

export const DialogHeaderContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
`

export const DialogTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const IntroVideoDialogTitle = styled(DialogTitle)`
  font-size: 1.5rem;
  padding: 0;
`

export const CloseIconContainer = styled(IconButton)``

export const IntroVideoDialogDescription = styled(Typography)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.palette.tertiary.main};
`

export const IntroVideoDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 204px;
`

interface VideoDropZoneProps {
  isDragActive: boolean
}

export const DragAndDropContainer = styled.div<VideoDropZoneProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(255, 255, 255, 0.5);
  border-radius: 13px;
  padding: ${({ theme }) => theme.spacing(4, 2)};
  gap: ${({ theme }) => theme.spacing(3)};
`

export const DragAndDropLabel = styled(Typography)`
  font-size: 1rem;
`

export const IntroVideoDialogButton = styled(Button)`
  font-size: 0.875rem;
  border-radius: 3px;
`

export const VideoPlayerContainer = styled.div``

export const VideoPreview = styled.video`
  width: 100%;
  max-height: 300px;
  background-color: ${({ theme }) =>
    theme.customComponents.videoEditor.videoPreview.backgroundColor};
`
