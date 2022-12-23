import { ChangeEvent, FC, useState } from 'react'
import { Trans, useTranslation } from 'next-i18next'
import { DialogProps } from '@mui/material/Dialog'
import { DateTime } from 'luxon'
import { enqueueSnackbar } from 'notistack'

import {
  CancelSessionButton,
  CancelSessionDialogBody,
  CancelSessionDialogFooter,
  CancelSessionHeader,
  CancelSessionLabel,
  CancelSessionTypography,
  CancelDialog,
  HorizontalDivider,
  SessionTimeBox,
  SessionTimeContainer,
  CloseDialogButton,
  IconBox,
  CancellationReasonField,
} from 'components/Dialogs/CancelSessionDialog/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Session } from 'interfaces/Session'
import { SessionApi } from 'apis/SessionApi'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { User } from 'interfaces/User'
import { getUserFullName } from 'utils/user/getUserFullName'
import { Expert } from 'interfaces/Expert'
import { Link } from 'components/Link'
import { ScheduleDialogCalendarIcon } from 'icons/Calendar/ScheduleDialog'
import { ScheduleDialogClockIcon } from 'icons/Clock/ScheduleDialog'

interface CancelSessionDialogProps extends DialogProps {
  session: Session | null
  onCancellation: (session: Session) => unknown
  onRescheduling: () => unknown
}

export const CancelSessionDialog: FC<CancelSessionDialogProps> = ({
  open,
  onClose,
  session,
  onCancellation,
  onRescheduling,
  ...props
}) => {
  const { t } = useTranslation(LocaleNamespace.UpcomingSessions)
  const user = useCurrentUserAsserted()
  const displayDate = session
    ? DateTime.fromISO(session.startDate.date)
    : DateTime.now()

  const [cancellationReason, setCancellationReason] = useState('')
  const [enableCancelButton, setEnableCancelButton] = useState(false)

  let displayUser: User
  if (session) {
    const sessionConsumer = session.consumer as User
    const sessionExpert = session.expert as Expert
    displayUser =
      user.id === sessionConsumer.id ? sessionExpert.user : sessionConsumer
  } else {
    displayUser = user
  }

  const closeHandler = () => {
    if (!onClose) {
      return
    }
    setCancellationReason('')
    setEnableCancelButton(false)
    onClose({}, 'escapeKeyDown')
  }

  const handleTextFieldChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setEnableCancelButton(value !== '')
    setCancellationReason(value)
  }

  const rescheduleSession = () => {
    closeHandler()
    onRescheduling()
  }

  const cancelSession = async () => {
    const cancelRequest = await SessionApi.cancel(session?.id ?? '', {
      cancellationReason: cancellationReason,
    })
    if (cancelRequest.ok()) {
      onCancellation(await cancelRequest.getData())
      closeHandler()
      enqueueSnackbar(t('toastNotificationLabel'), { variant: 'success' })
    }
  }

  return (
    <CancelDialog open={open} onClose={onClose} maxWidth={'tablet'} {...props}>
      <CloseDialogButton onClickClose={closeHandler} />
      <CancelSessionHeader>
        <CancelSessionLabel variant="h5">
          {t('cancelSessionLabel')}
        </CancelSessionLabel>
        <CancelSessionTypography>
          {`${t('rescheduleSessionWithLabel')} ${getUserFullName(displayUser)}`}
        </CancelSessionTypography>
        <SessionTimeContainer>
          <SessionTimeBox>
            <IconBox>
              <ScheduleDialogCalendarIcon />
            </IconBox>
            <CancelSessionTypography>{`${displayDate.weekdayShort}, ${displayDate.monthShort} ${displayDate.day} ${displayDate.year}`}</CancelSessionTypography>
          </SessionTimeBox>
          <SessionTimeBox>
            <IconBox>
              <ScheduleDialogClockIcon />
            </IconBox>
            <CancelSessionTypography>
              {session &&
                `${displayDate.toFormat('hh:mm a')} - ${displayDate
                  .plus({ minutes: session.duration })
                  .toFormat('hh:mm a')} `}
            </CancelSessionTypography>
          </SessionTimeBox>
        </SessionTimeContainer>
      </CancelSessionHeader>
      <HorizontalDivider />
      <CancelSessionDialogBody>
        <CancelSessionTypography>
          {`${t('sendAMessageLabel')} ${getUserFullName(displayUser)}`}
        </CancelSessionTypography>
        <CancellationReasonField
          placeholder={t('textFieldPlaceholder')}
          multiline
          rows={4}
          fullWidth
          onChange={handleTextFieldChange}
          value={cancellationReason}
        />
        <CancelSessionTypography>
          <Trans
            t={t}
            i18nKey="cancelSessionMessage"
            components={{ l: <Link href="/terms-of-service" /> }}
          />
        </CancelSessionTypography>
      </CancelSessionDialogBody>
      <CancelSessionDialogFooter>
        <CancelSessionButton
          variant="contained"
          fullWidth
          color="secondary"
          onClick={rescheduleSession}
        >
          {t('rescheduleSessionButton')}
        </CancelSessionButton>
        <CancelSessionButton
          variant="outlined"
          fullWidth
          disabled={!enableCancelButton}
          onClick={cancelSession}
        >
          {t('cancelSessionButton')}
        </CancelSessionButton>
      </CancelSessionDialogFooter>
    </CancelDialog>
  )
}
