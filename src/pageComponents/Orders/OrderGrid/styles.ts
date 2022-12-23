import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const GridHeader = styled.div`
  display: grid;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(5)};
  margin-left: ${({ theme }) => theme.spacing(2)};
  grid-template-columns: [order] 10% [name] 24% [date] 15% [sessionTime] 15% [paymentType] 15% [status] 10% [details] 10% [end];
  grid-template-rows: auto;

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    display: none;
  }
`
export const OrdersGrid = styled.div`
  display: grid;
  margin-top: ${({ theme }) => theme.spacing(2)};
  grid-template-columns: auto;
  grid-template-rows: auto;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const NoOrders = styled.div`
  margin: 0 auto;
  margin-top: 40px;
  padding-top: 18px;
  text-align: center;
  position: relative;
`
export const NoOrderTitle = styled(Typography)`
  margin-top: 13px;
  font-size: 1.25rem;
`

export const NoOrderButton = styled(Button)`
  margin-top: 24px;
`
