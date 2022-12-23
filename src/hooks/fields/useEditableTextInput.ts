import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { ApiError } from 'utils/error/ApiError'
import { EditableFieldHook } from 'hooks/fields/EditableFieldHook'

type onChangeHandler = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => unknown

interface EditableInputProps {
  initialValue: string
  onSave?: (value: string) => Promise<unknown> | unknown
}

export const useEditableTextInput = ({
  initialValue,
  onSave,
}: EditableInputProps): EditableFieldHook<string, onChangeHandler> => {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [value, setValue] = useState(initialValue)
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
      onChange: (e) => {
        setIsDirty(true)
        setValue(e.currentTarget.value)
      },
    },
  }
}
