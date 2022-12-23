import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const ChatMessageByDateContainer = styled.div``

export const ChatDate = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 500;
  color: #5c6e9f;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: center;
  }
`

export const ChatMessagingExpiring = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) =>
    theme.customComponents.chatComponent.messagingExpiring.styleOverrides
      .backgroundColor};
  border-radius: 6px;
  padding: ${({ theme }) => theme.spacing(1)};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    text-align: center;
    margin: ${({ theme }) => theme.spacing(1)};
  }
`

export const ChatMessagingExpiringIconBox = styled.div`
  position: relative;
  top: 1px;
`

export const ExpiringLabel = styled(Typography)`
  font-size: 0.813rem;
  font-weight: 500;
  color: #090b1b;
  white-space: break-spaces;
`

export const ChatMessagesSection = styled.div`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
`

export const MessageToolbarSection = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing(1)};
`

export const NewMessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const NewMessagesPlaceholder = styled(Typography)`
  font-weight: 500;
  font-size: 1.2rem;
  text-align: center;
`

export const NewMessagesLabel = styled.div`
  font-weight: 400;
  font-size: 0.875rem;
`
