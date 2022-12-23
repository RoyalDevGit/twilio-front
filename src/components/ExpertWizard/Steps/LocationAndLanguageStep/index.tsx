import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ExpertWizardStepProps,
  ExpertWizardStep,
} from 'components/ExpertWizard/Steps/ExpertWizardStep'
import {
  CustomLanguageAutocomplete,
  EditableOptions,
  EditableOptionsBox,
  LocationAndLanguagesContainer,
  LocationAndLanguagesFormBox,
  LocationAndLanguagesFormLabel,
  LocationAndLanguagesTitle,
  LocationTextField,
} from 'components/ExpertWizard/Steps/LocationAndLanguageStep/styles'
import { useExpertAsserted } from 'hooks/useExpert'
import { useEditableExpertDetails } from 'hooks/api/expert/useEditableExpertDetails'
import {
  ExpertWizardButtonBox,
  ExpertWizardButtons,
} from 'components/ExpertWizard/styles'
import { useEditableLanguages } from 'hooks/api/expert/useEditableLanguages'
import { RemovableOption } from 'components/RemovableOption'
import { getUserFullName } from 'utils/user/getUserFullName'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { FormError } from 'components/Form/Error'

const LocationAndLanguageStepHeader: FC<ExpertWizardStepProps> = () => {
  const { t } = useTranslation(LocaleNamespace.ExpertWizard)
  const user = useCurrentUserAsserted()
  const expertName = getUserFullName(user)

  return (
    <LocationAndLanguagesTitle>
      {t('locationAndLanguageTitle', {
        expertFullName: expertName,
      })}
    </LocationAndLanguagesTitle>
  )
}

const LocationAndLanguageStepBody: FC<ExpertWizardStepProps> = ({
  onContinue,
  onBack,
  activeStep,
}) => {
  const { t } = useTranslation(LocaleNamespace.ExpertWizard)
  const expert = useExpertAsserted()

  const editableExpertDetails = useEditableExpertDetails({
    expert,
  })

  const editableLanguages = useEditableLanguages({
    expert,
  })

  const saveData = async () => {
    await editableExpertDetails.save()
    await editableLanguages.save()
  }

  const handleContinue = async () => {
    await saveData()
    if (onContinue) {
      onContinue()
    }
  }

  const handleBack = async () => {
    await saveData()
    if (onBack) {
      onBack()
    }
  }

  const isSaving = editableLanguages.saving || editableExpertDetails.saving

  return (
    <LocationAndLanguagesContainer>
      <LocationAndLanguagesFormBox>
        <LocationAndLanguagesFormLabel>
          {t('locationAndLanguageFormLabel-1')}
        </LocationAndLanguagesFormLabel>
        <LocationTextField
          {...editableExpertDetails.location.input}
          variant="outlined"
          placeholder={t('typeToAdd')}
          autoComplete="off"
          fullWidth
          error={!!editableExpertDetails.error}
        />
        {!!editableExpertDetails.error && (
          <FormError>{editableExpertDetails.error}</FormError>
        )}
      </LocationAndLanguagesFormBox>
      <LocationAndLanguagesFormBox>
        <LocationAndLanguagesFormLabel>
          {t('locationAndLanguageFormLabel-2')}
        </LocationAndLanguagesFormLabel>
        <CustomLanguageAutocomplete
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
        {!!editableLanguages.error && (
          <>
            <FormError>{editableLanguages.error}</FormError>
            <Divider sx={{ borderBottomWidth: 3 }} />
          </>
        )}

        <EditableOptions>
          {editableLanguages.input.value.map((language) => (
            <EditableOptionsBox key={language.id}>
              <RemovableOption
                onDelete={() => editableLanguages.onDelete(language)}
              >
                {language.name}
              </RemovableOption>
            </EditableOptionsBox>
          ))}
        </EditableOptions>
      </LocationAndLanguagesFormBox>
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
    </LocationAndLanguagesContainer>
  )
}

export const LocationAndLanguageStep: ExpertWizardStep = {
  Header: LocationAndLanguageStepHeader,
  Body: LocationAndLanguageStepBody,
}
