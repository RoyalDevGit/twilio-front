import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import DownloadIcon from '@mui/icons-material/Download'
import DeleteIcon from '@mui/icons-material/Delete'
import { Controller, useForm } from 'react-hook-form'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Autocomplete from '@mui/material/Autocomplete'
import InfoIcon from '@mui/icons-material/Info'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'

import { useRouter } from 'hooks/useRouter'
import {
  VideoActions,
  VideoDetailsBox,
  VideoDetailsContainer,
  VideoDetailsTitle,
  VideoDetailsInfo,
  VideoEditorTitle,
  VideoEditor,
  VideoEditorInfo,
  VideoEditorQuestions,
  VideoEditorBox,
  VideoPreview,
  VideoPlayerContainer,
  SelectItemText,
} from 'pageComponents/Settings/Expert/VideoDetail/styles'
import {
  Video,
  VideoAudience,
  VideoThumbnail,
  VideoVisibility,
} from 'interfaces/Video'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { FormLabel } from 'components/Form/Label'
import { Grid } from 'components/Grid'
import { VideoThumbnailPicker } from 'components/VideoThumbnailPicker'
import { Button } from 'components/Button'
import { VideoApi } from 'apis/VideoApi'
import { VideoDeletionConfirmationDialog } from 'components/Dialogs/VideoDeletionConfirmationDialog'
import { downloadVideo } from 'utils/videos/downloadVideo'
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

export interface ExpertVideoPageProps {
  initialVideo: Video
}

