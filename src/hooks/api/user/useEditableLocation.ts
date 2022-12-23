import { useEditableTextInput } from 'hooks/fields/useEditableTextInput'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { User } from 'interfaces/User'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { UserApi } from 'apis/UserApi'

export const useEditableLocation = (user: User) => {
  const refreshUserState = useRefreshUserState()
  const onSave = async (location: string) => {
    const result = await UserApi.update(user.id, {
      userData: {
        location,
      },
    })

    await throwIfErrorResponse(result)
    await refreshUserState()
  }

  const editableTextInput = useEditableTextInput({
    initialValue: user.location || '',
    onSave,
  })

  return editableTextInput
}
