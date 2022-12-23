import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface RecordingAvailablePayload {
  sessionId: string
}

interface RecordingAvailableCTAProps {
  notification: TrayNotification
}

export const RecordingAvailableCTA: FC<RecordingAvailableCTAProps> = ({
  notification,
}) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as RecordingAvailablePayload

  return (
    <CTAContainer>
      <CTALabel href={`/schedule/sessions/${payload.sessionId}`}>
        {t('seeRecordingCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
