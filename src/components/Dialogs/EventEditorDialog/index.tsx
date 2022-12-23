import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import CloseIcon from '@mui/icons-material/Close'
import { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Controller, useForm } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { DateTime, Duration } from 'luxon'
import isEmpty from 'lodash/isEmpty'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'

import { FormLabel } from 'components/Form/Label'
import { ResponsiveDialog } from 'components/ResponsiveDialog'
import { Button } from 'components/Button'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ModalCloseButton,
  AllDayAndRecursion,
  DateTimeSection,
  DateBox,
  TimeBox,
  ToLabel,
  DateTimeBlock,
  DateTimeAndTimeZone,
  TimeZone,
} from 'components/Dialogs/EventEditorDialog/styles'
import { RecurrenceDialog } from 'components/Dialogs/EventEditorDialog/RecurrenceDialog'
import { TimeZoneDialog } from 'components/Dialogs/TimeZoneDialog'
import { Event, EventRecursion } from 'interfaces/Event'
import { getCurrentTimeZone } from 'utils/date/getCurrentTimeZone'
import { getRecursionText } from 'utils/date/recursion/getRRuleFromRecursion'

type FormData = {
  title: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
}

export interface EventConfirmationDialogProps extends DialogProps {
  event?: Partial<Event>
  onSave: (event: Partial<Event>) => void
}

export const EventEditorDialog: FC<
  React.PropsWithChildren<EventConfirmationDialogProps>
