import { useTranslation } from 'next-i18next'
import {
  useMeetingManager,
  useAudioInputs,
  useVoiceFocus,
} from 'amazon-chime-sdk-component-library-react'
import { FC, useEffect, useState } from 'react'
import { VoiceFocusTransformDevice } from 'amazon-chime-sdk-js'
import NoiseAwareIcon from '@mui/icons-material/NoiseAware'
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff'
import Tooltip from '@mui/material/Tooltip'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  MeetingControlButton,
  MeetingControl,
} from 'pageComponents/SessionRoom/MeetingControls/styles'

export const NoiseCancellationControl: FC = () => {
  const { t } = useTranslation([LocaleNamespace.SessionRoom])

  const meetingManager = useMeetingManager()
  const { selectedDevice: selectedMicDevice } = useAudioInputs()
  const [isVoiceFocusOn, setIsVoiceFocusOn] = useState(false)
  const [isVoiceFocusEnabled, setIsVoiceFocusEnabled] = useState(false)
  const { isVoiceFocusSupported, addVoiceFocus } = useVoiceFocus()

  useEffect(() => {
    if (selectedMicDevice instanceof VoiceFocusTransformDevice) {
      setIsVoiceFocusEnabled(true)
    } else {
      setIsVoiceFocusEnabled(false)
    }
  }, [selectedMicDevice])

  useEffect(() => {
    async function toggleVoiceFocus() {
      try {
        let current = selectedMicDevice
        if (isVoiceFocusOn) {
          if (typeof selectedMicDevice === 'string') {
            current = await addVoiceFocus(selectedMicDevice)
          }
        } else {
          if (selectedMicDevice instanceof VoiceFocusTransformDevice) {
            current = selectedMicDevice.getInnerDevice()
          }
        }
        if (current) {
          await meetingManager.startAudioInputDevice(current)
        }
      } catch (error) {
        // Handle device selection failure here
        console.error('Failed to toggle Voice Focus')
      }
    }

    toggleVoiceFocus()
  }, [isVoiceFocusOn])

  const handleVoiceFocusToggle = () => {
    setIsVoiceFocusOn((current) => !current)
  }

  if (!isVoiceFocusSupported) {
    return null
  }

  return (
    <MeetingControl>
      <Tooltip
        title={
          isVoiceFocusEnabled
            ? t('turnNoiseCancellationOff')
            : t('turnNoiseCancellationOn')
        }
        placement="top"
      >
        <MeetingControlButton onClick={handleVoiceFocusToggle}>
          {isVoiceFocusEnabled ? <NoiseControlOffIcon /> : <NoiseAwareIcon />}
        </MeetingControlButton>
      </Tooltip>
    </MeetingControl>
  )
}
