import { IconButtonProps } from '@mui/material/IconButton'
import { FC } from 'react'

import { LeftCaretIcon } from 'icons/MessageToolbar/LeftCaret'
import { RightCaretIcon } from 'icons/MessageToolbar/RightCaret'
import {
  LeftButton,
  RightButton,
} from 'components/Messaging/MessageToolbar/AttachmentList/ScrollableButtons/styles'

export const BackButton: FC<IconButtonProps> = ({ children, ...props }) => (
  <LeftButton {...props}>
    <LeftCaretIcon /> {children}
  </LeftButton>
)

export const ForwardButton: FC<IconButtonProps> = (props) => (
  <RightButton {...props}>
    <RightCaretIcon />
  </RightButton>
)
