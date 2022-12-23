import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { User } from 'interfaces/User'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { UserApi } from 'apis/UserApi'
import { PhoneNumber } from 'interfaces/PhoneNumber'
import { useEditablePhoneInput } from 'hooks/fields/useEditablePhoneInput'
import { validatePhoneNumber } from 'utils/validation/validatePhoneNumber'

export const useEditableMobilePhoneNumber = (user: User) => {
  const refreshUserState = useRefreshUserState()
  const onSave = async (mobilePhoneNumber: PhoneNumber | null) => {
    if (mobilePhoneNumber && !validatePhoneNumber(mobilePhoneNumber)) {
      throw new Error('Invalid phone number')
    }
    const result = await UserApi.update(user.id, {
      userData: {
        mobilePhoneNumber,
      },
    })

    await throwIfErrorResponse(result)
    await refreshUserState()
  }

  const editableTextInput = useEditablePhoneInput({
    initialValue: user.mobilePhoneNumber || null,
    onSave,
  })

  return editableTextInput
}
