import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
import { useEditableAutoComplete } from 'hooks/fields/useEditableAutoComplete'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { useRefreshExpertState } from 'hooks/useRefreshExpertState'
import { Category } from 'interfaces/Category'

export interface UseEditableExpertiseCategoriesProps {
  expert: Expert
  onSave?: () => unknown
}

export const useEditableExpertiseCategories = ({
  expert,
  onSave,
}: UseEditableExpertiseCategoriesProps) => {
  const refreshExpertState = useRefreshExpertState()
  const onSaveCategories = async (values: Category[]) => {
    const result = await ExpertApi.update(expert.id, {
      expertData: {
        expertiseCategories: values.map((c) => c.id),
      },
    })
    if (onSave) {
      onSave()
    }
    await throwIfErrorResponse(result)
    await refreshExpertState()
  }

  const editableAutoComplete = useEditableAutoComplete<Category[], Category>({
    initialValue: (expert.expertiseCategories || []) as Category[],
    onSave: onSaveCategories,
  })

  return editableAutoComplete
}
