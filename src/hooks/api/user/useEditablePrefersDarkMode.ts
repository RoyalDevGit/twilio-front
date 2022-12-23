import { useUpdateEffect } from 'react-use'

import { User, ColorSchemePreference } from 'interfaces/User'
import { useRefreshExpertState } from 'hooks/useRefreshExpertState'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { UserApi } from 'apis/UserApi'
import { useEditableSelect } from 'hooks/fields/useEditableSelect'

export interface UseEditablePrefersDarkModeProps {
  user: User
  onSave: () => unknown
}

export const useEditablePrefersDarkMode = ({
  user,
  onSave,
}: UseEditablePrefersDarkModeProps) => {
  const refreshExpertState = useRefreshExpertState()
  const onSaveColorScheme = async (value: unknown) => {
    const result = await UserApi.update(user.id, {
      userData: {
        settings: {
          colorScheme: value as ColorSchemePreference,
        },
      },
    })
    if (onSave) {
      onSave()
    }
    await throwIfErrorResponse(result)
    await refreshExpertState()
  }

  const editableSelect = useEditableSelect({
    initialValue: user.settings.colorScheme || ColorSchemePreference.System,
    onSave: onSaveColorScheme,
  })

  useUpdateEffect(() => {
    editableSelect.save()
  }, [editableSelect.input.value])

  return editableSelect
}
