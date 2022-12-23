import { useTranslation } from 'next-i18next'
import {
  useContentShareControls,
  useContentShareState,
} from 'amazon-chime-sdk-component-library-react'
import { FC } from 'react'
import Tooltip from '@mui/material/Tooltip'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ScreenShareMeetingControl,
  ActiveScreenShareButton,
  ScreenShareButton,
} from 'pageComponents/SessionRoom/MeetingControls/styles'
import { ScreenShareOnIcon } from 'icons/ScreenShareOn'
import { ScreenShareOffIcon } from 'icons/ScreenShareOff'

export const ScreenShareControl: FC = () => {
  const { t } = useTranslation([LocaleNamespace.SessionRoom])

  const { toggleContentShare } = useContentShareControls()
  const { isLocalUserSharing } = useContentShareState()

  const button = isLocalUserSharing ? (
    <ActiveScreenShareButton onClick={() => toggleContentShare()}>
      <ScreenShareOffIcon />
    </ActiveScreenShareButton>
  ) : (
    <ScreenShareButton onClick={() => toggleContentShare()}>
      <ScreenShareOnIcon />
    </ScreenShareButton>
  )

  return (
    <ScreenShareMeetingControl>
      <Tooltip
        title={
          isLocalUserSharing ? t('stopScreenShare') : t('startScreenShare')
        }
        placement="top"
      >
        {button}
      </Tooltip>
    </ScreenShareMeetingControl>
  )
}
