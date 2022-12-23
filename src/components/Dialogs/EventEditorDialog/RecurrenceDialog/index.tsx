import { ChangeEvent, FC, ReactNode, useCallback, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import InputAdornment from '@mui/material/InputAdornment'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTime } from 'luxon'
import TextField from '@mui/material/TextField'

import { FormLabel } from 'components/Form/Label'
import { Button } from 'components/Button'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  EndOptions,
  EndOptionsTable,
  EndValueCell,
  IntervalTextField,
  RecurrenceFrequency,
  WeekdayButton,
  WeekdayButtons,
  WeekdayOptions,
} from 'components/Dialogs/EventEditorDialog/RecurrenceDialog/styles'
import { EventFrequency, EventRecursion, Weekday } from 'interfaces/Event'

export interface RecurrenceDialogProps extends DialogProps {
  recursion?: EventRecursion
  onSave: (eventRecursion: EventRecursion | undefined) => void
}

type EndType = 'never' | 'until' | 'maxOccurrences'

export const RecurrenceDialog: FC<
  React.PropsWithChildren<RecurrenceDialogProps>
> = ({ recursion, onClose, onSave, ...props }) => {
  const { t } = useTranslation(LocaleNamespace.EventEditorDialog)
  const [frequencyBuffer, setFrequencyBuffer] = useState(
    recursion?.frequency || EventFrequency.Weekly
  )
  let initialEndType: EndType = 'never'
  if (recursion?.endDate) {
    initialEndType = 'until'
  } else if (recursion?.maxOccurrences) {
    initialEndType = 'maxOccurrences'
  }
  const [intervalBuffer, setIntervalBuffer] = useState(recursion?.interval || 1)
  const [weekdaysBuffer, setWeekdaysBuffer] = useState<Weekday[]>(
    recursion?.weekdays || []
  )
  const [maxOccurrences, setMaxOccurrences] = useState(
    recursion?.maxOccurrences || 13
  )
  const [endDate, setEndDate] = useState<string | undefined>(recursion?.endDate)
  const [endType, setEndType] = useState<EndType>(initialEndType)

  const handleClose = () => {
    if (!onClose) {
      return
    }
    onClose({}, 'backdropClick')
  }

  const onFrequencyChange = (
    event: SelectChangeEvent<EventFrequency>,
    _child: ReactNode
  ): void => {
    setFrequencyBuffer(event.target.value as EventFrequency)
  }

  const onIntervalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIntervalBuffer(+e.currentTarget.value)
  }

  const toggleWeekdaySelection = (weekdayClicked: Weekday) => {
    const exists = weekdaysBuffer.some((w) => w === weekdayClicked)
    if (exists) {
      setWeekdaysBuffer(weekdaysBuffer.filter((w) => w !== weekdayClicked))
    } else {
      setWeekdaysBuffer([...weekdaysBuffer, weekdayClicked])
    }
  }

  const handleEndDateChange = (date: DateTime | null) => {
    setEndDate(date?.toISO())
  }

  const handleMaxOccurrencesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxOccurrences(+e.currentTarget.value)
  }

  const setEndTypeAndFocus = (
    event: React.MouseEvent<HTMLElement>,
    endType: EndType
  ) => {
    const target = event.target as HTMLElement
    setEndType(endType)
    setTimeout(() => {
      target.focus()
    }, 1)
  }

  const handleRecursionRemoval = () => {
    onSave(undefined)
  }

  const handleSave = useCallback(() => {
    let newRecursion: EventRecursion
    switch (frequencyBuffer) {
      case EventFrequency.Daily:
        newRecursion = {
          frequency: frequencyBuffer,
          interval: intervalBuffer,
        }
        break
      case EventFrequency.Weekly:
        newRecursion = {
          frequency: frequencyBuffer,
          interval: intervalBuffer,
          weekdays: weekdaysBuffer,
        }
        break
      case EventFrequency.Monthly:
        newRecursion = {
          frequency: frequencyBuffer,
          interval: intervalBuffer,
        }
        break
      case EventFrequency.Yearly:
        newRecursion = {
          frequency: frequencyBuffer,
          interval: intervalBuffer,
        }
        break
      default:
        return
    }

    switch (endType) {
      case 'maxOccurrences':
        newRecursion.maxOccurrences = maxOccurrences
        break
      case 'until':
        newRecursion.endDate = endDate
        break
    }
    onSave(newRecursion)
  }, [
    frequencyBuffer,
    intervalBuffer,
    weekdaysBuffer,
    maxOccurrences,
    endDate,
    endType,
  ])

  return (
    <Dialog maxWidth="mobileS" fullWidth {...props} onClose={onClose}>
      <DialogTitle>{t('recurrenenceModalTitle')}</DialogTitle>
      <DialogContent>
        <RecurrenceFrequency>
          <FormLabel variant="standard">{t('repeatEvery')}</FormLabel>
          <IntervalTextField
            type="number"
            InputProps={{ inputProps: { min: 1 } }}
            variant="outlined"
            fullWidth
            value={intervalBuffer}
            onChange={onIntervalChange}
          />
          <Select value={frequencyBuffer} onChange={onFrequencyChange}>
            <MenuItem value={EventFrequency.Daily}>{t('day')}</MenuItem>
            <MenuItem value={EventFrequency.Weekly}>{t('week')}</MenuItem>
            <MenuItem value={EventFrequency.Monthly}>{t('month')}</MenuItem>
            <MenuItem value={EventFrequency.Yearly}>{t('year')}</MenuItem>
          </Select>
        </RecurrenceFrequency>
        {frequencyBuffer === EventFrequency.Weekly && (
          <WeekdayOptions>
            <FormLabel variant="standard">{t('weekRepeatOn')}</FormLabel>
            <WeekdayButtons>
              <WeekdayButton
                selected={weekdaysBuffer.includes(Weekday.Sunday)}
                onClick={() => toggleWeekdaySelection(Weekday.Sunday)}
              >
                {t('sundayWeekdayAbbrv')}
              </WeekdayButton>
              <WeekdayButton
                selected={weekdaysBuffer.includes(Weekday.Monday)}
                onClick={() => toggleWeekdaySelection(Weekday.Monday)}
              >
                {t('mondayWeekdayAbbrv')}
              </WeekdayButton>
              <WeekdayButton
                selected={weekdaysBuffer.includes(Weekday.Tuesday)}
                onClick={() => toggleWeekdaySelection(Weekday.Tuesday)}
              >
                {t('tuesdayWeekdayAbbrv')}
              </WeekdayButton>
              <WeekdayButton
                selected={weekdaysBuffer.includes(Weekday.Wednesday)}
                onClick={() => toggleWeekdaySelection(Weekday.Wednesday)}
              >
                {t('wednesdayWeekdayAbbrv')}
              </WeekdayButton>
              <WeekdayButton
                selected={weekdaysBuffer.includes(Weekday.Thursday)}
                onClick={() => toggleWeekdaySelection(Weekday.Thursday)}
              >
                {t('thursdayWeekdayAbbrv')}
              </WeekdayButton>
              <WeekdayButton
                selected={weekdaysBuffer.includes(Weekday.Friday)}
                onClick={() => toggleWeekdaySelection(Weekday.Friday)}
              >
                {t('fridayWeekdayAbbrv')}
              </WeekdayButton>
              <WeekdayButton
                selected={weekdaysBuffer.includes(Weekday.Saturday)}
                onClick={() => toggleWeekdaySelection(Weekday.Saturday)}
              >
                {t('saturdayWeekdayAbbrv')}
              </WeekdayButton>
            </WeekdayButtons>
          </WeekdayOptions>
        )}
        <EndOptions>
          <FormLabel variant="standard">{t('ends')}</FormLabel>
          <EndOptionsTable>
            <tbody>
              <tr>
                <td>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={endType === 'never'}
                        onClick={() => setEndType('never')}
                      />
                    }
                    label={t('neverEnds') as string}
                  />
                </td>
                <td />
              </tr>
              <tr>
                <td>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={endType === 'until'}
                        onClick={() => setEndType('until')}
                      />
                    }
                    label={t('endsOn') as string}
                  />
                </td>
                <EndValueCell onClick={(e) => setEndTypeAndFocus(e, 'until')}>
                  <DatePicker
                    disabled={endType !== 'until'}
                    value={endDate}
                    onChange={handleEndDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </EndValueCell>
              </tr>
              <tr>
                <td>
                  <FormControlLabel
                    control={
                      <Radio
                        checked={endType === 'maxOccurrences'}
                        onClick={() => setEndType('maxOccurrences')}
                      />
                    }
                    label={t('endsAfter') as string}
                  />
                </td>
                <EndValueCell>
                  <TextField
                    disabled={endType !== 'maxOccurrences'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {t('maxOccurrences')}
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    value={maxOccurrences}
                    onChange={handleMaxOccurrencesChange}
                    onClick={(e) => setEndTypeAndFocus(e, 'maxOccurrences')}
                  />
                </EndValueCell>
              </tr>
            </tbody>
          </EndOptionsTable>
        </EndOptions>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRecursionRemoval}>{t('removeRecursion')}</Button>
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button onClick={handleSave}>{t('save')}</Button>
      </DialogActions>
    </Dialog>
  )
}
