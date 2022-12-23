import { FC } from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'

import {
  ActionContainer,
  DetailsButton,
  CustomUserAvatar,
  ExpertAvatarContainer,
  MobileItem,
  MobileSection,
  OrderCardContainer,
  OrderCardContent,
  PaymentCardLabel,
  StatusValue,
} from 'pageComponents/Orders/OrderCard/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Order } from 'interfaces/Order'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'
import { PaymentMethod } from 'interfaces/PaymentMethod'
import { Link } from 'components/Link'
import { humanizeMinutes } from 'utils/duration/humanizeMinutes'
import { getOtherSessionUser } from 'utils/sessions/getOtherSessionUser'

interface OrderCardProps {
  order: Order
}

export const OrderCard: FC<React.PropsWithChildren<OrderCardProps>> = ({
  order,
}) => {
  const { t } = useTranslation(LocaleNamespace.OrderCard)
  const user = useCurrentUserAsserted()

  const payment = order.paymentMethod as PaymentMethod | undefined
  const { session } = order

  const renderAvatar = () => {
    if (!session) {
      return null
    }
    const otherUser = getOtherSessionUser(user, session)
    return (
      <CustomUserAvatar
        firstName={otherUser.firstName}
        lastName={otherUser.lastName}
        src={getUserProfilePictureUrl(otherUser)}
        width={48}
        height={48}
      />
    )
  }

  const renderOtherUserName = () => {
    if (!session) {
      return null
    }
    const otherUser = getOtherSessionUser(user, session)
    return (
      <Typography variant="subtitle1">
        {otherUser.firstName} {otherUser.lastName}
      </Typography>
    )
  }

  const renderSessionDuration = () => {
    if (!session) {
      return null
    }
    const humanizedMinutes = humanizeMinutes(session.duration)
    return (
      <Typography variant="subtitle1">
        {humanizedMinutes.value} {humanizedMinutes.unit}
      </Typography>
    )
  }

  const renderSessionStartDate = () => {
    if (!session) {
      return null
    }
    const startDate = session.startDate.date
      ? DateTime.fromISO(session.startDate.date).toLocaleString(
          DateTime.DATE_FULL
        )
      : ''
    return <Typography variant="subtitle1">{startDate}</Typography>
  }

  return (
    <OrderCardContainer>
      <MobileSection>
        <ExpertAvatarContainer>{renderAvatar()}</ExpertAvatarContainer>
        <MobileItem>
          <Typography variant="h6">{t('orderNumberLabel')}:</Typography>
          <Typography variant="body1">#{order.orderNumber}</Typography>
        </MobileItem>
        <MobileItem>
          <Typography variant="h6">{t('expertNameLabel')}:</Typography>
          {renderOtherUserName()}
        </MobileItem>
        <MobileItem>
          <Typography variant="h6">{t('dateLabel')}:</Typography>
          {renderSessionStartDate()}
        </MobileItem>
        <MobileItem>
          <Typography variant="h6">{t('sessionTimeLabel')}:</Typography>
          {renderSessionDuration()}
        </MobileItem>
        <MobileItem>
          <Typography variant="h6">{t('paymentTypeLabel')}:</Typography>
          <PaymentCardLabel>
            {`${payment?.card?.brand} ****${payment?.card?.last4}`}
          </PaymentCardLabel>
        </MobileItem>
        <MobileItem>
          <Typography variant="h6">{t('statusLabel')}:</Typography>
          <StatusValue variant="subtitle1">{order.status}</StatusValue>
        </MobileItem>
        <Link href={`/orders/${order.id}`}>
          <DetailsButton variant="outlined" color="primary">
            {t('detailsLabel')}
          </DetailsButton>
        </Link>
      </MobileSection>
      <OrderCardContent>
        <Typography variant="subtitle1">#{order.orderNumber}</Typography>
        <ExpertAvatarContainer>
          {renderAvatar()}
          {renderOtherUserName()}
        </ExpertAvatarContainer>
        <div>{renderSessionStartDate()}</div>
        <div>{renderSessionDuration()}</div>
        <PaymentCardLabel variant="subtitle1">{`${payment?.card?.brand} ****${payment?.card?.last4}`}</PaymentCardLabel>
        <StatusValue variant="subtitle1">{order.status}</StatusValue>
        <ActionContainer>
          <Link href={`/orders/${order.id}`}>
            <DetailsButton variant="outlined" color="primary">
              {t('detailsLabel')}
            </DetailsButton>
          </Link>
        </ActionContainer>
      </OrderCardContent>
    </OrderCardContainer>
  )
}
