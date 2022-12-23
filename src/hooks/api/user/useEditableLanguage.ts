import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { User } from 'interfaces/User'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { UserApi } from 'apis/UserApi'
import { useEditableAutoComplete } from 'hooks/fields/useEditableAutoComplete'
import { Language } from 'interfaces/Language'

export const useEditableLanguage = (user: User) => {
  const refreshUserState = useRefreshUserState()
  const onSave = async (language: Language | null) => {
    if (!language) {
      return
    }
    const result = await UserApi.update(user.id, {
      userData: {
        settings: {
          language: language.id,
        },
      },
    })

    await throwIfErrorResponse(result)
    await refreshUserState()
  }

  const editableTextInput = useEditableAutoComplete<Language | null>({
    initialValue: (user.settings.language as Language | undefined) || null,
    onSave,
  })

  return editableTextInput
}
