import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { ChatMessageScroller } from 'components/Messaging/Chat/styles'
import { UserAvatar } from 'components/UserAvatar'

export const ChatHistoryContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
  height: 100%;

  ${ChatMessageScroller} {
    height: 350px;
    padding: ${({ theme }) => theme.spacing(2)};
  }
`

export const ChatHistorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const ChatHistoryLabel = styled(Typography)`
  font-weight: 600;
  font-size: 17px;
`

export const ChatHistoryDate = styled(Typography)`
  font-weight: 500;
  font-size: 13px;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const ChatHistoryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`

export const CustomUserAvatar = styled(UserAvatar)``

export const ChatHistoryDetailsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const ChatHistoryDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const ChatHistoryDetails = styled(Typography)`
  font-weight: 400;
  font-size: 14px;
`

export const SenderMessageSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(1)};
`
