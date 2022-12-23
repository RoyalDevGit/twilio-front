import { FC, MouseEventHandler } from 'react'
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'
import { useTranslation } from 'next-i18next'

import { MessagingChannel } from 'interfaces/MessagingChannel'
import { Chat } from 'components/Messaging/Chat'
import { User } from 'interfaces/User'
import { BottomSheet } from 'components/BottomSheet'
import {
  ChatBottomSheetContainer,
  SelectedContactNameBox,
  SelectedContactName,
} from 'components/Messaging/ChatBottomSheet/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'

export interface ChatBottomSheetProps extends SwipeableDrawerProps {
  channel?: MessagingChannel
}

export const ChatBottomSheet: FC<ChatBottomSheetProps> = ({
  onClose,
  channel,
  ...props
}) => {
  const user = useCurrentUserAsserted()
  const { t } = useTranslation(LocaleNamespace.MessagesPage)

  const handleOnClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onClose) {
      onClose(e)
    }
  }

  const displayUser = channel?.participants.find(
    (p) => (p as User).id !== user.id
  ) as User | undefined

  return (
    <BottomSheet
      {...props}
      onClose={handleOnClose}
      header={
        <SelectedContactNameBox>
          <SelectedContactName>
            {t('chatWith', {
              name: `${displayUser?.firstName} ${displayUser?.lastName}`,
            })}
          </SelectedContactName>
        </SelectedContactNameBox>
      }
    >
      <ChatBottomSheetContainer>
        {!!channel && <Chat messageToolbarForceDark={true} channel={channel} />}
      </ChatBottomSheetContainer>
    </BottomSheet>
  )
}
