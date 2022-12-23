import { NextPage } from 'next'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import { DateTime } from 'luxon'
import CircularProgress from '@mui/material/CircularProgress'

import { useRouter } from 'hooks/useRouter'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { AppShell } from 'components/AppShell'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import {
  AvailableSessionsSection,
  MobileCheckoutTitle,
  AvailableSessionTimeSlotPickerSection,
  CheckoutPageContainer,
  CheckoutPageGrid,
  ConfirmBookingButton,
  ConfirmBookingSection,
  DetailsAndPaymentColumn,
  ExpertPhoto,
  MobileCheckoutSubtitle,
  SessionComment,
  SessionCommentSection,
  SessionConfirmationColumn,
  SessionConfirmationDetails,
  SessionConfirmationSection,
  SessionCostLabel,
  SessionDateTimeSection,
  SessionWithLabel,
  VerticalDivider,
  CustomExpertAvatar,
  CheckoutPageTitle,
  CheckoutPageBox,
  SessionTimeIconBox,
} from 'pageComponents/Checkout/styles'
import { AvailableSessionDatePicker } from 'components/AvailableSessions/AvailableSessionDatePicker'
import { AvailableSessionTimeSlotPicker } from 'components/AvailableSessions/AvailableSessionTimeSlotPicker'
import { AvailableSessionDurationPicker } from 'components/AvailableSessions/AvailableSessionDurationPicker'
import { CalendarIcon } from 'icons/Calendar/Standard'
import { ClockIcon } from 'icons/Clock'
import { PaymentMethodSelector } from 'components/PaymentMethodSelector'
import { Order, OrderItem, SessionOrderItem } from 'interfaces/Order'
import { useSessionCheckout } from 'hooks/api/commerce/useSessionCheckout'
import { Expert } from 'interfaces/Expert'
import { getUserFullName } from 'utils/user/getUserFullName'
import { formatPrice } from 'utils/currency/formatPrice'
import { PaymentMethod } from 'interfaces/PaymentMethod'
import { CheckoutError } from 'components/CheckoutError'
import { PageContainer } from 'components/PageContainer/styles'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

export interface CheckoutPageProps {
  currentOrder: Order
  expert: Expert
}

