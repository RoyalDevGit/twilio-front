import { useEditableAutoComplete } from 'hooks/fields/useEditableAutoComplete'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { User } from 'interfaces/User'
import { UserApi } from 'apis/UserApi'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { Category } from 'interfaces/Category'

export const useEditableUserAreasOfInterest = (user: User) => {
  const refreshUserState = useRefreshUserState()
  const onSave = async (values: Category[]) => {
    const result = await UserApi.update(user.id, {
      userData: {
        areasOfInterest: values.map((c) => c.id),
      },
    })

    await throwIfErrorResponse(result)
    await refreshUserState()
  }

  const editableAutoComplete = useEditableAutoComplete<Category[], Category>({
    initialValue: (user.areasOfInterest || []) as Category[],
    onSave,
  })

  return editableAutoComplete
}
