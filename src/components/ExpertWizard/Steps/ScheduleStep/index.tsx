import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { useMount } from 'react-use'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ExpertWizardStepProps,
  ExpertWizardStep,
} from 'components/ExpertWizard/Steps/ExpertWizardStep'
import { StepTitle } from 'components/ExpertWizard/Steps/styles'
import { ScheduleStepContainer } from 'components/ExpertWizard/Steps/ScheduleStep/styles'
import {
  ExpertWizardButtonBox,
  ExpertWizardButtons,
} from 'components/ExpertWizard/styles'
import { useEditableAvailabilityOptions } from 'hooks/api/expert/useEditableAvailabilityOptions'
import { AvailabilityOptions } from 'components/AvailabilityOptions'
import { useExpertAsserted } from 'hooks/useExpert'
import { ExpertApi } from 'apis/ExpertApi'

const ScheduleStepHeader: FC<ExpertWizardStepProps> = () => {
  const { t } = useTranslation(LocaleNamespace.ExpertWizard)

  return <StepTitle>{t('scheduleTitle')}</StepTitle>
}

const ScheduleStepBody: FC<ExpertWizardStepProps> = ({
  onContinue,
  onBack,
  activeStep,
}) => {
  const { t } = useTranslation(LocaleNamespace.ExpertWizard)
  const expert = useExpertAsserted()

  const editableAvailabilityOptions = useEditableAvailabilityOptions({
    expert,
    initialValue: [],
  })

  useMount(() => {
    const loadOptions = async () => {
      const availabilityOptionsResult = await ExpertApi.getAvailabilityOptions(
        expert.id
      )
      if (availabilityOptionsResult.ok()) {
        const optionsLoaded = await availabilityOptionsResult.getData()
        editableAvailabilityOptions.setValue(optionsLoaded)
      }
    }
    loadOptions()
  })

  return (
    <ScheduleStepContainer>
      <AvailabilityOptions
        value={editableAvailabilityOptions.value}
        onWeekdayToggle={editableAvailabilityOptions.onWeekdayToggle}
        onTimeRangeAdd={editableAvailabilityOptions.onTimeRangeAdd}
        onTimeRangeDelete={editableAvailabilityOptions.onTimeRangeDelete}
        onEndTimeChange={editableAvailabilityOptions.onEndTimeChange}
        onStartTimeChange={editableAvailabilityOptions.onStartTimeChange}
        errors={editableAvailabilityOptions.errors}
        onApplyToAll={(weekday) =>
          editableAvailabilityOptions.applyToAll(weekday)
        }
      />
      <ExpertWizardButtonBox>
        <ExpertWizardButtons
          variant="text"
          onClick={onBack}
          disabled={activeStep === 0}
          startIcon={<ChevronLeftIcon />}
        >
          {t('back')}
        </ExpertWizardButtons>
        <ExpertWizardButtons
          variant="contained"
          color="primary"
          onClick={onContinue}
        >
          {t('continue')}
        </ExpertWizardButtons>
      </ExpertWizardButtonBox>
    </ScheduleStepContainer>
  )
}

export const ScheduleStep: ExpertWizardStep = {
  Header: ScheduleStepHeader,
  Body: ScheduleStepBody,
}
