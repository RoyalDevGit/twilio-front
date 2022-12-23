import { ChangeEvent, FC, useState } from 'react'
import Box from '@mui/material/Box'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'
import { DialogProps } from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

import {
  VideoDetailsInfo,
  VideoDetailsDialogBox,
  VideoDetailsDialogActions,
  VideoDetailsDialogTitle,
} from 'pageComponents/Settings/Expert/Videos/styles'
import { Video } from 'interfaces/Video'
import { Button } from 'components/Button'
import { getVideoThumbnailUrl } from 'utils/videos/getVideoThumbnailUrl'
import { getVideoStatusLabel } from 'utils/i18n/getExpertVideoLabels'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ResponsiveDialog } from 'components/ResponsiveDialog'
import { VideoApi } from 'apis/VideoApi'
import { downloadVideo } from 'utils/videos/downloadVideo'
import { FormError } from 'components/Form/Error'
import { Image } from 'components/Image'

export interface EventReservationCancellationDialogProps extends DialogProps {
  video?: Video
  onDelete?: (video: Video) => void
}

export const VideoDeletionConfirmationDialog: FC<
  React.PropsWithChildren<EventReservationCancellationDialogProps>
> = ({
  video,
  onDelete,
  onClose,
  maxWidth = 'tablet',
  fullWidth = true,
  ...otherDialogProps
}) => {
  const { t } = useTranslation(LocaleNamespace.VideoDeletionConfirmationDialog)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')
  const [deleteAcknowledgement, setDeleteAcknowledgement] = useState(false)
  const handleDeleteAcknowledgementChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setDeleteAcknowledgement(e.target.checked)
  }

  let deleteDialogFormattedDate = ''
  let deleteDialogStatusLabel = ''
  if (video) {
    deleteDialogFormattedDate = DateTime.fromISO(
      video.file.createdAt
    ).toLocaleString(DateTime.DATE_MED)
    deleteDialogStatusLabel = getVideoStatusLabel(t, video.status)
  }

  const handleClose = () => {
    setDeleteAcknowledgement(false)
    setError('')
    setIsDeleting(false)
    if (onClose) {
      onClose({}, 'escapeKeyDown')
    }
  }

  const handleDownload = () => {
    if (video) {
      downloadVideo(video)
    }
  }

  const handleConfirm = async () => {
    if (!video) {
      return
    }
    try {
      setIsDeleting(true)
      setError('')
      const deleteResult = await VideoApi.delete(video.id)
      if (deleteResult.ok()) {
        if (onDelete) {
          onDelete(video)
        }
        handleClose()
      } else {
        // TODO: Set API specific error handling here
      }
    } catch (e) {
      // TODO: Set internationalized unknown error here
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <ResponsiveDialog
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      onClose={handleClose}
      {...otherDialogProps}
    >
      <DialogTitle>{t('dialogTitle')}</DialogTitle>
      <DialogContent>
        <VideoDetailsDialogBox>
          <Image
            width={120}
            height={80}
            src={video ? getVideoThumbnailUrl(video) : ''}
            alt={video ? video.title : ''}
          />
          <VideoDetailsDialogTitle>
            <VideoDetailsDialogTitle>{video?.title}</VideoDetailsDialogTitle>
            <VideoDetailsInfo>
              {`${deleteDialogStatusLabel} ${deleteDialogFormattedDate}`}
            </VideoDetailsInfo>
          </VideoDetailsDialogTitle>
        </VideoDetailsDialogBox>
        <FormControlLabel
          sx={{ mt: 1 }}
          control={
            <Checkbox
              onChange={(e) => {
                handleDeleteAcknowledgementChange(e)
              }}
            />
          }
          label={t<string>('permanentlyDeleteAcknowledgement')}
        />
        {error && <FormError>{error}</FormError>}
      </DialogContent>
      <VideoDetailsDialogActions>
        <Button onClick={handleDownload}>{t('downloadVideo')}</Button>
        <Box>
          <Button
            onClick={handleConfirm}
            state={isDeleting ? 'loading' : 'normal'}
            disabled={!deleteAcknowledgement}
          >
            {t('deleteForever')}
          </Button>
          <Button onClick={handleClose}>{t('cancel')}</Button>
        </Box>
      </VideoDetailsDialogActions>
    </ResponsiveDialog>
  )
}
