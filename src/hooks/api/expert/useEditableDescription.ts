import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
import { useRefreshExpertState } from 'hooks/useRefreshExpertState'
import { useEditableTextInput } from 'hooks/fields/useEditableTextInput'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'

export interface UseEditableDescriptionProps {
  expert: Expert
  onSave?: () => unknown
}

export const useEditableDescription = ({
  expert,
  onSave,
}: UseEditableDescriptionProps) => {
  const refreshExpertState = useRefreshExpertState()
  const onSaveDescription = async (value: string) => {
    const result = await ExpertApi.update(expert.id, {
      expertData: {
        description: {
          en: value,
        },
      },
    })
    if (onSave) {
      onSave()
    }
    await throwIfErrorResponse(result)
    await refreshExpertState()
  }

  const editableDescription = useEditableTextInput({
    initialValue: expert.description ? expert.description['en'] || '' : '',
    onSave: onSaveDescription,
  })

  return editableDescription
}
