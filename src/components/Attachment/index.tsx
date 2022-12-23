import { FC } from 'react'

import {
  AttachmentFileCard,
  AttachmentFileIconContainer,
  AttachmentFileName,
  IconContainer,
} from 'components/Attachment/styles'
import { FileIcon } from 'icons/File'

interface AttachmentProps {
  fileName: string
  width: number
  height: number
}

export const Attachment: FC<AttachmentProps> = ({
  fileName,
  width,
  height,
}) => (
  <AttachmentFileCard width={width} height={height}>
    <AttachmentFileIconContainer>
      <IconContainer>
        <FileIcon />
      </IconContainer>
    </AttachmentFileIconContainer>
    <AttachmentFileName>{fileName}</AttachmentFileName>
  </AttachmentFileCard>
)
