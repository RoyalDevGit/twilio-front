import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import InputLabel from '@mui/material/InputLabel'

export const VideoDetailsContainer = styled(Container)`
  padding: ${({ theme }) => theme.spacing(3)};
`

export const VideoDetailsBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1.25)};
`

export const VideoEditorTitle = styled(InputLabel)``

export const VideoActions = styled.div`
  gap: ${({ theme }) => theme.spacing(2)};
`

export const VideoDetailsTitle = styled(InputLabel)`
  font-size: 0.938rem;
`

export const VideoDetailsInfo = styled.p`
  font-size: 0.813rem;
  margin: ${({ theme }) => theme.spacing(0)};
`

export const VideoEditor = styled.div``

export const VideoEditorQuestions = styled.h5``

export const VideoEditorInfo = styled.p`
  font-size: 0.813rem;
  margin-top: ${({ theme }) => theme.spacing(0.75)};
  margin-right: ${({ theme }) => theme.spacing(0)};
  margin-bottom: ${({ theme }) => theme.spacing(1.25)};
  margin-left: ${({ theme }) => theme.spacing(0)};
`

export const VideoEditorBox = styled(Box)`
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
  font-size: 0.938rem;
  padding: ${({ theme }) => theme.spacing(1.25)};
  margin: ${({ theme }) => theme.spacing(0)};
`
