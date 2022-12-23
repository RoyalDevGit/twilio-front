import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'
import { DialogProps } from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'

import {
  CloseDialogButton,
  RescheduleDialog,
  RescheduleSessionButton,
  RescheduleSessionDialogFooter,
  VerificationErrorSection,
} from 'components/Dialogs/RescheduleSessionDialog/styles'
import { RescheduleSessionStep } from 'components/Dialogs/RescheduleSessionDialog/Steps/RescheduleSessionStep'
import { RescheduleSuccessfulStep } from 'components/Dialogs/RescheduleSessionDialog/Steps/RescheduleSuccessfulStep'
import { Session } from 'interfaces/Session'
import { DialogStep } from 'interfaces/Dialog'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { User } from 'interfaces/User'
import { Expert } from 'interfaces/Expert'
import { useExpertAvailability } from 'hooks/api/expert/useExpertAvailability'
import { getUserFullName } from 'utils/user/getUserFullName'
import { SessionApi, SessionRescheduleRequest } from 'apis/SessionApi'
import { FormError } from 'components/Form/Error'

interface RescheduleSessionDialogProps extends DialogProps {
  session: Session | null
  onSessionReschedule: (session: Session) => unknown
}

type RescheduleSessionStepKey = 'rescheduleSession' | 'sessionRescheduled'

type RescheduleSessionStep = DialogStep<RescheduleSessionStepKey>

export const RescheduleSessionDialog: FC<RescheduleSessionDialogProps> = ({
  open,
  onClose,
  session,
  onSessionReschedule,
  ...props
}) => {
  const { t } = useTranslation(LocaleNamespace.UpcomingSessions)
  const user = useCurrentUserAsserted()
  const [currentStep, setCurrentStep] =
    useState<RescheduleSessionStepKey>('rescheduleSession')

  const [updating, setUpdating] = useState(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  )

  const closeHandler = () => {
    if (!onClose) {
      return
    }
    setCurrentStep('rescheduleSession')
    setUpdating(false)
    setIsButtonEnabled(false)
    setVerificationError(null)
    onClose({}, 'escapeKeyDown')
  }

  let displayUser: User
  let sessionExpert: Expert | null = null
  if (session) {
    const sessionConsumer = session.consumer as User
    sessionExpert = session.expert as Expert
    displayUser =
      user.id === sessionConsumer.id ? sessionExpert.user : sessionConsumer
  } else {
    displayUser = user
  }

  const initialFrom = DateTime.now().toUTC().startOf('day')
  const initialTo = initialFrom.plus({ months: 3 }).endOf('day')
  const expertAvailability = useExpertAvailability(sessionExpert, {
    from: initialFrom,
    to: initialTo,
    selectedDate: session
      ? DateTime.fromISO(session.startDate.date)
      : DateTime.now(),
    selectedDuration: session?.duration,
  })

  const checkDateRange = (dateChange: DateTime) => {
    if (dateChange > initialTo) {
      expertAvailability.setSelectedDate(
        dateChange.plus({ months: 3 }).endOf('day')
      )
      expertAvailability.setSelectedDuration(undefined)
      expertAvailability.setSelectedTimeSlotId(undefined)
    }
  }

  const onRescheduleDateChange = (date: DateTime) => {
    expertAvailability.setSelectedDate(date)
    expertAvailability.setSelectedTimeSlotId(undefined)
  }

  useEffect(() => {
    if (!session) {
      return
    }
    expertAvailability.setSelectedDuration(session.duration)
  }, [session])
  useEffect(
    () => setUpdating(expertAvailability.isLoading),
    [expertAvailability, expertAvailability.isLoading]
  )
  useEffect(
    () => setIsButtonEnabled(!!expertAvailability.selectedTimeSlotId),
    [expertAvailability, expertAvailability.selectedTimeSlotId]
  )

  const steps: RescheduleSessionStep[] = [
    {
      key: 'rescheduleSession',
      component: (
        <RescheduleSessionStep
          availability={expertAvailability.availability}
          date={expertAvailability.selectedDate}
          timeslot={expertAvailability.selectedTimeSlotId ?? ''}
          updating={updating}
          session={session}
          name={getUserFullName(displayUser)}
          onDateChange={onRescheduleDateChange}
          onDateRangeChange={checkDateRange}
          onTimeslotChange={expertAvailability.setSelectedTimeSlotId}
        />
      ),
      componentWidth: 'tablet',
      next: 'sessionRescheduled',
      onContinue: async () => {
        try {
          if (
            !expertAvailability.selectedDate ||
            !expertAvailability.selectedTimeSlotId
          ) {
            return false
          }
          setUpdating(true)
          const rescheduleRequest: SessionRescheduleRequest = {
            date: expertAvailability.selectedDate,
            timeSlotId: expertAvailability.selectedTimeSlotId,
          }
          const reschedule = await SessionApi.reschedule(
            session?.id ?? '',
            rescheduleRequest
          )
          if (reschedule.ok()) {
            const rescheduleResponse = await reschedule.getData()
            onSessionReschedule(rescheduleResponse)
          }
          if (!reschedule.ok()) {
            const error = await reschedule.getError()
            setVerificationError(error.message)
          }
          return reschedule.ok()
        } finally {
          setUpdating(false)
        }
      },
    },
    {
      key: 'sessionRescheduled',
      component: (
        <RescheduleSuccessfulStep
          displayUser={displayUser}
          confirmedSession={session}
        />
      ),
      componentWidth: 'tablet',
    },
  ]

  const activeStepIndex = steps.findIndex((s) => s.key === currentStep)

  const { component, componentWidth } = steps[activeStepIndex]

  const goForward = async () => {
    setVerificationError(null)
    const { next, onContinue } = steps[activeStepIndex]
    if (onContinue) {
      const shouldContinue = await onContinue()
      if (!shouldContinue) {
        return
      }
    }
    if (next) {
      setCurrentStep(next)
    }
  }

  return (
    <RescheduleDialog
      open={open}
      onClose={onClose}
      maxWidth={componentWidth}
      {...props}
    >
      <CloseDialogButton onClickClose={closeHandler} />
      {component}
      {!!verificationError && (
        <VerificationErrorSection>
          <FormError>{verificationError}</FormError>
        </VerificationErrorSection>
      )}
      {currentStep === 'rescheduleSession' && (
        <>
          <Divider />
          <RescheduleSessionDialogFooter>
            <RescheduleSessionButton
              disabled={!isButtonEnabled}
              variant="contained"
              onClick={goForward}
            >
              {t('saveButton')}
            </RescheduleSessionButton>
          </RescheduleSessionDialogFooter>
        </>
      )}
    </RescheduleDialog>
  )
}
