import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Button } from 'components/Button'
import {
  SessionFailureNotification,
  SessionTerminalFailureContainer,
  SessionTerminalFailureSection,
} from 'pageComponents/SessionRoom/MeetingStates/TerminalFailure/styles'
import { ErrorOccurredIcon } from 'icons/ExclamationTriangle'
import { Link } from 'components/Link'

export const SessionTerminalFailure: FC = () => {
  const { t } = useTranslation(LocaleNamespace.SessionRoom)

  return (
    <SessionTerminalFailureContainer>
      <SessionTerminalFailureSection>
        <ErrorOccurredIcon />
        <SessionFailureNotification variant="h4">
          {t('failureNotification')}
        </SessionFailureNotification>
        <Link href="/">
          <Button size="large" color="tertiary">
            {t('close')}
          </Button>
        </Link>
      </SessionTerminalFailureSection>
    </SessionTerminalFailureContainer>
  )
}
