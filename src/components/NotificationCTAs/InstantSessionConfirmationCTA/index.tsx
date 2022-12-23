import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface ExpertInstantSessionOrderConfirmationPayload {
  sessionId: string
}

interface InstantSessionConfirmationCTAProps {
  notification: TrayNotification
}

export const InstantSessionConfirmationCTA: FC<
  InstantSessionConfirmationCTAProps
> = ({ notification }) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload =
    notification.payload as ExpertInstantSessionOrderConfirmationPayload

  return (
    <CTAContainer>
      <CTALabel href={`/sessions/${payload.sessionId}/room`}>
        {t('joinNowCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
