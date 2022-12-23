import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  SessionFailedContainer,
  SessionFailedHeader,
  SessionFailedSubtitle,
} from 'pageComponents/SessionRoom/MeetingStates/Failed/styles'
import { Button } from 'components/Button'
import {
  LogoSection,
  WatermarkSection,
} from 'pageComponents/SessionRoom/MeetingStates/styles'
import { LogoCompleteTextIcon } from 'icons/Logo'
import { LogoWatermark } from 'icons/LogoWatermark'
import { Link } from 'components/Link'

export const SessionFailed: FC = () => {
  const { t } = useTranslation(LocaleNamespace.SessionRoom)

  return (
    <SessionFailedContainer>
      <LogoSection>
        <Link href="/">
          <LogoCompleteTextIcon />
        </Link>
      </LogoSection>
      <SessionFailedHeader variant="h2">
        {t('sessionFailedHeader')}
      </SessionFailedHeader>
      <SessionFailedSubtitle>{t('failMessage')}</SessionFailedSubtitle>
      <Button href="/" variant="contained" size="large" color="secondary">
        {t('goBack')}
      </Button>
      <WatermarkSection>
        <LogoWatermark />
      </WatermarkSection>
    </SessionFailedContainer>
  )
}