export const CheckoutPage: NextPage<CheckoutPageProps> = ({
  currentOrder,
  expert,
}) => {
  const router = useRouter()
  const { t } = useTranslation([
    LocaleNamespace.CheckoutPage,
    LocaleNamespace.ExpertCard,
    LocaleNamespace.FilterBy,
    LocaleNamespace.FeaturedExpertCard,
    LocaleNamespace.Common,
  ])

  const sessionItem = currentOrder.items[0] as OrderItem<SessionOrderItem>
  const { data: sessionData } = sessionItem
  const initialFrom = DateTime.now().toUTC().startOf('day')
  const initialTo = initialFrom.plus({ months: 3 }).endOf('day')
  const initialSelectedDate = DateTime.fromISO(sessionData.startDate.date)
  const [isProcessing, setIsProcessing] = useState(false)
  const isDarkMode = usePrefersDarkMode()

  const checkout = useSessionCheckout({
    expert,
    from: initialFrom,
    to: initialTo,
    selectedDate: initialSelectedDate,
    selectedDuration: sessionData.instant ? undefined : sessionData.duration,
    selectedInstantSessionDuration: sessionData.instant
      ? sessionData.duration
      : undefined,
    selectedTimeSlotId: sessionData.timeSlotId,
    order: currentOrder,
  })

  const {
    isLoading,
    isUpdating,
    processOrder,
    processingError,
    onPaymentMethodChange,
    availability,
    selectedDate,
    selectedDuration,
    selectedInstantSessionDuration,
    selectedTimeSlotId,
  } = checkout

  const order = checkout.order as Order

  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const handleProcessing = async () => {
    setIsProcessing(true)
    const result = await processOrder()
    if (result?.ok()) {
      router.push(`/checkout/confirmation/${order.id}`)
    } else {
      setIsProcessing(false)
    }
  }

  const handleDurationChange = (duration: number) => {
    if (checkout.isInstantSession) {
      checkout.setSelectedInstantSessionDuration(duration)
    } else {
      checkout.setSelectedDuration(duration)
      checkout.setSelectedTimeSlotId(undefined)
    }
  }

  const startDate = DateTime.fromISO(sessionData.startDate.date, {
    zone: sessionData.startDate.timeZone,
  })
  const endDate = startDate.plus({ minutes: sessionData.duration })

  const paymentMethod = order?.paymentMethod as PaymentMethod | undefined

  const allowProcessing = !!paymentMethod && !!order.items.length

  const pickedDuration = checkout.isInstantSession
    ? selectedInstantSessionDuration
    : selectedDuration

  const hasDuration = checkout.isInstantSession
    ? !!availability?.instant.durations.length
    : !!availability?.durations.length

  return (
    <AppShell
      drawer={
        <ConsumerDrawer
          open={drawerIsOpen}
          onClose={handleDrawerMenuClose}
          onToggleClick={handleDrawerMenuClick}
        />
      }
      mobileNavigation={
        <ConsumerMobileNavigation onDrawerMenuClick={handleDrawerMenuClick} />
      }
      onDrawerMenuClick={handleDrawerMenuClick}
    >
      <PageContainer>
        <CheckoutPageContainer>
          <CheckoutPageBox>
            <CheckoutPageTitle variant="h2">
              {t('pageHeader')}
            </CheckoutPageTitle>
            <CheckoutPageGrid>
              <DetailsAndPaymentColumn>
                {!sessionData.instant && (
                  <AvailableSessionsSection>
                    <MobileCheckoutTitle variant="h5">
                      {t('availableSessionsHeader')}
                    </MobileCheckoutTitle>
                    <MobileCheckoutSubtitle variant="subtitle1">
                      {t('availableSessionsSubtitle')}
                    </MobileCheckoutSubtitle>
                    <AvailableSessionDatePicker
                      isLoading={
                        !checkout.availability?.dates.length &&
                        checkout.isLoading
                      }
                      availability={availability}
                      onChange={(date) => {
                        checkout.setSelectedDate(date)
                        checkout.setSelectedDuration(undefined)
                        checkout.setSelectedTimeSlotId(undefined)
                      }}
                      value={selectedDate}
                    />
                  </AvailableSessionsSection>
                )}
                <AvailableSessionsSection>
                  <MobileCheckoutTitle variant="h5">
                    {t('sessionDurationHeader')}
                  </MobileCheckoutTitle>
                  <MobileCheckoutSubtitle variant="subtitle1">
                    {t('selectDuration')}
                  </MobileCheckoutSubtitle>
                  <AvailableSessionDurationPicker
                    isLoading={!hasDuration && checkout.isLoading}
                    availability={availability}
                    onChange={handleDurationChange}
                    value={pickedDuration}
                    isInstantSession={checkout.isInstantSession}
                  />
                </AvailableSessionsSection>
                {!sessionData.instant && !!checkout.selectedDuration && (
                  <AvailableSessionsSection>
                    <MobileCheckoutTitle variant="h5">
                      {t('availableStartTimesHeader')}
                    </MobileCheckoutTitle>
                    <MobileCheckoutSubtitle variant="subtitle1">
                      {t('availableStartTimesSubtitle')}
                    </MobileCheckoutSubtitle>
                    <AvailableSessionTimeSlotPickerSection>
                      <AvailableSessionTimeSlotPicker
                        isLoading={checkout.isLoading}
                        availability={availability}
                        onChange={checkout.setSelectedTimeSlotId}
                        value={selectedTimeSlotId}
                      />
                    </AvailableSessionTimeSlotPickerSection>
                  </AvailableSessionsSection>
                )}
                <AvailableSessionsSection>
                  <MobileCheckoutTitle variant="h5">
                    {t('paymentHeader')}
                  </MobileCheckoutTitle>
                  <MobileCheckoutSubtitle variant="subtitle1">
                    {t('paymentSubtitle')}
                  </MobileCheckoutSubtitle>
                  <PaymentMethodSelector
                    value={paymentMethod?.id}
                    onChange={onPaymentMethodChange}
                    disabled={isProcessing}
                  />
                </AvailableSessionsSection>
              </DetailsAndPaymentColumn>
              <SessionConfirmationColumn>
                <SessionConfirmationSection>
                  <MobileCheckoutTitle variant="h5">
                    {t('sessionConfirmationHeader')}
                  </MobileCheckoutTitle>
                  <MobileCheckoutSubtitle variant="subtitle1">
                    {t('reviewInformation')}
                  </MobileCheckoutSubtitle>
                  <SessionConfirmationDetails>
                    <ExpertPhoto>
                      <CustomExpertAvatar
                        expert={expert}
                        width={175}
                        height={175}
                      />
                    </ExpertPhoto>
                    <SessionWithLabel>
                      {t('sessionWith', { name: getUserFullName(expert.user) })}
                    </SessionWithLabel>
                    <SessionCostLabel>
                      {isUpdating ? (
                        <CircularProgress />
                      ) : (
                        formatPrice(order.totalPrice)
                      )}
                    </SessionCostLabel>
                    <SessionDateTimeSection darkmode={isDarkMode.toString()}>
                      <SessionTimeIconBox>
                        <CalendarIcon />
                        <Typography>
                          {startDate.toLocaleString(
                            DateTime.DATE_MED_WITH_WEEKDAY
                          )}
                        </Typography>
                      </SessionTimeIconBox>
                      <VerticalDivider
                        flexItem
                        orientation="vertical"
                        variant="middle"
                      />
                      <SessionTimeIconBox>
                        <ClockIcon />
                        <Typography variant="body2">
                          {startDate.toFormat('h:mm a')} -{' '}
                          {endDate.toFormat('h:mm a ZZZZ')}
                        </Typography>
                      </SessionTimeIconBox>
                    </SessionDateTimeSection>
                    <SessionCommentSection>
                      <Typography variant="body2">
                        {t('sessionCommentLabel')}
                      </Typography>
                      <SessionComment
                        variant="outlined"
                        placeholder={t('sessionCommentPlaceholder')}
                        autoComplete="off"
                        multiline
                        rows={3}
                        value={checkout.notes}
                        onChange={(e) =>
                          checkout.setNotes(e.currentTarget.value)
                        }
                      />
                    </SessionCommentSection>
                    {!!processingError && (
                      <CheckoutError>{processingError}</CheckoutError>
                    )}
                    <ConfirmBookingSection>
                      <ConfirmBookingButton
                        onClick={handleProcessing}
                        state={
                          isLoading || isUpdating || isProcessing
                            ? 'loading'
                            : 'normal'
                        }
                        disabled={!allowProcessing}
                        fullWidth
                        variant="contained"
                        color="primary"
                      >
                        {t('submitPayment')}
                      </ConfirmBookingButton>
                    </ConfirmBookingSection>
                  </SessionConfirmationDetails>
                </SessionConfirmationSection>
              </SessionConfirmationColumn>
            </CheckoutPageGrid>
          </CheckoutPageBox>
        </CheckoutPageContainer>
      </PageContainer>
    </AppShell>
  )
}
