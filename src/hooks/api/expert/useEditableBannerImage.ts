import { getExpertBannerImageUrl } from 'utils/url/getExpertBannerImageUrl'
import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
import { useEditableFileUpload } from 'hooks/fields/useEditableFileUpload'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { useRefreshExpertState } from 'hooks/useRefreshExpertState'

export interface UseEditableBannerImageProps {
  expert: Expert
  onSave: () => unknown
}

export const useEditableBannerImage = ({
  expert,
  onSave,
}: UseEditableBannerImageProps) => {
  const refreshExpertState = useRefreshExpertState()
  const onSaveBanner = async (value: File | undefined) => {
    const result = await ExpertApi.update(expert.id, {
      bannerImageFile: value,
    })
    if (onSave) {
      onSave()
    }
    await throwIfErrorResponse(result)
    await refreshExpertState()
  }

  const editableFileUpload = useEditableFileUpload({
    initialValue: getExpertBannerImageUrl(expert),
    onSave: onSaveBanner,
  })

  return editableFileUpload
}
