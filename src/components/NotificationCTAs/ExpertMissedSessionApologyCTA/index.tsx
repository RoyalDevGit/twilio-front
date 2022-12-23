import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface ExpertMissedSessionApologiesPayload {
  sessionId: string
}

interface ExpertMissedSessionApologyCTAProps {
  notification: TrayNotification
}

export const ExpertMissedSessionApologyCTA: FC<
  ExpertMissedSessionApologyCTAProps
> = ({ notification }) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as ExpertMissedSessionApologiesPayload

  return (
    <CTAContainer>
      <CTALabel href={`/schedule/sessions/${payload.sessionId}`}>
        {t('seeDetailsCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
