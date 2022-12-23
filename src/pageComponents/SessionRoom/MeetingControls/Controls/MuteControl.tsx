import { useTranslation } from 'next-i18next'
import { useToggleLocalMute } from 'amazon-chime-sdk-component-library-react'
import { FC } from 'react'
import Tooltip from '@mui/material/Tooltip'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  MeetingControlButton,
  MeetingControl,
} from 'pageComponents/SessionRoom/MeetingControls/styles'
import { MicOffIcon } from 'icons/MicOff'
import { MicOnIcon } from 'icons/MicOn'

export const MuteControl: FC = () => {
  const { t } = useTranslation([LocaleNamespace.SessionRoom])

  const { muted, toggleMute } = useToggleLocalMute()

  return (
    <MeetingControl>
      <Tooltip title={muted ? t('unmute') : t('mute')} placement="top">
        <MeetingControlButton onClick={toggleMute}>
          {muted ? <MicOffIcon /> : <MicOnIcon />}
        </MeetingControlButton>
      </Tooltip>
    </MeetingControl>
  )
}
