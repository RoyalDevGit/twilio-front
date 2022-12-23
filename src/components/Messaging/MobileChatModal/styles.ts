import styled from '@emotion/styled'
import Dialog from '@mui/material/Dialog'

import {
  ChatMessageByDateContainer,
  MessageToolbarSection,
} from 'components/Messaging/MessageList/styles'
import { MessageToolbarContainer } from 'components/Messaging/MessageToolbar/styles'

export const MobileDialogContainer = styled(Dialog)`
  .MuiPaper-root {
    background: ${({ theme }) =>
      theme.customComponents.messagesPage.messagesMobileDialogColor
        .styleOverrides.background};
  }

  ${MessageToolbarSection} {
    box-shadow: 0px 1px 4px rgba(51, 101, 239, 0.8);
    padding: 0;
  }
  ${MessageToolbarContainer} {
    background: ${({ theme }) =>
      theme.customComponents.messagesPage.messagesMobileHeaderColor
        .styleOverrides.background};
    border-radius: 0;
  }

  ${ChatMessageByDateContainer} {
    padding: ${({ theme }) => theme.spacing(2)};
  }
`

export const MobileModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) =>
    theme.customComponents.messagesPage.messagesMobileHeaderColor.styleOverrides
      .background};
  padding: ${({ theme }) => theme.spacing(2)};
  box-shadow: ${({ theme }) =>
    theme.customComponents.messagesPage.messagesMobileDialogBorder
      .styleOverrides.boxShadow};
  border-bottom: ${({ theme }) =>
    theme.customComponents.messagesPage.messagesMobileDialogBorder
      .styleOverrides.border};
`
