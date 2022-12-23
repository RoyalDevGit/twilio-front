import { FC, useState } from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import Divider from '@mui/material/Divider'
import { PaymentMethod } from '@stripe/stripe-js'
import { DateTime } from 'luxon'

import {
  ActionContainer,
  CardHeaderSection,
  CustomUserAvatar,
  ExpertAvatarContainer,
  ExpertName,
  ExpertNameBox,
  MobileExpertAvatarContainer,
  MobileItem,
  MobileSection,
  OrderDetailCardContainer,
  OrderDetailCardContent,
  OrderDetailItem,
  OrderDetailItemLabel,
  OrdersDetailsSection,
  PaymentCardLabel,
  SessionDateSection,
  VerticalDivider,
} from 'pageComponents/Orders/OrderDetailCard/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Button } from 'components/Button'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { Order, OrderStatus } from 'interfaces/Order'
import { Expert } from 'interfaces/Expert'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'
import { Link } from 'components/Link'
import { humanizeMinutes } from 'utils/duration/humanizeMinutes'
import { getOtherSessionUser } from 'utils/sessions/getOtherSessionUser'

export interface OrderDetailCardProps {
  initialOrder: Order
}

export const OrderDetailCard: FC<
  React.PropsWithChildren<OrderDetailCardProps>
