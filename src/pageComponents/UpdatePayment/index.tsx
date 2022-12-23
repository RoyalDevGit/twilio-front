import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { DateTime } from 'luxon'
import Typography from '@mui/material/Typography'

import {
  ContinueButton,
  HeaderSection,
  MainSection,
  PageDescription,
  PageTitle,
  PaymentMethodSelectorSection,
  PaymentMethodsSection,
  ThankYouStateButton,
  ThankYouStateButtonsSection,
  TryAnotherPayment,
  WatermarkSection,
} from 'pageComponents/UpdatePayment/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { LogoSection } from 'pageComponents/SessionRoom/MeetingStates/styles'
import { Link } from 'components/Link'
import { LogoCompleteTextIcon } from 'icons/Logo'
import { LogoWatermark } from 'icons/LogoWatermark'
import { Session } from 'interfaces/Session'
import { OrderApi } from 'apis/OrderApi'
import { SessionApi } from 'apis/SessionApi'
import { FormError } from 'components/Form/Error'
import { Config } from 'utils/config'
import { PaymentMethodSelector } from 'components/PaymentMethodSelector'
import { isSessionJoinable } from 'utils/sessions/isSessionJoinable'
import { PaymentMethod } from 'interfaces/PaymentMethod'

const FAILED_SESSION_PAYMENT_AUTOMATIC_CANCELLATION_WINDOW = Config.getDuration(
  'FAILED_SESSION_PAYMENT_AUTOMATIC_CANCELLATION_WINDOW'
)

export interface UpdatePaymentPageProps {
  initialSession: Session
}

export const UpdatePaymentPage: NextPage<UpdatePaymentPageProps> = ({
  initialSession,
}) => {
  const { t } = useTranslation([
    LocaleNamespace.UpdatePaymentPage,
    LocaleNamespace.PaymentMethodSelector,
  ])
  const [session, setSession] = useState(initialSession)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [thankYouState, setThankYouState] = useState(false)
  const { joinable } = isSessionJoinable(initialSession)

  const paymentMethod = session.order?.paymentMethod as PaymentMethod
  const cardLast4 = paymentMethod?.card?.last4
  const paymentMethodId = paymentMethod?.id
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] =
    useState(paymentMethodId)

  const showThankYouState = async () => {
    const result = await SessionApi.getById(session.id)

    if (!result.ok()) {
      return
    }

    const updatedSession = await result.getData()
    setSession(updatedSession)
    setThankYouState(true)
  }

  const handlePaymentUpdate = async () => {
    try {
      setIsSaving(true)
      setError(null)

      const result = await OrderApi.updateFailedPayment(
        session.order.id,
        selectedPaymentMethodId
      )

      if (!result.ok()) {
        const error = await result.getError()
        setError(error.message)
        return
      }
      showThankYouState()
    } finally {
      setIsSaving(false)
    }
  }

  const automaticCancellationDate = DateTime.fromISO(
    session.order.paymentFailureDate as string
  ).plus({
    milliseconds:
      FAILED_SESSION_PAYMENT_AUTOMATIC_CANCELLATION_WINDOW.milliseconds,
  })

  const hoursUntilAutomaticCancellation = Math.round(
    automaticCancellationDate.diffNow(['hours']).hours
  )

  return (
    <MainSection>
      <LogoSection>
        <Link href="/">
          <LogoCompleteTextIcon />
        </Link>
      </LogoSection>
      <PageTitle variant="h2" inThankYouState={thankYouState}>
        {thankYouState ? t('thankYouTitle') : t('pageTitle')}
      </PageTitle>
      <PageDescription>
        {thankYouState
          ? t('thankYouDescription')
          : t('pageDescription', {
              cardLastFour: cardLast4,
              hoursUntilAutomaticCancellation,
            })}
      </PageDescription>
      {!thankYouState && (
        <PaymentMethodsSection>
          <TryAnotherPayment>{t('tryAnotherPayment')}</TryAnotherPayment>
          <PaymentMethodSelectorSection>
            <HeaderSection>
              <Typography variant="h4">{t('paymentSelectorHeader')}</Typography>
              <Typography variant="subtitle1">
                {t('paymentSelectorSubheader')}
              </Typography>
            </HeaderSection>
            <PaymentMethodSelector
              failedPaymentMethod={paymentMethodId}
              value={selectedPaymentMethodId}
              onChange={(id) => {
                setSelectedPaymentMethodId(id)
              }}
              disabled={isSaving}
            />
          </PaymentMethodSelectorSection>
          <FormError>{error}</FormError>
          <ContinueButton
            state={isSaving ? 'loading' : 'normal'}
            onClick={handlePaymentUpdate}
            variant="contained"
          >
            {t('updatePaymentButton')}
          </ContinueButton>
        </PaymentMethodsSection>
      )}
      {thankYouState && (
        <ThankYouStateButtonsSection>
          <Link
            href={
              joinable
                ? `/sessions/${session.id}/room`
                : `/schedule/sessions/${session.id}`
            }
          >
            <ThankYouStateButton variant="contained" color="secondary">
              {joinable ? t('joinNowButton') : t('sessionDetailsButton')}
            </ThankYouStateButton>
          </Link>

          <Link
            href={joinable ? `/schedule/sessions/${session.id}` : `/schedule`}
          >
            <ThankYouStateButton variant="outlined">
              {joinable ? t('sessionDetailsButton') : t('viewScheduleButton')}
            </ThankYouStateButton>
          </Link>
        </ThankYouStateButtonsSection>
      )}
      <WatermarkSection>
        <LogoWatermark />
      </WatermarkSection>
    </MainSection>
  )
}
