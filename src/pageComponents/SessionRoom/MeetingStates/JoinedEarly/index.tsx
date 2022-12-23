import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  GoBackButton,
  SessionContainer,
  SessionHeader,
  SessionSubtitle,
} from 'pageComponents/SessionRoom/MeetingStates/JoinedEarly/styles'
import { humanizeMinutes } from 'utils/duration/humanizeMinutes'
import { Config } from 'utils/config'
import { Link } from 'components/Link'
import { LogoWatermark } from 'icons/LogoWatermark'
import {
  LogoSection,
  WatermarkSection,
} from 'pageComponents/SessionRoom/MeetingStates/styles'
import { LogoCompleteTextIcon } from 'icons/Logo'

const SESSION_ALLOWED_EARLY_ARRIVAL_DURATION = Config.getDuration(
  'SESSION_ALLOWED_EARLY_ARRIVAL_DURATION'
)

export const SessionJoinedEarly: FC = () => {
  const { t } = useTranslation(LocaleNamespace.SessionRoom)

  const { value: minutes } = humanizeMinutes(
    SESSION_ALLOWED_EARLY_ARRIVAL_DURATION.as('minutes')
  )

  return (
    <SessionContainer>
      <LogoSection>
        <Link href="/">
          <LogoCompleteTextIcon />
        </Link>
      </LogoSection>
      <SessionHeader variant="h2">{t('joinedEarlyHeader')}</SessionHeader>
      <SessionSubtitle>{t('joinedEarlySubtitle', { minutes })}</SessionSubtitle>
      <Link href="/">
        <GoBackButton variant="contained" size="large" color="secondary">
          {t('goBack')}
        </GoBackButton>
      </Link>
      <WatermarkSection>
        <LogoWatermark />
      </WatermarkSection>
    </SessionContainer>
  )
}
