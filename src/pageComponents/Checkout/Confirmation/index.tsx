import { NextPage } from 'next'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import { DateTime } from 'luxon'

import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { AppShell } from 'components/AppShell'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import {
  ActionLink,
  ActionSection,
  ButtonsDivider,
  CheckInButton,
  CheckoutConfirmationPageContainer,
  ConfirmationButton,
  CustomExpertAvatar,
  ExpertLink,
  ExpertPhoto,
  SendAMessageButton,
  SendAMessageContainer,
  SessionConfirmationContainer,
  SessionConfirmationDetails,
  SessionConfirmationSection,
  SessionInformation,
  SessionWithLabel,
} from 'pageComponents/Checkout/Confirmation/styles'
import { VerifiedBadgeBigIcon } from 'icons/VerifiedBadgeBig'
import { CalendarBigIcon } from 'icons/Calendar/SessionConfirmed'
import { Order } from 'interfaces/Order'
import { humanizeMinutes } from 'utils/duration/humanizeMinutes'
import { Session } from 'interfaces/Session'
import { Expert } from 'interfaces/Expert'
import { MessagesIcon } from 'icons/Navigation/Messages'
import { isSessionJoinable } from 'utils/sessions/isSessionJoinable'
import { ResponsiveChatPopup } from 'components/Messaging/ResponsiveChatPopup'

export interface CheckoutConfirmationPageProps {
  order: Order
}

export const CheckoutConfirmationPage: NextPage<
  CheckoutConfirmationPageProps
> = ({ order }) => {
  const { t } = useTranslation(LocaleNamespace.CheckoutConfirmationPage)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const session = order.session as Session
  const expert = session.expert as Expert

  const startDate = DateTime.fromISO(session.startDate.date, {
    zone: session.startDate.timeZone,
  })
  const endDate = startDate.plus({ minutes: session.duration })
  const humanizedMinutes = humanizeMinutes(session.duration)

  const { joinable } = isSessionJoinable(session, order)

  const [chatIsOpen, setChatIsOpen] = useState(false)

  const openChat = () => {
    setChatIsOpen(true)
  }

  const closeChat = () => {
    setChatIsOpen(false)
  }

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
      <CheckoutConfirmationPageContainer>
        <SessionConfirmationContainer>
          <VerifiedBadgeBigIcon />
          <SessionConfirmationSection>
            <SessionWithLabel variant="h3">
              {t('sessionConfirmedWith')}
              <ExpertLink
                href={`/experts/${expert.id}`}
              >{`${expert.user.firstName} ${expert.user.lastName}`}</ExpertLink>
            </SessionWithLabel>

            <SessionConfirmationDetails>
              <ExpertPhoto>
                <CustomExpertAvatar
                  expert={expert}
                  width={104.4}
                  height={104.4}
                />
              </ExpertPhoto>

              <SessionInformation>
                <CalendarBigIcon />
                <Typography variant="body1">
                  {startDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                </Typography>
                <Typography variant="body1">
                  {startDate.toFormat('h:mm a')} - {endDate.toFormat('h:mm a')}
                </Typography>
                <Typography variant="body1">
                  {humanizedMinutes.value} {humanizedMinutes.unit}
                </Typography>
                <Typography variant="body1">
                  {t('totalLabel')} ${order.totalPrice.amount}
                </Typography>
              </SessionInformation>
            </SessionConfirmationDetails>

            <ActionSection>
              <SendAMessageContainer>
                <MessagesIcon />
                <SendAMessageButton variant="text" onClick={openChat}>
                  {t('sendAMessageLabel', {
                    expertName: expert.user.firstName,
                  })}
                </SendAMessageButton>
              </SendAMessageContainer>

              <ButtonsDivider />
              {order.session?.instant ? (
                <>
                  {joinable ? (
                    <ActionLink href={`/sessions/${session.id}/room`}>
                      <CheckInButton
                        fullWidth
                        variant="contained"
                        color="secondary"
                      >
                        {t('joinButton')}
                      </CheckInButton>
                    </ActionLink>
                  ) : (
                    <ActionLink href={`/schedule/sessions/${session.id}`}>
                      <CheckInButton
                        fullWidth
                        variant="contained"
                        color="secondary"
                      >
                        {t('seeDetailsButton')}
                      </CheckInButton>
                    </ActionLink>
                  )}
                </>
              ) : (
                <ActionLink href="/schedule">
                  <ConfirmationButton
                    fullWidth
                    variant="outlined"
                    color="primary"
                  >
                    {t('viewSchedule')}
                  </ConfirmationButton>
                </ActionLink>
              )}
            </ActionSection>
          </SessionConfirmationSection>
        </SessionConfirmationContainer>
      </CheckoutConfirmationPageContainer>
      <ResponsiveChatPopup
        open={chatIsOpen}
        channel={session.messagingChannel}
        onClose={closeChat}
      />
    </AppShell>
  )
}
