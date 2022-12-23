import { ChangeEvent, FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Autocomplete, {
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete'
import { AutocompleteValue } from '@mui/material/useAutocomplete'
import TextField from '@mui/material/TextField'
import { useMount } from 'react-use'

import { FormLabel } from 'components/Form/Label'
import { Button } from 'components/Button'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { TimeZoneSection } from 'components/Dialogs/TimeZoneDialog/styles'
import { getCurrentTimeZone } from 'utils/date/getCurrentTimeZone'
import { TimeZoneApi } from 'apis/TimeZoneApi'

export interface TimeZoneDialogProps extends DialogProps {
  startTimeZone?: string
  endTimeZone?: string
  allowEndTimeZone?: boolean
  allowClear?: boolean
  onSave: (startTimeZone?: string, endTimeZone?: string) => void
}

interface TimeZoneOption {
  label: string
  value: string
}

export const TimeZoneDialog: FC<TimeZoneDialogProps> = ({
  startTimeZone = getCurrentTimeZone(),
  endTimeZone = getCurrentTimeZone(),
  onClose,
  onSave,
  allowEndTimeZone = false,
  allowClear = false,
  maxWidth = 'tablet',
  ...props
}) => {
  const { t } = useTranslation(LocaleNamespace.TimeZoneDialog)
  const [startTimeZoneBuffer, setStartTimeZoneBuffer] = useState<
    string | undefined
  >(startTimeZone)
  const [endTimeZoneBuffer, setEndTimeZoneBuffer] = useState<
    string | undefined
  >(endTimeZone)
  const [separateTimeZonesBuffer, setSeparateTimeZonesBuffer] = useState(
    startTimeZone !== endTimeZone
  )
  const [timeZoneOptions, setTimeZoneOptions] = useState<TimeZoneOption[]>([])

  useMount(() => {
    const loadTimeZones = async () => {
      const timeZoneResult = await TimeZoneApi.query()
      if (!timeZoneResult.ok()) {
        return
      }
      const timeZones = await timeZoneResult.getData()
      const newTimeZoneOptions: TimeZoneOption[] = timeZones.map((tz) => {
        const simpleFormat = tz.rawFormat.split(',')[0]
        const split = simpleFormat.split(' ')
        const offset = split[0]
        const description = split.slice(1).join(' ')
        return {
          label: `(GMT${offset}) ${description}`,
          value: tz.name,
        }
      })

      setTimeZoneOptions(newTimeZoneOptions)
    }
    loadTimeZones()
  })

  const handleClose = () => {
    if (!onClose) {
      return
    }
    onClose({}, 'backdropClick')
  }

  const onSeparateTimeZonesChange = (
    _event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setSeparateTimeZonesBuffer(checked)
  }

  const handleStartTimeZoneChange = (
    _event: React.SyntheticEvent,
    option: AutocompleteValue<TimeZoneOption, false, false, false>,
    _reason: AutocompleteChangeReason
  ): void => {
    setStartTimeZoneBuffer(option?.value)
  }

  const handleEndTimeZoneChange = (
    _event: React.SyntheticEvent,
    option: AutocompleteValue<TimeZoneOption, false, false, false>,
    _reason: AutocompleteChangeReason
  ): void => {
    setEndTimeZoneBuffer(option?.value)
  }

  const handleSave = () => {
    if (separateTimeZonesBuffer) {
      onSave(startTimeZoneBuffer, endTimeZoneBuffer)
      return
    }
    onSave(startTimeZoneBuffer)
  }

  const handleRemoveTimeZones = () => {
    onSave(undefined, undefined)
  }

  return (
    <Dialog maxWidth={maxWidth} fullWidth {...props} onClose={onClose}>
      <DialogTitle>{t('timeZoneModalTitle')}</DialogTitle>
      <DialogContent>
        {allowEndTimeZone && (
          <FormControlLabel
            control={
              <Checkbox
                checked={separateTimeZonesBuffer}
                onChange={onSeparateTimeZonesChange}
              />
            }
            label={t('useSeparateTimeZones') as string}
          />
        )}

        <TimeZoneSection>
          <FormLabel variant="standard">{t('startTimeZone')}</FormLabel>
          <Autocomplete
            autoComplete
            options={timeZoneOptions}
            value={timeZoneOptions.find((o) => o.value === startTimeZoneBuffer)}
            isOptionEqualToValue={(o) => o.value === startTimeZoneBuffer}
            renderInput={(params) => <TextField {...params} />}
            onChange={handleStartTimeZoneChange}
          />
        </TimeZoneSection>

        {allowEndTimeZone && (
          <TimeZoneSection>
            <FormLabel variant="standard">{t('endTimeZone')}</FormLabel>
            <Autocomplete
              autoComplete
              options={timeZoneOptions}
              value={timeZoneOptions.find((o) => o.value === endTimeZoneBuffer)}
              isOptionEqualToValue={(o) => o.value === endTimeZoneBuffer}
              renderInput={(params) => <TextField {...params} />}
              disabled={!separateTimeZonesBuffer}
              onChange={handleEndTimeZoneChange}
            />
          </TimeZoneSection>
        )}
      </DialogContent>
      <DialogActions>
        {allowClear && (
          <Button onClick={handleRemoveTimeZones}>
            {t('removeTimeZones')}
          </Button>
        )}

        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button onClick={handleSave}>{t('save')}</Button>
      </DialogActions>
    </Dialog>
  )
}
