import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { Button } from 'components/Button'
import { UserAvatar } from 'components/UserAvatar'

export const OrderCardContainer = styled(Card)`
  border: 1px solid;
  border-color: ${({ theme }) =>
    theme.customComponents.orderCard.orderCardBorderColor.styleOverrides
      .borderColor};
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    max-width: 320px;
  }
  box-shadow: none;
`

export const OrderCardContent = styled(CardContent)`
  display: grid;
  align-items: center;
  grid-template-columns: [order] 10% [name] 24.8% [date] 15.3% [sessionTime] 15% [paymentType] 15.3% [status] 9.5% [details] 10% [end];
  grid-template-rows: auto;

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    display: none;
  }
  &.MuiCardContent-root {
    padding-bottom: ${({ theme }) => theme.spacing(2)};
  }
`

export const ExpertAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    justify-content: center;
  }
`

export const CustomUserAvatar = styled(UserAvatar)``

export const PaymentCardLabel = styled(Typography)`
  text-transform: capitalize;
`

export const StatusValue = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 400;
  color: ${({ theme }) =>
    theme.customComponents.orderCard.orderStatusColor.styleOverrides.color};
  text-transform: capitalize;
`

export const ActionContainer = styled.div`
  width: 100%;
`

export const DetailsButton = styled(Button)`
  width: 100%;
`

export const MobileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.up('laptop')} {
    display: none;
  }
`
export const MobileItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`
