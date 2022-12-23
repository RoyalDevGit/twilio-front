import styled from '@emotion/styled'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export const PaymentMethodCardContainer = styled(Card)`
  width: 376px;
  height: 217px;
  border-radius: 10px;
  border: ${({ theme }) =>
    theme.customComponents.paymentMethods.paymentMethodCard.styleOverrides
      .border};

  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    max-width: 345px;
  }

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    max-width: 290px;
  }
  box-shadow: none;
`

export const PaymentMethodCardContent = styled(CardContent)``

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const ActionSection = styled.div`
  display: flex;
`

export const PaymentMethodDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  height: 110px;
  justify-content: space-between;
`

export const PaymentInformationSection = styled.div``

export const PreferredMethodSection = styled.div``

export const PreferredMethodLabel = styled.div`
  background: #b8cee3;
  border-radius: 40px;
  color: #1a1a1a;
  max-width: fit-content;
  padding-right: ${({ theme }) => theme.spacing(1)};
  padding-left: ${({ theme }) => theme.spacing(1)};
`

export const CardDetails = styled(Typography)`
  text-transform: capitalize;
`
