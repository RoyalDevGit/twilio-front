import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrayNotification } from 'interfaces/TrayNotification'
import { CTAContainer, CTALabel } from 'components/NotificationCTAs/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface ExpertCommentOrRatingPayload {
  expertId: string
}

interface NewCommentAndRatingCTAProps {
  notification: TrayNotification
}

export const NewCommentAndRatingCTA: FC<NewCommentAndRatingCTAProps> = ({
  notification,
}) => {
  const { t } = useTranslation(LocaleNamespace.Notifications)

  const payload = notification.payload as ExpertCommentOrRatingPayload

  return (
    <CTAContainer>
      <CTALabel href={`/experts/${payload.expertId}/reviews`}>
        {t('viewCommentCTA')}
      </CTALabel>
    </CTAContainer>
  )
}
