import { useTranslation } from 'next-i18next'
import {
  useMeetingManager,
  useLocalVideo,
  useVideoInputs,
  useBackgroundBlur,
} from 'amazon-chime-sdk-component-library-react'
import { FC, useEffect, useState } from 'react'
import { Device, isVideoTransformDevice } from 'amazon-chime-sdk-js'
import Tooltip from '@mui/material/Tooltip'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  MeetingControlButton,
  MeetingControl,
} from 'pageComponents/SessionRoom/MeetingControls/styles'
import { BlurOffIcon } from 'icons/BlurOff'
import { BlurOnIcon } from 'icons/BlurOn'

export const BackgroundBlurControl: FC = () => {
  const { t } = useTranslation([LocaleNamespace.SessionRoom])

  const meetingManager = useMeetingManager()
  const { isVideoEnabled } = useLocalVideo()

  const { selectedDevice: selectedVideoDevice } = useVideoInputs()
  const { isBackgroundBlurSupported, createBackgroundBlurDevice } =
    useBackgroundBlur()
  const [isVideoTransformCheckBoxOn, setisVideoTransformCheckBoxOn] =
    useState(false)

  useEffect(() => {
    async function toggleBackgroundBlur() {
      try {
        if (!selectedVideoDevice) {
          return
        }
        let current = selectedVideoDevice
        if (isVideoTransformCheckBoxOn) {
          current = await createBackgroundBlurDevice(
            selectedVideoDevice as Device
          )
        } else {
          if (isVideoTransformDevice(selectedVideoDevice)) {
            current = await selectedVideoDevice.intrinsicDevice()
          }
        }
        if (current) {
          await meetingManager.startVideoInputDevice(current)
        }
      } catch (error) {
        // Handle device selection failure here
        console.error('Failed to toggle Background Blur')
      }
    }

    toggleBackgroundBlur()
  }, [isVideoTransformCheckBoxOn])

  const toggleBackgroundBlur = () => {
    setisVideoTransformCheckBoxOn((current) => !current)
  }

  const isBackgroundBlurred = isVideoTransformDevice(selectedVideoDevice)

  return (
    <MeetingControl>
      <Tooltip
        title={
          isBackgroundBlurred
            ? t('stopBackgroundBlur')
            : t('startBackgroundBlur')
        }
        placement="top"
      >
        <MeetingControlButton
          onClick={toggleBackgroundBlur}
          disabled={!isBackgroundBlurSupported || !isVideoEnabled}
        >
          {isBackgroundBlurred ? <BlurOffIcon /> : <BlurOnIcon />}
        </MeetingControlButton>
      </Tooltip>
    </MeetingControl>
  )
}
