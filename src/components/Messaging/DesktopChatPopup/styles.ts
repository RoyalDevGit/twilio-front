import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { css } from '@emotion/react'

import {
  ChatDate,
  ChatMessageByDateContainer,
  ChatMessagingExpiring,
  MessageToolbarSection,
} from 'components/Messaging/MessageList/styles'
import { ChatContactContainerBox } from 'components/Messaging/Message/styles'
import { MessageToolbarContainer } from 'components/Messaging/MessageToolbar/styles'
import { UserAvatar } from 'components/UserAvatar'
import { MessagingChannelStatus } from 'interfaces/MessagingChannel'
import { ChatMessageScroller } from 'components/Messaging/Chat/styles'

interface PopupChatContainerProps {
  open: boolean
  status?: MessagingChannelStatus
}

export const PopupChatContainer = styled(Paper)<PopupChatContainerProps>`
  position: fixed;
  z-index: 100;
  width: 415px;
  bottom: 0;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  right: 24px;
  overflow: hidden;
  box-shadow: ${({ theme }) =>
    theme.customComponents.chatComponent.popupChat.styleOverrides.boxShadow};
  background-color: ${({ theme }) =>
    theme.customComponents.messagesPage.messagesMobileDialogColor.styleOverrides
      .background};
  display: flex;
  flex-direction: column;

  ${({ status, open }) => {
    if (!open) {
      return css`
        display: none;
      `
    }
    switch (status) {
      case MessagingChannelStatus.Minimized:
        return css`
          ${ChatMessageScroller} {
            display: none;
          }
          ${MessageToolbarContainer} {
            display: none;
          }
        `
      default:
        return css`
          display: block;
        `
    }
  }}

  ${MessageToolbarSection} {
    padding-bottom: 0;
    border-top: ${({ theme }) =>
      theme.customComponents.messagesPage.messagesPageBorder.styleOverrides
        .border};
  }
  ${MessageToolbarContainer} {
    border-radius: 0;
    padding: ${({ theme }) => theme.spacing(2)};
  }
  ${ChatMessageByDateContainer} {
    padding: ${({ theme }) => theme.spacing(2)};
  }
  ${ChatContactContainerBox} {
    align-items: flex-start;
  }
  ${ChatDate} {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }

  ${ChatMessageScroller} {
    height: 287px;
  }
  ${ChatMessagingExpiring} {
    margin: ${({ theme }) => theme.spacing(1)};
  }
`

export const PopupChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(1.75)};
  padding-left: ${({ theme }) => theme.spacing(2)};
  padding-right: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) =>
    theme.customComponents.messagesToolbar.messageToolbarColor.styleOverrides
      .backgroundColor};
  border-bottom: ${({ theme }) =>
    theme.customComponents.messagesPage.messagesPageBorder.styleOverrides
      .border};
  cursor: pointer;
`

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const SelectedContactAvatar = styled(UserAvatar)``

export const SelectedContactNameBox = styled.div``

export const SelectedContactName = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 500;
`

export const LastSeen = styled(Typography)`
  font-size: 0.75rem;
  opacity: 0.7;
`

export const PopupChatIconsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`
