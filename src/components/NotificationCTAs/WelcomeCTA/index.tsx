import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import {
  NotificationAudience,
  TrayNotification,
} from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface WelcomeExpertPayload {
  firstName: string
  downloadAppUrl: string
}

interface WelcomeCTAProps {
  notification: TrayNotification
}

export const WelcomeCTA: FC<WelcomeCTAProps> = ({ notification }) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  if (notification.audience === NotificationAudience.Consumer) {
    return (
      <CTAContainer>
        <CTALabel href="/explore">{t('welcomeCTAConsumer')}</CTALabel>
      </CTAContainer>
    )
  }

  return (
    <CTAContainer>
      <CTALabel href="/settings/expert/profile">
        {t('welcomeCTAExpert')}
      </CTALabel>
    </CTAContainer>
  )
}
