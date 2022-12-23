import { Dispatch, SetStateAction } from 'react'

export interface EditableFieldHook<T, OC> {
  enable: () => void
  disable: () => void
  editing: boolean
  saving: boolean
  setValue: Dispatch<SetStateAction<T>>
  save: () => Promise<boolean>
  cancel: () => void
  error: string | null
  isDirty: boolean
  input: {
    value: T
    onChange: OC
  }
}
