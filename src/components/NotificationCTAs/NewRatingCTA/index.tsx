import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface ExpertRatingPayload {
  sessionId?: string
  expertId: string
  consumerId: string
}

interface NewRatingCTAProps {
  notification: TrayNotification
}

export const NewRatingCTA: FC<NewRatingCTAProps> = ({ notification }) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as ExpertRatingPayload

  console.log('payload new rating:', payload)

  return (
    <CTAContainer>
      <CTALabel href={`/experts/${payload.expertId}/reviews`}>
        {t('viewRatingCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
