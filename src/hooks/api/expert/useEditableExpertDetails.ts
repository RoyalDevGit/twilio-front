import { useCallback, useState } from 'react'

import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
import { useRefreshExpertState } from 'hooks/useRefreshExpertState'
import { useEditableTextInput } from 'hooks/fields/useEditableTextInput'
import { ApiError } from 'utils/error/ApiError'

export interface UseEditableExpertDetailsProps {
  expert: Expert
  onSave?: () => unknown
}

export const useEditableExpertDetails = ({
  expert,
  onSave,
}: UseEditableExpertDetailsProps) => {
  const refreshExpertState = useRefreshExpertState()
  const mainAreaOfExpertise = useEditableTextInput({
    initialValue: expert.mainAreaOfExpertise || '',
  })
  const location = useEditableTextInput({
    initialValue: expert.location || '',
  })

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cancel = () => {
    mainAreaOfExpertise.cancel()
    location.cancel()
    setEditing(false)
  }

  const enable = () => {
    mainAreaOfExpertise.enable()
    location.enable()
    setEditing(true)
  }

  const disable = () => {
    mainAreaOfExpertise.disable()
    location.disable()
    setEditing(false)
  }

  const save = useCallback(async () => {
    try {
      setSaving(true)
      setError(null)
      await ExpertApi.update(expert.id, {
        expertData: {
          mainAreaOfExpertise: mainAreaOfExpertise.input.value,
          location: location.input.value,
        },
      })
      await refreshExpertState()
      setEditing(false)
      if (onSave) {
        onSave()
      }
      return true
    } catch (e) {
      const err = e as ApiError
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }, [mainAreaOfExpertise.input.value, location.input.value])

  return {
    enable,
    disable,
    editing,
    saving,
    save,
    cancel,
    error,
    mainAreaOfExpertise,
    location,
  }
}
