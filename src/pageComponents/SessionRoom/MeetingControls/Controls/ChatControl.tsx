import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import Tooltip from '@mui/material/Tooltip'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  MeetingControlButton,
  MeetingControl,
} from 'pageComponents/SessionRoom/MeetingControls/styles'
import { ChatBottomSheet } from 'components/Messaging/ChatBottomSheet'
import { Session } from 'interfaces/Session'

export interface ChatControlProps {
  session: Session
  isOpen: boolean
  onClick?: () => unknown
  onOpen?: () => unknown
  onClose?: () => unknown
}

export const ChatControl: FC<ChatControlProps> = ({
  session,
  isOpen,
  onClick,
  onClose,
  onOpen,
}) => {
  const { t } = useTranslation([LocaleNamespace.SessionRoom])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('laptop'))

  return (
    <>
      <MeetingControl>
        <Tooltip
          title={isOpen ? t('closeChat') : t('openChat')}
          placement="top"
        >
          <MeetingControlButton onClick={onClick}>
            {isOpen ? <ChatBubbleIcon /> : <ChatBubbleOutlineIcon />}
          </MeetingControlButton>
        </Tooltip>
      </MeetingControl>
      {isMobile && (
        <ChatBottomSheet
          open={isOpen}
          onOpen={() => onOpen?.()}
          onClose={() => onClose?.()}
          channel={session.messagingChannel}
        />
      )}
    </>
  )
}
