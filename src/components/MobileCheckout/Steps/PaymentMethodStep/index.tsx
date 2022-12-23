import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import { MobileCheckoutStepProps } from 'components/MobileCheckout/Steps/MobileCheckoutStep'
import { StepButton, StepTitle } from 'components/MobileCheckout/Steps/styles'
import {
  PaymentFormStepContainer,
  AmountContainer,
  AmountLabel,
  FormStepFooterContainer,
  PaymentFormBody,
} from 'components/MobileCheckout/Steps/PaymentMethodStep/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ExpertAvailability } from 'interfaces/ExpertAvailability'
import { Order, OrderItem, SessionOrderItem } from 'interfaces/Order'
import { FormError } from 'components/Form/Error'
import { PaymentMethodSelector } from 'components/PaymentMethodSelector'
import { PaymentMethod } from 'interfaces/PaymentMethod'
import { humanizeMinutes } from 'utils/duration/humanizeMinutes'

interface PaymentMethodStepProps extends MobileCheckoutStepProps {
  order?: Order | null
  availability?: ExpertAvailability
  selectedTimeSlotId?: string
  isUpdating: boolean
  isProcessing: boolean
  processingError?: string | null
  onPaymentMethodChange?: (
    paymentMethodId: string,
    paymentMethod?: PaymentMethod
  ) => unknown
}

const PaymentMethodStepHeader: FC<MobileCheckoutStepProps> = () => {
  const { t } = useTranslation(LocaleNamespace.MobileCheckout)
  return <StepTitle>{t('creditCardHeaderLabel')}</StepTitle>
}

const PaymentMethodStepBody: FC<PaymentMethodStepProps> = ({
  order,
  isProcessing,
  onPaymentMethodChange,
}) => {
  const paymentMethod = order?.paymentMethod as PaymentMethod | undefined
  return (
    <PaymentFormStepContainer>
      <PaymentFormBody>
        <PaymentMethodSelector
          value={paymentMethod?.id}
          onChange={onPaymentMethodChange}
          disabled={isProcessing}
        />
      </PaymentFormBody>
    </PaymentFormStepContainer>
  )
}

const PaymentMethodStepFooter: FC<PaymentMethodStepProps> = ({
  order,
  isUpdating,
  isProcessing,
  onContinue,
  processingError,
}) => {
  const { t } = useTranslation(LocaleNamespace.MobileCheckout)

  if (isUpdating || !order || !order.items.length) {
    return (
      <FormStepFooterContainer>
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </FormStepFooterContainer>
    )
  }

  const sessionOrderItem = order
    .items[0] as unknown as OrderItem<SessionOrderItem>

  const sessionData = sessionOrderItem.data
  const humanizedMinutes = humanizeMinutes(sessionData.duration)

  return (
    <FormStepFooterContainer>
      {!!processingError && <FormError>{processingError}</FormError>}
      {!isUpdating && (
        <AmountContainer>
          <AmountLabel>
            {humanizedMinutes
              ? `${humanizedMinutes.value} ${humanizedMinutes.unit}`
              : ''}
          </AmountLabel>
          <Divider orientation="vertical" variant="fullWidth" flexItem />
          <AmountLabel>
            {`${t('totalLabel')} ${order?.totalPrice.amount.toFixed(2)}`}
          </AmountLabel>
        </AmountContainer>
      )}

      <StepButton
        state={isUpdating || isProcessing ? 'loading' : 'normal'}
        type="submit"
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        disabled={!order?.paymentMethod || !order.items.length}
        onClick={onContinue}
      >
        {t('submitButtonLabel')}
      </StepButton>
    </FormStepFooterContainer>
  )
}

export const PaymentMethodStep = {
  Header: PaymentMethodStepHeader,
  Body: PaymentMethodStepBody,
  Footer: PaymentMethodStepFooter,
}
