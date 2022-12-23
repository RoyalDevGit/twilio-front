import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface SessionConfirmationPayload {
  sessionId: string
}

interface SessionConfirmationCTAProps {
  notification: TrayNotification
}

export const SessionConfirmationCTA: FC<SessionConfirmationCTAProps> = ({
  notification,
}) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as SessionConfirmationPayload

  return (
    <CTAContainer>
      <CTALabel href={`/schedule/sessions/${payload.sessionId}`}>
        {t('seeDetailsCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
