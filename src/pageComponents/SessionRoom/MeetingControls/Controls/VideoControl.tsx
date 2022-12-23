import { useTranslation } from 'next-i18next'
import { useLocalVideo } from 'amazon-chime-sdk-component-library-react'
import { FC } from 'react'
import Tooltip from '@mui/material/Tooltip'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  MeetingControlButton,
  MeetingControl,
} from 'pageComponents/SessionRoom/MeetingControls/styles'
import { CamOnIcon } from 'icons/CamOn'
import { CamOffIcon } from 'icons/CamOff'

export const VideoControl: FC = () => {
  const { t } = useTranslation([LocaleNamespace.SessionRoom])

  const { isVideoEnabled, toggleVideo } = useLocalVideo()

  return (
    <MeetingControl>
      <Tooltip
        title={isVideoEnabled ? t('turnCameraOff') : t('turnCameraOn')}
        placement="top"
      >
        <MeetingControlButton onClick={toggleVideo}>
          {isVideoEnabled ? <CamOnIcon /> : <CamOffIcon />}
        </MeetingControlButton>
      </Tooltip>
    </MeetingControl>
  )
}
