import { useCallback, useEffect, useState } from 'react'

import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
import { SessionDurationOptionBuffer } from 'components/SessionDurationOptions'
import { getUuid } from 'utils/uuid/getUuid'

export interface SessionDurationOptionError {
  option: Partial<SessionDurationOptionBuffer>
  message?: string
}

interface ValidationResult {
  isValid: boolean
  error?: SessionDurationOptionError
}

export interface UseEditableSessionDurationOptionsProps {
  expert: Expert
  initialValue: Partial<SessionDurationOptionBuffer>[]
  onSave?: () => unknown
  onRemove?: () => unknown
}

export const useEditableSessionDurationOptions = ({
  expert,
  initialValue,
  onSave,
  onRemove,
}: UseEditableSessionDurationOptionsProps) => {
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<SessionDurationOptionError[]>([])
  const [value, setValue] =
    useState<Partial<SessionDurationOptionBuffer>[]>(initialValue)

  const onOptionAdd = useCallback(() => {
    setValue([...value, { tempId: getUuid() }])
  }, [value])

  const filterErrorsByOption = (
    errors: SessionDurationOptionError[],
    option: Partial<SessionDurationOptionBuffer>
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

  const validateOption = (
    option: Partial<SessionDurationOptionBuffer>,
    allOptions: Partial<SessionDurationOptionBuffer>[]
  ): ValidationResult => {
    if (!option.duration) {
      return { isValid: true }
    }
    const foundDuplicate = allOptions
      .filter((o) => o !== option)
      .find(
        (o) => o.duration === option.duration && o.duration === option.duration
      )

    if (foundDuplicate) {
      return {
        isValid: false,
        error: {
          option,
          message: "Error: You've already selected this duration",
        },
      }
    }
    return { isValid: true }
  }

  useEffect(() => {
    const errors: SessionDurationOptionError[] = []
    value.forEach((o) => {
      const { error } = validateOption(o, value)
      if (!error) {
        return
      }
      errors.push(error)
    })
    setErrors(errors)
  }, [value])

  const onOptionRemove = useCallback(
    async (option: Partial<SessionDurationOptionBuffer>) => {
      const filteredErrors = filterErrorsByOption(errors, option)
      if (option.id) {
        setSaving(true)
        const result = await ExpertApi.deleteSessionDurationOption(
          expert.id,
          option.id
        )
        if (!result.ok()) {
          const error = await result.getError()
          setErrors([...filteredErrors, { option, message: error.message }])
        }
        setSaving(false)
        if (onRemove) {
          onRemove()
        }
      }
      setValue(value.filter((o) => o !== option))
    },
    [value, errors]
  )

  const onOptionDurationChange = useCallback(
    async (
      option: Partial<SessionDurationOptionBuffer>,
      newDuration: number
    ) => {
      const filteredErrors = filterErrorsByOption(errors, option)
      const updatedOption = { ...option, duration: newDuration }

      const newValue = value.map((o) => {
        if (o === option) {
          return updatedOption
        }
        return o
      })
      setValue(newValue)

      const { isValid } = validateOption(updatedOption, newValue)
      if (!isValid) {
        return
      }

      setSaving(true)
      const result = await ExpertApi.saveSessionDurationOption(
        expert.id,
        updatedOption
      )
      if (result.ok()) {
        const savedOption = await result.getData()
        setValue(
          value.map((o) => {
            if (o === option) {
              return savedOption
            }
            return o
          })
        )
      } else {
        const error = await result.getError()
        setErrors([...filteredErrors, { option, message: error.message }])
      }
      if (onSave) {
        onSave()
      }
      setSaving(false)
    },
    [value, errors]
  )

  return {
    saving,
    errors,
    value,
    setValue,
    onOptionAdd,
    onOptionRemove,
    onOptionDurationChange,
    onRemove: onOptionRemove,
  }
}
