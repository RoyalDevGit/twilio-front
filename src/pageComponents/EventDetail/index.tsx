import { useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'

import {
  Cover,
  CoverEventName,
  CoverToolbar,
  CoverType,
  ReserveSection,
  DateAndLocation,
  DateSection,
  DesktopActionButtonSection,
  Details,
  IconAndType,
  Section,
  VerticalSeparator,
  TimeSection,
  MobileActionButtonSection,
  SectionContent,
} from 'pageComponents/EventDetail/styles'
import { EventConfirmationDialog } from 'components/Dialogs/EventConfirmationDialog'
import { EventReservationCancellationDialog } from 'components/Dialogs/EventReservationCancellationDialog'
import { Event } from 'interfaces/Event'
import { AppShell } from 'components/AppShell'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { Button } from 'components/Button'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'

export interface EventDetailPageProps {
  initialEvent: Event
}

export const EventDetailPage: NextPage<EventDetailPageProps> = ({
  initialEvent,
}) => {
  const { t } = useTranslation(LocaleNamespace.EventDetail)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [reservationConfirmationIsOpen, setReservationConfirmationIsOpen] =
    useState(false)

  const [event, setEvent] = useState(initialEvent)
  const [cancellationModalIsOpen, setCancellationModalIsOpen] = useState(false)

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const openCancellationConfirmation = (): void => {
    setCancellationModalIsOpen(true)
  }

  const closeCancellationConfirmation = () => {
    setCancellationModalIsOpen(false)
  }

  const openReservationConfirmation = (): void => {
    setReservationConfirmationIsOpen(true)
  }

  const closeReservationConfirmation = () => {
    setReservationConfirmationIsOpen(false)
  }

  const handleReservationSave = (event: Event) => {
    setEvent(event)
    closeReservationConfirmation()
  }

  const handleReservationCancel = (event: Event) => {
    setEvent(event)
    closeCancellationConfirmation()
  }

  const startDate = DateTime.fromISO(event.startDate.date)
  const endDate = DateTime.fromISO(event.endDate.date)

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
      <Cover>
        <CoverToolbar />
        <IconAndType>
          <CoverType>{event.title}</CoverType>
        </IconAndType>

        <CoverEventName>{event.title}</CoverEventName>
      </Cover>
      <Section>
        <SectionContent maxWidth="laptop">
          <Details>
            <DateAndLocation>
              <DateSection>{startDate.toFormat('cccc, MMMM d')}</DateSection>
              <TimeSection>
                {startDate.toLocaleString(DateTime.TIME_SIMPLE)} {' - '}
                {endDate.toLocaleString(DateTime.TIME_SIMPLE)}
              </TimeSection>
            </DateAndLocation>
            <VerticalSeparator />
            <ReserveSection>
              <DesktopActionButtonSection>
                {event.currentUserReservation && (
                  <Button
                    size="large"
                    variant="contained"
                    onClick={openCancellationConfirmation}
                  >
                    {t('cancel')}
                  </Button>
                )}
                {!event.currentUserReservation && (
                  <Button
                    size="large"
                    variant="contained"
                    onClick={openReservationConfirmation}
                  >
                    {t('reserve')}
                  </Button>
                )}
              </DesktopActionButtonSection>
            </ReserveSection>
          </Details>
        </SectionContent>
      </Section>

      <MobileActionButtonSection>
        {event.currentUserReservation && (
          <Button
            fullWidth
            variant="contained"
            onClick={openCancellationConfirmation}
          >
            {t('cancel')}
          </Button>
        )}
        {!event.currentUserReservation && (
          <Button
            fullWidth
            variant="contained"
            onClick={openReservationConfirmation}
          >
            {t('reserve')}
          </Button>
        )}
      </MobileActionButtonSection>

      <EventConfirmationDialog
        open={reservationConfirmationIsOpen}
        event={event}
        onClose={closeReservationConfirmation}
        onSave={(event) => handleReservationSave(event)}
      />
      <EventReservationCancellationDialog
        open={cancellationModalIsOpen}
        event={event}
        onClose={closeCancellationConfirmation}
        onSave={(event) => handleReservationCancel(event)}
      />
    </AppShell>
  )
}
