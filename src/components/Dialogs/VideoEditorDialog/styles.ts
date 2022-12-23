import styled from '@emotion/styled'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'

import { ResponsiveDialog } from 'components/ResponsiveDialog'

export const StyledDialog = styled(ResponsiveDialog)`
  .MuiDialogContent-root {
    height: 100%;
    overflow: auto;
  }
`

export const ModalCloseButton = styled(IconButton)`
  svg {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

export const EditorForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const VideoUpload = styled.div``

export const DialogTitleBox = styled(DialogActions)`
  display: flex;
  justify-content: space-between;
`

interface VideoDropZoneProps {
  isDragActive: boolean
}

export const VideoDropZone = styled.div<VideoDropZoneProps>`
  background-color: white;
  position: relative;
  padding-top: ${({ theme }) => theme.spacing(12.5)};
  padding-right: ${({ theme }) => theme.spacing(2.5)};

  display: flex;
  width: 100%;
  height: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const UploadImage = styled.img`
  width: 112px;
`
export const AnimatedUploadImage = styled.img`
  width: 143px;
`

export const UploadImageAndInstructions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const UploadInstructions = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  margin-top: ${({ theme }) => theme.spacing(18)};
`

export const VideoEditor = styled.div``

export const VideoDetailsTitle = styled(InputLabel)`
  font-size: 0.938rem;
`

export const VideoEditorQuestions = styled.h5``

export const VideoDetailsInfo = styled.p`
  font-size: 0.813rem;
  margin-top: ${({ theme }) => theme.spacing(0.5)};
  margin-right: ${({ theme }) => theme.spacing(0)};
  margin-bottom: ${({ theme }) => theme.spacing(1.25)};
  margin-left: ${({ theme }) => theme.spacing(0)};
`

export const VideoDetailsBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1.25)};
  padding: ${({ theme }) => theme.spacing(1.25)};
  border-radius: 10px;
`

export const VideoPlayerContainer = styled.div``

export const VideoPreview = styled.video`
  width: 100%;
  max-height: 300px;
  background-color: ${({ theme }) =>
    theme.customComponents.videoEditor.videoPreview.backgroundColor};
`

export const SelectItemText = styled.div`
  padding: ${({ theme }) => theme.spacing(1.25)};
  font-size: 0.938rem;
  margin: ${({ theme }) => theme.spacing(0)};
`
