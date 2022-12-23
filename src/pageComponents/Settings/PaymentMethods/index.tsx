import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions'
import ButtonBase from '@mui/material/ButtonBase'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { BankAccount } from '@stripe/stripe-js'

import { Button } from 'components/Button'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { SettingsPage, SettingsPageProps } from 'pageComponents/Settings'
import {
  PaymentMethodPageContainer,
  ButtonText,
  NoPaymentMethodsNotification,
  NoPaymentMethodsSection,
  PaymentMethodsList,
  PaymentMethodsSection,
  AddPaymentMethodCard,
  PaymentMethodsTitle,
  AddPaymentMethodButton,
  BankAccountSubtitle,
  BankAccountSection,
  BankAccountTitle,
  AddBankAccountInfoButton,
  BankInfoContainer,
  InputBox,
  AccountInputLabel,
  BankSectionDivider,
} from 'pageComponents/Settings/PaymentMethods/styles'
import { PaymentMethodCard } from 'components/PaymentMethodCard'
import { PlusIcon } from 'icons/Plus'
import { QueryResponse } from 'interfaces/Query'
import { PaymentMethod, PaymentMethodType } from 'interfaces/PaymentMethod'
import { PaymentMethodApi } from 'apis/PaymentMethodApi'
import { usePaymentMethods } from 'hooks/api/commerce/usePaymentMethods'
import AddPaymentMethodDialogWrapper from 'components/Dialogs/AddPaymentMethodDialog'
import { CirclePlusIcon } from 'icons/CirclePlus'
import { useExpert } from 'hooks/useExpert'
import { MockBankAccount } from 'utils/mock/MockBankAccount'
export const PaymentMethodsPageMobileBreakpoint = 'tablet'

export interface PaymentMethodsPageProps extends SettingsPageProps {
  initialPaymentMethodResult: QueryResponse<PaymentMethod>
}

