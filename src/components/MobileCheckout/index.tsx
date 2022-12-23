import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useUpdateEffect } from 'react-use'

import { BottomSheet } from 'components/BottomSheet'
import { SessionCheckoutHook } from 'hooks/api/commerce/useSessionCheckout'
import { Expert } from 'interfaces/Expert'
import { Order } from 'interfaces/Order'
import { AvailabilityStep } from 'components/MobileCheckout/Steps/AvailabilityStep'
import { PaymentMethodStep } from 'components/MobileCheckout/Steps/PaymentMethodStep'
import { PaymentSuccessfulStep } from 'components/MobileCheckout/Steps/PaymentSuccessfulStep'
import { InstantSessionDurationStep } from 'components/MobileCheckout/Steps/InstantSessionDurationStep'
import {
  MobileCheckoutContainer,
  SheetHeader,
  CancelButton,
  SheetBody,
  BackButton,
} from 'components/MobileCheckout/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
interface MobileCheckoutProps {
  expert: Expert
  open: boolean
  instant: boolean
  onDismiss: () => unknown
  sessionCheckout: SessionCheckoutHook
}

export const MobileCheckout: FC<MobileCheckoutProps> = ({
  expert,
  instant,
  open,
  onDismiss,
  sessionCheckout,
}) => {
  const { t } = useTranslation(LocaleNamespace.MobileCheckout)
  const [activeStep, setActiveStep] = useState(0)

  const {
    order,
    onPaymentMethodChange,
    processOrder,
    processingError,
    isProcessing,
    isUpdating,
  } = sessionCheckout

  const totalSteps = 3
  const isLastStep = activeStep === totalSteps - 1

  const handleOnClose = () => {
    if (onDismiss) {
      onDismiss()
    }
  }

  const goForward = useCallback(() => {
    const nextStep = activeStep + 1
    const currentlyAtLast = activeStep >= totalSteps - 1
    if (currentlyAtLast) {
      handleOnClose()
    } else {
      setActiveStep(nextStep)
    }
  }, [activeStep])

  const goBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  useUpdateEffect(() => {
    if (open) {
      setActiveStep(0)
      sessionCheckout.reset()
    }
  }, [open])

  useEffect(() => {
    sessionCheckout.setIsInstantSession(instant)
  }, [instant])

  const handleProcessOrder = async () => {
    const result = await processOrder()
    if (result?.ok()) {
      goForward()
    }
  }

  useEffect(() => {
    sessionCheckout.setIsInstantSession(instant)
  }, [instant])

  let header: ReactNode = null
  let body: ReactNode = null
  let footer: ReactNode = null
  switch (activeStep) {
    case 0:
      if (instant) {
        header = <InstantSessionDurationStep.Header />
        body = (
          <InstantSessionDurationStep.Body
            availability={sessionCheckout.availability}
            onDurationChange={sessionCheckout.setSelectedInstantSessionDuration}
            instant={instant}
            onContinue={goForward}
          />
        )
        footer = <InstantSessionDurationStep.Footer />
      } else {
        header = <AvailabilityStep.Header />
        body = (
          <AvailabilityStep.Body
            isLoading={sessionCheckout.isLoading}
            availability={sessionCheckout.availability}
            date={sessionCheckout.selectedDate}
            duration={sessionCheckout.selectedDuration}
            timeSlot={sessionCheckout.selectedTimeSlotId}
            onDateChange={(date) => {
              sessionCheckout.setSelectedDate(date)
              sessionCheckout.setSelectedDuration(undefined)
              sessionCheckout.setSelectedTimeSlotId(undefined)
            }}
            onDurationChange={(duration) => {
              if (instant) {
                sessionCheckout.setSelectedInstantSessionDuration(duration)
              } else {
                sessionCheckout.setSelectedDuration(duration)
                sessionCheckout.setSelectedTimeSlotId(undefined)
              }
            }}
            onTimeSlotChange={sessionCheckout.setSelectedTimeSlotId}
            onDateRangeChange={(from, to) => {
              sessionCheckout.setSelectedDuration(undefined)
              sessionCheckout.setSelectedTimeSlotId(undefined)
              sessionCheckout.setFromDate(from)
              sessionCheckout.setToDate(to)
            }}
            instant={instant}
            onContinue={goForward}
          />
        )
        footer = (
          <AvailabilityStep.Footer
            isLoading={sessionCheckout.isLoading}
            timeSlot={sessionCheckout.selectedTimeSlotId}
            instant={instant}
            onContinue={goForward}
          />
        )
      }
      break
    case 1:
      header = <PaymentMethodStep.Header />
      body = (
        <PaymentMethodStep.Body
          order={order}
          instant={instant}
          onContinue={goForward}
          isProcessing={isProcessing}
          isUpdating={isUpdating}
          processingError={processingError}
          onPaymentMethodChange={onPaymentMethodChange}
        />
      )
      footer = (
        <PaymentMethodStep.Footer
          order={order}
          instant={instant}
          onContinue={handleProcessOrder}
          availability={sessionCheckout.availability}
          isProcessing={isProcessing}
          isUpdating={isUpdating}
          processingError={processingError}
          selectedTimeSlotId={sessionCheckout.selectedTimeSlotId}
        />
      )
      break
    case 2:
      header = <PaymentSuccessfulStep.Header />
      body = (
        <PaymentSuccessfulStep.Body
          expert={expert}
          order={order as Order}
          instant={instant}
          onContinue={goForward}
        />
      )
      footer = (
        <PaymentSuccessfulStep.Footer
          expert={expert}
          order={order as Order}
          instant={instant}
          onContinue={goForward}
        />
      )
      break
  }

  return (
    <MobileCheckoutContainer>
      <BottomSheet
        open={open}
        header={
          <SheetHeader>
            <div>
              <BackButton
                size="small"
                variant="text"
                onClick={goBack}
                disabled={activeStep === 0}
                style={{ visibility: isLastStep ? 'hidden' : 'visible' }}
              >
                {t('back')}
              </BackButton>
            </div>
            <div>{header}</div>
            <div>
              <CancelButton size="small" variant="text" onClick={handleOnClose}>
                {isLastStep ? t('close') : t('cancel')}
              </CancelButton>
            </div>
          </SheetHeader>
        }
        footer={footer}
        onClose={onDismiss}
        onOpen={() => open}
      >
        <SheetBody>{body}</SheetBody>
      </BottomSheet>
    </MobileCheckoutContainer>
  )
}
