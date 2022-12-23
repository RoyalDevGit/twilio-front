import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useUpdateEffect } from 'react-use'

import { ApiError } from 'utils/error/ApiError'
import { EditableFieldHook } from 'hooks/fields/EditableFieldHook'
import { getBase64FromFile } from 'utils/url/getDataUrlFromFile'

type onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => unknown

interface EditableFileUploadProps {
  initialValue: string | undefined
  onSave: (value: File | undefined) => Promise<unknown> | unknown
}

export const useEditableFileUpload = ({
  initialValue,
  onSave,
}: EditableFileUploadProps): EditableFieldHook<
  string | undefined,
  onChangeHandler
> => {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)
  const [newPicture, setNewPicture] = useState<File | undefined>()
  const [autoSave, setAutoSave] = useState(false)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const cancel = useCallback(() => {
    setValue(initialValue)
    setNewPicture(undefined)
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
      await onSave(newPicture)
      setEditing(false)
      return true
    } catch (e) {
      const err = e as ApiError
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }, [value, newPicture])

  const onFileSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true)
    const files = event?.target?.files
    if (!files?.length) {
      return
    }
    const dataUrl = await getBase64FromFile(files[0])
    setNewPicture(files[0])
    setValue(dataUrl)
    setAutoSave(true)
  }

  useUpdateEffect(() => {
    if (!autoSave) {
      return
    }
    if (autoSave) {
      setAutoSave(false)
      save()
    }
  }, [save, autoSave])

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
      onChange: onFileSelection,
    },
  }
}
