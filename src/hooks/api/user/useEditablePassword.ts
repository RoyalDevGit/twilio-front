import { useEditableTextInput } from 'hooks/fields/useEditableTextInput'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { User } from 'interfaces/User'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { UserApi } from 'apis/UserApi'

export const useEditablePassword = (user: User) => {
  const refreshUserState = useRefreshUserState()
  const onSave = async (password: string) => {
    const result = await UserApi.update(user.id, {
      userData: {
        password,
      },
    })

    await throwIfErrorResponse(result)
    await refreshUserState()
  }

  const editableTextInput = useEditableTextInput({
    initialValue: user.password || '',
    onSave,
  })

  return editableTextInput
}
