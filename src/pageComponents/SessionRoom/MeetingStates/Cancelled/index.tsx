import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  CloseButton,
  SessionContainer,
  SessionHeader,
  SessionSubtitle,
} from 'pageComponents/SessionRoom/MeetingStates/Cancelled/styles'
import { Link } from 'components/Link'
import { LogoWatermark } from 'icons/LogoWatermark'
import {
  LogoSection,
  WatermarkSection,
} from 'pageComponents/SessionRoom/MeetingStates/styles'
import { LogoCompleteTextIcon } from 'icons/Logo'
import { Session } from 'interfaces/Session'
import { Expert } from 'interfaces/Expert'

export interface SessionCancelledPageProps {
  session: Session
}

export const SessionCancelled: FC<SessionCancelledPageProps> = ({
  session,
}) => {
  const { t } = useTranslation(LocaleNamespace.SessionRoom)

  const sessionExpert = session.expert as Expert
  const expertName = `${sessionExpert.user.firstName} ${sessionExpert.user.lastName}`

  const from = session.startDate.date
  const to = session.endDate.date
  const sessionDateFrom = from
    ? DateTime.fromISO(from).toFormat('ccc, MMM d, yyyy, h:mma - ')
    : undefined
  const sessionDateTo = to ? DateTime.fromISO(to).toFormat('h:mma') : undefined

  return (
    <SessionContainer>
      <LogoSection>
        <Link href="/">
          <LogoCompleteTextIcon />
        </Link>
      </LogoSection>
      <SessionHeader variant="h2">{t('sessionCancelledHeader')}</SessionHeader>
      <SessionSubtitle>
        {t('sessionCancelledSubtitle', {
          expertName,
          fromDate: sessionDateFrom,
          toDate: sessionDateTo,
        })}
      </SessionSubtitle>
      <Link href="/">
        <CloseButton variant="contained" size="large" color="secondary">
          {t('close')}
        </CloseButton>
      </Link>
      <WatermarkSection>
        <LogoWatermark />
      </WatermarkSection>
    </SessionContainer>
  )
}
