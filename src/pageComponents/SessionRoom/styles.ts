import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Div100vh from 'react-div-100vh'
import IconButton from '@mui/material/IconButton'

import {
  ChatMessagesSection,
  NewMessagesContainer,
} from 'components/Messaging/MessageList/styles'
import {
  MessageToolbarContainer,
  MessageToolbarInputBaseHolder,
} from 'components/Messaging/MessageToolbar/styles'
import { ChatMessageScroller } from 'components/Messaging/Chat/styles'

export const SessionPageContainer = styled(Div100vh)`
  width: 100vw;
`

export const SessionRoomBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 12px 12px 0;
`

export const PostSessionContainer = styled(Container)`
  display: flex;
  padding-top: ${({ theme }) => theme.spacing(10)};
  height: 100%;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`

export const SessionRoomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const SessionChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #262836;
  border-radius: 10px;
  height: 100%;
  ${({ theme }) => theme.breakpoints.up('laptopL')} {
    padding: ${({ theme }) => theme.spacing(3)};
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    padding: ${({ theme }) => theme.spacing(0)};
    ${MessageToolbarContainer} {
      padding: ${({ theme }) => theme.spacing(2)};
      margin-bottom: ${({ theme }) => theme.spacing(2)};
    }
    ${ChatMessagesSection} {
      padding: ${({ theme }) => theme.spacing(2)};
    }
  }
  ${ChatMessageScroller} {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  ${NewMessagesContainer} {
    white-space: pre;
  }

  ${MessageToolbarInputBaseHolder} {
    background-color: #262836;
  }
  ${MessageToolbarContainer} {
    ${({ theme }) => theme.breakpoints.down('laptopL')} {
      border-radius: 10px;
      margin-bottom: 0;
    }
  }
  ${ChatMessagesSection} {
    white-space: pre;
  }
`

export const SessionChatHeader = styled.div`
  font-size: 1.5rem;
  white-space: pre;
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    padding: ${({ theme }) => theme.spacing(2)};
    padding-bottom: ${({ theme }) => theme.spacing(0)};
  }
`

interface SessionRoomGridProps {
  isChatOpen: boolean
}

export const SessionRoomGrid = styled.div<SessionRoomGridProps>`
  display: grid;
  grid-template-columns: 1fr auto;
  ${({ isChatOpen, theme }) => {
    if (isChatOpen) {
      return css`
        gap: ${theme.spacing(2)};
      `
    }
    return css``
  }}

  width: 100%;
  height: calc(100% - 80px);
`

export const ExtendSessionButton = styled(IconButton)`
  background-color: rgba(41, 63, 152, 1);
  height: 56px;
  width: 56px;
  border-radius: 5px 0px 0px 5px;

  :hover {
    background-color: #384da3;
  }
`
