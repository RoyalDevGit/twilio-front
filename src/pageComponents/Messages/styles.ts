import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { ChatMessageScroller } from 'components/Messaging/Chat/styles'
import { MessageToolbarContainer } from 'components/Messaging/MessageToolbar/styles'
import { UserAvatar } from 'components/UserAvatar'

export const MessagesPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

const pageTitleHeight = '74px'

export const MessagesPageTitle = styled(Typography)`
  height: ${pageTitleHeight};
  font-size: 1.75rem;
  font-weight: 300;
  padding-left: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    padding-left: ${({ theme }) => theme.spacing(4)};
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    padding-left: ${({ theme }) => theme.spacing(5.5)};
  }
`

export const MessagesPageChatContainer = styled(Container)`
  display: flex;
  padding-right: ${({ theme }) => theme.spacing(0)};
  border-top: ${({ theme }) =>
    theme.customComponents.messagesPage.messagesPageBorder.styleOverrides
      .border};
  flex: 1 1 auto;
  height: calc(100% - ${pageTitleHeight});

  ${ChatMessageScroller} {
    padding: ${({ theme }) => theme.spacing(2)};
  }

  ${MessageToolbarContainer} {
    margin: ${({ theme }) => theme.spacing(2)};
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }
`

export const MessagesLeftTray = styled.div`
  border-right: ${({ theme }) =>
    theme.customComponents.messagesPage.messagesPageBorder.styleOverrides
      .border};
  padding-right: ${({ theme }) => theme.spacing(2)};
  padding-top: ${({ theme }) => theme.spacing(4)};
  min-width: 360px;
  height: 100%;
  overflow: auto;
`

export const MessagesRightTray = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`

export const MessagesRightTrayHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(1.75)};
  padding-left: ${({ theme }) => theme.spacing(2)};
  padding-right: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) =>
    theme.customComponents.messagesToolbar.messageToolbarColor.styleOverrides
      .backgroundColor};
  justify-content: space-between;
`

export const MessagesRightTrayHeaderBox = styled.div`
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

export const ChatExpiring = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const ChatExpiringBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const SelectedChannelDate = styled.div`
  text-align: right;
`

export const ChatExpiringLabel = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 400;
`

export const MessagesMobilePageContainer = styled.div``

export const MessagesMobileTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  background: ${({ theme }) =>
    theme.customComponents.messagesPage.messagesMobileHeaderColor.styleOverrides
      .background};
  padding: ${({ theme }) => theme.spacing(2)};
`

export const MessagesMobilePageTitle = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 300;
`

export const NoMessagesPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(3)};
  border-top: ${({ theme }) =>
    theme.customComponents.messagesPage.messagesPageBorder.styleOverrides
      .border};
  padding-top: ${({ theme }) => theme.spacing(15)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    border-top: none;
  }
`

export const NoMessagesPageLabel = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
`
