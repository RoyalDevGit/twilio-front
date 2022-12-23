import { FC, useCallback, useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'
import InfoIcon from '@mui/icons-material/Info'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import FormGroup from '@mui/material/FormGroup'
import LinearProgress from '@mui/material/LinearProgress'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'

import {
  Video,
  VideoAudience,
  VideoStatus,
  VideoThumbnail,
  VideoVisibility,
} from 'interfaces/Video'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Button } from 'components/Button'
import {
  AnimatedUploadImage,
  UploadImage,
  UploadImageAndInstructions,
  UploadInstructions,
  VideoDropZone,
  VideoUpload,
  DialogTitleBox,
  VideoEditor,
  VideoDetailsInfo,
  VideoDetailsTitle,
  VideoEditorQuestions,
  VideoDetailsBox,
  VideoPreview,
  VideoPlayerContainer,
  SelectItemText,
  StyledDialog,
  EditorForm,
  ModalCloseButton,
} from 'components/Dialogs/VideoEditorDialog/styles'
import { FormLabel } from 'components/Form/Label'
import { Grid } from 'components/Grid'
import { VideoThumbnailPicker } from 'components/VideoThumbnailPicker'
import { ExpertApi } from 'apis/ExpertApi'
import { VideoApi } from 'apis/VideoApi'
import { Expert } from 'interfaces/Expert'
import { getVideoUrl } from 'utils/url/getVideoUrl'

export type FormData = {
  title: string
  description: string
  audience: VideoAudience
  madeForKids: boolean
  containsPaidPromotion: boolean
  tags: string[]
  language: string
  visibility: VideoVisibility
  selectedThumbnail: string
}

export interface UploadEvent {
  videoFile: File
  videoData?: Partial<Video>
  thumbnailFile?: File
}

export interface VideoEditorDialogProps extends DialogProps {
  expert: Expert
  video?: Partial<Video>
  onSave?: (video: Video) => unknown
  onUpload?: (video: Video) => unknown
  onPublish?: (video: Video) => unknown
}

export const VideoEditorDialog: FC<
  React.PropsWithChildren<VideoEditorDialogProps>
