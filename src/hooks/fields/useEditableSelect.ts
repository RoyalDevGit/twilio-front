import { useCallback, useEffect, useState } from 'react'
import { SelectChangeEvent } from '@mui/material/Select'

import { ApiError } from 'utils/error/ApiError'
import { EditableFieldHook } from 'hooks/fields/EditableFieldHook'

type OnSelectChange = (
  event: SelectChangeEvent<unknown>,
  child: React.ReactNode
) => void

export type EditableSelectHook = EditableFieldHook<unknown, OnSelectChange>

interface EditableSelectProps {
  initialValue: unknown
  onSave: (value: unknown) => Promise<unknown> | unknown
}

export const useEditableSelect = ({
  initialValue,
  onSave,
}: EditableSelectProps): EditableSelectHook => {
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
        setIsDirty(true)
        setValue(e.target.value)
      },
    },
  }
}
