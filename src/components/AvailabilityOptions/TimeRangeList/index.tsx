import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import Checkbox from '@mui/material/Checkbox'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  AddAnotherTimeContainer,
  AddAnotherTimeButton,
  TimeRangeSection,
  TimeRangeOptions,
  ApplyTimesLabel,
  MainContainer,
} from 'components/AvailabilityOptions/styles'
import {
  AvailabilityTimeRangeBuffer,
  TimeRangeOption,
} from 'components/AvailabilityOptions/TimeRangeList/TimeRangeOption'
import { PlusIcon } from 'icons/Plus'
import { TimeRangeError } from 'hooks/api/expert/useEditableAvailabilityOptions'

type TimeChangeEvent = (
  timeRangeToUpdate: AvailabilityTimeRangeBuffer,
  newTime: string | null
) => unknown

interface TimeRangeListProps {
  value?: AvailabilityTimeRangeBuffer[]
  onAdd?: () => unknown
  onDelete?: (timeRange: AvailabilityTimeRangeBuffer) => unknown
  onStartTimeChange?: TimeChangeEvent
  onEndTimeChange?: TimeChangeEvent
  errors?: TimeRangeError[]
  onApplyToAll: () => unknown
  applyTimesChecked?: boolean
}

export const TimeRangeList: FC<TimeRangeListProps> = ({
  value,
  onAdd,
  onDelete,
  onStartTimeChange,
  onEndTimeChange,
  errors,
  onApplyToAll,
  applyTimesChecked,
}) => {
  const { t } = useTranslation([LocaleNamespace.ExpertAvailabilitySettings])

  const handleDelete = (timeRangeToUpdate: AvailabilityTimeRangeBuffer) => {
    if (!onDelete) {
      return
    }
    onDelete(timeRangeToUpdate)
  }

  const handleApplyToAll = () => {
    onApplyToAll()
  }

  const handleStartTimeChange = (
    timeRangeToUpdate: AvailabilityTimeRangeBuffer,
    newTime: string | null
  ) => {
    if (!onStartTimeChange) {
      return
    }
    onStartTimeChange(timeRangeToUpdate, newTime)
  }

  const handleEndTimeChange = (
    timeRangeToUpdate: AvailabilityTimeRangeBuffer,
    newTime: string | null
  ) => {
    if (!onEndTimeChange) {
      return
    }
    onEndTimeChange(timeRangeToUpdate, newTime)
  }

  return (
    <MainContainer>
      <TimeRangeSection>
        <TimeRangeOptions>
          {!!value &&
            value.map((range) => {
              const error = errors?.find((e) => {
                if (range.tempId) {
                  return range.tempId === e.range.tempId
                }
                if (range.id) {
                  return range.id === e.range.id
                }
                return false
              })?.message
              return (
                <TimeRangeOption
                  key={range.id || range.tempId}
                  range={range}
                  onStartTimeChange={(time) =>
                    handleStartTimeChange(range, time)
                  }
                  onEndTimeChange={(time) => handleEndTimeChange(range, time)}
                  onDelete={() => handleDelete(range)}
                  error={error}
                />
              )
            })}
        </TimeRangeOptions>
        <AddAnotherTimeContainer>
          <AddAnotherTimeButton
            variant="text"
            startIcon={<PlusIcon invertColor />}
            onClick={onAdd}
          >
            {value && value.length > 0
              ? t('addAnotherTimeLabel')
              : t('addATimeLabel')}
          </AddAnotherTimeButton>
        </AddAnotherTimeContainer>
      </TimeRangeSection>
      {value && value.length > 0 && (
        <ApplyTimesLabel
          label={t('applyTheseTimesLabel')}
          control={
            <Checkbox checked={applyTimesChecked} onChange={handleApplyToAll} />
          }
        />
      )}
    </MainContainer>
  )
}
