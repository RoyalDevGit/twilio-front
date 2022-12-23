import { useCallback, useEffect, useState } from 'react'

import { ApiError } from 'utils/error/ApiError'
import { EditableFieldHook } from 'hooks/fields/EditableFieldHook'
import { PhoneNumber } from 'interfaces/PhoneNumber'

type onChangeHandler = (phoneNumber: PhoneNumber | null) => unknown

interface EditablePhoneInputProps {
  initialValue: PhoneNumber | null
  onSave?: (value: PhoneNumber | null) => Promise<unknown> | unknown
}

export const useEditablePhoneInput = ({
  initialValue,
  onSave,
}: EditablePhoneInputProps): EditableFieldHook<
  PhoneNumber | null,
  onChangeHandler
> => {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [value, setValue] = useState<PhoneNumber | null>(initialValue)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const cancel = useCallback(() => {
    setValue(initialValue)
    setEditing(false)
    setError(null)
  }, [initialValue])

  const enable = () => {
    setEditing(true)
  }

  const disable = () => {
    setEditing(false)
  }

  const save = useCallback(async () => {
    try {
      setSaving(true)
      setError(null)
      if (onSave) {
        await onSave(value)
      }
      setEditing(false)
      return true
    } catch (e) {
      const err = e as ApiError
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }, [value])

  return {
    enable,
    disable,
    editing,
    saving,
    setValue,
    save,
    cancel,
    error,
    isDirty,
    input: {
      value,
      onChange: (phoneNumber) => {
        setIsDirty(true)
        setValue(phoneNumber)
      },
    },
  }
}
