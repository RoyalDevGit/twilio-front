import { useEditableTextInput } from 'hooks/fields/useEditableTextInput'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { User } from 'interfaces/User'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { UserApi } from 'apis/UserApi'
import { splitFullName } from 'utils/string/splitFullName'

export const useEditableFullName = (user: User) => {
  const refreshUserState = useRefreshUserState()
  const onSave = async (fullName: string) => {
    const { firstName, lastName } = splitFullName(fullName)
    const result = await UserApi.update(user.id, {
      userData: {
        firstName,
        lastName,
      },
    })

    await throwIfErrorResponse(result)
    await refreshUserState()
  }

  const editableTextInput = useEditableTextInput({
    initialValue: `${user.firstName} ${user.lastName}`,
    onSave,
  })

  return editableTextInput
}
