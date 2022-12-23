import styled from '@emotion/styled'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'

import { Link } from 'components/Link'

export const OrdersContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding-left: ${({ theme }) => theme.spacing(4)};
  padding-right: ${({ theme }) => theme.spacing(4)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-left: ${({ theme }) => theme.spacing(2)};
    padding-right: ${({ theme }) => theme.spacing(2)};
  }
`

export const OrdersTitle = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 300;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`

export const OrdersNavigationSection = styled.div`
  display: flex;
  justify-content: space-between;
`

export const OrdersNavigationTabs = styled.div`
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    width: 100%;
  }
`

export const OrderPageTab = styled(Tab)`
  font-size: 1.063rem;
`

export const FadedDivider = styled(Divider)`
  width: 100%;
`

export const OrdersPageBody = styled.div`
  position: relative;
`

export const OrderPageTabButton = styled(Link)`
  button {
    padding: 12px 16px;
    display: inline-block;
    font-size: 1.066rem;
    color: ${({ theme }) => theme.palette.text.primary};
    font-weight: 500;
    border-radius: 0;
    border: none;
    span {
      opacity: 0.7;
    }
  }
  &.active {
    button {
      border-bottom: 2px solid ${({ theme }) => theme.palette.primary.main};
    }
  }
`
