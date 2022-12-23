import styled from '@emotion/styled'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { Link } from 'components/Link'

interface NotificationProps {
  isOpen?: boolean
  isNew?: boolean
}

export const NotificationMenuSection = styled.div<NotificationProps>`
  display: flex;
  align-items: center;
  visibility: hidden;

  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    visibility: visible;
    align-self: center;
  }
`

export const NotificationItemContainer = styled.div<NotificationProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  white-space: pre-wrap;

  :hover {
    ${NotificationMenuSection} {
      visibility: visible;
    }
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    max-width: 425px;
    align-items: center;
    padding-left: ${({ theme }) => theme.spacing(2)};
    padding-right: ${({ theme }) => theme.spacing(2)};
    margin-left: ${({ theme }) => theme.spacing(-2)};
    margin-right: ${({ theme }) => theme.spacing(-2)};
    background: ${({ isNew, theme }) => {
      const containerBackground =
        theme.customComponents.notificationItem.notificationItemContainer
          .styleOverrides.background
      if (isNew) {
        return containerBackground
      }
    }};
  }
`

export const DesktopKebabSection = styled(IconButton)`
  position: absolute;
  right: 0;
`

export const NotificationMenuButton = styled(IconButton)`
  padding-top: ${({ theme }) => theme.spacing(2)};
`

export const NotificationAvatar = styled.div``

export const NotificationBody = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-top: 8px;
    padding-bottom: 8px;
    width: 100%;
  }
`

export const MessageBox = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 14px;
`

export const TimeElapsed = styled(Typography)`
  font-size: 0.813rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.secondary};
`

export const TimeElapsedNew = styled(Typography)`
  font-size: 0.813rem;
  font-weight: 500;
`

export const NotificationNewSection = styled.div<NotificationProps>`
  display: flex;
  align-items: center;
  visibility: ${({ isNew }) => (isNew ? 'visible' : 'hidden')};
`

export const MobileBottomDrawer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing(4)};
  padding-left: ${({ theme }) => theme.spacing(1)};
  padding-right: ${({ theme }) => theme.spacing(1)};
  gap: ${({ theme }) => theme.spacing(2)};
`

export const StyledDivider = styled(Divider)`
  width: 95%;
  background-color: ${({ theme }) =>
    theme.customComponents.notificationItem.styledDivider.styleOverrides
      .background};

  align-self: center;
`

export const DrawerAvatar = styled.div`
  span {
    height: 71px;
    width: 71px;
  }
`

export const DrawerMessage = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 400;
`

export const DrawerLink = styled(Link)`
  .MuiTypography-root {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

export const DrawerLinkText = styled(Typography)`
  font-size: 1.063rem;
  font-weight: 600;
`
