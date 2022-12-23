import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface CancelledSessionPartialRefundPayload {
  sessionId: string
}

interface SessionCancelledPartialRefundCTAProps {
  notification: TrayNotification
}

export const SessionCancelledPartialRefundCTA: FC<
  SessionCancelledPartialRefundCTAProps
> = ({ notification }) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as CancelledSessionPartialRefundPayload

  return (
    <CTAContainer>
      <CTALabel href={`/schedule/sessions/${payload.sessionId}`}>
        {t('seeDetailsCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
