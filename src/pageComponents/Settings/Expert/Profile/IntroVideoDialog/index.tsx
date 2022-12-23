import { useTranslation } from 'next-i18next'
import { FC, useCallback, useState } from 'react'
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone'
import CircularProgress from '@mui/material/CircularProgress'
import DialogActions from '@mui/material/DialogActions'

import {
  CloseIconContainer,
  DialogHeaderContainer,
  DialogTitleContainer,
  DragAndDropContainer,
  DragAndDropLabel,
  IntroVideoDialogButton,
  IntroVideoDialogContent,
  IntroVideoDialogDescription,
  IntroVideoDialogTitle,
  StyledDialog,
  VideoPlayerContainer,
  VideoPreview,
} from 'pageComponents/Settings/Expert/Profile/IntroVideoDialog/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ResponsiveDialogProps } from 'components/ResponsiveDialog'
import { ExpertApi } from 'apis/ExpertApi'
import { useExpertAsserted } from 'hooks/useExpert'
import { Video, VideoType } from 'interfaces/Video'
import { Button } from 'components/Button'
import { getVideoUrl } from 'utils/url/getVideoUrl'
import { CloseCircleIcon } from 'icons/Close'
import { useRefreshExpertState } from 'hooks/useRefreshExpertState'

export const IntroVideoDialog: FC<ResponsiveDialogProps> = ({
  onClose,
  ...otherProps
}) => {
  const expert = useExpertAsserted()
  const { t } = useTranslation(LocaleNamespace.ExpertProfileSettings)

  const [video, setVideo] = useState<Video | undefined>()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | undefined>()
  const refreshExpertState = useRefreshExpertState()

  const onVideoFileSelection = useCallback(
    async (
      acceptedFiles: File[],
      _fileRejections: FileRejection[],
      _event: DropEvent
    ) => {
      try {
        if (!acceptedFiles.length) {
          return
        }

        const selectedFile = acceptedFiles[0]

        setIsUploading(true)
        const uploadResult = await ExpertApi.uploadVideo(expert.id, {
          videoFile: selectedFile,
          videoData: {
            videoType: VideoType.ExpertIntro,
          },
          onProgress: (progressEvent) => {
            const { loaded, total } = progressEvent
            const newUploadProgress = (loaded / total) * 100
            setUploadProgress(newUploadProgress)
          },
        })
        if (uploadResult.ok()) {
          const newlyUploadedVideo = await uploadResult.getData()
          setVideo(newlyUploadedVideo)
        } else {
          // TODO: handle error
        }
      } catch (e) {
        // TODO: handle error
        // const err = e as Error
        // setUploadError(err.message)
        // setIsUploading(false)
      } finally {
        setIsUploading(false)
        setUploadProgress(undefined)
      }
    },
    []
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop: onVideoFileSelection,
    noClick: true,
    accept: {
      'video/mp4': ['.mp4'],
    },
  })

  const reset = () => {
    setVideo(undefined)
    setIsUploading(false)
    setUploadProgress(undefined)
  }

  const handleClose = () => {
    if (onClose) {
      onClose({}, 'escapeKeyDown')
    }
  }

  const handleSave = async () => {
    if (!video) {
      return
    }
    await ExpertApi.update(expert.id, {
      expertData: {
        introVideo: video.id,
      },
    })
    refreshExpertState()
    handleClose()
  }

  let dialogContent

  if (isUploading) {
    dialogContent = (
      <IntroVideoDialogContent>
        <CircularProgress
          variant={uploadProgress === 100 ? 'indeterminate' : 'determinate'}
          size="4rem"
          value={uploadProgress}
        />
      </IntroVideoDialogContent>
    )
  } else if (video) {
    dialogContent = (
      <IntroVideoDialogContent>
        <VideoPlayerContainer>
          <VideoPreview
            src={getVideoUrl(video)}
            preload="auto"
            controls
            controlsList="nodownload"
          />
        </VideoPlayerContainer>
      </IntroVideoDialogContent>
    )
  } else {
    dialogContent = (
      <IntroVideoDialogContent>
        <DragAndDropContainer {...getRootProps()} isDragActive={isDragActive}>
          <input {...getInputProps()} />
          <DragAndDropLabel>
            <span>{t('introVideoDialogDragAndDropLabel')}</span>
          </DragAndDropLabel>
          <Button
            type="button"
            onClick={open}
            variant="contained"
            color="secondary"
          >
            {t('introVideoDialogSelectFile')}
          </Button>
        </DragAndDropContainer>
      </IntroVideoDialogContent>
    )
  }

  return (
    <StyledDialog
      {...otherProps}
      onClose={onClose}
      TransitionProps={{ onExited: reset }}
    >
      <DialogHeaderContainer>
        <DialogTitleContainer>
          <IntroVideoDialogTitle>
            {t('uploadIntroVideoDialog')}
          </IntroVideoDialogTitle>
          <CloseIconContainer onClick={handleClose}>
            <CloseCircleIcon />
          </CloseIconContainer>
        </DialogTitleContainer>
        <IntroVideoDialogDescription>
          {t('introVideoDialogDescription')}
        </IntroVideoDialogDescription>
      </DialogHeaderContainer>
      {dialogContent}
      <DialogActions>
        <IntroVideoDialogButton
          size="large"
          color="primary"
          variant="text"
          onClick={handleClose}
        >
          {t('introVideoDialogCancelButtonLabel')}
        </IntroVideoDialogButton>
        <IntroVideoDialogButton
          size="large"
          color="primary"
          variant="contained"
          onClick={handleSave}
          disabled={!video || isUploading}
        >
          {t('introVideoDialogSaveButtonLabel')}
        </IntroVideoDialogButton>
      </DialogActions>
    </StyledDialog>
  )
}
