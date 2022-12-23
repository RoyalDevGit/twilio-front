import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import CircularProgress from '@mui/material/CircularProgress'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  SessionLoadingContainer,
  SessionLoadingHeader,
  SessionLoadingSubtitle,
} from 'pageComponents/SessionRoom/MeetingStates/Loading/styles'

export const SessionLoading: FC = () => {
  const { t } = useTranslation(LocaleNamespace.SessionRoom)

  return (
    <SessionLoadingContainer>
      <SessionLoadingHeader variant="h2">
        {t('sessionLoadingHeader')}
      </SessionLoadingHeader>
      <SessionLoadingSubtitle>{t('loadingMessage')}</SessionLoadingSubtitle>
      <CircularProgress />
    </SessionLoadingContainer>
  )
}
