import styled from '@emotion/styled'
import Paper, { PaperProps } from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import { css } from '@emotion/react'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'

interface MessageToolbarProps {
  locked: boolean
}

export const MessageToolbarContainer = styled.div<MessageToolbarProps>`
  padding: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(2.75)};
  padding-top: ${({ theme }) => theme.spacing(2.75)};
  background-color: ${({ theme }) =>
    theme.customComponents.messagesToolbar.messageToolbarColor.styleOverrides
      .backgroundColor};
  border-radius: 15px;
  ${({ locked, theme }) =>
    locked &&
    css`
      display: flex;
      gap: ${theme.spacing(1.5)};
      align-items: center;
      background-color: ${theme.customComponents.messagesToolbar.lockedToolbar
        .styleOverrides.backgroundColor};
    `}
`

export const LockedMessageToolbarLabel = styled(Typography)``

interface MessageToolbarInputBaseHolderProps extends PaperProps {
  component: 'form'
  isvalid: string
}

export const MessageToolbarInputBaseHolder = styled(
  Paper
)<MessageToolbarInputBaseHolderProps>(
  ({ theme, isvalid }) => css`
    border-radius: 11.6598px;
    box-shadow: none;
    border: 1px solid #656b81;
    :hover {
      border-color: ${isvalid === 'true'
        ? theme.customComponents.messagesToolbar.messageToolbarHover
            .styleOverrides.borderColor
        : '#EA5230'};
    }
    flex-direction: column;
  `
)

export const MessageToolbarInputBase = styled(InputBase)``

export const CustomMenu = styled(Menu)`
  .MuiMenu-list {
    padding-top: 0;
    padding-bottom: 0;
    height: 450px;
    width: 350px;
  }
`

export const AttachmentLabel = styled.label`
  display: flex;
`
export const HiddenFileInput = styled.input`
  display: none;
`
export const MessageSection = styled.div`
  display: flex;
  width: 100%;
`
export const AttachmentListContainer = styled.div`
  display: flex;
  align-self: flex-start;
  margin-left: -5px;
  width: 100%;
`
