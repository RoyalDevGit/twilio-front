import styled from '@emotion/styled'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'

export const NotificationsEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const CustomMenu = styled(Menu)`
  .MuiPaper-root {
    width: 360px;
  }
  margin-top: ${({ theme }) => theme.spacing(1)};
`

export const NotificationsEmptyStateLabel = styled(Typography)`
  font-weight: 500;
  text-align: center;
`

export const NotificationsTitle = styled(Typography)`
  font-weight: 500;
  font-size: 1.25rem;
  padding: ${({ theme }) => theme.spacing(1, 2)};
`

export const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    color: ${({ theme }) =>
      theme.customComponents.notificationTray.styledBadge.styleOverrides.color};
    background-color: ${({ theme }) =>
      theme.customComponents.notificationTray.styledBadge.styleOverrides
        .backgroundColor};
  }
`
