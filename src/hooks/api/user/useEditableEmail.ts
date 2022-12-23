import isEmail from 'validator/lib/isEmail'

import { useEditableTextInput } from 'hooks/fields/useEditableTextInput'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { User } from 'interfaces/User'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { UserApi } from 'apis/UserApi'

export const useEditableEmail = (user: User) => {
  const refreshUserState = useRefreshUserState()

  const onSave = async (emailAddress: string) => {
    if (!isEmail(emailAddress)) {
      throw new Error('Invalid email address')
    }
    const result = await UserApi.update(user.id, {
      userData: {
        emailAddress,
      },
    })

    await throwIfErrorResponse(result)
    await refreshUserState()
  }

  const editableTextInput = useEditableTextInput({
    initialValue: user.emailAddress,
    onSave,
  })

  return editableTextInput
}
