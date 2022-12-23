import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
import { useEditableAutoComplete } from 'hooks/fields/useEditableAutoComplete'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { useRefreshExpertState } from 'hooks/useRefreshExpertState'

export const useEditableTags = (expert: Expert) => {
  const refreshExpertState = useRefreshExpertState()
  const onSave = async (value: string[]) => {
    const result = await ExpertApi.update(expert.id, {
      expertData: {
        tags: value,
      },
    })

    await throwIfErrorResponse(result)
    await refreshExpertState()
  }

  const editableAutoComplete = useEditableAutoComplete({
    initialValue: expert.tags || [],
    onSave,
  })

  return editableAutoComplete
}
