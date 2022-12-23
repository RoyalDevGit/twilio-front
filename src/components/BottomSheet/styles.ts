import styled from '@emotion/styled'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'

export const BottomSwipeableSheet = styled(SwipeableDrawer)`
  .MuiDrawer-paperAnchorBottom {
    height: calc(100vh - 96px);
    background: ${({ theme }) =>
      theme.customComponents.expertProfile.expertMobileCheckoutSheet
        .styleOverrides.background};
    border-radius: 15px 15px 0px 0px;
  }
`

export const BottomSheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const BottomSheetHeader = styled.div`
  padding-top: ${({ theme }) => theme.spacing(2)};
  padding-left: ${({ theme }) => theme.spacing(1)};
  padding-right: ${({ theme }) => theme.spacing(1)};
  padding-bottom: ${({ theme }) => theme.spacing(1)};
  flex: 0;
`

export const BottomSheetBody = styled.div`
  height: 100%;
  flex: 1 1 auto;
  overflow: auto;
`

export const BottomSheetFooter = styled.div`
  flex: 0;
  padding: ${({ theme }) => theme.spacing(2)};
`
