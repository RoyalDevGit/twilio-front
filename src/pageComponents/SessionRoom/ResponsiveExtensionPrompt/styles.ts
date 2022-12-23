import styled from '@emotion/styled'
import Snackbar from '@mui/material/Snackbar'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { BottomSheet } from 'react-spring-bottom-sheet'

export const StyledBottomSheet = styled(BottomSheet)`
  [data-rsbs-overlay] {
    background-color: ${({ theme }) =>
      theme.customComponents.expertProfile.expertMobileCheckoutSheet
        .styleOverrides.background};
    z-index: 1000;
  }
  [data-rsbs-backdrop] {
    z-index: 999;
  }

  [data-rsbs-content='true'] {
    /* height: 100%; */
  }
`

export const SheetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const SheetBody = styled.div`
  padding: ${({ theme }) => theme.spacing(1)};
  height: 100%;
`

export const StyledSnackbar = styled(Snackbar)`
  left: auto;
  .MuiSnackbarContent-root {
    background: #293f98;
    color: white;
    border-radius: 5px;
  }

  .MuiSnackbarContent-message {
    /* padding: 0; */
  }
`

export const SnackbarMessageContainer = styled.div`
  /* margin-bottom: -8px; */
`

export const SnackbarBody = styled.div`
  /* padding: 6px 16px; */
`

export const SnackbarFooter = styled.div``

export const MobileBottomDrawer = styled.div`
  background: #293f98;
  color: white;

  [data-rsbs-overlay] {
    background-color: ${({ theme }) =>
      theme.customComponents.expertProfile.expertMobileCheckoutSheet
        .styleOverrides.background};
    z-index: 1000;
  }
  [data-rsbs-backdrop] {
    z-index: 999;
  }

  [data-rsbs-content='true'] {
    /* height: 100%; */
  }
`
export const StyledSwipeableDrawer = styled(SwipeableDrawer)`
  .MuiDrawer-paper {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`

export const DrawerContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(1)};
  height: 100%;
`

export const DrawerContent = styled.div`
  padding: ${({ theme }) => theme.spacing(1)};
  height: 100%;
`