export const ExpertVideoPage: NextPage<ExpertVideoPageProps> = ({
  initialVideo,
}) => {
  const router = useRouter()
  const { t } = useTranslation([LocaleNamespace.ExpertVideoDetail])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const closeOptionsMenu = () => {
    setAnchorEl(null)
  }

  const [deletionConfirmationIsOpen, setDeletionConfirmationIsOpen] =
    useState(false)
  const openDeleteOption = () => {
    closeOptionsMenu()
    setDeletionConfirmationIsOpen(true)
  }
  const closeDeleteOption = () => {
    setDeletionConfirmationIsOpen(false)
  }

  const backToVideos = () => {
    router.push(`/expert/videos`)
  }

  const { register, handleSubmit, watch, formState, control } =
    useForm<FormData>({
      mode: 'onChange',
      defaultValues: {
        title: initialVideo.title || '',
        description: initialVideo.description || '',
        audience: initialVideo.audience || VideoAudience.Everyone,
        madeForKids: initialVideo.madeForKids || false,
        containsPaidPromotion: initialVideo.containsPaidPromotion || false,
        tags: initialVideo.tags || [],
        language: initialVideo.language || '',
        visibility: initialVideo.visibility || VideoVisibility.Public,
        selectedThumbnail:
          initialVideo.selectedThumbnail ||
          (initialVideo.thumbnails ? initialVideo.thumbnails[0].id : ''),
      },
    })

  const submitHandler = handleSubmit(
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
      }
      const editedVideo: Partial<Video> = initialVideo
        ? { ...initialVideo, ...videoFromForm }
        : { ...videoFromForm }

      const saveResult = await VideoApi.update(initialVideo.id, {
        videoData: editedVideo,
      })
      if (saveResult.ok()) {
        backToVideos()
      } else {
        // TODO: handle error
      }
    }
  )

  const onCancel = () => {
    backToVideos()
  }

  const handleDownload = () => {
    closeOptionsMenu()
    downloadVideo(initialVideo)
  }

  const handleDeletion = () => {
    closeOptionsMenu()
    backToVideos()
  }

  const formValues = watch()

  return (
    <VideoDetailsContainer>
      <form onSubmit={submitHandler}>
        <VideoDetailsBox>
          <VideoEditorTitle>{t('videoDetailsTitle')}</VideoEditorTitle>
          <VideoActions>
            <Button onClick={onCancel}>{t('cancel')}</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!formState?.isValid}
              state={formState.isSubmitting ? 'loading' : 'normal'}
            >
              {t('save')}
            </Button>
            <IconButton onClick={handleClick}>
              <MoreVertIcon fontSize="large" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={closeOptionsMenu}>
              <MenuItem sx={{ gap: 1 }} onClick={handleDownload}>
                <DownloadIcon />
                {t('videoDetailsDownloadIcon')}
              </MenuItem>
              <MenuItem sx={{ gap: 1 }} onClick={() => openDeleteOption()}>
                <DeleteIcon />
                {t('videoDetailsDeleteIcon')}
              </MenuItem>
            </Menu>
          </VideoActions>
        </VideoDetailsBox>

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
              <Grid item mobileS={12} tablet={6}>
                <VideoPlayerContainer>
                  <VideoPreview
                    src={getVideoUrl(initialVideo)}
                    preload="auto"
                    controls
                    controlsList="nodownload"
                  />
                </VideoPlayerContainer>
                <VideoEditorTitle>{t('visibilityLabel')}</VideoEditorTitle>
                <FormControl sx={{ width: 300 }}>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    name="visibility"
                    render={({ field }) => (
                      <Select {...field}>
                        <SelectItemText>
                          {t('visibilityDescription')}
                        </SelectItemText>
                        <MenuItem value={VideoVisibility.Private}>
                          <VideoEditorTitle>
                            {t('visibilityPrivate')}
                          </VideoEditorTitle>
                        </MenuItem>
                        <SelectItemText>
                          {t('privateDescription')}
                        </SelectItemText>
                        <Divider />
                        <MenuItem value={VideoVisibility.Unlisted}>
                          <VideoEditorTitle>
                            {t('visibilityUnlisted')}
                          </VideoEditorTitle>
                        </MenuItem>
                        <SelectItemText>
                          {t('unlistedDescription')}
                        </SelectItemText>
                        <Divider />
                        <MenuItem value={VideoVisibility.Public}>
                          <VideoEditorTitle>
                            {t('visibilityPublic')}
                          </VideoEditorTitle>
                        </MenuItem>
                        <SelectItemText>
                          {t('publicDescription')}
                        </SelectItemText>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
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
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="selectedThumbnail"
                  render={({ field }) => (
                    <VideoThumbnailPicker
                      thumbnails={initialVideo.thumbnails as VideoThumbnail[]}
                      value={field.value}
                      onChange={(thumbnail) => field.onChange(thumbnail.id)}
                    />
                  )}
                />
              </Grid>
              <Grid item mobileS={12} tablet={6}>
                <VideoEditorTitle required>
                  {t('audienceLabel')}
                </VideoEditorTitle>
                <VideoEditorQuestions>
                  {t('madeForKidsLabel')}
                </VideoEditorQuestions>
                <VideoEditorInfo>
                  {t('madeForKidsLegalRequirement')}
                </VideoEditorInfo>
                <VideoEditorBox>
                  <InfoIcon />
                  <VideoEditorInfo>
                    {t('madeForKidsAdsMessage')}
                  </VideoEditorInfo>
                </VideoEditorBox>
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
                    <VideoEditorTitle required>
                      {t('ageRestrictionLabel')}
                    </VideoEditorTitle>
                  </AccordionSummary>
                  <AccordionDetails>
                    <VideoEditorQuestions>
                      {t('ageRestrictionQuestion')}
                    </VideoEditorQuestions>
                    <VideoEditorInfo>
                      {t('ageRestrictionDescription')}
                    </VideoEditorInfo>
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
                    <VideoEditorTitle required>
                      {t('paidPromoLabel')}
                    </VideoEditorTitle>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      <VideoEditorInfo>
                        {t('paidPromoDescription')}
                      </VideoEditorInfo>
                      <FormControlLabel
                        control={
                          <Checkbox {...register('containsPaidPromotion')} />
                        }
                        label={t<string>('paidPromoAcknowledgement')}
                      />
                      <VideoEditorInfo>
                        {t('paidPromoDisclaimer')}
                      </VideoEditorInfo>
                    </FormGroup>
                    <FormGroup sx={{ mt: 1 }}>
                      <VideoEditorTitle>{t('tagsLabel')}</VideoEditorTitle>
                      <VideoEditorInfo>{t('tagsDescription')}</VideoEditorInfo>
                      <Autocomplete
                        options={[]}
                        freeSolo
                        multiple
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder={t('tagsPlaceholder')}
                          />
                        )}
                      />
                    </FormGroup>
                    <FormGroup sx={{ mt: 3 }}>
                      <VideoEditorTitle>{t('languageLabel')}</VideoEditorTitle>
                      <VideoEditorInfo>
                        {t('languageDescription')}
                      </VideoEditorInfo>
                      <Autocomplete
                        options={[]}
                        freeSolo
                        multiple
                        renderInput={(params) => (
                          <TextField
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
      </form>

      <VideoDeletionConfirmationDialog
        open={deletionConfirmationIsOpen}
        video={initialVideo}
        onClose={closeDeleteOption}
        onDelete={handleDeletion}
      />
    </VideoDetailsContainer>
  )
}
