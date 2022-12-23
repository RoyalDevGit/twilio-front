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
import { StepTitle } from 'components/ExpertWizard/Steps/styles'
import {
  AreasOfExpertiseContainer,
  AreasOfExpertiseFormBox,
  AreasOfExpertiseFormLabel,
  EditableOptions,
  EditableOptionsBox,
  ExpertiseAutocomplete,
} from 'components/ExpertWizard/Steps/AreasOfExpertiseStep/styles'
import { useExpertAsserted } from 'hooks/useExpert'
import { useEditableExpertiseCategories } from 'hooks/api/expert/useEditableExpertiseCategories'
import { RemovableOption } from 'components/RemovableOption'
import {
  ExpertWizardButtonBox,
  ExpertWizardButtons,
} from 'components/ExpertWizard/styles'
import { useEditableExpertDetails } from 'hooks/api/expert/useEditableExpertDetails'
import { FormError } from 'components/Form/Error'

const AreasOfExpertiseStepHeader: FC<ExpertWizardStepProps> = () => {
  const { t } = useTranslation(LocaleNamespace.ExpertWizard)

  return <StepTitle>{t('areasOfExpertiseTitle')}</StepTitle>
}

const AreasOfExpertiseStepBody: FC<ExpertWizardStepProps> = ({
  onContinue,
  onBack,
  activeStep,
}) => {
  const { t } = useTranslation(LocaleNamespace.ExpertWizard)
  const expert = useExpertAsserted()

  const editableExpertDetails = useEditableExpertDetails({
    expert,
  })

  const editableExpertiseCategories = useEditableExpertiseCategories({
    expert,
  })

  const saveData = async () => {
    await editableExpertiseCategories.save()
    await editableExpertDetails.save()
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

  const isSaving =
    editableExpertiseCategories.saving || editableExpertDetails.saving

  return (
    <AreasOfExpertiseContainer>
      <AreasOfExpertiseFormBox>
        <AreasOfExpertiseFormLabel>
          {t('mainAreaOfExpertiseFormLabel')}
        </AreasOfExpertiseFormLabel>
        <TextField
          {...editableExpertDetails.mainAreaOfExpertise.input}
          variant="outlined"
          placeholder={t('mainAreasOfExpertiseFormPlaceholder')}
          autoComplete="off"
          fullWidth
          error={!!editableExpertDetails.error}
        />
        {editableExpertDetails.error && (
          <FormError>{editableExpertDetails.error}</FormError>
        )}
      </AreasOfExpertiseFormBox>
      <AreasOfExpertiseFormBox>
        <AreasOfExpertiseFormLabel>
          {t('areasOfExpertiseFormLabel')}
        </AreasOfExpertiseFormLabel>
        <ExpertiseAutocomplete
          {...editableExpertiseCategories.input}
          fullWidth
          inputValue={editableExpertiseCategories.textInput.value}
          onInputChange={editableExpertiseCategories.textInput.onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!editableExpertiseCategories.error}
              placeholder={t('areasOfExpertiseFormPlaceholder')}
            />
          )}
        />
        {!!editableExpertiseCategories.error && (
          <>
            <FormError>{editableExpertiseCategories.error}</FormError>
            <Divider sx={{ borderBottomWidth: 3 }} />
          </>
        )}

        <EditableOptions>
          {editableExpertiseCategories.input.value.map((category) => (
            <EditableOptionsBox key={category.id}>
              <RemovableOption
                onDelete={() => editableExpertiseCategories.onDelete(category)}
              >
                {category.title}
              </RemovableOption>
            </EditableOptionsBox>
          ))}
        </EditableOptions>
      </AreasOfExpertiseFormBox>

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
    </AreasOfExpertiseContainer>
  )
}

export const AreasOfExpertiseStep: ExpertWizardStep = {
  Header: AreasOfExpertiseStepHeader,
  Body: AreasOfExpertiseStepBody,
}
