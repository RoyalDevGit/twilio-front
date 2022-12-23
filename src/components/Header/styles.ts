import styled from '@emotion/styled'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'

import {
  mobileNavigationBreakpoint,
  collapsibleDrawerBreakpoint,
} from 'components/AppShell'

export const HeaderContainer = styled(AppBar)`
  grid-area: header;
  padding-top: ${({ theme }) => theme.spacing(2.25)};
  padding-right: ${({ theme }) => theme.spacing(0)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  padding-left: ${({ theme }) => theme.spacing(0)};
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    padding-left: ${({ theme }) => theme.spacing(1.5)};
    padding-right: ${({ theme }) => theme.spacing(1.5)};
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    padding-left: ${({ theme }) => theme.spacing(0)};
    padding-right: ${({ theme }) => theme.spacing(0)};
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    background-color: ${({ theme }) =>
      theme.customComponents.globalSearch.mobileBackgroundColor.styleOverrides
        .backgroundColor};
    box-shadow: ${({ theme }) =>
      theme.customComponents.globalSearch.mobileBackgroundColor.styleOverrides
        .boxShadow};
  }
`

export const HeaderGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`

export const DrawerButton = styled(IconButton)`
  grid-area: drawer-button;
  display: none;

  ${({ theme }) => theme.breakpoints.down(collapsibleDrawerBreakpoint)} {
    display: inline;
  }

  ${({ theme }) => theme.breakpoints.down(mobileNavigationBreakpoint)} {
    display: none;
  }
`

export const SearchSection = styled.div`
  grid-area: search;
  width: 100%;
  margin-right: ${({ theme }) => theme.spacing(3)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-right: ${({ theme }) => theme.spacing(0)};
  }
`

export const ActionsSection = styled.div`
  grid-area: actions;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const UserMenuSection = styled.div`
  grid-area: user-menu;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`
export const FilterIconContainer = styled.div`
  grid-area: user-menu;
  ${({ theme }) => theme.breakpoints.up('tablet')} {
    display: none;
  }
`
