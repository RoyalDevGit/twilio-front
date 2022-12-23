import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface ExpertCommentPayload {
  expertId: string
}

interface NewCommentCTAProps {
  notification: TrayNotification
}

export const NewCommentCTA: FC<NewCommentCTAProps> = ({ notification }) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as ExpertCommentPayload

  console.log('payload new comment:', payload)

  return (
    <CTAContainer>
      <CTALabel href={`/experts/${payload.expertId}/reviews`}>
        {t('viewCommentCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
