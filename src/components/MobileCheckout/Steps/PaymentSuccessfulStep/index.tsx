import { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'

import {
  SessionConfirmedInformation,
  SessionConfirmedLabel,
  InformationContainer,
  SendAMessageContainer,
  SendAMessageLabel,
  CustomExpertAvatar,
  PaymentSuccessfulStepContainer,
  AvatarContainer,
  PaymentSuccessfulTitle,
  LabelBox,
} from 'components/MobileCheckout/Steps/PaymentSuccessfulStep/styles'
import { MobileCheckoutStepProps } from 'components/MobileCheckout/Steps/MobileCheckoutStep'
import { StepButton } from 'components/MobileCheckout/Steps/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { MessagesIcon } from 'icons/Navigation/Messages'
import { SuccessCheckmarkIcon } from 'icons/SuccessCheckmark'
import { Order, OrderItem, SessionOrderItem } from 'interfaces/Order'
import { Expert } from 'interfaces/Expert'
import { Link } from 'components/Link'
import { humanizeMinutes } from 'utils/duration/humanizeMinutes'
import { isSessionJoinable } from 'utils/sessions/isSessionJoinable'
import { Session } from 'interfaces/Session'
import { CalendarDottedIcon } from 'icons/Calendar/DottedCalendar'
import { MobileChatModal } from 'components/Messaging/MobileChatModal'

interface PaymentSuccessfulStepProps extends MobileCheckoutStepProps {
  expert: Expert
  order: Order
}

const PaymentSuccessfulStepHeader: FC<MobileCheckoutStepProps> = () => {
  const { t } = useTranslation(LocaleNamespace.MobileCheckout)

  return (
    <PaymentSuccessfulTitle>
      {t('paymentSuccessfulHeaderLabel')}
    </PaymentSuccessfulTitle>
  )
}

const PaymentSuccessfulStepBody: FC<PaymentSuccessfulStepProps> = ({
  expert,
  order,
  instant,
}) => {
  const { t } = useTranslation(LocaleNamespace.MobileCheckout)

  const session = order.session as Session
  const [openMessage, setOpenMessage] = useState(false)

  const openChat = () => {
    setOpenMessage(true)
  }

  const closeChat = () => {
    setOpenMessage(false)
  }

  const handleOpenMessage = () => {
    if (openChat) {
      openChat()
    }
  }

  const sessionOrderItem = order
    .items[0] as unknown as OrderItem<SessionOrderItem>

  const sessionData = sessionOrderItem.data
  const startDate = DateTime.fromISO(sessionData.startDate.date, {
    zone: sessionData.startDate.timeZone,
  })
  const endDate = startDate.plus({ minutes: sessionData.duration })
  const humanizedMinutes = humanizeMinutes(sessionData.duration)

  return (
    <PaymentSuccessfulStepContainer>
      <AvatarContainer>
        <SuccessCheckmarkIcon />
        <LabelBox>
          <SessionConfirmedLabel>
            {t('sessionConfirmedLabel')}
          </SessionConfirmedLabel>
          <SessionConfirmedLabel>{`${t('withLabel')} ${expert.user.firstName} ${
            expert.user.lastName
          }`}</SessionConfirmedLabel>
        </LabelBox>
        <CustomExpertAvatar width={104} height={104} expert={expert} />
      </AvatarContainer>

      <InformationContainer>
        <CalendarDottedIcon />
        <SessionConfirmedInformation>
          {startDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
        </SessionConfirmedInformation>
        <SessionConfirmedInformation>
          {startDate.toFormat('h:mm a ZZZZ')} -{' '}
          {endDate.toFormat('h:mm a ZZZZ')}
        </SessionConfirmedInformation>
        <SessionConfirmedInformation>
          {humanizedMinutes.value} {humanizedMinutes.unit}
        </SessionConfirmedInformation>
        <SessionConfirmedInformation>
          {t('totalLabel')} ${sessionOrderItem.totalPrice.amount}
        </SessionConfirmedInformation>
        {!instant && (
          <SendAMessageContainer>
            <MessagesIcon />
            <SendAMessageLabel variant="text" onClick={handleOpenMessage}>
              {t('sendAMessageLabel', {
                expertName: expert.user.firstName,
              })}
            </SendAMessageLabel>
          </SendAMessageContainer>
        )}
      </InformationContainer>
      <MobileChatModal
        open={openMessage}
        channel={session.messagingChannel}
        onClose={closeChat}
      />
    </PaymentSuccessfulStepContainer>
  )
}

const PaymentSuccessfulStepFooter: FC<PaymentSuccessfulStepProps> = ({
  order,
  instant,
}) => {
  const { t } = useTranslation(LocaleNamespace.MobileCheckout)
  const { joinable } = isSessionJoinable(order.session as Session, order)

  if (instant) {
    return (
      <>
        {joinable ? (
          <Link href={`/sessions/${order.session?.id}/room`}>
            <StepButton
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              {t('joinSessionButton')}
            </StepButton>
          </Link>
        ) : (
          <Link href={`/schedule/sessions/${order.session?.id}`}>
            <StepButton
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
            >
              {t('seeDetailsButton')}
            </StepButton>
          </Link>
        )}
      </>
    )
  }

  return (
    <Link href="/schedule">
      <StepButton variant="outlined" color="secondary" size="large" fullWidth>
        {t('viewScheduleButtonLabel')}
      </StepButton>
    </Link>
  )
}

export const PaymentSuccessfulStep = {
  Header: PaymentSuccessfulStepHeader,
  Body: PaymentSuccessfulStepBody,
  Footer: PaymentSuccessfulStepFooter,
}
