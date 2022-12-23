import { useCallback } from 'react'

import { User } from 'interfaces/User'
import { useRefreshExpertState } from 'hooks/useRefreshExpertState'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'
import { UserApi } from 'apis/UserApi'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { useEditableFileUpload } from 'hooks/fields/useEditableFileUpload'

export interface UseEditableProfilePictureProps {
  user: User
  onSave?: () => unknown
  onRemove?: () => unknown
}

export const useEditableProfilePicture = ({
  user,
  onSave,
  onRemove,
}: UseEditableProfilePictureProps) => {
  const refreshExpertState = useRefreshExpertState()
  const onSavePicture = async (value: File | undefined) => {
    const result = await UserApi.update(user.id, {
      profilePictureImage: value,
    })

    await throwIfErrorResponse(result)
    await refreshExpertState()
    if (onSave) {
      onSave()
    }
  }

  const resetProfilePicture = useCallback(async () => {
    const result = await UserApi.update(user.id, {
      userData: {
        profilePicture: null,
      },
    })
    if (onRemove) {
      onRemove()
    }
    await throwIfErrorResponse(result)
    await refreshExpertState()
  }, [user])

  const editableProfilePicture = useEditableFileUpload({
    initialValue: getUserProfilePictureUrl(user),
    onSave: onSavePicture,
  })

  return { editableProfilePicture, onRemove: resetProfilePicture }
}
