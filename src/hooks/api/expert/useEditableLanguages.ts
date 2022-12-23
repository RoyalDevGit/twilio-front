import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
import { useEditableAutoComplete } from 'hooks/fields/useEditableAutoComplete'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { useRefreshExpertState } from 'hooks/useRefreshExpertState'
import { Language } from 'interfaces/Language'

export interface UseEditableLanguagesProps {
  expert: Expert
  onSave?: () => unknown
}

export const useEditableLanguages = ({
  expert,
  onSave,
}: UseEditableLanguagesProps) => {
  const refreshExpertState = useRefreshExpertState()
  const onSaveLanguages = async (values: Language[]) => {
    const result = await ExpertApi.update(expert.id, {
      expertData: {
        languages: values.map((l) => l.id),
      },
    })
    if (onSave) {
      onSave()
    }
    await throwIfErrorResponse(result)
    await refreshExpertState()
  }

  const editableAutoComplete = useEditableAutoComplete<Language[], Language>({
    initialValue: (expert.languages || []) as Language[],
    onSave: onSaveLanguages,
  })

  return editableAutoComplete
}
