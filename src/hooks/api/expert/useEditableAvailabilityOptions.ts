import { useCallback, useState } from 'react'

import { AvailabilityTimeRangeBuffer } from 'components/AvailabilityOptions/TimeRangeList/TimeRangeOption'
import { AvailabilityOption } from 'interfaces/AvailabilityOption'
import { Weekday } from 'interfaces/Event'
import { ExpertApi } from 'apis/ExpertApi'
import { Expert } from 'interfaces/Expert'
import { AvailabilityOptionBuffer } from 'components/AvailabilityOptions'
import { getUuid } from 'utils/uuid/getUuid'

export interface TimeRangeError {
  range: AvailabilityTimeRangeBuffer
  message: string
}

export interface AvailabilityOptionError {
  option: Partial<AvailabilityOptionBuffer>
  message?: string
  timeRangeErrors?: TimeRangeError[]
}

interface ValidationResult {
  isValid: boolean
  error?: AvailabilityOptionError
}

export interface UseEditableAvailabilityOptionsProps {
  expert: Expert
  initialValue: Partial<AvailabilityOption>[]
  onSave?: () => unknown
}

export const useEditableAvailabilityOptions = ({
  expert,
  initialValue,
  onSave,
}: UseEditableAvailabilityOptionsProps) => {
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<AvailabilityOptionError[]>([])
  const [value, setValue] = useState<Partial<AvailabilityOptionBuffer>[]>(
    initialValue || []
  )

  const validateOption = (
    option: Partial<AvailabilityOptionBuffer>
  ): ValidationResult => {
    const timeRangeErrors: TimeRangeError[] = []
    const ranges = option.ranges?.slice(0).reverse()
    if (ranges) {
      ranges.forEach((range, index) => {
        const otherOptions = ranges.slice(index + 1).filter((r) => r !== range)
        const foundDuplicate = otherOptions.find(
          (r) => range.startTime === r.startTime && range.endTime === r.endTime
        )
        if (foundDuplicate) {
          timeRangeErrors.push({
            range,
            message: "Error: You've already selected this timeframe",
          })
          return
        }
        if (!range.startTime || !range.endTime) {
          timeRangeErrors.push({
            range,
            message: 'Please specify both start and end times',
          })
          return
        }
      })
    }

    if (timeRangeErrors.length) {
      return {
        isValid: false,
        error: {
          option,
          timeRangeErrors,
        },
      }
    }

    return { isValid: true }
  }

  const filterErrorsByOption = (
    errors: AvailabilityOptionError[],
    option: Partial<AvailabilityOptionBuffer>
  ) =>
    // remove any errors related to this option
    errors.filter((e) => {
      if (option.tempId) {
        return e.option.tempId !== option.tempId
      }
      if (option.id) {
        return e.option.id !== option.id
      }
      return true
    })

  const saveAvailabilityOption = useCallback(
    async (option: Partial<AvailabilityOptionBuffer>) => {
      const { error } = validateOption(option)
      const filteredErrors = filterErrorsByOption(errors, option)
      if (error) {
        setErrors([...filteredErrors, error])
        return
      }
      try {
        setSaving(true)
        const result = await ExpertApi.saveAvailabilityOption(
          expert.id,
          option as Partial<AvailabilityOption>
        )
        if (!result.ok()) {
          const error = await result.getError()
          setErrors([...filteredErrors, { option, message: error.message }])
          return
        }
        const savedOption = await result.getData()
        setValue((value) =>
          value.map((o) => {
            if (o.weekday === savedOption.weekday) {
              return savedOption
            }
            return o
          })
        )
        if (onSave) {
          onSave()
        }
      } finally {
        setSaving(false)
      }
    },
    [value, errors]
  )

  const onWeekdayToggle = useCallback(
    async (weekday: Weekday, enabled: boolean) => {
      const option = value.find((o) => o.weekday === weekday)
      let optionToSave: Partial<AvailabilityOptionBuffer>
      if (option) {
        optionToSave = {
          ...option,
          enabled,
        }
        setValue(
          value.map((o) => {
            if (o === option) {
              return optionToSave
            }
            return o
          })
        )
      } else {
        optionToSave = {
          tempId: getUuid(),
          weekday,
          enabled,
        }
        setValue([...value, optionToSave])
      }

      await saveAvailabilityOption(optionToSave)
    },
    [value]
  )

  const onTimeRangeAdd = useCallback(
    (weekday: Weekday) => {
      const option = value.find((o) => o.weekday === weekday)
      if (!option) {
        setValue([
          ...value,
          {
            weekday,
            ranges: [
              {
                tempId: getUuid(),
                startTime: '',
                endTime: '',
              },
            ],
          },
        ])
        return
      }
      setValue(
        value.map((o) => {
          if (o === option) {
            return {
              ...option,
              ranges: [
                ...(option.ranges || []),
                {
                  tempId: getUuid(),
                  startTime: '',
                  endTime: '',
                },
              ],
            }
          }
          return o
        })
      )
    },
    [value]
  )

  const onTimeRangeDelete = useCallback(
    (weekday: Weekday, timeRangeToDelete: AvailabilityTimeRangeBuffer) => {
      const option = value.find((o) => o.weekday === weekday)
      if (!option) {
        return
      }
      const updatedOption = {
        ...option,
        ranges: option.ranges?.filter((r) => r !== timeRangeToDelete),
      }
      setValue(
        value.map((o) => {
          if (o === option) {
            return updatedOption
          }
          return o
        })
      )

      saveAvailabilityOption(updatedOption)
    },
    [value]
  )

  const onStartTimeChange = useCallback(
    (
      weekday: Weekday,
      timeRangeToUpdate: AvailabilityTimeRangeBuffer,
      newTime: string | null
    ) => {
      const option = value.find((o) => o.weekday === weekday)
      if (!option) {
        return
      }
      const updatedOption = {
        ...option,
        ranges: option.ranges?.map((r) => {
          if (r !== timeRangeToUpdate) {
            return r
          }
          return {
            ...r,
            startTime: newTime,
          }
        }),
      }
      setValue(
        value.map((o) => {
          if (o === option) {
            return updatedOption
          }
          return o
        })
      )
      saveAvailabilityOption(updatedOption)
    },
    [value]
  )

  const onEndTimeChange = useCallback(
    (
      weekday: Weekday,
      timeRangeToUpdate: AvailabilityTimeRangeBuffer,
      newTime: string | null
    ) => {
      const option = value.find((o) => o.weekday === weekday)
      if (!option) {
        return
      }
      const updatedOption = {
        ...option,
        ranges: option.ranges?.map((r) => {
          if (r !== timeRangeToUpdate) {
            return r
          }
          return {
            ...r,
            endTime: newTime,
          }
        }),
      }
      setValue(
        value.map((o) => {
          if (o === option) {
            return updatedOption
          }
          return o
        })
      )
      saveAvailabilityOption(updatedOption)
    },
    [value]
  )

  const applyToAll = async (sourceWeekday: Weekday) => {
    const result = await ExpertApi.applyAvailabilityOptionToAll(
      expert.id,
      sourceWeekday
    )
    if (!result.ok()) {
      // TODO: handle error
      return
    }
    const newOptions = await result.getData()
    setValue(newOptions)
  }

  return {
    saving,
    errors,
    value,
    setValue,
    onWeekdayToggle,
    onTimeRangeAdd,
    onTimeRangeDelete,
    onStartTimeChange,
    onEndTimeChange,
    applyToAll,
  }
}
