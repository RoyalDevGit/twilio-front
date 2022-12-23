import { useTranslation } from 'next-i18next'
import { FC, useCallback, useState } from 'react'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { StepIconProps } from '@mui/material/StepIcon'
import { useMount } from 'react-use'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Logo } from 'components/Logo'
import { ExpertWizardStep } from 'components/ExpertWizard/Steps/ExpertWizardStep'
import { LocationAndLanguageStep } from 'components/ExpertWizard/Steps/LocationAndLanguageStep'
import {
  ExpertWizardDialog,
  ExpertWizardHeader,
  ExpertWizardBody,
  ExpertWizardLeftPanel,
  ExpertWizardRightPanel,
  ExpertWizardButtons,
  ProgressBar,
  CustomStepper,
  CompleteWizard,
  CompleteWizardTitle,
  CompleteWizardTitleBox,
  FeaturedExpertsWallpaperBox,
  CompleteWizardSubtitle,
  CircularProgressContainer,
  ExpertWizardRightPanelImage,
} from 'components/ExpertWizard/styles'
import { AreasOfExpertiseStep } from 'components/ExpertWizard/Steps/AreasOfExpertiseStep'
import { RateAndDurationStep } from 'components/ExpertWizard/Steps/RateAndDurationStep'
import { ScheduleStep } from 'components/ExpertWizard/Steps/ScheduleStep'
import { ProfileInformationStep } from 'components/ExpertWizard/Steps/ProfileInformationStep'
import { CircleFilled } from 'icons/VerticalProgressBar/StepComplete'
import { CircleIcon } from 'icons/VerticalProgressBar/StepIncomplete'
import { SuccessCheckmarkIcon } from 'icons/SuccessCheckmark'
import { Link } from 'components/Link'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { ExpertApi } from 'apis/ExpertApi'
import { useExpert } from 'hooks/useExpert'
import { ExpertIntroWizardStatus } from 'interfaces/Expert'
import { useRefreshExpertState } from 'hooks/useRefreshExpertState'
import { CloseCircleIcon } from 'icons/Close'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

export interface ExpertWizardProps {
  open: boolean
  onClose: () => unknown
}

export const ExpertWizard: FC<ExpertWizardProps> = ({ open, onClose }) => {
  const { t } = useTranslation(LocaleNamespace.ExpertWizard)
  const [activeStep, setActiveStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const user = useCurrentUserAsserted()
  const expert = useExpert()
  const refreshExpertState = useRefreshExpertState()
  const prefersDarkMode = usePrefersDarkMode()

  const handleNext = useCallback(async () => {
    const nextStep = activeStep + 1
    const currentlyAtLast = activeStep >= steps.length - 1
    if (currentlyAtLast) {
      setIsComplete(true)
      if (!expert) {
        return
      }
      await ExpertApi.update(expert.id, {
        expertData: { introWizardStatus: ExpertIntroWizardStatus.Completed },
      })
      await refreshExpertState()
    }
    setActiveStep(nextStep)
  }, [activeStep])

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const stepsTitles = [
    { label: t('locationAndLanguageLabel') },
    { label: t('areasOfExpertiseLabel') },
    { label: t('rateAndDurationLabel') },
    { label: t('scheduleLabel') },
    { label: t('profileInformationLabel') },
  ]

  const steps: ExpertWizardStep[] = [
    LocationAndLanguageStep,
    AreasOfExpertiseStep,
    RateAndDurationStep,
    ScheduleStep,
    ProfileInformationStep,
  ]

  const ActiveStep = steps[activeStep]

  function CircleStepIcon(props: StepIconProps) {
    const { completed } = props
    const fillColor = prefersDarkMode ? '#090B1D' : '#ffffff'
    return completed ? <CircleFilled /> : <CircleIcon fill={fillColor} />
  }

  useMount(() => {
    const loadWizard = async () => {
      if (expert) {
        await ExpertApi.update(expert.id, {
          expertData: { introWizardStatus: ExpertIntroWizardStatus.Started },
        })
      } else {
        await ExpertApi.create(user.id, {
          expertData: { introWizardStatus: ExpertIntroWizardStatus.Started },
        })
        await refreshExpertState()
      }
    }
    loadWizard()
  })

  const onDismiss = async () => {
    onClose()
    if (!expert) {
      return
    }
    await ExpertApi.update(expert.id, {
      expertData: { introWizardStatus: ExpertIntroWizardStatus.Dismissed },
    })
    await refreshExpertState()
  }

  if (!expert) {
    return (
      <ExpertWizardDialog fullScreen open={open} onClose={onDismiss}>
        <ExpertWizardHeader>
          <Logo />
        </ExpertWizardHeader>
        <CircularProgressContainer>
          <CircularProgress size={100} />
        </CircularProgressContainer>
      </ExpertWizardDialog>
    )
  }

  if (isComplete) {
    return (
      <ExpertWizardDialog fullScreen open={open} onClose={onDismiss}>
        <ExpertWizardHeader>
          <Logo />
        </ExpertWizardHeader>
        <CompleteWizard>
          <SuccessCheckmarkIcon />
          <CompleteWizardTitleBox>
            <CompleteWizardTitle>
              {t('expertVerificationTitleTop')}
            </CompleteWizardTitle>
            <CompleteWizardTitle>
              {t('expertVerificationTitleBottom')}
            </CompleteWizardTitle>
          </CompleteWizardTitleBox>
          <CompleteWizardSubtitle>
            {t('completeWizardSubtitle')}
          </CompleteWizardSubtitle>
          <Link href={`/settings/expert/profile`}>
            <ExpertWizardButtons variant="contained" color="primary">
              {t('completeWizardButton')}
            </ExpertWizardButtons>
          </Link>
        </CompleteWizard>
      </ExpertWizardDialog>
    )
  }

  return (
    <ExpertWizardDialog fullScreen open={open} onClose={onDismiss}>
      <ExpertWizardHeader>
        <Logo />
        <IconButton onClick={onDismiss}>
          <CloseCircleIcon />
        </IconButton>
      </ExpertWizardHeader>
      <ProgressBar
        variant="progress"
        steps={6}
        position="static"
        activeStep={activeStep}
        backButton={null}
        nextButton={null}
      />
      <ExpertWizardBody>
        <ExpertWizardLeftPanel>
          <div>
            {t('stepProgress', {
              activeStep: activeStep + 1,
              totalSteps: steps.length,
            })}
          </div>
          <ActiveStep.Header />
          <ActiveStep.Body
            activeStep={activeStep}
            totalSteps={steps.length}
            onContinue={handleNext}
            onBack={handleBack}
          />
        </ExpertWizardLeftPanel>
        <ExpertWizardRightPanel>
          <CustomStepper activeStep={activeStep} orientation="vertical">
            {stepsTitles.map((step) => (
              <Step key={step.label}>
                <StepLabel StepIconComponent={CircleStepIcon}>
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </CustomStepper>
          <FeaturedExpertsWallpaperBox>
            <ExpertWizardRightPanelImage />
          </FeaturedExpertsWallpaperBox>
        </ExpertWizardRightPanel>
      </ExpertWizardBody>
    </ExpertWizardDialog>
  )
}
