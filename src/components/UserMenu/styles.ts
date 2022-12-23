import IconButton from '@mui/material/IconButton'
import styled from '@emotion/styled'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

import { StatusBadge } from 'components/UserAvatar/styles'
import { Button } from 'components/Button'
import { Link } from 'components/Link'

export const IconAvatarSection = styled(IconButton)`
  gap: ${({ theme }) => theme.spacing(1)};
`

export const CustomMenu = styled(Menu)`
  margin-top: ${({ theme }) => theme.spacing(6.9)};
  .MuiList-root {
    padding: ${({ theme }) => theme.spacing(0)};
  }
`

export const CustomLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
`

export const CustomMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    min-height: 0px;
    padding: ${({ theme }) => theme.spacing(2)};
    padding-left: ${({ theme }) => theme.spacing(2)};
  }
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  &:last-child {
    border-bottom: none;
  }
`

export const ExpertOnlineStatusContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: ${({ theme }) => theme.spacing(2)};
`

export const ExpertStatusInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

export const ExpertStatusNameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const ExpertName = styled(Typography)`
  font-weight: 600;
  font-size: 1.063rem;
`

export const OnlineStatusBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

export const CustomStatusBadge = styled(StatusBadge)`
  && .MuiBadge-badge {
    box-shadow: none;
    top: 11.5px;
    position: relative;
    ::after {
      animation: none;
      -webkit-animation: none;
    }
    border: none;
  }
`
export const StatusButton = styled(Button)`
  font-weight: 600;
  width: 180px;
`
