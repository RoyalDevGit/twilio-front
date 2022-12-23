import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  GoBackButton,
  SessionExpiredContainer,
  SessionExpiredHeader,
} from 'pageComponents/SessionRoom/MeetingStates/Expired/styles'
import { Button } from 'components/Button'
import { LogoWatermark } from 'icons/LogoWatermark'
import { LogoCompleteTextIcon } from 'icons/Logo'
import {
  LogoSection,
  WatermarkSection,
} from 'pageComponents/SessionRoom/MeetingStates/styles'
import { Session } from 'interfaces/Session'
import { Link } from 'components/Link'

interface SessionExpiredProps {
  session: Session
}

export const SessionExpired: FC<SessionExpiredProps> = ({ session }) => {
  const { t } = useTranslation(LocaleNamespace.SessionRoom)

  return (
    <SessionExpiredContainer>
      <LogoSection>
        <Link href="/">
          <LogoCompleteTextIcon />
        </Link>
      </LogoSection>
      <SessionExpiredHeader variant="h2">
        {t('sessionExpired')}
      </SessionExpiredHeader>
      <GoBackButton href="/" variant="contained" size="large" color="secondary">
        {t('goBack')}
      </GoBackButton>
      <Button size="large" href={`/schedule/sessions/${session.id}`}>
        {t('submitFeedback')}
      </Button>
      <WatermarkSection>
        <LogoWatermark />
      </WatermarkSection>
    </SessionExpiredContainer>
  )
}
