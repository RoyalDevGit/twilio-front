import { useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { enqueueSnackbar } from 'notistack'

import {
  AccountInformationContainer,
  ProfileAvatar,
  GeneralInformationContainer,
  HiddenFileInput,
  AccountInformationButton,
  AccountInformationButtonBox,
  AccountInformationFileSizeLabel,
  ProfileAvatarContainer,
  AccountInformationTitle,
  SmallTextField,
  AccountInputLabel,
  AccountInformationInput,
  InputActionsBox,
  InputBox,
  BlueInputLabel,
  ResetImageButton,
  AccountInformationDialog,
  CloseDialogIcon,
  CategoriesAutocomplete,
  EditableList,
  AutocompleteSection,
  EditableOptions,
  UserTitleInfo,
  AutoCompleteTextField,
  RemovableAreaOfInterest,
  SectionWithTitle,
  SocialMediaPageTitle,
  SocialMediaPageSubtitle,
  SocialMediaPageInput,
  SocialMediaPageInputLabel,
  SectionWithTitleContainer,
  ExpertInterests,
  AccountInformationBox,
  AccountInformationActionsBox,
} from 'pageComponents/Settings/Account/styles'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { SettingsPage } from 'pageComponents/Settings'
import { useEditableFullName } from 'hooks/api/user/useEditableFullName'
import { useEditableProfilePicture } from 'hooks/api/user/useEditableProfilePicture'
import { useEditableEmail } from 'hooks/api/user/useEditableEmail'
import { CloseCircleIcon } from 'icons/Close'
import { useEditableMobilePhoneNumber } from 'hooks/api/user/useEditableMobilePhoneNumber'
import { useEditableLocation } from 'hooks/api/user/useEditableLocation'
import { useEditableUserAreasOfInterest } from 'hooks/api/expert/useEditableUserAreasOfInterest'
import { useExpert } from 'hooks/useExpert'
import { useEditableSocialMedia } from 'hooks/api/user/useEditableSocialMedia'
import { EditControls } from 'pageComponents/Settings/EditControls'
import { PhoneNumberInput } from 'components/PhoneNumberInput'
import { joinPhoneNumber } from 'utils/string/joinPhoneNumber'
import { FormError } from 'components/Form/Error'
import { Category } from 'interfaces/Category'
import { useMask } from 'hooks/useMask'
import { useEditableTimeZone } from 'hooks/api/user/useEditableTimeZone'
import { getCurrentTimeZone } from 'utils/date/getCurrentTimeZone'

export const AccountInformationPage: NextPage = () => {
  const user = useCurrentUserAsserted()
  const expert = useExpert()
  const { t } = useTranslation(LocaleNamespace.Settings)
  const editableFullName = useEditableFullName(user)
  const editableEmail = useEditableEmail(user)
  const editableMobilePhoneNumber = useEditableMobilePhoneNumber(user)
  const editableLocation = useEditableLocation(user)
  const editableUserAreasOfInterest = useEditableUserAreasOfInterest(user)
  const editableFacebookLink = useEditableSocialMedia(expert, 'facebook')
  const editableLinkedInLink = useEditableSocialMedia(expert, 'linkedIn')
  const editableTwitterLink = useEditableSocialMedia(expert, 'twitter')
  const editableYouTubeLink = useEditableSocialMedia(expert, 'youTube')
  const editableInstagramLink = useEditableSocialMedia(expert, 'instagram')
  const editableTimeZone = useEditableTimeZone(
    user,
    user.settings?.timeZone || getCurrentTimeZone()
  )

  const maskedPhoneNumber = useMask({
    mask: '+0 (000) 000-0000',
    value: editableMobilePhoneNumber.input.value
      ? joinPhoneNumber(editableMobilePhoneNumber.input.value)
      : '',
  })

  const [openPhoneDialog, setOpenPhoneDialog] = useState(false)
  const [openLocationDialog, setOpenLocationDialog] = useState(false)

  const handleOpenPhoneDialog = () => {
    setOpenPhoneDialog(true)
  }

  const handleOpenLocationDialog = () => {
    setOpenLocationDialog(true)
  }

  const handleClose = () => {
    setOpenPhoneDialog(false)
    setOpenLocationDialog(false)
    editableTimeZone.editing = false
  }

  const { editableProfilePicture, onRemove: resetProfilePicture } =
    useEditableProfilePicture({
      user,
      onSave: () => {
        enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
      },
      onRemove: () => {
        enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
      },
    })

  const displaySocialMediaInputs = !!expert

  return (
    <SettingsPage>
      <AccountInformationContainer>
        <AccountInformationTitle variant="h6">
          {t('generalInformationTitle')}
        </AccountInformationTitle>
        <ProfileAvatarContainer data-testid="profile-avatar-container">
          <ProfileAvatar
            firstName={user.firstName}
            lastName={user.lastName}
            src={editableProfilePicture.input.value}
            width={104}
            height={104}
          />
          <AccountInformationButtonBox>
            <label htmlFor="profile-picture-input">
              <HiddenFileInput
                accept="image/*"
                id="profile-picture-input"
                data-testid="profile-picture-input"
                type="file"
                onChange={editableProfilePicture.input.onChange}
              />
              <AccountInformationButton
                component="span"
                variant="contained"
                color="secondary"
              >
                {t('uploadProfileImageLabel')}
              </AccountInformationButton>
            </label>
            <ResetImageButton
              data-testid="reset-profile-picture"
              variant="text"
              onClick={resetProfilePicture}
            >
              {t('resetProfileImageLabel')}
            </ResetImageButton>
            <AccountInformationFileSizeLabel variant="caption">
              {t('maxFileSizeLabel')}
            </AccountInformationFileSizeLabel>
          </AccountInformationButtonBox>
        </ProfileAvatarContainer>
        <GeneralInformationContainer>
          <AccountInformationInput data-testid="information-name">
            <InputActionsBox data-testid="information-name-actions">
              <InputBox>
                <AccountInputLabel>{t('nameLabel')}</AccountInputLabel>
                {!editableFullName.editing && (
                  <Typography data-testid="information-name-value">
                    {editableFullName.input.value}
                  </Typography>
                )}
                {editableFullName.editing && (
                  <>
                    <SmallTextField
                      id="information-name-input"
                      variant="outlined"
                      autoComplete="off"
                      {...editableFullName.input}
                      error={!!editableFullName.error}
                    />
                    {editableFullName.error && (
                      <FormError data-testid="information-name-error">
                        {editableFullName.error}
                      </FormError>
                    )}
                  </>
                )}
              </InputBox>
              <EditControls
                value={editableFullName.input.value}
                editing={editableFullName.editing}
                onEdit={editableFullName.enable}
                onCancel={editableFullName.cancel}
                onSave={async () => {
                  if (await editableFullName.save()) {
                    enqueueSnackbar(t('toastNotificationLabel'), {
                      variant: 'success',
                    })
                  }
                }}
              />
            </InputActionsBox>
            <Divider />
          </AccountInformationInput>
          <AccountInformationInput data-testid="information-email">
            <InputActionsBox data-testid="information-email-actions">
              <InputBox>
                <AccountInputLabel>{t('emailLabel')}</AccountInputLabel>
                {!editableEmail.editing && (
                  <Typography data-testid="information-email-value">
                    {editableEmail.input.value}
                  </Typography>
                )}
                {editableEmail.editing && (
                  <>
                    <SmallTextField
                      id="information-email-input"
                      variant="outlined"
                      autoComplete="off"
                      {...editableEmail.input}
                      error={!!editableEmail.error}
                    />
                    {editableEmail.error && (
                      <FormError data-testid="information-email-error">
                        {editableEmail.error}
                      </FormError>
                    )}
                  </>
                )}
              </InputBox>
              <EditControls
                value={editableEmail.input.value}
                editing={editableEmail.editing}
                onEdit={editableEmail.enable}
                onCancel={editableEmail.cancel}
                onSave={async () => {
                  if (await editableEmail.save()) {
                    enqueueSnackbar(t('toastNotificationLabel'), {
                      variant: 'success',
                    })
                  }
                }}
              />
            </InputActionsBox>
            <Divider />
          </AccountInformationInput>
          <AccountInformationInput data-testid="information-mobile">
            <InputActionsBox data-testid="information-mobile-actions">
              <InputBox>
                <AccountInputLabel>
                  {t('addMobilePhoneLabel')}
                </AccountInputLabel>
                {!editableMobilePhoneNumber.editing &&
                  !editableMobilePhoneNumber.input.value && (
                    <BlueInputLabel onClick={handleOpenPhoneDialog}>
                      {t('addMobilePhoneSubtitleLabel')}
                    </BlueInputLabel>
                  )}
                {!editableMobilePhoneNumber.editing && (
                  <Typography data-testid="information-mobile-value">
                    {editableMobilePhoneNumber.input.value
                      ? maskedPhoneNumber
                      : null}
                  </Typography>
                )}
                {editableMobilePhoneNumber.editing && (
                  <>
                    <PhoneNumberInput
                      {...editableMobilePhoneNumber.input}
                      error={!!editableMobilePhoneNumber.error}
                    />
                    {editableMobilePhoneNumber.error && (
                      <FormError data-testid="information-mobile-error">
                        {editableMobilePhoneNumber.error}
                      </FormError>
                    )}
                  </>
                )}
              </InputBox>
              <EditControls
                value={editableMobilePhoneNumber.input.value}
                editing={editableMobilePhoneNumber.editing}
                onEdit={editableMobilePhoneNumber.enable}
                onCancel={editableMobilePhoneNumber.cancel}
                onSave={async () => {
                  if (await editableMobilePhoneNumber.save()) {
                    enqueueSnackbar(t('toastNotificationLabel'), {
                      variant: 'success',
                    })
                  }
                }}
              />
            </InputActionsBox>
            <Divider />
          </AccountInformationInput>
          <AccountInformationInput
            id="location"
            data-testid="information-location"
          >
            <InputActionsBox data-testid="information-location-actions">
              <InputBox>
                <AccountInputLabel>{t('locationLabel')}</AccountInputLabel>
                {!editableLocation.editing && !editableLocation.input.value && (
                  <BlueInputLabel onClick={handleOpenLocationDialog}>
                    {t('locationSubtitleLabel')}
                  </BlueInputLabel>
                )}
                {!editableLocation.editing && (
                  <Typography data-testid="information-location-value">
                    {editableLocation.input.value}
                  </Typography>
                )}
                {editableLocation.editing && (
                  <>
                    <SmallTextField
                      variant="outlined"
                      autoComplete="off"
                      {...editableLocation.input}
                      error={!!editableLocation.error}
                      id="information-location-input"
                    />
                    {editableLocation.error && (
                      <FormError data-testid="information-location-error">
                        {editableLocation.error}
                      </FormError>
                    )}
                  </>
                )}
              </InputBox>
              <EditControls
                value={editableLocation.input.value}
                editing={editableLocation.editing}
                onEdit={editableLocation.enable}
                onCancel={editableLocation.cancel}
                onSave={async () => {
                  if (await editableLocation.save()) {
                    enqueueSnackbar(t('toastNotificationLabel'), {
                      variant: 'success',
                    })
                  }
                }}
              />
            </InputActionsBox>
            <Divider />
          </AccountInformationInput>
        </GeneralInformationContainer>
      </AccountInformationContainer>

      <ExpertInterests>
        <AccountInformationActionsBox data-testid="information-areas">
          <AccountInformationBox>
            <AccountInformationTitle variant="h6" id="areas-of-interest">
              {t('areasOfInterestTitle')}
            </AccountInformationTitle>
            <SocialMediaPageSubtitle>
              {t('areasOfInterestLabel')}
            </SocialMediaPageSubtitle>
          </AccountInformationBox>
          <EditControls
            value={editableUserAreasOfInterest.input.value.toString()}
            editing={editableUserAreasOfInterest.editing}
            onEdit={editableUserAreasOfInterest.enable}
            onCancel={editableUserAreasOfInterest.cancel}
            onSave={async () => {
              if (await editableUserAreasOfInterest.save()) {
                enqueueSnackbar(t('toastNotificationLabel'), {
                  variant: 'success',
                })
              }
            }}
          />
        </AccountInformationActionsBox>
        <AccountInformationInput>
          <InputActionsBox>
            <InputBox>
              {!editableUserAreasOfInterest.editing &&
                !editableUserAreasOfInterest.input.value && (
                  <BlueInputLabel>{t('areasOfInterestLabel')}</BlueInputLabel>
                )}

              {editableUserAreasOfInterest.editing && (
                <EditableList>
                  <AutocompleteSection>
                    <CategoriesAutocomplete
                      {...editableUserAreasOfInterest.input}
                      fullWidth
                      disableClearable
                      inputValue={editableUserAreasOfInterest.textInput.value}
                      onInputChange={
                        editableUserAreasOfInterest.textInput.onChange
                      }
                      renderInput={(params) => (
                        <AutoCompleteTextField
                          {...params}
                          error={!!editableUserAreasOfInterest.error}
                          placeholder={t('typeToAdd')}
                        />
                      )}
                    />
                    {editableUserAreasOfInterest.error && (
                      <FormError>{editableUserAreasOfInterest.error}</FormError>
                    )}
                  </AutocompleteSection>
                  <EditableOptions data-testid="information-areas-option">
                    {editableUserAreasOfInterest.input.value.map(
                      (areaOfInterest) => (
                        <RemovableAreaOfInterest
                          key={areaOfInterest.id}
                          onDelete={() =>
                            editableUserAreasOfInterest.onDelete(areaOfInterest)
                          }
                          data-testid="information-areas-remove"
                        >
                          {areaOfInterest.title}
                        </RemovableAreaOfInterest>
                      )
                    )}
                  </EditableOptions>
                </EditableList>
              )}
              {!editableUserAreasOfInterest.editing && (
                <EditableOptions>
                  {(user.areasOfInterest as Category[] | undefined)?.map(
                    (area) => (
                      <UserTitleInfo
                        data-testid="information-areas-value"
                        key={area.id}
                      >
                        {area.title}
                      </UserTitleInfo>
                    )
                  )}
                </EditableOptions>
              )}
            </InputBox>
          </InputActionsBox>
          <Divider />
        </AccountInformationInput>
      </ExpertInterests>

      {displaySocialMediaInputs && (
        <SectionWithTitle>
          <SectionWithTitleContainer>
            <SocialMediaPageTitle variant="h6">
              {t('socialMedia')}
            </SocialMediaPageTitle>
            <SocialMediaPageSubtitle>
              {t('socialMediaDescription')}
            </SocialMediaPageSubtitle>
          </SectionWithTitleContainer>
          <SocialMediaPageInput data-testid="information-social-facebook">
            <InputActionsBox data-testid="information-social-facebook-actions">
              <InputBox>
                <SocialMediaPageInputLabel>
                  {t('socialMediaFacebookLabel')}
                </SocialMediaPageInputLabel>
                {!editableFacebookLink.editing &&
                  !expert?.socialMediaLinks?.facebook && (
                    <Typography>
                      {t('socialMediaFacebookPlaceholder')}
                    </Typography>
                  )}
                {!editableFacebookLink.editing &&
                  !!expert?.socialMediaLinks?.facebook && (
                    <Typography data-testid="information-social-facebook-value">
                      {expert.socialMediaLinks.facebook}
                    </Typography>
                  )}
                {editableFacebookLink.editing && (
                  <>
                    <SmallTextField
                      variant="outlined"
                      disabled={!editableFacebookLink.editing}
                      autoComplete="off"
                      placeholder={t('socialMediaFacebookPlaceholder')}
                      error={!!editableFacebookLink.error}
                      {...editableFacebookLink.input}
                      id="information-social-facebook-input"
                    />
                    {editableFacebookLink.error && (
                      <FormError data-testid="information-social-facebook-error">
                        {editableFacebookLink.error}
                      </FormError>
                    )}
                  </>
                )}
              </InputBox>
              <EditControls
                value={editableFacebookLink.input.value}
                editing={editableFacebookLink.editing}
                onEdit={editableFacebookLink.enable}
                onCancel={editableFacebookLink.cancel}
                onSave={async () => {
                  if (await editableFacebookLink.save()) {
                    enqueueSnackbar(t('toastNotificationLabel'), {
                      variant: 'success',
                    })
                  }
                }}
              />
            </InputActionsBox>
            <Divider />
          </SocialMediaPageInput>
          <SocialMediaPageInput data-testid="information-social-linkedin">
            <InputActionsBox data-testid="information-social-linkedin-actions">
              <InputBox>
                <SocialMediaPageInputLabel>
                  {t('socialMediaLinkedInLabel')}
                </SocialMediaPageInputLabel>
                {!editableLinkedInLink.editing &&
                  !expert?.socialMediaLinks?.linkedIn && (
                    <Typography>
                      {t('socialMediaLinkedInPlaceholder')}
                    </Typography>
                  )}
                {!editableLinkedInLink.editing &&
                  !!expert?.socialMediaLinks?.linkedIn && (
                    <Typography data-testid="information-social-linkedin-value">
                      {expert.socialMediaLinks.linkedIn}
                    </Typography>
                  )}
                {editableLinkedInLink.editing && (
                  <>
                    <SmallTextField
                      variant="outlined"
                      disabled={!editableLinkedInLink.editing}
                      autoComplete="off"
                      error={!!editableLinkedInLink.error}
                      placeholder={t('socialMediaLinkedInPlaceholder')}
                      id="information-social-linkedin-input"
                      {...editableLinkedInLink.input}
                    />
                    {editableLinkedInLink.error && (
                      <FormError data-testid="information-social-linkedin-error">
                        {editableLinkedInLink.error}
                      </FormError>
                    )}
                  </>
                )}
              </InputBox>
              <EditControls
                value={editableLinkedInLink.input.value}
                editing={editableLinkedInLink.editing}
                onEdit={editableLinkedInLink.enable}
                onCancel={editableLinkedInLink.cancel}
                onSave={async () => {
                  if (await editableLinkedInLink.save()) {
                    enqueueSnackbar(t('toastNotificationLabel'), {
                      variant: 'success',
                    })
                  }
                }}
              />
            </InputActionsBox>
            <Divider />
          </SocialMediaPageInput>
          <SocialMediaPageInput data-testid="information-social-twitter">
            <InputActionsBox data-testid="information-social-twitter-actions">
              <InputBox>
                <SocialMediaPageInputLabel>
                  {t('socialMediaTwitterLabel')}
                </SocialMediaPageInputLabel>
                {!editableTwitterLink.editing &&
                  !expert?.socialMediaLinks?.twitter && (
                    <Typography>
                      {t('socialMediaTwitterPlaceholder')}
                    </Typography>
                  )}
                {!editableTwitterLink.editing &&
                  !!expert?.socialMediaLinks?.twitter && (
                    <Typography data-testid="information-social-twitter-value">
                      {expert.socialMediaLinks.twitter}
                    </Typography>
                  )}
                {editableTwitterLink.editing && (
                  <>
                    <SmallTextField
                      variant="outlined"
                      disabled={!editableTwitterLink.editing}
                      autoComplete="off"
                      error={!!editableTwitterLink.error}
                      placeholder={t('socialMediaTwitterPlaceholder')}
                      id="information-social-twitter-input"
                      {...editableTwitterLink.input}
                    />
                    {editableTwitterLink.error && (
                      <FormError data-testid="information-social-twitter-error">
                        {editableTwitterLink.error}
                      </FormError>
                    )}
                  </>
                )}
              </InputBox>
              <EditControls
                value={editableTwitterLink.input.value}
                editing={editableTwitterLink.editing}
                onEdit={editableTwitterLink.enable}
                onCancel={editableTwitterLink.cancel}
                onSave={async () => {
                  if (await editableTwitterLink.save()) {
                    enqueueSnackbar(t('toastNotificationLabel'), {
                      variant: 'success',
                    })
                  }
                }}
              />
            </InputActionsBox>
            <Divider />
          </SocialMediaPageInput>
          <SocialMediaPageInput data-testid="information-social-youtube">
            <InputActionsBox data-testid="information-social-youtube-actions">
              <InputBox>
                <SocialMediaPageInputLabel>
                  {t('socialMediaYoutubeLabel')}
                </SocialMediaPageInputLabel>
                {!editableYouTubeLink.editing &&
                  !expert?.socialMediaLinks?.youTube && (
                    <Typography>
                      {t('socialMediaYoutubePlaceholder')}
                    </Typography>
                  )}
                {!editableYouTubeLink.editing &&
                  !!expert?.socialMediaLinks?.youTube && (
                    <Typography data-testid="information-social-youtube-value">
                      {expert.socialMediaLinks.youTube}
                    </Typography>
                  )}
                {editableYouTubeLink.editing && (
                  <>
                    <SmallTextField
                      variant="outlined"
                      disabled={!editableYouTubeLink.editing}
                      autoComplete="off"
                      error={!!editableYouTubeLink.error}
                      placeholder={t('socialMediaYoutubePlaceholder')}
                      {...editableYouTubeLink.input}
                      id="information-social-youtube-input"
                    />
                    {editableYouTubeLink.error && (
                      <FormError>{editableYouTubeLink.error}</FormError>
                    )}
                  </>
                )}
              </InputBox>
              <EditControls
                value={editableYouTubeLink.input.value}
                editing={editableYouTubeLink.editing}
                onEdit={editableYouTubeLink.enable}
                onCancel={editableYouTubeLink.cancel}
                onSave={async () => {
                  if (await editableYouTubeLink.save()) {
                    enqueueSnackbar(t('toastNotificationLabel'), {
                      variant: 'success',
                    })
                  }
                }}
              />
            </InputActionsBox>
            <Divider />
          </SocialMediaPageInput>
          <SocialMediaPageInput data-testid="information-social-instagram">
            <InputActionsBox data-testid="information-social-instagram-actions">
              <InputBox>
                <SocialMediaPageInputLabel>
                  {t('socialMediaInstagramLabel')}
                </SocialMediaPageInputLabel>
                {!editableInstagramLink.editing &&
                  !expert?.socialMediaLinks?.instagram && (
                    <Typography data-testid="information-social-instagram-value">
                      {t('socialMediaInstagramPlaceholder')}
                    </Typography>
                  )}
                {!editableInstagramLink.editing &&
                  !!expert?.socialMediaLinks?.instagram && (
                    <Typography>{expert.socialMediaLinks.instagram}</Typography>
                  )}
                {editableInstagramLink.editing && (
                  <>
                    <SmallTextField
                      variant="outlined"
                      disabled={!editableInstagramLink.editing}
                      autoComplete="off"
                      error={!!editableInstagramLink.error}
                      placeholder={t('socialMediaInstagramPlaceholder')}
                      id="information-social-instagram-input"
                      {...editableInstagramLink.input}
                    />

                    {editableInstagramLink.error && (
                      <FormError data-testid="information-social-instagram-error">
                        {editableInstagramLink.error}
                      </FormError>
                    )}
                  </>
                )}
              </InputBox>
              <EditControls
                value={editableInstagramLink.input.value}
                editing={editableInstagramLink.editing}
                onEdit={editableInstagramLink.enable}
                onCancel={editableInstagramLink.cancel}
                onSave={async () => {
                  if (await editableInstagramLink.save()) {
                    enqueueSnackbar(t('toastNotificationLabel'), {
                      variant: 'success',
                    })
                  }
                }}
              />
            </InputActionsBox>
          </SocialMediaPageInput>
        </SectionWithTitle>
      )}

      <AccountInformationDialog open={openPhoneDialog}>
        <DialogTitle>{t('addMobilePhoneSubtitleLabel')}</DialogTitle>
        <CloseDialogIcon>
          <CloseCircleIcon onClick={handleClose} />
        </CloseDialogIcon>
        <Divider />
        <DialogContent>
          <DialogContentText>
            {t('addMobilePhoneDialogDescription')}
          </DialogContentText>
        </DialogContent>
      </AccountInformationDialog>
      <AccountInformationDialog open={openLocationDialog} onClose={handleClose}>
        <DialogTitle>{t('locationSubtitleLabel')}</DialogTitle>
        <CloseDialogIcon>
          <CloseCircleIcon onClick={handleClose} />
        </CloseDialogIcon>
        <Divider />
        <DialogContent>
          <DialogContentText>
            {t('locationDialogDescription')}
          </DialogContentText>
        </DialogContent>
      </AccountInformationDialog>
    </SettingsPage>
  )
}
