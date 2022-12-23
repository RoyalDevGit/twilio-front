import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useUpdateEffect } from 'react-use'

import { ApiError } from 'utils/error/ApiError'
import { EditableFieldHook } from 'hooks/fields/EditableFieldHook'

type onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => unknown

interface EditableCheckboxeProps {
  initialValue: boolean
  onSave: (value: boolean) => Promise<unknown> | unknown
}

export const useEditableCheckbox = ({
  initialValue,
  onSave,
}: EditableCheckboxeProps): EditableFieldHook<boolean, onChangeHandler> => {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)

  useUpdateEffect(() => {
    setIsDirty(true)
    save()
  }, [value])

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
      await onSave(value)
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
      onChange: (e) => {
        setValue(e.currentTarget.checked)
      },
    },
  }
}
