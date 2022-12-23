import { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

import { Event } from 'interfaces/Event'
import { EmphasizedDialogText } from 'components/EmphasizedDialogText'
import { VerticalDialogActions } from 'components/VerticalDialogActions'
import { Button } from 'components/Button'
import { EventApi } from 'apis/EventApi'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface EventReservationCancellationDialogProps extends DialogProps {
  event?: Event
  onSave: (event: Event) => void
}

export const EventReservationCancellationDialog: FC<
  React.PropsWithChildren<EventReservationCancellationDialogProps>
> = ({ event, onClose, onSave, ...props }) => {
  const { t } = useTranslation(
    LocaleNamespace.EventReservationCancellationDialog
  )
  const refreshUserState = useRefreshUserState()
  const [isCancelling, setIsCancelling] = useState(false)
  const cancelReservation = async (): Promise<void> => {
    if (!event?.currentUserReservation) {
      return
    }
    setIsCancelling(true)
    await EventApi.cancelReservation(
      event.id,
      event.currentUserReservation as string
    )
    const newEvent = { ...event, currentUserReservation: undefined }
    refreshUserState()
    setIsCancelling(false)
    if (onSave) {
      onSave(newEvent)
    }
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <EmphasizedDialogText>
          {t('confirmCancellationModalText')}
        </EmphasizedDialogText>
      </DialogContent>
      <VerticalDialogActions>
        <Button
          state={isCancelling ? 'loading' : 'normal'}
          variant="contained"
          size="large"
          onClick={cancelReservation}
        >
          {t('confirmCancellationModalYes')}
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => onClose && onClose({}, 'backdropClick')}
        >
          {t('confirmCancellationModalNo')}
        </Button>
      </VerticalDialogActions>
    </Dialog>
  )
}
