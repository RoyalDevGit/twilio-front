import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface UpcomingSessionPayload {
  sessionId: string
}

interface UpcomingSessionCTAProps {
  notification: TrayNotification
}

export const UpcomingSessionCTA: FC<UpcomingSessionCTAProps> = ({
  notification,
}) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as UpcomingSessionPayload

  return (
    <CTAContainer>
      <CTALabel href={`/sessions/${payload.sessionId}/room`}>
        {t('joinNowCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
