import { ChangeEventHandler, FC, useCallback } from 'react'
import { useTranslation } from 'next-i18next'

import {
  DurationTextField,
  NoticePeriodContainer,
  NoticePeriodSelectContainer,
  SelectLabel,
} from 'components/NoticePeriodInput/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface NoticePeriod {
  days: number
  hours: number
}

export interface NoticePeriodInputProps {
  value?: NoticePeriod
  onChange?: (noticePeriod: NoticePeriod) => unknown
  error?: boolean
}

export const NoticePeriodInput: FC<NoticePeriodInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const { t } = useTranslation(LocaleNamespace.ExpertAvailabilitySettings)

  const handleOnChange = (
    days: number | undefined,
    hours: number | undefined
  ) => {
    if (!onChange) {
      return
    }
    const newNoticePeriod: NoticePeriod = {
      days: days || 0,
      hours: hours || 0,
    }
    onChange(newNoticePeriod)
  }

  const handleDaysChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback(
    (e) => {
      const newDays = parseInt(e.target.value)
      handleOnChange(newDays, value?.hours)
    },
    [value]
  )

  const handleHoursChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback(
    (e) => {
      const newHours = parseInt(e.target.value)
      handleOnChange(value?.days, newHours)
    },
    [value]
  )

  return (
    <NoticePeriodContainer>
      <NoticePeriodSelectContainer>
        <SelectLabel>{t('noticePeriodDaysLabel')}</SelectLabel>
        <DurationTextField
          value={value?.days || '0'}
          onChange={handleDaysChange}
          type="number"
          error={error}
        />
      </NoticePeriodSelectContainer>
      <NoticePeriodSelectContainer>
        <SelectLabel>{t('noticePeriodHoursLabel')}</SelectLabel>
        <DurationTextField
          value={value?.hours || '0'}
          onChange={handleHoursChange}
          type="number"
          error={error}
        />
      </NoticePeriodSelectContainer>
    </NoticePeriodContainer>
  )
}
