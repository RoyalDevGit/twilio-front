import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import { css } from '@emotion/react'

interface AttachmentFileCardProps {
  width: number
  height: number
}
export const AttachmentFileCard = styled.div<AttachmentFileCardProps>(
  ({ theme, width, height }) => css`
    width: ${width}px;
    height: ${height}px;
    background: ${theme.customComponents.attachment.attachmentContainer
      .styleOverrides.background};
    border-radius: 4px;
    display: flex;
    align-items: center;
  `
)
export const AttachmentFileIconContainer = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  margin: 0px 4px;
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 6px;
`

export const AttachmentFileName = styled(Typography)`
  text-overflow: ellipsis;
  overflow: auto;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-right: 4px;
`
