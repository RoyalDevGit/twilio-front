import React, { useCallback, useEffect, useId, useState } from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import Divider from '@mui/material/Divider'
import { closeSnackbar, CustomContentProps } from 'notistack'
import { DateTime } from 'luxon'

import { SessionExtensionIcon } from 'icons/SessionExtension'
import {
  MainSection,
  ActionSection,
  SelectDurationSection,
  SessionTimeAndPriceContainer,
  SessionTimePriceLabel,
  TimeAndPriceSection,
  DurationPrice,
  TimeAndPriceLabel,
  TimeAndPriceDivider,
  PayWithCardLabel,
  AvailableDuration,
  AvailableDurationsContainer,
  DurationTime,
  DurationTimeValue,
  StyledPaymentMethodSelector,
  StyledDivider,
  BackToCheckoutButton,
  ErrorSection,
} from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionCheckout/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Button } from 'components/Button'
import { SnackHeader } from 'pageComponents/SessionRoom/ExtensionPrompts/styles'
import {
  NotificationsSnackbar,
  NotificationsCard,
} from 'components/Snacks/styles'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { SessionApi } from 'apis/SessionApi'
import { SessionExtensionRequest } from 'interfaces/SessionExtensionRequest'
import { Expert } from 'interfaces/Expert'
import { humanizeMinutes } from 'utils/duration/humanizeMinutes'
import { useExpertInstantSessionAvailability } from 'hooks/api/expert/useExpertInstantSessionAvailability'
import { formatPrice } from 'utils/currency/formatPrice'
import { ExpertAvailableDuration } from 'interfaces/ExpertAvailability'
import { PaymentMethod } from 'interfaces/PaymentMethod'
import { FormError } from 'components/Form/Error'

interface ExtendSessionCheckoutSnackProps extends CustomContentProps {
  extensionRequest: SessionExtensionRequest
}

export const ExtendSessionCheckoutSnack = React.forwardRef<
  HTMLDivElement,
  ExtendSessionCheckoutSnackProps
