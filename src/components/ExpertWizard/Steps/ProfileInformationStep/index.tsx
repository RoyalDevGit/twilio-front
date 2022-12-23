import { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Divider from '@mui/material/Divider'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ExpertWizardStepProps,
  ExpertWizardStep,
} from 'components/ExpertWizard/Steps/ExpertWizardStep'
import { StepTitle } from 'components/ExpertWizard/Steps/styles'
import {
  HiddenFileInput,
  ProfileAvatar,
  ProfileInformationBox,
  ProfileInformationButton,
  ProfileInformationButtonBox,
  ProfileInformationFileSizeLabel,
  ProfileInformationFormBox,
  ProfileInformationFormLabel,
  ProfileInformationIconBox,
  ProfileInformationImage,
  ProfileInformationStepContainer,
  ProfileInformationSubtitle,
  ProfileInformationTextField,
} from 'components/ExpertWizard/Steps/ProfileInformationStep/styles'
import { CameraIcon } from 'icons/Camera'
import { PlayBoxIcon } from 'icons/PlayBox'
import { useExpertAsserted } from 'hooks/useExpert'
import { useEditableDescription } from 'hooks/api/expert/useEditableDescription'
import { useEditableProfilePicture } from 'hooks/api/user/useEditableProfilePicture'
import { IntroVideoDialog } from 'pageComponents/Settings/Expert/Profile/IntroVideoDialog'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import {
  ExpertWizardButtonBox,
  ExpertWizardButtons,
} from 'components/ExpertWizard/styles'
import { getVideoThumbnailUrl } from 'utils/videos/getVideoThumbnailUrl'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'
import { Video } from 'interfaces/Video'
import { FormError } from 'components/Form/Error'

const ProfileInformationStepHeader: FC<ExpertWizardStepProps> = () => {
  const { t } = useTranslation(LocaleNamespace.ExpertWizard)

  return <StepTitle>{t('profileInformationTitle')}</StepTitle>
}

const ProfileInformationStepBody: FC<ExpertWizardStepProps> = ({
  onContinue,
  onBack,
  activeStep,
}) => {
  const { t } = useTranslation(LocaleNamespace.ExpertWizard)
  const user = useCurrentUserAsserted()
  const expert = useExpertAsserted()
  const [open, setOpen] = useState(false)

  const openIntroVideoDialog = () => {
    setOpen(true)
  }

  const closeIntroVideoDialog = () => {
    setOpen(false)
  }

  const handleContinue = async () => {
    await editableDescription.save()
    await editableProfilePicture.save()
    if (onContinue) {
      onContinue()
    }
  }

  const handleBack = async () => {
    await editableDescription.save()
    await editableProfilePicture.save()
    if (onBack) {
      onBack()
    }
  }

  const videoThumbnailUrl = expert.introVideo
    ? getVideoThumbnailUrl(expert.introVideo as Video)
    : null
  const profilePictureUrl = getUserProfilePictureUrl(user)

  const { editableProfilePicture } = useEditableProfilePicture({
    user,
  })

  const editableDescription = useEditableDescription({
    expert,
  })

  const isSaving = editableProfilePicture.saving || editableDescription.saving

  return (
    <ProfileInformationStepContainer>
      <ProfileInformationSubtitle variant="body2">
        {t('profileInformationSubtitle')}
      </ProfileInformationSubtitle>
      <ProfileInformationFormBox>
        <ProfileInformationFormLabel>
          {t('profileInformationFormLabel-1')}
        </ProfileInformationFormLabel>
        <ProfileInformationBox>
          <ProfileInformationIconBox>
            {!!profilePictureUrl && (
              <ProfileAvatar
                firstName={user.firstName}
                lastName={user.lastName}
                src={profilePictureUrl}
                width={104}
                height={104}
              />
            )}

            {!profilePictureUrl && <CameraIcon />}
            {!!editableProfilePicture.error && (
              <FormError>{editableProfilePicture.error}</FormError>
            )}
          </ProfileInformationIconBox>
          <ProfileInformationButtonBox>
            <label htmlFor="profile-picture-input">
              <HiddenFileInput
                accept="image/*"
                id="profile-picture-input"
                type="file"
                onChange={editableProfilePicture.input.onChange}
              />
              <ProfileInformationButton
                component="span"
                variant="contained"
                color="secondary"
              >
                {t('profileInformationButtonLabel-1')}
              </ProfileInformationButton>
            </label>
            <ProfileInformationFileSizeLabel variant="caption">
              {t('profileInformationFileSizeLabel')}
            </ProfileInformationFileSizeLabel>
          </ProfileInformationButtonBox>
        </ProfileInformationBox>
      </ProfileInformationFormBox>
      <Divider />
      <ProfileInformationFormBox>
        <ProfileInformationFormLabel>
          {t('profileInformationFormLabel-2')}
        </ProfileInformationFormLabel>
        <ProfileInformationBox>
          <ProfileInformationIconBox>
            {!!videoThumbnailUrl && (
              <ProfileInformationImage
                width={104}
                height={58}
                src={videoThumbnailUrl}
                alt=""
              />
            )}

            {!videoThumbnailUrl && <PlayBoxIcon />}
          </ProfileInformationIconBox>
          <ProfileInformationButtonBox>
            <ProfileInformationButton
              variant="contained"
              color="secondary"
              onClick={openIntroVideoDialog}
            >
              {t('profileInformationButtonLabel-2')}
            </ProfileInformationButton>
            <ProfileInformationFileSizeLabel variant="caption">
              {t('profileInformationFileSizeLabel')}
            </ProfileInformationFileSizeLabel>
          </ProfileInformationButtonBox>
        </ProfileInformationBox>
      </ProfileInformationFormBox>
      <Divider />
      <ProfileInformationFormBox>
        <ProfileInformationFormLabel>
          {t('profileInformationFormLabel-3')}
        </ProfileInformationFormLabel>
        <ProfileInformationFileSizeLabel variant="body2">
          {t('profileInformationFormLabel-3-Subtitle')}
        </ProfileInformationFileSizeLabel>
        <ProfileInformationTextField
          multiline
          rows={4}
          disabled={editableDescription.editing}
          {...editableDescription.input}
          error={!!editableDescription.error}
          placeholder={t('profileInformationFormLabel-3-Placeholder')}
        />
        {!!editableDescription.error && (
          <FormError>{editableDescription.error}</FormError>
        )}
      </ProfileInformationFormBox>
      <ExpertWizardButtonBox>
        <ExpertWizardButtons
          variant="text"
          onClick={handleBack}
          disabled={isSaving || activeStep === 0}
          startIcon={<ChevronLeftIcon />}
        >
          {t('back')}
        </ExpertWizardButtons>
        <ExpertWizardButtons
          disabled={isSaving}
          variant="contained"
          color="primary"
          onClick={handleContinue}
        >
          {t('continue')}
        </ExpertWizardButtons>
      </ExpertWizardButtonBox>
      <IntroVideoDialog open={open} onClose={closeIntroVideoDialog} />
    </ProfileInformationStepContainer>
  )
}

export const ProfileInformationStep: ExpertWizardStep = {
  Header: ProfileInformationStepHeader,
  Body: ProfileInformationStepBody,
}
