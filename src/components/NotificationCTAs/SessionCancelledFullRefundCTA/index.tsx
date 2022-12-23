import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface CancelledSessionFullRefundPayload {
  sessionId: string
}

interface SessionCancelledFullRefundCTAProps {
  notification: TrayNotification
}

export const SessionCancelledFullRefundCTA: FC<
  SessionCancelledFullRefundCTAProps
> = ({ notification }) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as CancelledSessionFullRefundPayload

  return (
    <CTAContainer>
      <CTALabel href={`/schedule/sessions/${payload.sessionId}`}>
        {t('seeDetailsCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
