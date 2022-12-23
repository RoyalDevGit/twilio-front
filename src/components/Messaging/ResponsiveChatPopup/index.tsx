import { FC } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { DesktopChatPopup } from 'components/Messaging/DesktopChatPopup'
import { MobileChatModal } from 'components/Messaging/MobileChatModal'
import { MessagingChannel } from 'interfaces/MessagingChannel'

export interface ResponsiveChatPopupProps {
  open: boolean
  onClose?: () => void
  onTransitionEnd?: () => void
  channel?: MessagingChannel | null
}

export const ResponsiveChatPopup: FC<ResponsiveChatPopupProps> = ({
  onClose,
  onTransitionEnd,
  ...props
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    if (onTransitionEnd) {
      onTransitionEnd()
    }
  }

  if (isMobile) {
    return (
      <MobileChatModal
        {...props}
        onClose={onClose}
        onTransitionEnd={onTransitionEnd}
      />
    )
  }

  return <DesktopChatPopup {...props} onClose={handleClose} />
}
