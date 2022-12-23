import styled from '@emotion/styled'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { css } from '@emotion/react'
import { FC } from 'react'
import Typography from '@mui/material/Typography'

import {
  DrawerLink,
  drawerLinkActiveClass,
} from 'components/AppDrawer/DrawerLink'
import { mobileNavigationBreakpoint } from 'components/AppShell'
import { ActiveNavigationIndicatorIcon } from 'icons/Navigation/ActiveIndicator'
import { LogoVerticalTextIcon } from 'icons/Logo'

const drawerWidth = '232px'
const collapsedWidth = '88px'
const transitionDuration = '0.2s'

export const ToggleAndLogo = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  margin-left: ${({ theme }) => theme.spacing(2)};
`

export const DrawerLogo = styled(LogoVerticalTextIcon)`
  scale: 0.75;
  margin-left: ${({ theme }) => theme.spacing(-2)};
  top: ${({ theme }) => theme.spacing(0.25)};
`

export const CollapsedActiveItemIndicator = styled(
  ActiveNavigationIndicatorIcon
)`
  visibility: hidden;
`

export const DrawerList = styled(List)``

export const DrawerListItem = styled(ListItemButton)`
  justify-content: left;
  border-radius: 8px;
  margin-right: ${({ theme }) => theme.spacing(2)};
  margin-left: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding-left: ${({ theme }) => theme.spacing(1)};
  padding-right: ${({ theme }) => theme.spacing(0)};
`

export const DrawerListItemIcon = styled(ListItemIcon)`
  min-width: 24px;
  margin-right: ${({ theme }) => theme.spacing(2)};
  transition: margin ${transitionDuration};

  svg {
    max-width: 24px;
    max-height: 24px;
  }
`

export const DrawerListItemText = styled(ListItemText)`
  white-space: pre;
`

export const CollapsedNotificationBadge = styled(ActiveNavigationIndicatorIcon)`
  margin-left: ${({ theme }) => theme.spacing(0.5)};
  margin-top: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`

export const ExpandedNotificationBadge = styled.span`
  color: ${({ theme }) =>
    theme.customComponents.consumerDrawer.scheduleCount.styleOverrides.color};
  font-size: 0.813rem;
  border-radius: 5px;
  padding-left: ${({ theme }) => theme.spacing(0.5)};
  padding-right: ${({ theme }) => theme.spacing(0.5)};
  background: ${({ theme }) =>
    theme.customComponents.consumerDrawer.scheduleCount.styleOverrides
      .background};
  margin-left: 12px;
`

interface NotificationBadgeProps {
  className?: string
}

export const NotificationBadge: FC<
  React.PropsWithChildren<NotificationBadgeProps>
> = ({ className, children }) => (
  <span className={className}>
    <CollapsedNotificationBadge />
    <ExpandedNotificationBadge>{children}</ExpandedNotificationBadge>
  </span>
)

export const ResponsiveBadge = styled(NotificationBadge)``

export const TextAndNotification = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

interface MenuTextAndNotificationProps {
  className?: string
  notificationCount?: number
}

export const MenuTextAndNotification: FC<
  React.PropsWithChildren<MenuTextAndNotificationProps>
> = ({ children, notificationCount }) => (
  <TextAndNotification>
    <DrawerListItemText primary={children} />

    <div>
      {!!notificationCount && (
        <ResponsiveBadge>{notificationCount}</ResponsiveBadge>
      )}
    </div>
  </TextAndNotification>
)

export const StyledDrawerLink = styled(DrawerLink)`
  display: flex;
  align-items: baseline;
  width: 100%;
  color: ${({ theme }) => theme.palette.text.primary};

  &${drawerLinkActiveClass} {
    ${DrawerListItemIcon} {
      border-radius: 8px;
    }

    ${DrawerListItem} {
      background: ${({ theme }) => theme.palette.background.default};
    }
  }
`

interface StyledDrawerProps {
  open?: boolean
}

export const StyledDrawer = styled(Drawer)<StyledDrawerProps>`
  height: 100%;
  transition: width ${transitionDuration};
  width: ${drawerWidth};
  .MuiPaper-root {
    transition: width ${transitionDuration};
    width: ${drawerWidth};
    border: none;

    ${({ theme }) => theme.breakpoints.down(mobileNavigationBreakpoint)} {
      border-radius: 0;
    }
  }

  ${({ open, theme }) =>
    !open &&
    css`
      width: ${collapsedWidth};
      .MuiPaper-root {
        width: ${collapsedWidth};
      }

      ${ExpandedNotificationBadge} {
        display: none;
      }

      .MuiListItemText-root {
        display: none;
      }

      .MuiList-root {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      ${DrawerListItemIcon} {
        margin: 0;
      }

      ${DrawerListItem} {
        padding: ${theme.spacing(1)};
        justify-content: center;
        margin-left: ${theme.spacing(0)};
      }

      ${drawerLinkActiveClass} {
        ${DrawerListItem} {
          background: transparent !important;
        }

        ${CollapsedActiveItemIndicator} {
          visibility: visible;
        }
      }

      ${ResponsiveBadge} {
        position: absolute;
        right: -18px;
        margin-top: -10px;
      }
    `}

  ${({ open }) =>
    open &&
    css`
      ${CollapsedNotificationBadge} {
        display: none;
      }
    `}
`

export const AppDrawerFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  height: 100%;
  justify-content: flex-end;
`

export const AppDrawerFooterLabel = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 0.813rem;
  font-weight: 500;
  white-space: nowrap;
`
