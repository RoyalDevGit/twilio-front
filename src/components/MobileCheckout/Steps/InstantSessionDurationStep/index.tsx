import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Divider from '@mui/material/Divider'

import { MobileCheckoutStepProps } from 'components/MobileCheckout/Steps/MobileCheckoutStep'
import { StepTitle } from 'components/MobileCheckout/Steps/styles'
import {
  DurationAndRatesContainer,
  InstantSessionDurationStepContainer,
  SelectDurationLabel,
  AvailableSessions,
  SessionDurationType,
  SessionDurationContainer,
  SessionInformation,
} from 'components/MobileCheckout/Steps/InstantSessionDurationStep/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ExpertAvailability } from 'interfaces/ExpertAvailability'
import { humanizeMinutes } from 'utils/duration/humanizeMinutes'
import { formatPrice } from 'utils/currency/formatPrice'

const InstantSessionDurationStepHeader: FC<MobileCheckoutStepProps> = () => {
  const { t } = useTranslation(LocaleNamespace.MobileCheckout)

  return <StepTitle>{t('instantSessionLabel')}</StepTitle>
}

interface InstantSessionDurationStepBodyProps extends MobileCheckoutStepProps {
  availability?: ExpertAvailability
  onDurationChange?: (duration: number) => unknown
}

const InstantSessionDurationStepBody: FC<
  InstantSessionDurationStepBodyProps
> = ({ availability, onContinue, onDurationChange }) => {
  const { t } = useTranslation(LocaleNamespace.MobileCheckout)

  const handleDurationSelection = (minutes: number) => {
    if (onDurationChange) {
      onDurationChange(minutes)
    }
    if (onContinue) {
      onContinue()
    }
  }

  return (
    <InstantSessionDurationStepContainer>
      <SelectDurationLabel>{t('selectDurationLabel')}</SelectDurationLabel>
      <DurationAndRatesContainer>
        {availability?.instant.durations.map((duration) => {
          const humanizedMinutes = humanizeMinutes(duration.minutes)
          return (
            <AvailableSessions
              key={duration.minutes}
              onClick={() => handleDurationSelection(duration.minutes)}
            >
              <SessionDurationContainer>
                <SessionInformation>
                  {humanizedMinutes.value}
                </SessionInformation>
                <SessionDurationType>
                  {humanizedMinutes.unit}
                </SessionDurationType>
              </SessionDurationContainer>
              <Divider orientation="vertical" variant="fullWidth" flexItem />
              <SessionInformation>
                {formatPrice(duration.price)}
              </SessionInformation>
            </AvailableSessions>
          )
        })}
      </DurationAndRatesContainer>
    </InstantSessionDurationStepContainer>
  )
}

const InstantSessionDurationStepFooter: FC = () => null

export const InstantSessionDurationStep = {
  Header: InstantSessionDurationStepHeader,
  Body: InstantSessionDurationStepBody,
  Footer: InstantSessionDurationStepFooter,
}
