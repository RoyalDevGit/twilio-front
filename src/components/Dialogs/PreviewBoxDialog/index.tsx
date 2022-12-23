import { DialogProps } from '@mui/material/Dialog'
import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'

import { FileTracker } from 'interfaces/FileTracker'
import { getStorageBucketFileUrl } from 'utils/url/getStorageBucketFileUrl'
import { Image } from 'components/Image'
import {
  BoxHeader,
  ClosePreviewButton,
  DownloadButton,
  DownloadSection,
  FileDescription,
  Name,
  PreviewBody,
  PreviewBox,
  PreviewDialog,
  PreviewSection,
  SenderAvatar,
} from 'components/Dialogs/PreviewBoxDialog/styles'
import { ChannelMessage } from 'interfaces/ChannelMessage'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { DownloadIcon } from 'icons/MessageToolbar/Download'
import { CloseIcon } from 'icons/PreviewBoxDialog/CloseIcon'
import { VideoPreview } from 'pageComponents/Settings/Expert/Profile/IntroVideoDialog/styles'

interface PreviewBoxDialogProps extends DialogProps {
  filePreview: FileTracker | null
  message: ChannelMessage | null
}

export const PreviewBoxDialog: FC<PreviewBoxDialogProps> = ({
  open,
  onClose,

  filePreview,
  message,
  ...props
}) => {
  const componentWidth = 'laptop'
  const { t } = useTranslation(LocaleNamespace.MessagesPage)
  const fileComponent =
    filePreview?.mimeType && filePreview.mimeType.includes('image') ? (
      <Image
        src={getStorageBucketFileUrl(filePreview.fileKey)}
        fill={true}
        style={{
          objectFit: 'scale-down',
        }}
        alt=""
      />
    ) : (
      <VideoPreview
        width="477"
        height="798"
        preload="auto"
        autoPlay
        controls
        controlsList="nodownload"
        src={getStorageBucketFileUrl(filePreview?.fileKey ?? '')}
      />
    )
  const closeHandler = () => {
    if (!onClose) {
      return
    }
    onClose({}, 'escapeKeyDown')
  }
  const sentDate =
    message === null ? DateTime.now() : DateTime.fromISO(message?.createdAt)
  return (
    <PreviewDialog
      open={open && filePreview !== null}
      onClose={onClose}
      maxWidth={componentWidth}
      {...props}
    >
      <ClosePreviewButton onClick={closeHandler}>
        <CloseIcon />
      </ClosePreviewButton>
      <PreviewBox>
        <BoxHeader>
          <SenderAvatar
            src={
              message != null &&
              message?.sender !== null &&
              message.sender.profilePictureKey
                ? getStorageBucketFileUrl(message.sender.profilePictureKey)
                : undefined
            }
            firstName={message?.sender?.firstName || ' '}
            lastName={message?.sender?.lastName || ' '}
            width={36}
            height={36}
          />
          <PreviewSection>
            <Name variant="subtitle1"> {message?.sender?.firstName} </Name>
            <FileDescription>
              {' '}
              {`${sentDate.monthShort} ${sentDate.day}, ${sentDate.year} - ${filePreview?.originalFileName}`}{' '}
            </FileDescription>
          </PreviewSection>
          <DownloadSection>
            <DownloadButton variant="contained" color="secondary">
              <DownloadIcon />
              {t('download')}
            </DownloadButton>
          </DownloadSection>
        </BoxHeader>
        <PreviewBody>{fileComponent}</PreviewBody>
      </PreviewBox>
    </PreviewDialog>
  )
}