export const PaymentMethodsPage: NextPage<PaymentMethodsPageProps> = ({
  initialPaymentMethodResult,
  ...props
}) => {
  const { t } = useTranslation(LocaleNamespace.PaymentMethodsPage)
  const expert = useExpert()
  const theme = useTheme()
  const isMobile = useMediaQuery(
    theme.breakpoints.down(PaymentMethodsPageMobileBreakpoint)
  )
  const paymentMethodPagination = usePaymentMethods({
    initialValue: initialPaymentMethodResult,
  })
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    PaymentMethod | undefined
  >()
  const [paymentMethodToDelete, setPaymentMethodToDelete] = useState<
    PaymentMethod | undefined
  >()

  const bankAccountInfo: BankAccount | null = MockBankAccount // null

  const addNewPaymentMethod = async () => {
    const creationResult = await PaymentMethodApi.create({
      paymentMethodType: PaymentMethodType.CreditCard,
    })
    const newPaymentMethod = await creationResult.getData()
    setSelectedPaymentMethod(newPaymentMethod)
  }

  const closePaymentMethodDialog = () => {
    setSelectedPaymentMethod(undefined)
  }

  const handleSave = () => {
    paymentMethodPagination.refresh()
  }

  const openDeleteConfirmation = (paymentMethod: PaymentMethod) => {
    setPaymentMethodToDelete(paymentMethod)
  }

  const closeDeleteConfirmation = () => {
    setPaymentMethodToDelete(undefined)
  }

  const deletePaymentMethod = async () => {
    if (!paymentMethodToDelete) {
      return
    }
    await PaymentMethodApi.delete(paymentMethodToDelete.id)
    paymentMethodPagination.refresh()
    closeDeleteConfirmation()
  }

  const markPaymentMethodAsPreferred = async (paymentMethod: PaymentMethod) => {
    await PaymentMethodApi.update(paymentMethod.id, {
      preferred: true,
    })
    paymentMethodPagination.refresh()
    closeDeleteConfirmation()
  }

  const paymentMethodsExist = !!paymentMethodPagination.value?.items.length

  return (
    <SettingsPage {...props}>
      <PaymentMethodPageContainer>
        <PaymentMethodsList>
          {expert && (
            <BankAccountSection>
              <BankAccountTitle variant="h4">
                {t(isMobile ? 'bankAccountMobileTitle' : 'bankAccountTitle')}
              </BankAccountTitle>
              <BankAccountSubtitle variant="body1">
                {t('bankAccountDescription')}
              </BankAccountSubtitle>
              <BankInfoContainer>
                <InputBox>
                  <AccountInputLabel>{t('bankAccount')}</AccountInputLabel>
                  {bankAccountInfo && (
                    <>
                      <Typography>{bankAccountInfo.bank_name}</Typography>
                      <Typography>
                        {bankAccountInfo.account_holder_type}
                      </Typography>
                      <BankAccountSubtitle variant="subtitle2">
                        {`${t('bankAccountInfo')}${bankAccountInfo.last4}`}
                      </BankAccountSubtitle>
                    </>
                  )}
                  {!bankAccountInfo && (
                    <Typography>{t('bankAccountPlaceholder')}</Typography>
                  )}
                </InputBox>
                <AddBankAccountInfoButton
                  nobankaccountinfo={(!bankAccountInfo).toString()}
                  variant="outlined"
                  color="primary"
                >
                  <ButtonText>
                    {t(
                      bankAccountInfo ? 'bankAccountEdit' : 'bankAccountButton'
                    )}
                  </ButtonText>
                </AddBankAccountInfoButton>
              </BankInfoContainer>
              <BankSectionDivider />
            </BankAccountSection>
          )}
          {!paymentMethodsExist && (
            <NoPaymentMethodsSection>
              <PaymentMethodsTitle variant="h4">
                {t('pageHeader')}
              </PaymentMethodsTitle>
              <NoPaymentMethodsNotification variant="body1">
                {t('noPaymentMethods')}
              </NoPaymentMethodsNotification>
              <AddPaymentMethodButton
                variant="contained"
                color="primary"
                onClick={addNewPaymentMethod}
                data-testid="add-new-payment-button"
              >
                <ButtonText>
                  {t('addPaymentMethod')}
                  <PlusIcon />
                </ButtonText>
              </AddPaymentMethodButton>
            </NoPaymentMethodsSection>
          )}

          {!!paymentMethodPagination.value?.items.length && (
            <PaymentMethodsSection>
              {paymentMethodPagination.value.items.map((paymentMethod) => (
                <div key={paymentMethod.id}>
                  <PaymentMethodCard
                    paymentMethod={paymentMethod}
                    onDelete={openDeleteConfirmation}
                    onMarkAsPreferred={markPaymentMethodAsPreferred}
                  />
                </div>
              ))}
              <div>
                <ButtonBase
                  onClick={addNewPaymentMethod}
                  data-testid="add-another-payment-button"
                >
                  <AddPaymentMethodCard>
                    {t('addAnotherPaymentMethod')}
                    <CirclePlusIcon />
                  </AddPaymentMethodCard>
                </ButtonBase>
              </div>
            </PaymentMethodsSection>
          )}
        </PaymentMethodsList>
      </PaymentMethodPageContainer>
      {!!selectedPaymentMethod && (
        <AddPaymentMethodDialogWrapper
          open={!!selectedPaymentMethod}
          paymentMethod={selectedPaymentMethod}
          onClose={closePaymentMethodDialog}
          onSave={handleSave}
        />
      )}

      <Dialog
        open={!!paymentMethodToDelete}
        onClose={closeDeleteConfirmation}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent id="responsive-dialog-title">
          <Typography variant="subtitle1" component="h2">
            {t('confirmDeletionMessage')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation}>
            {t('confirmDeletionMessageCancel')}
          </Button>
          <Button
            onClick={deletePaymentMethod}
            color="error"
            data-testid="confirm-payment-deletion"
          >
            {t('confirmDeletionMessageYes')}
          </Button>
        </DialogActions>
      </Dialog>
    </SettingsPage>
  )
}
