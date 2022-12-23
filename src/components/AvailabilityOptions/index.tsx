import { useTranslation } from 'next-i18next'
import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { useMount } from 'react-use'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  AvailabilityTable,
  AvailabilityTableRow,
  DaysOfTheWeek,
  DaysContainer,
  SwitchContainerBox,
  CustomAccordion,
  ExpandAccordionIcon,
} from 'components/AvailabilityOptions/styles'
import { AvailabilityTimeRangeBuffer } from 'components/AvailabilityOptions/TimeRangeList/TimeRangeOption'
import { Switch } from 'components/Switch'
import { AvailabilityOption } from 'interfaces/AvailabilityOption'
import { Weekday } from 'interfaces/Event'
import { TimeRangeList } from 'components/AvailabilityOptions/TimeRangeList'
import {
  AvailabilityOptionError,
  TimeRangeError,
} from 'hooks/api/expert/useEditableAvailabilityOptions'
import { getEnumValues } from 'utils/enum/enumUtils'

export interface AvailabilityOptionBuffer
  extends Omit<AvailabilityOption, 'ranges'> {
  tempId?: string
  ranges: AvailabilityTimeRangeBuffer[]
}

type TimeChangeEvent = (
  weekday: Weekday,
  timeRangeToUpdate: AvailabilityTimeRangeBuffer,
  newTime: string | null
) => unknown
interface AvailabilityOptionsProps {
  value: Partial<AvailabilityOptionBuffer>[]
  onApplyToAll: (weekday: Weekday) => unknown
  onWeekdayToggle?: (weekday: Weekday, enabled: boolean) => unknown
  onTimeRangeAdd?: (weekday: Weekday) => unknown
  onTimeRangeDelete?: (
    weekday: Weekday,
    timeRangeToDelete: AvailabilityTimeRangeBuffer
  ) => unknown
  onEndTimeChange?: TimeChangeEvent
  onStartTimeChange?: TimeChangeEvent
  errors?: AvailabilityOptionError[]
}