> = ({ expert, video, onClose, onUpload, onSave, onPublish, ...props }) => {
  const { t } = useTranslation(LocaleNamespace.VideoEditorDialog)

  const [uploadedVideoFile, setUploadedVideoFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number | undefined>(
    undefined
  )

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState,
    control,
    reset,
  } = useForm<FormData>({
    mode: 'all',
  })

  useEffect(() => {
    if (!video) {
      reset({
        title: '',
        description: '',
        audience: VideoAudience.Everyone,
        madeForKids: false,
        containsPaidPromotion: false,
        tags: [],
        language: '',
        visibility: VideoVisibility.Public,
        selectedThumbnail: '',
      })
      return
    }
    reset({
      title: video.title || '',
      description: video.description || '',
      audience: video.audience || VideoAudience.Everyone,
      madeForKids: video.madeForKids || false,
      containsPaidPromotion: video.containsPaidPromotion || false,
      tags: video.tags || [],
      language: video.language || '',
      visibility: video.visibility || VideoVisibility.Public,
      selectedThumbnail:
        video.selectedThumbnail ||
        (video.thumbnails ? video.thumbnails[0].id : ''),
    })
  }, [video])

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

        setUploadedVideoFile(selectedFile)
        setIsUploading(true)
        // TODO: handle error
        // setUploadError('')
        const uploadResult = await ExpertApi.uploadVideo(expert.id, {
          videoFile: selectedFile,
          onProgress: (progressEvent) => {
            const { loaded, total } = progressEvent
            const newUploadProgress = (loaded / total) * 100
            setUploadProgress(newUploadProgress)
          },
        })
        if (uploadResult.ok()) {
          const newlyUploadedVideo = await uploadResult.getData()
          if (onUpload) {
            onUpload(newlyUploadedVideo)
          }
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

  const submitHandler = handleSubmit(
    useCallback(
      async ({
        title,
        description,
        audience,
        madeForKids,
        containsPaidPromotion,
        tags,
        language,
        visibility,
        selectedThumbnail,
      }) => {
        try {
          if (!video?.id) {
            return
          }

          const videoFromForm: Partial<Video> = {
            title,
            description,
            audience,
            madeForKids,
            containsPaidPromotion,
            tags,
            language,
            visibility,
            selectedThumbnail,
            status: VideoStatus.Published,
          }
          const editedVideo: Partial<Video> = video
            ? { ...video, ...videoFromForm }
            : { ...videoFromForm }

          // TODO: handle error
          // setSaveError('')

          const saveResult = await VideoApi.update(video.id, {
            videoData: editedVideo,
          })
          if (saveResult.ok()) {
            const savedVideo = await saveResult.getData()
            // TODO: show success message
            if (onPublish) {
              onPublish(savedVideo)
            }
            closeHandler()
          } else {
            // TODO: handle error
          }
        } catch (e) {
          // TODO: handle error
          // const err = e as Error
          // setSaveError(err.message)
          // setIsUploading(false)
        }
      },
      [video, handleSubmit]
    )
  )

  const saveAndClose = async () => {
    try {
      if (!video?.id) {
        return
      }

      const {
        title,
        description,
        audience,
        madeForKids,
        containsPaidPromotion,
        tags,
        language,
        visibility,
        selectedThumbnail,
      } = getValues()

      const videoFromForm: Partial<Video> = {
        title,
        description,
        audience,
        madeForKids,
        containsPaidPromotion,
        tags,
        language,
        visibility,
        status: VideoStatus.Draft,
        selectedThumbnail,
      }
      const editedVideo: Partial<Video> = video
        ? { ...video, ...videoFromForm }
        : { ...videoFromForm }

      const saveResult = await VideoApi.update(video.id, {
        videoData: editedVideo,
      })
      if (saveResult.ok()) {
        const savedVideo = await saveResult.getData()
        // TODO: show success message
        if (onSave) {
          onSave(savedVideo)
        }
        closeHandler()
      } else {
        // TODO: handle error
      }
    } catch (e) {
      // TODO: handle error
    }
  }

  const closeHandler = () => {
    setUploadedVideoFile(null)
    if (!onClose) {
      return
    }
    onClose({}, 'escapeKeyDown')
  }

  const hasVideo = uploadedVideoFile || video

  const formValues = watch()

  return (
    <StyledDialog
      {...props}
      onClose={(_event, reason) => {
        if (reason === 'backdropClick') {
          return
        }
        closeHandler()
      }}
    >
      <EditorForm noValidate autoComplete="off" onSubmit={submitHandler}>
        <DialogTitle>
          <DialogTitleBox>
            {t('uploadAVideoModalTitle')}
            <div>
              {hasVideo && (
                <>
                  <Button onClick={saveAndClose}>{t('saveAndClose')}</Button>
                  <Button
                    type="submit"
                    disabled={!formState?.isValid}
                    state={formState.isSubmitting ? 'loading' : 'normal'}
                  >
                    {t('publish')}
                  </Button>
                </>
              )}
              {!hasVideo && (
                <ModalCloseButton onClick={closeHandler}>
                  <CloseIcon />
                </ModalCloseButton>
              )}
            </div>
          </DialogTitleBox>
        </DialogTitle>
        {isUploading && !!uploadProgress && (
          <LinearProgress variant="determinate" value={uploadProgress} />
        )}
        <DialogContent dividers>
          {hasVideo && (
            <VideoEditor>
              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                columnSpacing={2}
              >
                <Grid container item spacing={4}>
                  <Grid item mobileS={12} tablet={6}>
                    <FormLabel required>{t('titleLabel')}</FormLabel>
                    <TextField
                      type="text"
                      multiline
                      variant="outlined"
                      fullWidth
                      placeholder={t('titlePlaceholder')}
                      {...register('title', {
                        required: true,
                      })}
                    />
                    <FormLabel sx={{ mt: 2 }} required>
                      {t('descriptionLabel')}
                    </FormLabel>
                    <TextField
                      type="text"
                      multiline
                      rows={10}
                      variant="outlined"
                      fullWidth
                      placeholder={t('descriptionPlaceholder')}
                      {...register('description', { required: true })}
                    />
                  </Grid>
                  {video && (
                    <Grid item mobileS={12} tablet={6}>
                      <VideoPlayerContainer>
                        <VideoPreview
                          src={getVideoUrl(video)}
                          preload="auto"
                          controls
                          controlsList="nodownload"
                        />
                      </VideoPlayerContainer>
                      <VideoDetailsTitle required>
                        {t('visibilityLabel')}
                      </VideoDetailsTitle>
                      <FormControl sx={{ width: 300 }}>
                        <Controller
                          rules={{ required: true }}
                          control={control}
                          name="visibility"
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.target.value)
                              }}
                            >
                              <SelectItemText>
                                {t('visibilityDescription')}
                              </SelectItemText>
                              <MenuItem value={VideoVisibility.Private}>
                                <VideoDetailsTitle>
                                  {t('visibilityPrivate')}
                                </VideoDetailsTitle>
                              </MenuItem>
                              <SelectItemText>
                                {t('privateDescription')}
                              </SelectItemText>
                              <Divider />
                              <MenuItem value={VideoVisibility.Unlisted}>
                                <VideoDetailsTitle>
                                  {t('visibilityUnlisted')}
                                </VideoDetailsTitle>
                              </MenuItem>
                              <SelectItemText>
                                {t('unlistedDescription')}
                              </SelectItemText>
                              <Divider />
                              <MenuItem value={VideoVisibility.Public}>
                                <VideoDetailsTitle>
                                  {t('visibilityPublic')}
                                </VideoDetailsTitle>
                              </MenuItem>
                              <SelectItemText>
                                {t('publicDescription')}
                              </SelectItemText>
                            </Select>
                          )}
                        />
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
                <Grid
                  container
                  item
                  direction="column"
                  spacing={2}
                  sx={{ width: '70%' }}
                >
                  <Grid item mobileS={12} tablet={6} sx={{ mt: 3 }}>
                    <VideoDetailsTitle required>
                      {t('thumbnailLabel')}
                    </VideoDetailsTitle>
                    <VideoDetailsInfo>
                      {t('thumbnailSelectionMessage')}
                    </VideoDetailsInfo>
                    {!!video?.thumbnails && (
                      <Controller
                        rules={{ required: true }}
                        control={control}
                        name="selectedThumbnail"
                        render={({ field }) => (
                          <VideoThumbnailPicker
                            thumbnails={video.thumbnails as VideoThumbnail[]}
                            value={field.value}
                            onChange={(thumbnail) =>
                              field.onChange(thumbnail.id)
                            }
                          />
                        )}
                      />
                    )}
                  </Grid>
                  <Grid item mobileS={12} tablet={6}>
                    <VideoDetailsTitle required>
                      {t('audienceLabel')}
                    </VideoDetailsTitle>
                    <VideoEditorQuestions>
                      {t('madeForKidsLabel')}
                    </VideoEditorQuestions>
                    <VideoDetailsInfo>
                      {t('madeForKidsLegalRequirement')}
                    </VideoDetailsInfo>
                    <VideoDetailsBox>
                      <InfoIcon />
                      <VideoDetailsInfo>
                        {t('madeForKidsAdsMessage')}
                      </VideoDetailsInfo>
                    </VideoDetailsBox>
                    <Controller
                      control={control}
                      name="madeForKids"
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value === 'true')
                          }}
                        >
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label={t<string>('madeForKidsYes')}
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label={t<string>('madeForKidsNo')}
                          />
                        </RadioGroup>
                      )}
                    />
                  </Grid>
                  <Grid item mobileS={12} tablet={6}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <VideoDetailsTitle required>
                          {t('ageRestrictionLabel')}
                        </VideoDetailsTitle>
                      </AccordionSummary>
                      <AccordionDetails>
                        <VideoEditorQuestions>
                          {t('ageRestrictionQuestion')}
                        </VideoEditorQuestions>
                        <VideoDetailsInfo>
                          {t('ageRestrictionDescription')}
                        </VideoDetailsInfo>
                        <Controller
                          control={control}
                          name="audience"
                          render={({ field }) => (
                            <RadioGroup {...field}>
                              <FormControlLabel
                                value={VideoAudience.Adults}
                                control={
                                  <Radio disabled={formValues.madeForKids} />
                                }
                                label={t<string>('ageRestrictionYes')}
                              />
                              <FormControlLabel
                                value={VideoAudience.Everyone}
                                control={
                                  <Radio disabled={formValues.madeForKids} />
                                }
                                label={t<string>('ageRestrictionNo')}
                              />
                            </RadioGroup>
                          )}
                        />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <VideoDetailsTitle required>
                          {t('paidPromoLabel')}
                        </VideoDetailsTitle>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormGroup>
                          <VideoDetailsInfo>
                            {t('paidPromoDescription')}
                          </VideoDetailsInfo>
                          <FormControlLabel
                            control={
                              <Checkbox
                                {...register('containsPaidPromotion')}
                              />
                            }
                            label={t<string>('paidPromoAcknowledgement')}
                          />
                          <VideoDetailsInfo>
                            {t('paidPromoDisclaimer')}
                          </VideoDetailsInfo>
                        </FormGroup>
                        <FormGroup sx={{ mt: 1 }}>
                          <VideoDetailsTitle>
                            {t('tagsLabel')}
                          </VideoDetailsTitle>
                          <VideoDetailsInfo>
                            {t('tagsDescription')}
                          </VideoDetailsInfo>
                          <Autocomplete
                            options={[]}
                            freeSolo
                            multiple
                            renderInput={(params) => (
                              <TextField
                                // {...register('expertLanguages', {})}
                                {...params}
                                placeholder={t('tagsPlaceholder')}
                              />
                            )}
                          />
                        </FormGroup>
                        <FormGroup sx={{ mt: 3 }}>
                          <VideoDetailsTitle>
                            {t('languageLabel')}
                          </VideoDetailsTitle>
                          <VideoDetailsInfo>
                            {t('languageDescription')}
                          </VideoDetailsInfo>
                          <Autocomplete
                            options={[]}
                            freeSolo
                            multiple
                            renderInput={(params) => (
                              <TextField
                                // {...register('expertLanguages', {})}
                                {...params}
                                placeholder={t('languagePlaceholder')}
                              />
                            )}
                          />
                        </FormGroup>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
              </Grid>
            </VideoEditor>
          )}

          {!uploadedVideoFile && !video && (
            <VideoUpload>
              <VideoDropZone {...getRootProps()} isDragActive={isDragActive}>
                <input {...getInputProps()} />
                <UploadImageAndInstructions>
                  {isDragActive && (
                    <AnimatedUploadImage src="/static/img/upload.gif" />
                  )}
                  {!isDragActive && (
                    <UploadImage src="/static/img/upload.png" />
                  )}

                  <UploadInstructions>
                    <Button type="button" onClick={open}>
                      {t('chooseAFileButton')}
                    </Button>
                    <span>{t('dragInHereLabel')}</span>
                  </UploadInstructions>
                </UploadImageAndInstructions>
              </VideoDropZone>
            </VideoUpload>
          )}
        </DialogContent>
      </EditorForm>
    </StyledDialog>
  )
}
