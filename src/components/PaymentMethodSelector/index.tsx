import { FC, ReactNode, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'

import {
  AddNewCardButton,
  AddNewCardSection,
  EndingInLabel,
  CardsListContainer,
  CardSelectionItem,
  CardSelectionLabelLogo,
  CardSelectionLabelDescription,
  CardSelectionItemDivider,
  DefaultLabelSection,
  CardDescriptionSection,
  CardSelectionItemFormControlLabel,
  DefaultCardSection,
  CardItemLabelSection,
  CardBrand,
  PaymentFailedSection,
  PaymentFailedLabel,
} from 'components/PaymentMethodSelector/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { CardIcon } from 'icons/Card'
import { usePaymentMethods } from 'hooks/api/commerce/usePaymentMethods'
import { PaymentMethod, PaymentMethodType } from 'interfaces/PaymentMethod'
import { AmexCardSmallIcon } from 'icons/PaymentCards/Amex'
import { DiscoverCardSmallIcon } from 'icons/PaymentCards/Discover'
import AddPaymentMethodDialogWrapper from 'components/Dialogs/AddPaymentMethodDialog'
import { PaymentMethodApi } from 'apis/PaymentMethodApi'
import { DinnersClubCardSmallIcon } from 'icons/PaymentCards/DinnersClub'
import { JcbCardSmallIcon } from 'icons/PaymentCards/Jcb'
import { UnionPayCardSmallIcon } from 'icons/PaymentCards/UnionPay'
import { UnknownCardSmallIcon } from 'icons/PaymentCards/UnknownCard'
import { MasterCardSmallIcon } from 'icons/PaymentCards/MasterCard'
import { VisaCardSmallIcon } from 'icons/PaymentCards/Visa'

interface PaymentMethodSelectorProps {
  value?: string
  onChange?: (paymentMethodId: string, paymentMethod?: PaymentMethod) => unknown
  disabled?: boolean
  className?: string
  failedPaymentMethod?: string
}

export const PaymentMethodSelector: FC<PaymentMethodSelectorProps> = ({
  value,
  onChange,
  disabled,
  className,
  failedPaymentMethod,
}) => {
  const { t } = useTranslation([
    LocaleNamespace.PaymentMethodSelector,
    LocaleNamespace.AddPaymentMethodDialog,
  ])
  const paymentMethodPagination = usePaymentMethods()
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<
    string | undefined
  >(value || '')
  const [newPaymentMethod, setNewPaymentMethod] = useState<
    PaymentMethod | undefined
  >()

  useEffect(() => {
    if (
      selectedPaymentMethodId ||
      paymentMethodPagination.isLoading ||
      !paymentMethodPagination.value?.items.length
    ) {
      return
    }
    let autoSelectedPaymentMethod = paymentMethodPagination.value.items.find(
      (item) => item.preferred
    )

    if (!autoSelectedPaymentMethod) {
      autoSelectedPaymentMethod = paymentMethodPagination.value.items[0]
    }
    handleSelectedPaymentChange(autoSelectedPaymentMethod)
  }, [
    selectedPaymentMethodId,
    paymentMethodPagination.isLoading,
    paymentMethodPagination.value,
  ])

  const handleSelectedPaymentChange = (paymentMethod: PaymentMethod) => {
    setSelectedPaymentMethodId(paymentMethod.id)

    if (onChange) {
      onChange(paymentMethod.id, paymentMethod)
    }
  }

  const openPaymentMethod = async () => {
    const creationResult = await PaymentMethodApi.create({
      paymentMethodType: PaymentMethodType.CreditCard,
    })
    const newPaymentMethod = await creationResult.getData()
    setNewPaymentMethod(newPaymentMethod)
  }

  const closePaymentMethodDialog = () => {
    setNewPaymentMethod(undefined)
  }

  const handleSave = (paymentMethod: PaymentMethod) => {
    paymentMethodPagination.refresh()
    handleSelectedPaymentChange(paymentMethod)
  }

  return (
    <CardsListContainer className={className}>
      <FormControl>
        {!!paymentMethodPagination.value && (
          <RadioGroup value={selectedPaymentMethodId}>
            {paymentMethodPagination.value.items.map((paymentMethod) => {
              let logo: ReactNode = null
              switch (paymentMethod.card?.brand) {
                case 'amex':
                  logo = <AmexCardSmallIcon />
                  break
                case 'diners':
                  logo = <DinnersClubCardSmallIcon />
                  break
                case 'discover':
                  logo = <DiscoverCardSmallIcon />
                  break
                case 'jcb':
                  logo = <JcbCardSmallIcon />
                  break
                case 'mastercard':
                  logo = <MasterCardSmallIcon />
                  break
                case 'unionpay':
                  logo = <UnionPayCardSmallIcon />
                  break
                case 'visa':
                  logo = <VisaCardSmallIcon />
                  break
                case 'unknown':
                  logo = <UnknownCardSmallIcon />
                  break
              }

              const failedPaymentAuth = paymentMethod.id === failedPaymentMethod

              return (
                <CardSelectionItem key={paymentMethod.id}>
                  <CardSelectionItemFormControlLabel
                    value={paymentMethod.id}
                    control={
                      <Radio
                        checked={paymentMethod.id === selectedPaymentMethodId}
                        disabled={disabled}
                        onClick={() =>
                          handleSelectedPaymentChange(paymentMethod)
                        }
                      />
                    }
                    label={
                      <CardItemLabelSection>
                        {paymentMethod.preferred && !failedPaymentAuth && (
                          <DefaultCardSection>
                            <DefaultLabelSection>
                              <Typography variant="body1">
                                {t('default')}
                              </Typography>
                            </DefaultLabelSection>
                          </DefaultCardSection>
                        )}
                        {failedPaymentAuth && (
                          <PaymentFailedSection>
                            <PaymentFailedLabel>
                              <Typography variant="body1">
                                {t('paymentFailedLabel')}
                              </Typography>
                            </PaymentFailedLabel>
                          </PaymentFailedSection>
                        )}
                        <CardDescriptionSection>
                          <CardSelectionLabelLogo>
                            {logo}
                          </CardSelectionLabelLogo>
                          <CardSelectionLabelDescription>
                            <EndingInLabel>
                              <CardBrand variant="body2">
                                {paymentMethod.card?.brand}
                              </CardBrand>
                              <Typography variant="body2">
                                {' '}
                                {t('cardEndingIn')}{' '}
                              </Typography>
                              <Typography variant="body2" fontWeight={700}>
                                *{paymentMethod.card?.last4}
                              </Typography>
                            </EndingInLabel>
                            <Typography variant="body2">
                              {t('expLabel')}{' '}
                              {paymentMethod.card?.expirationMonth}/
                              {paymentMethod.card?.expirationYear}
                            </Typography>
                          </CardSelectionLabelDescription>
                        </CardDescriptionSection>
                      </CardItemLabelSection>
                    }
                  />
                  <CardSelectionItemDivider />
                </CardSelectionItem>
              )
            })}
          </RadioGroup>
        )}

        <AddNewCardSection>
          <AddNewCardButton
            onClick={openPaymentMethod}
            fullWidth
            variant="contained"
            color="secondary"
            disabled={disabled}
            startIcon={<CardIcon />}
          >
            <Typography variant="body2">{t('addNewCard')}</Typography>
          </AddNewCardButton>
        </AddNewCardSection>
      </FormControl>

      {!!newPaymentMethod && (
        <AddPaymentMethodDialogWrapper
          open={!!newPaymentMethod}
          paymentMethod={newPaymentMethod}
          onClose={closePaymentMethodDialog}
          onSave={handleSave}
        />
      )}
    </CardsListContainer>
  )
}
