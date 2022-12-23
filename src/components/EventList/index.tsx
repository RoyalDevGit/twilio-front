import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DateTime } from 'luxon'
import urlJoin from 'proper-url-join'

import { Link } from 'components/Link'
import { EventReservationCancellationDialog } from 'components/Dialogs/EventReservationCancellationDialog'
import { Event } from 'interfaces/Event'
import {
  EventListContainer,
  DesktopDateDetails,
  TimesSection,
  DateSection,
  EventTypeAndLabel,
  EventLabel,
  MobileDate,
  ActionSection,
  EventGrid,
  EventNameDetails,
} from 'components/EventList/styles'
import { Button } from 'components/Button'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

interface Props {
  events: Event[]
  action?: 'view' | 'cancel'
}

export const EventList: FC<React.PropsWithChildren<Props>> = ({
  events,
  action = 'view',
}) => {
  const { t } = useTranslation(LocaleNamespace.EventList)
  const [eventToCancel, setEventToCancel] = useState<Event | undefined>()

  const openCancellationConfirmation = (event: Event): void => {
    setEventToCancel(event)
  }

  const closeCancellationConfirmation = () => {
    setEventToCancel(undefined)
  }

  const handleReservationCancel = (_event: Event) => {
    closeCancellationConfirmation()
  }

  return (
    <EventListContainer>
      {events.map((event) => {
        const startDate = DateTime.fromISO(event.startDate.date)
        const endDate = DateTime.fromISO(event.endDate.date)

        return (
          <EventGrid key={event.id}>
            <DesktopDateDetails>
              <DateSection>
                {startDate.toLocaleString(DateTime.DATE_SHORT)}
              </DateSection>
              <TimesSection>
                {startDate.toLocaleString(DateTime.TIME_SIMPLE)} {' - '}
                {endDate.toLocaleString(DateTime.TIME_SIMPLE)}
              </TimesSection>
            </DesktopDateDetails>
            <EventNameDetails>
              <EventTypeAndLabel>
                <EventLabel>{event.title}</EventLabel>
                <MobileDate>
                  {startDate.toFormat('MMMM d, yyyy • h:mm a')}
                </MobileDate>
              </EventTypeAndLabel>
            </EventNameDetails>
            <ActionSection>
              {action === 'view' && (
                <Link
                  href={urlJoin(
                    '/events',
                    (event.parentEvent || event.id) as string
                  )}
                >
                  <Button variant="contained">
                    {event.currentUserReservation ? t('view') : t('reserve')}
                  </Button>
                </Link>
              )}

              {action === 'cancel' && event.currentUserReservation && (
                <Button
                  variant="contained"
                  onClick={() => openCancellationConfirmation(event)}
                >
                  {t('cancel')}
                </Button>
              )}
            </ActionSection>
          </EventGrid>
        )
      })}
      <EventReservationCancellationDialog
        open={Boolean(eventToCancel)}
        event={eventToCancel}
        onClose={closeCancellationConfirmation}
        onSave={(event) => handleReservationCancel(event)}
      />
    </EventListContainer>
  )
}
