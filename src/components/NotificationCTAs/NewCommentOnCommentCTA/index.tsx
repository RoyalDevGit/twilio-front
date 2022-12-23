import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface CommentOnCommentPayload {
  sessionId?: string
  expertId: string
  consumerId: string
}

interface NewCommentOnCommentCTAProps {
  notification: TrayNotification
}

export const NewCommentOnCommentCTA: FC<NewCommentOnCommentCTAProps> = ({
  notification,
}) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as CommentOnCommentPayload

  return (
    <CTAContainer>
      <CTALabel href={`/experts/${payload.expertId}/reviews`}>
        {t('viewCommentCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
