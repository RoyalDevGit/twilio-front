import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import {
  ChatMessageByDateContainer,
  ChatMessagingExpiring,
} from 'components/Messaging/MessageList/styles'
import { MessageToolbarContainer } from 'components/Messaging/MessageToolbar/styles'

export const SelectedContactNameBox = styled.div`
  display: flex;
  justify-content: center;
`

export const SelectedContactName = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 500;
`

export const ChatBottomSheetContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  ${MessageToolbarContainer} {
    border-radius: 0;
    padding: ${({ theme }) => theme.spacing(2)};
  }

  ${ChatMessageByDateContainer} {
    padding: ${({ theme }) => theme.spacing(2)};
  }
  ${ChatMessagingExpiring} {
    ${({ theme }) => theme.breakpoints.only('tablet')} {
      margin: ${({ theme }) => theme.spacing(0, 1, 0, 1)};
    }
  }
`
