import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { UserAvatar } from 'components/UserAvatar'

export const OrderDetailCardContainer = styled(Card)``

export const OrderDetailCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(0)};
  }
`

export const CardHeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const SessionDateSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
  }
`

export const VerticalDivider = styled(Typography)`
  width: 16px;
  opacity: 0.6;
  text-align: center;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const ExpertAvatarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const ExpertNameBox = styled.div`
  display: flex;
  flex-direction: column;
`

export const MobileExpertAvatarContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const CustomUserAvatar = styled(UserAvatar)``

export const ExpertName = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 300;
`

export const OrdersDetailsSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
  }
`

export const OrderDetailItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const OrderDetailItemLabel = styled(Typography)`
  font-size: 0.813rem;
  font-weight: 500;
  opacity: 1;
  color: ${({ theme }) =>
    theme.customComponents.consumerAccount.consumerAccountInputLabel
      .styleOverrides.color};
`

export const ActionContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
  }
`

export const MobileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  padding: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    display: none;
  }
`

export const MobileItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`
export const PaymentCardLabel = styled(Typography)`
  text-transform: capitalize;
`
