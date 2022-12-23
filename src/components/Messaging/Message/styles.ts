import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { UserAvatar } from 'components/UserAvatar'

export const ChatContactContainerBox = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const ChatContactAvatar = styled(UserAvatar)``

export const ChatContactBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 1 auto;
`

export const ChatContactNameBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const ChatContactName = styled(Typography)`
  font-weight: 600;
  font-size: 1.063rem;
`

export const ChatContactTime = styled(Typography)`
  font-weight: 600;
  font-size: 0.875rem;
  opacity: 0.7;
`

export const ChatContactMessageBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  width: 100%;
  flex-direction: column;
`

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
`
export const MessageText = styled(Typography)`
  white-space: break-spaces;

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    word-break: break-all;
  }
`
