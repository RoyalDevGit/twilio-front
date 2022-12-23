import { useRefreshExpertState } from 'hooks/useRefreshExpertState'
import { useEditableCheckbox } from 'hooks/fields/useEditableCheckbox'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { User, UserStatus } from 'interfaces/User'
import { UserApi } from 'apis/UserApi'

export const useEditableStatus = (user: User) => {
  const refreshExpertState = useRefreshExpertState()
  const onSave = async (value: boolean) => {
    const newStatus = value ? UserStatus.Available : UserStatus.Unavailable
    const result = await UserApi.updateStatus(user.id, newStatus)

    await throwIfErrorResponse(result)
    await refreshExpertState()
  }

  const editableCheckbox = useEditableCheckbox({
    initialValue: user.status === UserStatus.Available,
    onSave,
  })

  return editableCheckbox
}
