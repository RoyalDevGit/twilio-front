import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Button } from 'components/Button'
import {
  SessionContainer,
  SessionNotificationSection,
  SessionNotification,
} from 'pageComponents/SessionRoom/MeetingStates/JoinedAnotherDevice/styles'
import { DeviceOverlappingIcon } from 'icons/DeviceOverlapping'
import { Link } from 'components/Link'

export const SessionJoinedAnotherDevice: FC = () => {
  const { t } = useTranslation(LocaleNamespace.SessionRoom)

  const refreshPage = () => {
    window.location.reload()
  }

  return (
    <SessionContainer>
      <SessionNotificationSection>
        <DeviceOverlappingIcon />
        <SessionNotification variant="h4">
          {t('joinedAnotherDeviceNotification')}
        </SessionNotification>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={refreshPage}
        >
          {t('rejoinFromThisDevice')}
        </Button>
        <Link href="/">
          <Button>{t('goBackButton')}</Button>
        </Link>
      </SessionNotificationSection>
    </SessionContainer>
  )
}
