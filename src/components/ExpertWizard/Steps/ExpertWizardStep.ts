import { FC } from 'react'

export interface ExpertWizardStepProps {
  onContinue?: () => unknown
  onBack?: () => unknown
  activeStep?: number
  totalSteps?: number
}

export interface ExpertWizardStep {
  Header: FC
  Body: FC<ExpertWizardStepProps>
}
