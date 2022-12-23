import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { FC } from 'react'
import styled from '@emotion/styled'

import { LeftCaretIcon } from 'icons/SessionTimePickers/LeftCaret'
import { RightCaretIcon } from 'icons/SessionTimePickers/RightCaret'

const BackIconButton = styled(IconButton)`
  position: absolute;
  left: -28px;
`

const ForwardIconButton = styled(IconButton)`
  position: absolute;
  right: -28px;
`

export const BackButton: FC<IconButtonProps> = ({ children, ...props }) => (
  <BackIconButton {...props}>
    <LeftCaretIcon /> {children}
  </BackIconButton>
)

export const ForwardButton: FC<IconButtonProps> = (props) => (
  <ForwardIconButton {...props}>
    <RightCaretIcon />
  </ForwardIconButton>
)