>(({ extensionRequest, ...props }, ref) => {
  const { t } = useTranslation([
    LocaleNamespace.ExtensionPrompts,
    LocaleNamespace.PaymentMethodSelector,
    LocaleNamespace.AddPaymentMethodDialog,
  ])
  const { session } = extensionRequest
  const id = useId()
  const user = useCurrentUserAsserted()
  const { availability } = useExpertInstantSessionAvailability(
    session.expert as Expert,
    { ignoreActiveSession: true }
  )
  const [selectedDuration, setSelectedDuration] =
    useState<ExpertAvailableDuration | null>(null)

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    PaymentMethod | undefined
  >()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inPaymentMethods, setInPaymentMethods] = useState(true)

  useEffect(() => {
    if (selectedDuration || !availability?.durations.length) {
      return
    }
    if (extensionRequest.maxDuration) {
      const firstDuration = availability.durations.find(
        (d) => d.minutes <= (extensionRequest.maxDuration as number)
      )
      setSelectedDuration(firstDuration || null)
    } else {
      setSelectedDuration(availability.durations[0])
    }
  }, [selectedDuration, availability])

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id)
  }, [props.id, closeSnackbar])

  const handleCancel = async () => {
    if (extensionRequest.requester.id === user.id) {
      await SessionApi.withdrawSessionExtensionRequest(session.id)
    } else {
      await SessionApi.declineSessionExtensionRequest(session.id)
    }
    handleDismiss()
  }

  const processOrder = async () => {
    try {
      if (!selectedDuration || !selectedPaymentMethod) {
        return
      }
      setError(null)
      setIsProcessing(true)

      const processResult = await SessionApi.processSessionExtensionRequest(
        session.id,
        {
          duration: selectedDuration.minutes,
          paymentMethodId: selectedPaymentMethod.id,
        }
      )

      if (!processResult.ok()) {
        const processError = await processResult.getError()
        setError(processError.message)
        return
      }

      handleDismiss()
    } catch (e) {
      const err = e as Error
      setError(err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  const durations = extensionRequest.maxDuration
    ? availability?.durations.filter(
        (d) => d.minutes <= (extensionRequest.maxDuration as number)
      )
    : availability?.durations

  const renderSessionDetails = () => {
    if (!selectedDuration) {
      return null
    }
    const startDate = DateTime.fromISO(session.startDate.date)
    const newEndDate = DateTime.fromISO(session.endDate.date).plus({
      minutes: selectedDuration.minutes,
    })
    return (
      <>
        <Divider />
        <SessionTimeAndPriceContainer>
          <SessionTimePriceLabel>
            {t('sessionTimePriceLabel')}
          </SessionTimePriceLabel>
          <TimeAndPriceSection>
            <TimeAndPriceLabel>
              {startDate.toLocaleString(DateTime.TIME_SIMPLE)} -{' '}
              {newEndDate.toLocaleString(DateTime.TIME_SIMPLE)}
            </TimeAndPriceLabel>
            <TimeAndPriceDivider
              orientation="vertical"
              variant="fullWidth"
              flexItem
            />
            <TimeAndPriceLabel>
              {formatPrice(selectedDuration.price)}
            </TimeAndPriceLabel>
          </TimeAndPriceSection>
        </SessionTimeAndPriceContainer>
      </>
    )
  }

  return (
    <NotificationsSnackbar ref={ref} role="alert" {...props} id={id}>
      <NotificationsCard>
        <SnackHeader>
          <SessionExtensionIcon />
          <Typography variant="subtitle1">
            {t('extendYourSessionTitle')}
          </Typography>
        </SnackHeader>
        <div style={{ display: inPaymentMethods ? 'none' : 'block' }}>
          <MainSection>
            <SelectDurationSection>
              <Typography variant="body1">{t('selectDuration')}</Typography>
              <AvailableDurationsContainer>
                {durations?.map((duration) => {
                  const humanizedMinutes = humanizeMinutes(duration.minutes)
                  return (
                    <AvailableDuration
                      key={duration.minutes}
                      selected={duration.minutes === selectedDuration?.minutes}
                      onClick={() => setSelectedDuration(duration)}
                    >
                      <DurationTime>
                        <DurationTimeValue>
                          {humanizedMinutes.value}
                        </DurationTimeValue>
                        <Typography variant="body1">
                          {humanizedMinutes.unit}
                        </Typography>
                      </DurationTime>
                      <StyledDivider
                        orientation="vertical"
                        variant="fullWidth"
                        flexItem
                      />
                      <DurationPrice>
                        {formatPrice(duration.price)}
                      </DurationPrice>
                    </AvailableDuration>
                  )
                })}
              </AvailableDurationsContainer>
            </SelectDurationSection>

            {renderSessionDetails()}

            {selectedPaymentMethod && (
              <PayWithCardLabel variant="body1">
                {t('payWithCard', {
                  cardEndingIn: selectedPaymentMethod.card?.last4,
                })}

                <Button onClick={() => setInPaymentMethods(true)}>
                  {t('changePaymentMethod')}
                </Button>
              </PayWithCardLabel>
            )}
          </MainSection>
          <ActionSection>
            {!!error && (
              <ErrorSection>
                <FormError>{error}</FormError>
              </ErrorSection>
            )}

            <Button
              state={isProcessing ? 'loading' : 'normal'}
              disabled={!selectedPaymentMethod || !selectedDuration}
              fullWidth
              variant="contained"
              onClick={processOrder}
            >
              {t('submitPaymentButton')}
            </Button>
            <Button
              fullWidth
              color="tertiary"
              onClick={handleCancel}
              disabled={isProcessing}
            >
              {t('cancelButton')}
            </Button>
          </ActionSection>
        </div>

        <div style={{ display: inPaymentMethods ? 'block' : 'none' }}>
          <MainSection>
            <BackToCheckoutButton onClick={() => setInPaymentMethods(false)}>
              {t('backToCheckout')}
            </BackToCheckoutButton>
            <StyledPaymentMethodSelector
              value={selectedPaymentMethod?.id}
              onChange={(_id, paymentMethod) => {
                setSelectedPaymentMethod(paymentMethod)
                setInPaymentMethods(false)
              }}
            />
          </MainSection>
        </div>
      </NotificationsCard>
    </NotificationsSnackbar>
  )
})

ExtendSessionCheckoutSnack.displayName = 'ExtendSessionCheckoutSnack'
