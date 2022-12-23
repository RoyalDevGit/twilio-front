import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { ResponsiveDialog } from 'components/ResponsiveDialog'
import { UserAvatar } from 'components/UserAvatar'

export const PreviewDialog = styled(ResponsiveDialog)`
  .MuiPaper-root {
    overflow: visible;
  }
`
export const BoxHeader = styled.div`
  display: flex;
  padding: 12px 14px;
  gap: 5px;
`
export const ClosePreviewButton = styled(IconButton)`
  position: absolute;
  top: -20px;
  left: -40px;
`
export const PreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1009px;
  height: 662px;
`
export const PreviewSection = styled.div`
  display: flex;
  flex-direction: column;
`
export const DownloadSection = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex: 1;
  padding-top: 4px;
`
export const Name = styled(Typography)`
  font-weight: 600;
  font-size: 1.063rem;
`
export const FileDescription = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
`
export const DownloadButton = styled(Button)`
  width: 123px;
  height: 32px;
  border-radius: 3px;
  gap: 10px;
  svg {
    path {
      fill: #090b1b;
    }
  }
`
export const PreviewBody = styled.div`
  display: flex;
  span {
    top: 75px !important;
    left: 0;
    right: 0;
    bottom: 0;
  }
`
export const SenderAvatar = styled(UserAvatar)`
  display: flex;
  align-self: center;
`

export const VideoPreview = styled.video``
