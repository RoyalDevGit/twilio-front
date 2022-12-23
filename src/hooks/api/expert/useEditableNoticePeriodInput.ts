import { useCallback, useEffect, useState } from 'react'
import useDebounce from 'react-use/lib/useDebounce'

import { ApiError } from 'utils/error/ApiError'
import { EditableFieldHook } from 'hooks/fields/EditableFieldHook'
import { NoticePeriod } from 'components/NoticePeriodInput'

type onChangeHandler = (noticePeriod: NoticePeriod) => unknown

interface useEditableNoticePeriodProps {
  initialValue: NoticePeriod
  onSave?: (value: NoticePeriod) => Promise<unknown> | unknown
}

export const useEditableNoticePeriodInput = ({
  initialValue,
  onSave,
}: useEditableNoticePeriodProps): EditableFieldHook<
  NoticePeriod,
  onChangeHandler
> => {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [value, setValue] = useState<NoticePeriod>(initialValue)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const cancel = useCallback(() => {
    setValue(initialValue)
    setEditing(false)
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

  useDebounce(
    () => {
      if (!isDirty) {
        return
      }
      save()
    },
    1000,
    [isDirty, value]
  )

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
      onChange: (noticePeriod) => {
        setIsDirty(true)
        setValue(noticePeriod)
      },
    },
  }
}
