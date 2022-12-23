import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface ExpertCancelledSessionPayload {
  sessionId: string
}

interface SessionCancelledByExpertCTAProps {
  notification: TrayNotification
}

export const SessionCancelledByExpertCTA: FC<
  SessionCancelledByExpertCTAProps
> = ({ notification }) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as ExpertCancelledSessionPayload

  return (
    <CTAContainer>
      <CTALabel href={`/schedule/sessions/${payload.sessionId}`}>
        {t('seeDetailsCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