export const AvailabilityOptions: FC<AvailabilityOptionsProps> = ({
  value,
  onApplyToAll,
  onWeekdayToggle,
  onTimeRangeAdd,
  onTimeRangeDelete,
  onEndTimeChange,
  onStartTimeChange,
  errors,
}) => {
  const { t } = useTranslation([LocaleNamespace.ExpertAvailabilitySettings])
  const [applyAllWeekday, setApplyAllWeekday] = useState<Weekday | undefined>()
  const [expandedStatus, setExpandedStatus] = useState<
    Record<Weekday, boolean>
  >({
    [Weekday.Monday]: false,
    [Weekday.Tuesday]: false,
    [Weekday.Wednesday]: false,
    [Weekday.Thursday]: false,
    [Weekday.Friday]: false,
    [Weekday.Saturday]: false,
    [Weekday.Sunday]: false,
  })

  useMount(() => {
    const newExpandStatus = {} as Record<Weekday, boolean>
    value.forEach((option) => {
      if (!option.weekday) {
        return
      }
      newExpandStatus[option.weekday] = !!option.enabled
    })
    setExpandedStatus(newExpandStatus)
  })

  const handleToggle = (weekday: Weekday, e: ChangeEvent<HTMLInputElement>) => {
    setApplyAllWeekday(undefined)
    if (!onWeekdayToggle) {
      return
    }
    onWeekdayToggle(weekday, e.currentTarget.checked)
  }

  const handleOnAdd = (weekday: Weekday) => {
    setApplyAllWeekday(undefined)
    if (!onTimeRangeAdd) {
      return
    }
    onTimeRangeAdd(weekday)
  }

  const handleOnDelete = (
    weekday: Weekday,
    timeRange: AvailabilityTimeRangeBuffer
  ) => {
    setApplyAllWeekday(undefined)
    if (!onTimeRangeDelete) {
      return
    }
    onTimeRangeDelete(weekday, timeRange)
  }

  const handleStartTimeChange: TimeChangeEvent = (weekday, timeRange, time) => {
    setApplyAllWeekday(undefined)
    if (!onStartTimeChange) {
      return
    }
    onStartTimeChange(weekday, timeRange, time)
  }

  const handleEndTimeChange: TimeChangeEvent = (weekday, timeRange, time) => {
    setApplyAllWeekday(undefined)
    if (!onEndTimeChange) {
      return
    }
    onEndTimeChange(weekday, timeRange, time)
  }

  const handleSwitchClick = (
    e: MouseEvent<HTMLButtonElement>,
    option: Partial<AvailabilityOptionBuffer> | undefined
  ) => {
    if (!option?.weekday) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isEnabling = e.target.checked
    const isExpanded = expandedStatus[option.weekday]
    if (isEnabling && !isExpanded) {
      // do not stop propagation
      return
    }
    if (!isEnabling && isExpanded) {
      // do not stop propagation
      return
    }
    e.stopPropagation()
  }

  const handleAccordionClick = (
    option: Partial<AvailabilityOptionBuffer> | undefined
  ) => {
    if (!option?.weekday) {
      return
    }
    setExpandedStatus({
      ...expandedStatus,
      [option.weekday]: !expandedStatus[option.weekday],
    })
  }

  const timeRangeErrors = {} as Record<Weekday, TimeRangeError[]>
  errors?.forEach((e) => {
    if (!e.option.weekday || !e.timeRangeErrors) {
      return
    }
    if (!timeRangeErrors[e.option.weekday]) {
      timeRangeErrors[e.option.weekday] = []
    }
    timeRangeErrors[e.option.weekday] = [
      ...timeRangeErrors[e.option.weekday],
      ...e.timeRangeErrors,
    ]
  })

  const handleApplyToAll = (weekday: Weekday) => {
    setApplyAllWeekday(weekday)
    if (onApplyToAll) {
      onApplyToAll(weekday)
    }
  }

  return (
    <AvailabilityTable>
      {getEnumValues(Weekday).map((weekdayValue) => {
        const weekday = weekdayValue as Weekday
        const option = value.find((o) => o.weekday === weekday)
        let dayLabel = ''
        switch (weekday) {
          case Weekday.Monday:
            dayLabel = t('dayMonday')
            break
          case Weekday.Tuesday:
            dayLabel = t('dayTuesday')
            break
          case Weekday.Wednesday:
            dayLabel = t('dayWednesday')
            break
          case Weekday.Thursday:
            dayLabel = t('dayThursday')
            break
          case Weekday.Friday:
            dayLabel = t('dayFriday')
            break
          case Weekday.Saturday:
            dayLabel = t('daySaturday')
            break
          case Weekday.Sunday:
            dayLabel = t('daySunday')
            break
        }
        return (
          <AvailabilityTableRow key={weekday}>
            <CustomAccordion expanded={expandedStatus[weekday]}>
              <AccordionSummary
                expandIcon={<ExpandAccordionIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => handleAccordionClick(option)}
              >
                <SwitchContainerBox>
                  <Switch
                    checked={!!option?.enabled}
                    onChange={(e) => handleToggle(weekday, e)}
                    onClick={(e) => handleSwitchClick(e, option)}
                  />
                  <DaysOfTheWeek>{dayLabel}</DaysOfTheWeek>
                </SwitchContainerBox>
              </AccordionSummary>
              <AccordionDetails>
                <DaysContainer>
                  <TimeRangeList
                    value={option?.ranges}
                    onAdd={() => handleOnAdd(weekday)}
                    onDelete={(timeRange) => handleOnDelete(weekday, timeRange)}
                    onStartTimeChange={(timeRange, time) =>
                      handleStartTimeChange(weekday, timeRange, time)
                    }
                    onEndTimeChange={(timeRange, time) =>
                      handleEndTimeChange(weekday, timeRange, time)
                    }
                    errors={timeRangeErrors[weekday]}
                    onApplyToAll={() => handleApplyToAll(weekday)}
                    applyTimesChecked={applyAllWeekday === weekday}
                  />
                </DaysContainer>
              </AccordionDetails>
            </CustomAccordion>
          </AvailabilityTableRow>
        )
      })}
    </AvailabilityTable>
  )
}
