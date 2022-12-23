import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ConsumerWizardContainer,
  ConsumerWizardTitle,
  ConsumerWizardCard,
  ConsumerWizardCardTitle,
  ConsumerWizardBody,
  ConsumerWizardLink,
} from 'components/ConsumerWizard/styles'
import { WizardProfileIcon } from 'icons/ConsumerWizard/Profile'
import { WizardCardIcon } from 'icons/ConsumerWizard/Card'
import { WizardHeadIcon } from 'icons/ConsumerWizard/Head'
import { WizardPinpointIcon } from 'icons/ConsumerWizard/Pinpoint'
import { ProgressBar } from 'components/ProgressBar'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { usePaymentMethods } from 'hooks/api/commerce/usePaymentMethods'

export const ConsumerWizard: FC = () => {
  const { t } = useTranslation(LocaleNamespace.ConsumerWizard)
  const user = useCurrentUserAsserted()
  const { value: paymentMethods, isLoading: arePaymentMethodsLoading } =
    usePaymentMethods()

  const hasProfilePicture = user.profilePicture ? 25 : 0
  const hasPaymentMethod = paymentMethods?.items?.length ? 25 : 0
  const hasAreasOfInterest = user.areasOfInterest?.length ? 25 : 0
  const hasLocation = user.location ? 25 : 0

  const progress =
    hasProfilePicture + hasPaymentMethod + hasAreasOfInterest + hasLocation

  if (arePaymentMethodsLoading) {
    return null
  }

  if (progress === 100) {
    return null
  }

  return (
    <ConsumerWizardContainer id="consumer-wizard">
      <ProgressBar value={progress} />
      <ConsumerWizardTitle>{t('consumerWizardTitle')}</ConsumerWizardTitle>
      <ConsumerWizardBody>
        <ConsumerWizardLink
          href={`/settings/account`}
          disable={(hasProfilePicture ? true : false).toString()}
        >
          <ConsumerWizardCard>
            <WizardProfileIcon />
            <ConsumerWizardCardTitle>
              {t('profilePictureCardTitle')}
            </ConsumerWizardCardTitle>
          </ConsumerWizardCard>
        </ConsumerWizardLink>

        <ConsumerWizardLink
          href={`/settings/payment-methods`}
          disable={(hasPaymentMethod ? true : false).toString()}
        >
          <ConsumerWizardCard>
            <WizardCardIcon />
            <ConsumerWizardCardTitle>
              {t('paymentMethodCardTitle')}
            </ConsumerWizardCardTitle>
          </ConsumerWizardCard>
        </ConsumerWizardLink>

        <ConsumerWizardLink
          href={`/settings/account#areas-of-interest`}
          disable={(hasAreasOfInterest ? true : false).toString()}
        >
          <ConsumerWizardCard>
            <WizardHeadIcon />
            <ConsumerWizardCardTitle>
              {t('areasOfInterestCardTitle')}
            </ConsumerWizardCardTitle>
          </ConsumerWizardCard>
        </ConsumerWizardLink>

        <ConsumerWizardLink
          href={`/settings/account#location`}
          disable={(hasLocation ? true : false).toString()}
        >
          <ConsumerWizardCard>
            <WizardPinpointIcon />
            <ConsumerWizardCardTitle>
              {t('locationCardTitle')}
            </ConsumerWizardCardTitle>
          </ConsumerWizardCard>
        </ConsumerWizardLink>
      </ConsumerWizardBody>
    </ConsumerWizardContainer>
  )
}
