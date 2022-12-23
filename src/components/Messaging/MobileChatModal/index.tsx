import { FC, forwardRef, ReactElement, Ref } from 'react'
import { ModalProps } from '@mui/material/Modal'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'

import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { BackArrowIcon } from 'icons/Arrow/Back'
import { EllipsisIcon } from 'icons/Ellipsis'
import {
  MobileDialogContainer,
  MobileModalHeader,
} from 'components/Messaging/MobileChatModal/styles'
import { SelectedContactName } from 'pageComponents/Messages/styles'
import { MessagingChannel } from 'interfaces/MessagingChannel'
import { Chat } from 'components/Messaging/Chat'
import { User } from 'interfaces/User'

const DefaultMobileTransition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide ref={ref} {...props} direction="up" />
})

export interface MobileChatModalProps extends Omit<ModalProps, 'children'> {
  open: boolean
  channel?: MessagingChannel | null
  onTransitionExit?: () => unknown
}

export const MobileChatModal: FC<MobileChatModalProps> = ({
  open,
  onClose,
  channel,
  onTransitionExit,
}) => {
  const user = useCurrentUserAsserted()

  const handleClose = () => {
    if (!onClose) {
      return
    }
    onClose({}, 'backdropClick')
  }

  const displayUser = channel?.participants.find(
    (p) => (p as User).id !== user.id
  ) as User | undefined

  return (
    <MobileDialogContainer
      fullScreen
      open={open}
      onClose={onClose}
      TransitionProps={{ onExited: onTransitionExit }}
      TransitionComponent={DefaultMobileTransition}
    >
      <MobileModalHeader>
        <BackArrowIcon onClick={handleClose} />
        <SelectedContactName>{`${displayUser?.firstName} ${displayUser?.lastName}`}</SelectedContactName>
        <EllipsisIcon />
      </MobileModalHeader>
      {!!channel && <Chat channel={channel} />}
    </MobileDialogContainer>
  )
}
