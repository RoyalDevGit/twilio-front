import styled from '@emotion/styled'
import Drawer from '@mui/material/Drawer'

import { Button } from 'components/Button'

export const FilterByDrawer = styled(Drawer)`
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    display: none;
  }
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const DrawerFilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: ${({ theme }) =>
    theme.customComponents.expertProfile.expertMobileCheckoutSheet
      .styleOverrides.background};
  flex: 0;
  border-bottom: 1px solid;
  border-color: ${({ theme }) =>
    theme.customComponents.filterComponent.filterDividers.styleOverrides
      .borderColor};
`

export const CancelButton = styled(Button)``
