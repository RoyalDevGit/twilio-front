import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
} from '@mui/material/Autocomplete'

import { ApiError } from 'utils/error/ApiError'
import { EditableFieldHook } from 'hooks/fields/EditableFieldHook'

type onAutoCompleteChangeHandler = (
  event: SyntheticEvent<Element, Event>,
  value: unknown,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<unknown> | undefined
) => void

type onTextInputChangeHandler = (
  event: React.SyntheticEvent,
  value: string,
  reason: AutocompleteInputChangeReason
) => void

export interface EditableAutoCompleteHook<T, TI = T>
  extends EditableFieldHook<T, onAutoCompleteChangeHandler> {
  onDelete: (option: TI) => unknown
  setTextInputValue: Dispatch<SetStateAction<string>>
  textInput: {
    value: string
    onChange: onTextInputChangeHandler
  }
}

interface EditableAutoCompleteProps<T> {
  initialValue: T
  onSave: (value: T) => Promise<unknown> | unknown
}

export const useEditableAutoComplete = <T, TI = T>({
  initialValue,
  onSave,
}: EditableAutoCompleteProps<T>): EditableAutoCompleteHook<T, TI> => {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [isDirty, setIsDirty] = useState(false)
  const [value, setValue] = useState(initialValue)
  const [textInputValue, setTextInputValue] = useState('')
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let finalValue: any | any[] = value
      if (Array.isArray(value)) {
        finalValue = [...value]
        const unsavedTextInputValue = textInputValue
          ? textInputValue.trim()
          : ''
        if (unsavedTextInputValue) {
          finalValue.push(unsavedTextInputValue)
          setValue(finalValue as unknown as T)
        }
      }
      setSaving(true)
      setError(null)
      setTextInputValue('')
      await onSave(finalValue as unknown as T)
      setEditing(false)
      return true
    } catch (e) {
      const err = e as ApiError
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }, [value, textInputValue])

  return {
    enable,
    disable,
    editing,
    saving,
    setValue,
    setTextInputValue,
    save,
    cancel,
    error,
    isDirty,
    onDelete: (option) => {
      setIsDirty(true)
      const valueList = value as unknown as TI[]
      const filteredList = valueList.filter((o) => o !== option) as unknown as T
      setValue(filteredList)
    },
    input: {
      value,
      onChange: (_e, value) => {
        setIsDirty(true)
        setValue(value as T)
      },
    },
    textInput: {
      value: textInputValue,
      onChange: (_event, value, _reason) => {
        setIsDirty(true)
        setTextInputValue(value)
      },
    },
  }
}
