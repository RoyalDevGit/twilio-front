import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import {
  NotificationAudience,
  TrayNotification,
} from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface SessionFailedPaymentPayload {
  sessionId: string
}

interface SessionFailedPaymentCTAProps {
  notification: TrayNotification
}

export const SessionFailedPaymentCTA: FC<SessionFailedPaymentCTAProps> = ({
  notification,
}) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as SessionFailedPaymentPayload

  if (notification.audience === NotificationAudience.Consumer) {
    return (
      <CTAContainer>
        <CTALabel href={`/sessions/${payload.sessionId}/update-payment`}>
          {t('updatePaymentMethodCTA')}
        </CTALabel>
      </CTAContainer>
    )
  }

  return (
    <CTAContainer>
      <CTALabel href={`/schedule/sessions/${payload.sessionId}`}>
        {t('seeDetailsCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
