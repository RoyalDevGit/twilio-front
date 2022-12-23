import { FC, forwardRef, ReactElement, Ref, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import CloseIcon from '@mui/icons-material/Close'
import { DialogProps } from '@mui/material/Dialog'
import { DateTime } from 'luxon'

import {
  ModalCloseButton,
  ConfirmReservationButton,
  DialogBody,
  StyledDialog,
  EventName,
  DateSection,
  TimeSection,
  EventDetails,
} from 'components/Dialogs/EventConfirmationDialog/styles'
import { Event } from 'interfaces/Event'
import { EventApi } from 'apis/EventApi'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface EventConfirmationDialogProps extends DialogProps {
  event: Event
  onSave: (event: Event) => void
}

const SlideInTransition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const EventConfirmationDialog: FC<
  React.PropsWithChildren<EventConfirmationDialogProps>
> = ({ event, onClose, onSave, ...props }) => {
  const { t } = useTranslation(LocaleNamespace.EventConfirmationDialog)
  const user = useCurrentUserAsserted()
  const [isCreatingReservation, setIsCreatingReservation] = useState(false)
  const refreshUserState = useRefreshUserState()

  const startDate = DateTime.fromISO(event.startDate.date)
  const endDate = DateTime.fromISO(event.endDate.date)

  const createReservation = async (): Promise<void> => {
    setIsCreatingReservation(true)
    await EventApi.makeReservation(event.id, { user: user.id })
    const eventResult = await EventApi.getById(event.id)
    const updatedEvent = await eventResult.getData()
    refreshUserState()
    setIsCreatingReservation(false)
    if (onSave) {
      onSave(updatedEvent)
    }
  }

  return (
    <StyledDialog transition={SlideInTransition} {...props}>
      <ModalCloseButton onClick={() => onClose && onClose({}, 'backdropClick')}>
        <CloseIcon />
      </ModalCloseButton>
      <DialogBody>
        <EventName>{event.title}</EventName>
        <EventDetails>
          <DateSection>{startDate.toFormat('cccc, MMMM d')}</DateSection>
          <TimeSection>
            {startDate.toLocaleString(DateTime.TIME_SIMPLE)} {' - '}
            {endDate.toLocaleString(DateTime.TIME_SIMPLE)}
          </TimeSection>
        </EventDetails>
        <ConfirmReservationButton
          state={isCreatingReservation ? 'loading' : 'normal'}
          fullWidth
          variant="contained"
          color="primary"
          onClick={createReservation}
        >
          {t('reserve')}
        </ConfirmReservationButton>
      </DialogBody>
    </StyledDialog>
  )
}
