import { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'

import { Attachment } from 'components/Attachment'
import {
  AttachmentContainer,
  AttachmentsSection,
} from 'components/Messaging/Message/Attachments/styles'
import { FileTracker } from 'interfaces/FileTracker'
import { getStorageBucketFileUrl } from 'utils/url/getStorageBucketFileUrl'
import { DownloadIcon } from 'icons/MessageToolbar/Download'
import { ImagePreviewed } from 'components/ImagePreviewed'

interface AttachmentsProps {
  fileTrackers: FileTracker[]
  onAttachmentClick: (fileTracker: FileTracker) => unknown
}

export const Attachments: FC<AttachmentsProps> = ({
  fileTrackers,
  onAttachmentClick,
}) => (
  <AttachmentsSection>
    {fileTrackers.map((f) => {
      const fileUrl = getStorageBucketFileUrl(f.fileKey)
      if (f.mimeType?.includes('image')) {
        return (
          <AttachmentContainer
            key={f.id}
            hover
            onClick={() => onAttachmentClick(f)}
          >
            <ImagePreviewed
              width={231}
              height={231}
              src={fileUrl}
              layout="fixed"
              objectFit="cover"
              alt=""
            />
            <Link
              href={`${fileUrl}`}
              target="_blank"
              download={f.originalFileName}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <IconButton>
                <DownloadIcon />
              </IconButton>
            </Link>
          </AttachmentContainer>
        )
      } else {
        const isVideo = f.mimeType?.includes('video')
        return (
          <AttachmentContainer
            key={f.id}
            hover={isVideo}
            onClick={() => {
              if (isVideo) {
                onAttachmentClick(f)
              }
            }}
          >
            <Attachment
              fileName={f.originalFileName ?? ''}
              width={231}
              height={40}
            />
            <Link
              href={`${fileUrl}`}
              target="_blank"
              download={f.originalFileName}
            >
              <IconButton>
                <DownloadIcon />
              </IconButton>
            </Link>
          </AttachmentContainer>
        )
      }
    })}
  </AttachmentsSection>
)
