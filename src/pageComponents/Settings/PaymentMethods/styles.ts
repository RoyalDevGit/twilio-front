import styled from '@emotion/styled'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { Button, ButtonProps } from 'components/Button'
import { PaymentMethodCardContainer } from 'components/PaymentMethodCard/styles'
import { PaymentMethodsPageMobileBreakpoint } from 'pageComponents/Settings/PaymentMethods'

export const PaymentMethodPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`

export const PaymentMethodsList = styled.div``

export const PaymentMethodsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 376px);
  gap: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    display: flex;
    flex-direction: column;
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    align-items: center;
    grid-template-columns: 1fr;
  }
  box-shadow: none;
`

export const NoPaymentMethodsNotification = styled(Typography)`
  font-weight: 400;
  opacity: 0.8;
`

export const BankAccountSubtitle = styled(Typography)`
  font-weight: 400;
  opacity: 0.8;
`

export const BankAccountSection = styled.div`
  width: 775px;
  ${({ theme }) =>
    theme.breakpoints.down(`${PaymentMethodsPageMobileBreakpoint}`)} {
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing(5)};
  }
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: ${({ theme }) => theme.spacing(2.5)};
  margin-top: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(10)};
`

export const NoPaymentMethodsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: ${({ theme }) => theme.spacing(2.5)};
`

export const ButtonText = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: ${({ theme }) => theme.spacing(1)};
  }
`

export const AddPaymentMethodCard = styled(PaymentMethodCardContainer)`
  background: ${({ theme }) =>
    theme.customComponents.paymentMethods.addPaymentMethodCard.styleOverrides
      .background};
  border: ${({ theme }) =>
    theme.customComponents.paymentMethods.addPaymentMethodCard.styleOverrides
      .border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

export const PaymentMethodsTitle = styled(Typography)`
  font-weight: 500;
  line-height: 0.235;
  ${({ theme }) =>
    theme.breakpoints.down(`${PaymentMethodsPageMobileBreakpoint}`)} {
    font-size: 20px;
  }
`

export const BankAccountTitle = styled(Typography)`
  font-weight: 500;
  line-height: 0.235;
  ${({ theme }) =>
    theme.breakpoints.down(`${PaymentMethodsPageMobileBreakpoint}`)} {
    font-size: 20px;
  }
`

export const AddPaymentMethodButton = styled(Button)`
  width: 228px;
  height: 48px;
`

interface AddBankAccountInfoButtonProps extends ButtonProps {
  nobankaccountinfo: string
}
export const AddBankAccountInfoButton = styled(
  Button
)<AddBankAccountInfoButtonProps>`
  width: 94px;
  height: 40px;
  align-self: ${({ nobankaccountinfo }) =>
    nobankaccountinfo === 'true' ? 'auto' : 'flex-start'};
  ${({ theme }) =>
    theme.breakpoints.down(`${PaymentMethodsPageMobileBreakpoint}`)} {
    width: 64px;
  }
`

export const BankInfoContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    display: flex;
    align-items: center;
  }
`

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    max-width: 190px;
  }
`

export const AccountInputLabel = styled(Typography)`
  font-weight: 500;
  font-size: 0.813rem;
  color: ${({ theme }) =>
    theme.customComponents.consumerAccount.consumerAccountInputLabel
      .styleOverrides.color};
`

export const BankSectionDivider = styled(Divider)`
  border-color: ${({ theme }) =>
    theme.customComponents.paymentMethods.bankAccount.styleOverrides
      .borderColor};
  ${({ theme }) =>
    theme.breakpoints.down(`${PaymentMethodsPageMobileBreakpoint}`)} {
    border-color: ${({ theme }) =>
      theme.customComponents.paymentMethods.mobileState.styleOverrides
        .borderColor};
    padding-top: ${({ theme }) => theme.spacing(1.2)};
  }
`
