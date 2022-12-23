import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { DateTime } from 'luxon'
import Chip from '@mui/material/Chip'
import { enqueueSnackbar } from 'notistack'

import { getUserFullName } from 'utils/user/getUserFullName'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  CustomExpertAvatar,
  ExpertAvatarBox,
  ExpertAvatarIconBox,
  ExpertAvatarInfo,
  ExpertAvatarMain,
  ExpertAvatarSubtitle,
  ExpertBanner,
  ExpertContainer,
  ExpertExpertiseArea,
  ExpertName,
  VerifiedExpert,
  VerifiedExpertLabel,
  HeaderContainerBody,
  ExpertAvatarContainer,
  ExpertLeftSide,
  ExpertRightSide,
  ExpertBodySection,
  ChipsAutocomplete,
  EditContainer,
  ExpertDescription,
  ExpertDescriptionBox,
  ExpertEditProfileContainer,
  ExpertLeftPanel,
  ExpertLeftPanelBox,
  ExpertMiddlePanel,
  ExpertTitle,
  ExpertTitleInfo,
  TagsChipsBox,
  TagsContainer,
  VerticalDivider,
  AvatarButtons,
  AvatarButtonContainer,
  BannerHeaderContainer,
  TagsLabel,
  HiddenFileInput,
  SmallAutocomplete,
  EditableList,
  EditableOptions,
  AutocompleteSection,
  SmallTextField,
  SmallCategoriesAutocomplete,
  SmallLanguagesAutocomplete,
  DynamicCategoryPopper,
} from 'pageComponents/Settings/Expert/Profile/styles'
import { useEditableDescription } from 'hooks/api/expert/useEditableDescription'
import { EditControls } from 'pageComponents/Settings/Expert/Profile/EditControls'
import { useEditableTags } from 'hooks/api/expert/useEditableTags'
import { useEditableProfilePicture } from 'hooks/api/user/useEditableProfilePicture'
import { useEditableBannerImage } from 'hooks/api/expert/useEditableBannerImage'
import { IntroVideoDialog } from 'pageComponents/Settings/Expert/Profile/IntroVideoDialog'
import { useEditableExpertiseCategories } from 'hooks/api/expert/useEditableExpertiseCategories'
import { RemovableOption } from 'components/RemovableOption'
import { useEditableLanguages } from 'hooks/api/expert/useEditableLanguages'
import { useEditableExperiences } from 'hooks/api/expert/useEditableExperiences'
import { useEditableEducations } from 'hooks/api/expert/useEditableEducations'
import { useEditableExpertDetails } from 'hooks/api/expert/useEditableExpertDetails'
import { SettingsPage } from 'pageComponents/Settings'
import { FormError } from 'components/Form/Error'
import { Category } from 'interfaces/Category'
import { Language } from 'interfaces/Language'
import { useExpertAsserted } from 'hooks/useExpert'

