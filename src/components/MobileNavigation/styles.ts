import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'

import {
  DrawerLink,
  drawerLinkActiveClass,
} from 'components/AppDrawer/DrawerLink'

export const MobileNavigationContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) =>
    theme.customComponents.mobileNavigation.mobileNavigationContainer
      .styleOverrides.background};
  box-shadow: 0px -0.5px 0px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  margin: 0;
  padding: 0;
  width: 100%;
`

export const NavigationLinkList = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: baseline;

  > * {
    flex: 1 1 auto;
  }
`

export const NavigationListItem = styled(ListItemButton)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const NavigationListItemIcon = styled(ListItemIcon)`
  min-width: auto;
`

export const NavigationLink = styled(DrawerLink)(
  ({ theme }) => css`
    color: ${theme.palette.text.primary};

    &${drawerLinkActiveClass} {
      ${NavigationListItem} {
        border-top: 2px solid #3fa3ff;
        background: ${theme.customComponents.mobileNavigation.navigationLink
          .styleOverrides.background};
      }
    }
  `
)

export const NavigationText = styled(Typography)`
  font-size: 0.75rem;
`