> = ({ initialOrder }) => {
  const { t } = useTranslation(LocaleNamespace.OrderDetailCard)
  const [order] = useState(initialOrder)

  const user = useCurrentUserAsserted()
  const { session } = order
  const payment = order.paymentMethod as PaymentMethod | undefined

  const getSessionDateTimes = () => {
    if (!session) {
      return {
        formattedStartDate: null,
        formattedStartTime: null,
        formattedEndTime: null,
      }
    }
    let formattedStartDate = ''
    let formattedStartTime = ''
    let formattedEndTime = ''
    if (session.started) {
      formattedStartDate = DateTime.fromISO(session.started).toLocaleString(
        DateTime.DATE_FULL
      )
      formattedStartTime = session.started
        ? DateTime.fromISO(session.started).toFormat('h:mm a ZZZZ')
        : ''

      formattedEndTime = session.ended
        ? DateTime.fromISO(session.ended).toFormat('h:mm a ZZZZ')
        : ''

      return {
        formattedStartDate,
        formattedStartTime,
        formattedEndTime,
      }
    } else {
      const startDateTime = DateTime.fromISO(session.startDate.date)
      formattedStartDate = startDateTime.toLocaleString(DateTime.DATE_FULL)
      formattedStartTime = startDateTime.toFormat('h:mm a ZZZZ')

      formattedEndTime = startDateTime
        .plus({ minutes: session.duration })
        .toFormat('h:mm a ZZZZ')

      return {
        formattedStartDate,
        formattedStartTime,
        formattedEndTime,
      }
    }
  }

  const renderOtherUserMobileAvatar = () => {
    if (!session) {
      return null
    }
    const otherUser = getOtherSessionUser(user, session)
    return (
      <>
        <CustomUserAvatar
          firstName={otherUser.firstName}
          lastName={otherUser.lastName}
          src={getUserProfilePictureUrl(otherUser)}
          width={88}
          height={88}
        />
        <ExpertName>
          {otherUser.firstName} {otherUser.lastName}
        </ExpertName>
      </>
    )
  }

  const renderOtherUserDesktopAvatar = () => {
    if (!session) {
      return null
    }
    const otherUser = getOtherSessionUser(user, session)
    const expert = session.expert as Expert
    return (
      <>
        <CustomUserAvatar
          firstName={otherUser.firstName}
          lastName={otherUser.lastName}
          src={getUserProfilePictureUrl(otherUser)}
          width={88}
          height={88}
        />
        <ExpertNameBox>
          <ExpertName>
            {otherUser.firstName} {otherUser.lastName}
          </ExpertName>
          <Typography variant="subtitle1">
            {expert.mainAreaOfExpertise}
          </Typography>
        </ExpertNameBox>
      </>
    )
  }

  const renderSessionDuration = () => {
    if (!session) {
      return null
    }
    const humanizedMinutes = humanizeMinutes(session.duration)
    return (
      <Typography variant="h6">
        {humanizedMinutes.value} {humanizedMinutes.unit}
      </Typography>
    )
  }

  const bookingDate = order?.createdAt
    ? DateTime.fromISO(order?.createdAt).toLocaleString(DateTime.DATE_FULL)
    : ''

  const formattedSessionDateTimes = getSessionDateTimes()

  return (
    <OrderDetailCardContainer>
      <OrderDetailCardContent>
        <MobileSection>
          <MobileItem>
            <Typography variant="h6">{t('sessionWithLabel')}</Typography>
            <MobileExpertAvatarContainer>
              {renderOtherUserMobileAvatar()}
            </MobileExpertAvatarContainer>
          </MobileItem>
          <SessionDateSection>
            <Typography variant="h6">
              {t('bookingDateLabel')}: {bookingDate}
            </Typography>
            <VerticalDivider>|</VerticalDivider>
            <Typography variant="h6">
              {t('orderNumberLabel')} #: {order.orderNumber}
            </Typography>
          </SessionDateSection>
          <MobileItem />
        </MobileSection>
        <CardHeaderSection>
          <Typography variant="h6">{t('sessionWithLabel')}</Typography>
          <SessionDateSection>
            <Typography variant="h6">
              {t('bookingDateLabel')}: {bookingDate}
            </Typography>
            <VerticalDivider>|</VerticalDivider>
            <Typography variant="h6">
              {t('orderNumberLabel')} #: {order.orderNumber}
            </Typography>
          </SessionDateSection>
        </CardHeaderSection>
        <ExpertAvatarContainer>
          {renderOtherUserDesktopAvatar()}
        </ExpertAvatarContainer>
        <OrdersDetailsSection>
          <OrderDetailItem>
            <OrderDetailItemLabel>{t('sessionDateLabel')}</OrderDetailItemLabel>
            <Typography variant="h6">
              {formattedSessionDateTimes.formattedStartDate}
            </Typography>
          </OrderDetailItem>
          <OrderDetailItem>
            <OrderDetailItemLabel>{t('startTimeLabel')}</OrderDetailItemLabel>
            <Typography variant="h6">
              {formattedSessionDateTimes.formattedStartTime}
            </Typography>
          </OrderDetailItem>
          <OrderDetailItem>
            <OrderDetailItemLabel>{t('endTimeLabel')}</OrderDetailItemLabel>
            <Typography variant="h6">
              {formattedSessionDateTimes.formattedEndTime}
            </Typography>
          </OrderDetailItem>
          <OrderDetailItem>
            <OrderDetailItemLabel>{t('totalTimeLabel')}</OrderDetailItemLabel>
            {renderSessionDuration()}
          </OrderDetailItem>
          <OrderDetailItem>
            <OrderDetailItemLabel>{t('paymentTypeLabel')}</OrderDetailItemLabel>
            <PaymentCardLabel variant="h6">
              {`${payment?.card?.brand} ****${payment?.card?.last4}`}
            </PaymentCardLabel>
          </OrderDetailItem>
          <OrderDetailItem>
            <OrderDetailItemLabel>
              {t('paymentTotalLabel')}
            </OrderDetailItemLabel>
            <Typography variant="h6">
              ${order.grandTotalPrice.amount}
            </Typography>
          </OrderDetailItem>
        </OrdersDetailsSection>
        <Divider />
        <ActionContainer>
          {order.status === OrderStatus.Complete && (
            <Link href={'/support'}>
              <Button variant="outlined" color="primary">
                {t('requestRefund')}
              </Button>
            </Link>
          )}
          {session && (
            <Link href={`/schedule/sessions/${session.id}`}>
              <Button variant="outlined" color="primary">
                {t('viewSessionDetails')}
              </Button>
            </Link>
          )}
        </ActionContainer>
      </OrderDetailCardContent>
    </OrderDetailCardContainer>
  )
}