> = ({ event, onClose, onSave, ...props }) => {
  const { t } = useTranslation(LocaleNamespace.EventEditorDialog)
  const [isTimeZoneDialogOpen, setIsTimeZoneDialogOpen] = useState(false)
  const [isRecurrenceDialogOpen, setIsRecurrenceDialogOpen] = useState(false)
  const [recursionText, setRecursionText] = useState('')
  const [allDay, setAllDay] = useState(Boolean(event?.allDay))
  const [recursion, setRecursion] = useState(event?.recursion)

  let startDate: DateTime
  let endDate: DateTime

  if (event?.startDate) {
    startDate = DateTime.fromISO(event.startDate.date, {
      zone: event.startDate.timeZone,
    })
  } else {
    startDate = DateTime.now()
  }
  if (event?.endDate) {
    endDate = DateTime.fromISO(event.endDate.date, {
      zone: event.endDate.timeZone,
    })
  } else {
    endDate = DateTime.now()
  }

  const [startTimeZone, setStartTimeZone] = useState<string | undefined>(
    event?.startDate?.timeZone
  )
  const [endTimeZone, setEndTimeZone] = useState<string | undefined>(
    event?.startDate?.timeZone
  )

  const defaultValues = {
    title: event?.title,
    description: event?.description,
    startDate: startDate.toISO(),
    endDate: endDate.toISO(),
    startTime: startDate.toLocaleString(DateTime.TIME_24_WITH_SECONDS),
    endTime: endDate.toLocaleString(DateTime.TIME_24_WITH_SECONDS),
  }

  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: defaultValues,
  })

  const closeHandler = () => {
    if (!onClose) {
      return
    }
    onClose({}, 'backdropClick')
  }

  const handleTimeZoneSave = (startTimeZone?: string, endTimeZone?: string) => {
    setStartTimeZone(startTimeZone)
    setEndTimeZone(endTimeZone)
    closeTimeZoneDialog()
  }

  const onSubmit = handleSubmit(
    async ({
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
    }: FormData) => {
      const finalStartTimeZone = startTimeZone
      let finalEndTimeZone = endTimeZone
      if (recursion) {
        finalEndTimeZone = startTimeZone
      }

      let startDateTime: DateTime
      let endDateTime: DateTime
      if (allDay) {
        startDateTime = DateTime.fromISO(startDate).startOf('day')
        endDateTime = DateTime.fromISO(endDate).startOf('day')
      } else {
        startDateTime = DateTime.fromISO(startDate)
          .startOf('day')
          .plus(Duration.fromISOTime(startTime))
        endDateTime = DateTime.fromISO(endDate)
          .startOf('day')
          .plus(Duration.fromISOTime(endTime))
      }

      let updatedEvent: Partial<Event> = {
        title,
        description,
        allDay,
        startDate: {
          date: startDateTime.setZone(finalStartTimeZone).toUTC().toISO(),
          timeZone: finalStartTimeZone || getCurrentTimeZone(),
        },
        endDate: {
          date: endDateTime.setZone(finalEndTimeZone).toUTC().toISO(),
          timeZone: finalEndTimeZone || getCurrentTimeZone(),
        },
        recursion,
      }

      if (event) {
        updatedEvent = { ...event, ...updatedEvent }
      }

      onSave(updatedEvent)
    }
  )

  const openTimeZoneDialog = () => {
    setIsTimeZoneDialogOpen(true)
  }

  const closeTimeZoneDialog = () => {
    setIsTimeZoneDialogOpen(false)
  }

  const openRecurrenceDialog = () => {
    setIsRecurrenceDialogOpen(true)
  }

  const closeRecurrenceDialog = () => {
    setIsRecurrenceDialogOpen(false)
  }

  const handleAllDayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAllDay(event.target.checked)
  }

  const handleRecursionSave = (eventRecursion?: EventRecursion) => {
    setRecursion(eventRecursion)
    closeRecurrenceDialog()
  }

  useEffect(() => {
    if (!recursion) {
      setRecursionText(t('recurrenenceButton'))
      return
    }
    const newRecursionText = getRecursionText(recursion)
    setRecursionText(newRecursionText)
  }, [recursion])

  let prettyStartTimeZone = ''
  let prettyEndTimeZone = ''
  if (!allDay) {
    if (startTimeZone) {
      prettyStartTimeZone = startTimeZone
    }

    if (!recursion && (endTimeZone || startTimeZone)) {
      prettyEndTimeZone = (endTimeZone || startTimeZone) as string
    }
  }

  return (
    <ResponsiveDialog {...props} onClose={onClose}>
      <form noValidate onSubmit={onSubmit} autoComplete="off">
        <DialogTitle id="event-editor-titlebar">
          <FormLabel required>{t('titleLabel')}</FormLabel>
          <TextField
            type="text"
            variant="outlined"
            fullWidth
            placeholder={t('titlePlaceholder')}
            {...register('title', {
              required: true,
            })}
          />
          <ModalCloseButton onClick={closeHandler}>
            <CloseIcon />
          </ModalCloseButton>
        </DialogTitle>
        <DialogContent dividers>
          <DateTimeSection>
            <DateTimeAndTimeZone>
              <DateTimeBlock>
                <DateBox>
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    )}
                  />
                </DateBox>
                {!allDay && (
                  <TimeBox>
                    <TextField
                      type="time"
                      inputProps={{
                        step: 300,
                      }}
                      {...register('startTime', {
                        required: true,
                      })}
                    />
                  </TimeBox>
                )}

                <ToLabel>{t('to')}</ToLabel>
              </DateTimeBlock>
              {prettyStartTimeZone && (
                <TimeZone variant="caption">{prettyStartTimeZone}</TimeZone>
              )}
            </DateTimeAndTimeZone>
            <DateTimeAndTimeZone>
              <DateTimeBlock>
                <DateBox>
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={(e) => field.onChange(e)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    )}
                  />
                </DateBox>
                {!allDay && (
                  <TimeBox>
                    <TextField
                      type="time"
                      inputProps={{
                        step: 300,
                      }}
                      {...register('endTime', {
                        required: true,
                      })}
                    />
                  </TimeBox>
                )}
              </DateTimeBlock>
              {prettyEndTimeZone && (
                <TimeZone variant="caption">{prettyEndTimeZone}</TimeZone>
              )}
            </DateTimeAndTimeZone>
            {!allDay && (
              <Button onClick={openTimeZoneDialog}>{t('timeZone')}</Button>
            )}
          </DateTimeSection>
          <AllDayAndRecursion>
            <FormControlLabel
              control={
                <Checkbox checked={allDay} onChange={handleAllDayChange} />
              }
              label={t('allDay') as string}
            />
            <Button onClick={openRecurrenceDialog}>{recursionText}</Button>
          </AllDayAndRecursion>
          <FormLabel>{t('descriptionLabel')}</FormLabel>
          <TextField
            type="text"
            multiline
            minRows={6}
            variant="outlined"
            fullWidth
            placeholder={t('descriptionPlaceholder')}
            {...register('description')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler}>{t('cancel')}</Button>
          <Button type="submit">{t('save')}</Button>
        </DialogActions>
      </form>

      <RecurrenceDialog
        recursion={recursion}
        open={isRecurrenceDialogOpen}
        onClose={closeRecurrenceDialog}
        onSave={handleRecursionSave}
      />

      <TimeZoneDialog
        fullWidth
        startTimeZone={startTimeZone}
        endTimeZone={endTimeZone}
        allowEndTimeZone={isEmpty(recursion)}
        open={isTimeZoneDialogOpen}
        onClose={closeTimeZoneDialog}
        onSave={handleTimeZoneSave}
      />
    </ResponsiveDialog>
  )
}
