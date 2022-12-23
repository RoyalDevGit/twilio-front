import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import { SnackbarContent } from 'notistack'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'

import { UserAvatar } from 'components/UserAvatar'
import { UserAvatarLogo } from 'components/UserAvatar/styles'

export const NotificationsSnackbar = styled(SnackbarContent)`
  min-width: 344px;
  cursor: pointer;
`

export const NotificationsSnackbarActions = styled(CardActions)`
  display: flex;
  justify-content: space-between;
  padding: 0;
`

export const NotificationSnackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing(2)};
`

export const NotificationSnackAvatar = styled(UserAvatar)`
  ${UserAvatarLogo} {
    font-size: 0.6rem;
  }
`

export const NotificationLabel = styled(Typography)`
  font-weight: 500;
  font-size: 0.813rem;
`

export const NotificationSnackBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: center;
`

export const NotificationSnackLabel = styled(Typography)`
  font-weight: 400;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const MessageBox = styled.div`
  max-width: 225px;
  font-weight: 400;
  font-size: 14px;
`

export const NotificationsCard = styled(Card)`
  width: 100%;
`

export const NotificationAvatar = styled.div``