export const ExpertEditProfilePage: NextPage = () => {
  const user = useCurrentUserAsserted()
  const expert = useExpertAsserted()
  const editableTags = useEditableTags(expert)
  const editableExperiences = useEditableExperiences(expert)
  const editableEducations = useEditableEducations(expert)
  const userFullName = getUserFullName(user)
  const { t } = useTranslation(LocaleNamespace.ExpertProfileSettings)

  const [open, setOpen] = useState(false)

  const openIntroVideoDialog = () => {
    setOpen(true)
  }

  const closeIntroVideoDialog = () => {
    setOpen(false)
  }

  const { editableProfilePicture } = useEditableProfilePicture({
    user,
    onSave: () => {
      enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
    },
  })

  const editableFileUpload = useEditableBannerImage({
    expert,
    onSave: () => {
      enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
    },
  })

  const editableDescription = useEditableDescription({
    expert,
  })

  const editableLanguages = useEditableLanguages({
    expert,
  })

  const editableExpertDetails = useEditableExpertDetails({
    expert,
  })

  const editableExpertiseCategories = useEditableExpertiseCategories({
    expert,
  })

  return (
    <SettingsPage>
      <BannerHeaderContainer>
        <ExpertBanner src={editableFileUpload.input.value} />
      </BannerHeaderContainer>
      <ExpertContainer>
        <HeaderContainerBody>
          <ExpertAvatarContainer>
            <ExpertLeftSide>
              <ExpertAvatarInfo>
                <ExpertAvatarBox>
                  <CustomExpertAvatar
                    width={272}
                    height={272}
                    expert={expert}
                  />
                  <AvatarButtonContainer>
                    <label htmlFor="profile-picture-input">
                      <HiddenFileInput
                        accept="image/*"
                        id="profile-picture-input"
                        type="file"
                        onChange={editableProfilePicture.input.onChange}
                      />
                      <AvatarButtons component="span">
                        {t('changeImageLabel')}
                      </AvatarButtons>
                    </label>
                    <AvatarButtons onClick={openIntroVideoDialog}>
                      {t('uploadIntroVideoLabel')}
                    </AvatarButtons>
                  </AvatarButtonContainer>
                </ExpertAvatarBox>
              </ExpertAvatarInfo>
              <ExpertAvatarMain>
                {expert.verified && (
                  <ExpertAvatarIconBox>
                    <VerifiedExpert />
                    <VerifiedExpertLabel>
                      {t('verifiedExpertLabel')}
                    </VerifiedExpertLabel>
                  </ExpertAvatarIconBox>
                )}
                <ExpertName>{userFullName}</ExpertName>
                <EditControls
                  editing={editableExpertDetails.editing}
                  onEdit={editableExpertDetails.enable}
                  onCancel={editableExpertDetails.cancel}
                  onSave={async () => {
                    if (await editableExpertDetails.save()) {
                      enqueueSnackbar(t('toastNotificationLabel'), {
                        variant: 'success',
                      })
                    }
                  }}
                />
                <EditContainer>
                  {!editableExpertDetails.editing && (
                    <ExpertExpertiseArea>
                      {expert.mainAreaOfExpertise}
                    </ExpertExpertiseArea>
                  )}
                  {editableExpertDetails.editing && (
                    <SmallTextField
                      {...editableExpertDetails.mainAreaOfExpertise.input}
                      variant="outlined"
                      placeholder={t('mainAreaOfExpertisePlaceholder')}
                      autoComplete="off"
                      error={!!editableExpertDetails.error}
                      fullWidth
                    />
                  )}
                </EditContainer>
                <EditContainer>
                  {!editableExpertDetails.editing && (
                    <ExpertAvatarSubtitle>
                      {expert.location}
                    </ExpertAvatarSubtitle>
                  )}
                  {editableExpertDetails.editing && (
                    <SmallTextField
                      {...editableExpertDetails.location.input}
                      variant="outlined"
                      placeholder={t('locationPlaceholder')}
                      autoComplete="off"
                      error={!!editableExpertDetails.error}
                      fullWidth
                    />
                  )}
                </EditContainer>
                {!!editableExpertDetails.error &&
                  editableExpertDetails.editing && (
                    <FormError>{editableExpertDetails.error}</FormError>
                  )}
              </ExpertAvatarMain>
            </ExpertLeftSide>
            <ExpertRightSide>
              <label htmlFor="banner-image-input">
                <HiddenFileInput
                  accept="image/*"
                  id="banner-image-input"
                  type="file"
                  onChange={editableFileUpload.input.onChange}
                />
                <AvatarButtons component="span">
                  {t('changeCoverImageLabel')}
                </AvatarButtons>
              </label>
            </ExpertRightSide>
          </ExpertAvatarContainer>
          <VerticalDivider />
        </HeaderContainerBody>

        <ExpertEditProfileContainer>
          <ExpertBodySection maxWidth="laptopL">
            <ExpertLeftPanel>
              <ExpertLeftPanelBox>
                <EditContainer>
                  <ExpertTitle>{t('expertIn')}</ExpertTitle>
                  <EditControls
                    editing={editableExpertiseCategories.editing}
                    onEdit={editableExpertiseCategories.enable}
                    onCancel={editableExpertiseCategories.cancel}
                    onSave={async () => {
                      if (await editableExpertiseCategories.save()) {
                        enqueueSnackbar(t('toastNotificationLabel'), {
                          variant: 'success',
                        })
                      }
                    }}
                  />
                </EditContainer>
                {editableExpertiseCategories.editing && (
                  <EditableList>
                    <AutocompleteSection>
                      <SmallCategoriesAutocomplete
                        PopperComponent={DynamicCategoryPopper}
                        {...editableExpertiseCategories.input}
                        fullWidth
                        inputValue={editableExpertiseCategories.textInput.value}
                        onInputChange={
                          editableExpertiseCategories.textInput.onChange
                        }
                        renderInput={(params) => (
                          <TextField
                            error={!!editableExpertiseCategories.error}
                            {...params}
                            placeholder={t('typeToAdd')}
                          />
                        )}
                      />
                      {!!editableExpertiseCategories.error &&
                        editableExpertiseCategories.editing && (
                          <FormError>
                            {editableExpertiseCategories.error}
                          </FormError>
                        )}
                    </AutocompleteSection>
                    <EditableOptions>
                      {editableExpertiseCategories.input.value.map(
                        (category) => (
                          <RemovableOption
                            key={category.id}
                            onDelete={() =>
                              editableExpertiseCategories.onDelete(category)
                            }
                          >
                            {category.title}
                          </RemovableOption>
                        )
                      )}
                    </EditableOptions>
                  </EditableList>
                )}
                {!editableExpertiseCategories.editing && (
                  <EditableOptions>
                    {(
                      expert.expertiseCategories as Category[] | undefined
                    )?.map((category) => (
                      <ExpertTitleInfo key={category.id}>
                        {category.title}
                      </ExpertTitleInfo>
                    ))}
                  </EditableOptions>
                )}
              </ExpertLeftPanelBox>
              <VerticalDivider />
              <ExpertLeftPanelBox>
                <ExpertTitle>{t('expertSince')}</ExpertTitle>
                <ExpertTitleInfo>
                  {DateTime.fromISO(expert.expertSince).toFormat('MMMM yyyy')}
                </ExpertTitleInfo>
              </ExpertLeftPanelBox>
              <VerticalDivider />
              <ExpertLeftPanelBox>
                <EditContainer>
                  <ExpertTitle>{t('expertFluentIn')}</ExpertTitle>
                  <EditControls
                    editing={editableLanguages.editing}
                    onEdit={editableLanguages.enable}
                    onCancel={editableLanguages.cancel}
                    onSave={async () => {
                      if (await editableLanguages.save()) {
                        enqueueSnackbar(t('toastNotificationLabel'), {
                          variant: 'success',
                        })
                      }
                    }}
                  />
                </EditContainer>
                {editableLanguages.editing && (
                  <EditableList>
                    <AutocompleteSection>
                      <SmallLanguagesAutocomplete
                        {...editableLanguages.input}
                        multiple
                        fullWidth
                        disableClearable
                        inputValue={editableLanguages.textInput.value}
                        onInputChange={editableLanguages.textInput.onChange}
                        renderInput={(params) => (
                          <TextField
                            error={!!editableLanguages.error}
                            {...params}
                            placeholder={t('typeToAdd')}
                          />
                        )}
                      />
                      {!editableLanguages.error &&
                        editableLanguages.editing && (
                          <FormError>{editableLanguages.error}</FormError>
                        )}
                    </AutocompleteSection>
                    <EditableOptions>
                      {editableLanguages.input.value.map((language) => (
                        <RemovableOption
                          key={language.id}
                          onDelete={() => editableLanguages.onDelete(language)}
                        >
                          {language.name}
                        </RemovableOption>
                      ))}
                    </EditableOptions>
                  </EditableList>
                )}
                {!editableLanguages.editing && (
                  <EditableOptions>
                    {(expert.languages as Language[] | undefined)?.map(
                      (language) => (
                        <ExpertTitleInfo key={language.id}>
                          {language.name}
                        </ExpertTitleInfo>
                      )
                    )}
                  </EditableOptions>
                )}
              </ExpertLeftPanelBox>
              <VerticalDivider />
              <ExpertLeftPanelBox>
                <EditContainer>
                  <ExpertTitle>{t('expertExperience')}</ExpertTitle>
                  <EditControls
                    editing={editableExperiences.editing}
                    onEdit={editableExperiences.enable}
                    onCancel={editableExperiences.cancel}
                    onSave={async () => {
                      if (await editableExperiences.save()) {
                        enqueueSnackbar(t('toastNotificationLabel'), {
                          variant: 'success',
                        })
                      }
                    }}
                  />
                </EditContainer>
                {editableExperiences.editing && (
                  <EditableList>
                    <AutocompleteSection>
                      <SmallAutocomplete
                        {...editableExperiences.input}
                        renderTags={() => null}
                        options={[]}
                        multiple
                        fullWidth
                        freeSolo
                        disableClearable
                        inputValue={editableExperiences.textInput.value}
                        onInputChange={editableExperiences.textInput.onChange}
                        renderInput={(params) => (
                          <TextField
                            error={!!editableExperiences.error}
                            {...params}
                            placeholder={t('typeToAdd')}
                          />
                        )}
                      />
                      {!!editableExperiences.error &&
                        editableExperiences.editing && (
                          <FormError>{editableExperiences.error}</FormError>
                        )}
                    </AutocompleteSection>
                    <EditableOptions>
                      {editableExperiences.input.value.map(
                        (experience, index) => (
                          <RemovableOption
                            key={`${experience}-${index}`}
                            onDelete={() =>
                              editableExperiences.onDelete(experience)
                            }
                          >
                            {experience}
                          </RemovableOption>
                        )
                      )}
                    </EditableOptions>
                  </EditableList>
                )}
                {!editableExperiences.editing && (
                  <EditableOptions>
                    {expert.experiences?.map((experience, index) => (
                      <ExpertTitleInfo key={`${experience}-${index}`}>
                        {experience}
                      </ExpertTitleInfo>
                    ))}
                  </EditableOptions>
                )}
              </ExpertLeftPanelBox>
              <VerticalDivider />
              <ExpertLeftPanelBox>
                <EditContainer>
                  <ExpertTitle>{t('expertEducation')}</ExpertTitle>
                  <EditControls
                    editing={editableEducations.editing}
                    onEdit={editableEducations.enable}
                    onCancel={editableEducations.cancel}
                    onSave={async () => {
                      if (await editableEducations.save()) {
                        enqueueSnackbar(t('toastNotificationLabel'), {
                          variant: 'success',
                        })
                      }
                    }}
                  />
                </EditContainer>
                {editableEducations.editing && (
                  <EditableList>
                    <AutocompleteSection>
                      <SmallAutocomplete
                        {...editableEducations.input}
                        renderTags={() => null}
                        options={[]}
                        multiple
                        fullWidth
                        freeSolo
                        disableClearable
                        inputValue={editableEducations.textInput.value}
                        onInputChange={editableEducations.textInput.onChange}
                        renderInput={(params) => (
                          <TextField
                            error={!!editableEducations.error}
                            {...params}
                            placeholder={t('typeToAdd')}
                          />
                        )}
                      />
                      {!!editableEducations.error &&
                        editableEducations.editing && (
                          <FormError>{editableEducations.error}</FormError>
                        )}
                    </AutocompleteSection>
                    <EditableOptions>
                      {editableEducations.input.value.map(
                        (education, index) => (
                          <RemovableOption
                            key={`${education}-${index}`}
                            onDelete={() =>
                              editableEducations.onDelete(education)
                            }
                          >
                            {education}
                          </RemovableOption>
                        )
                      )}
                    </EditableOptions>
                  </EditableList>
                )}
                {!editableEducations.editing && (
                  <EditableOptions>
                    {expert.educations?.map((education, index) => (
                      <ExpertTitleInfo key={`${education}-${index}`}>
                        {education}
                      </ExpertTitleInfo>
                    ))}
                  </EditableOptions>
                )}
              </ExpertLeftPanelBox>
            </ExpertLeftPanel>

            <ExpertMiddlePanel>
              <ExpertDescriptionBox>
                <ExpertTitle>{t('tellUsAboutYourself')}</ExpertTitle>
                <EditControls
                  editing={editableDescription.editing}
                  onEdit={editableDescription.enable}
                  onCancel={editableDescription.cancel}
                  onSave={async () => {
                    if (await editableDescription.save()) {
                      enqueueSnackbar(t('toastNotificationLabel'), {
                        variant: 'success',
                      })
                    }
                  }}
                />
              </ExpertDescriptionBox>
              <ExpertDescription
                multiline
                rows={13}
                disabled={!editableDescription.editing}
                {...editableDescription.input}
                error={!!editableDescription.error}
              />
              {!!editableDescription.error && editableDescription.editing && (
                <FormError>{editableDescription.error}</FormError>
              )}
              <TagsContainer>
                <TagsChipsBox>
                  <Typography>{t('expertTags')}</Typography>
                  <EditControls
                    editing={editableTags.editing}
                    onEdit={editableTags.enable}
                    onCancel={editableTags.cancel}
                    onSave={async () => {
                      if (await editableTags.save()) {
                        enqueueSnackbar(t('toastNotificationLabel'), {
                          variant: 'success',
                        })
                      }
                    }}
                  />
                </TagsChipsBox>
                <ChipsAutocomplete
                  options={[]}
                  freeSolo
                  multiple
                  limitTags={6}
                  disableListWrap
                  disabled={!editableTags.editing}
                  inputValue={editableTags.textInput.value}
                  onInputChange={editableTags.textInput.onChange}
                  renderTags={(value: readonly unknown[], getTagProps) =>
                    value.map((option: unknown, index: number) => (
                      // eslint-disable-next-line react/jsx-key
                      <Chip
                        color={editableTags.error ? 'error' : 'default'}
                        variant="outlined"
                        label={option as string}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      error={!!editableTags.error}
                      {...params}
                      placeholder={t('typeToAdd')}
                    />
                  )}
                  {...editableTags.input}
                />
                {!!editableTags.error && editableTags.editing ? (
                  <FormError>{editableTags.error}</FormError>
                ) : (
                  <TagsLabel>{t('tagsLabel')}</TagsLabel>
                )}
              </TagsContainer>
            </ExpertMiddlePanel>
          </ExpertBodySection>
          <VerticalDivider />
        </ExpertEditProfileContainer>
      </ExpertContainer>
      <IntroVideoDialog open={open} onClose={closeIntroVideoDialog} />
    </SettingsPage>
  )
}
