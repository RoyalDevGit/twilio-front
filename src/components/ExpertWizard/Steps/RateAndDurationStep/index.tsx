import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { useMount } from 'react-use'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ExpertWizardStepProps,
  ExpertWizardStep,
} from 'components/ExpertWizard/Steps/ExpertWizardStep'
import { StepTitle } from 'components/ExpertWizard/Steps/styles'
import {
  RateAndDurationContainer,
  RateAndDurationLabel,
  RateAndDurationSubtitle,
  RateAndDurationFormBox,
  HourlyRateInputLabel,
} from 'components/ExpertWizard/Steps/RateAndDurationStep/styles'
import { SessionDurationOptions } from 'components/SessionDurationOptions'
import { useExpertAsserted } from 'hooks/useExpert'
import { useEditableHourlyRate } from 'hooks/api/expert/useEditableHourlyRate'
import { useEditableSessionDurationOptions } from 'hooks/api/expert/useEditableSessionDurationOptions'
import { ExpertApi } from 'apis/ExpertApi'
import {
  ExpertWizardButtonBox,
  ExpertWizardButtons,
} from 'components/ExpertWizard/styles'
import { FormError } from 'components/Form/Error'

const RateAndDurationStepHeader: FC<ExpertWizardStepProps> = () => {
  const { t } = useTranslation(LocaleNamespace.ExpertWizard)

  return <StepTitle>{t('rateAndDurationTitle')}</StepTitle>
}

const RateAndDurationStepBody: FC<ExpertWizardStepProps> = ({
  onContinue,
  onBack,
  activeStep,
}) => {
  const expert = useExpertAsserted()
  const { t } = useTranslation(LocaleNamespace.ExpertWizard)

  const editableHourlyRate = useEditableHourlyRate({
    expert,
  })

  const editableSessionDurationOptions = useEditableSessionDurationOptions({
    expert,
    initialValue: [],
  })

  useMount(() => {
    const loadOptions = async () => {
      const sessionOptionsResult = await ExpertApi.getSessionDurationOptions(
        expert.id
      )
      if (sessionOptionsResult.ok()) {
        const optionsLoaded = await sessionOptionsResult.getData()
        editableSessionDurationOptions.setValue(optionsLoaded)
      }
    }
    loadOptions()
  })

  const handleContinue = async () => {
    // await editableHourlyRate.save()
    if (onContinue) {
      onContinue()
    }
  }

  const handleBack = async () => {
    // await editableHourlyRate.save()
    if (onBack) {
      onBack()
    }
  }

  const isSaving =
    editableHourlyRate.saving || editableSessionDurationOptions.saving

  return (
    <RateAndDurationContainer>
      <RateAndDurationFormBox>
        <RateAndDurationLabel variant="h2">
          {t('rateAndDurationFormLabel-1')}
        </RateAndDurationLabel>
        <RateAndDurationSubtitle variant="body2">
          {t('rateAndDurationFormLabel-1-Subtitle')}
        </RateAndDurationSubtitle>
        <HourlyRateInputLabel>
          {t('RateAndDurationInputLabel')}
        </HourlyRateInputLabel>
        <TextField
          type="text"
          variant="outlined"
          fullWidth
          {...editableHourlyRate.input}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          error={!!editableHourlyRate.error}
        />
        {!!editableHourlyRate.error && (
          <FormError>{editableHourlyRate.error}</FormError>
        )}
      </RateAndDurationFormBox>
      <RateAndDurationFormBox>
        <RateAndDurationLabel variant="h2">
          {t('rateAndDurationFormLabel-2')}
        </RateAndDurationLabel>
        <RateAndDurationSubtitle variant="body2">
          {t('rateAndDurationFormLabel-2-Subtitle')}
        </RateAndDurationSubtitle>
        <SessionDurationOptions
          options={editableSessionDurationOptions.value}
          onAdd={editableSessionDurationOptions.onOptionAdd}
          onRemove={editableSessionDurationOptions.onOptionRemove}
          onDurationChange={
            editableSessionDurationOptions.onOptionDurationChange
          }
          errors={editableSessionDurationOptions.errors}
        />
      </RateAndDurationFormBox>
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
    </RateAndDurationContainer>
  )
}

export const RateAndDurationStep: ExpertWizardStep = {
  Header: RateAndDurationStepHeader,
  Body: RateAndDurationStepBody,
}
