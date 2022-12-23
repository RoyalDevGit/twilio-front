import { useUpdateEffect } from 'react-use'
import { Settings as LuxonSettings } from 'luxon'

import { useEditableAutoComplete } from 'hooks/fields/useEditableAutoComplete'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { User } from 'interfaces/User'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { UserApi } from 'apis/UserApi'

export const useEditableTimeZone = (user: User, initialValue?: string) => {
  const refreshUserState = useRefreshUserState()
  const onSave = async (value?: string) => {
    if (value) {
      LuxonSettings.defaultZone = value
    }
    const result = await UserApi.update(user.id, {
      userData: {
        settings: {
          timeZone: value,
        },
      },
    })

    await throwIfErrorResponse(result)
    await refreshUserState()
  }

  const editableAutoComplete = useEditableAutoComplete<string | undefined>({
    initialValue: initialValue || user.settings.timeZone,
    onSave,
  })

  useUpdateEffect(() => {
    editableAutoComplete.save()
  }, [editableAutoComplete.input.value])

  return editableAutoComplete
}
