import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface ExpertThankYouNotePayload {
  sessionId: string
}

interface ExpertThankYouNoteCTAProps {
  notification: TrayNotification
}

export const ExpertThankYouNoteCTA: FC<ExpertThankYouNoteCTAProps> = ({
  notification,
}) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as ExpertThankYouNotePayload

  return (
    <CTAContainer>
      <CTALabel href={`/schedule/sessions/${payload.sessionId}`}>
        {t('seeThankYouNoteCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
