import { useDebounce } from 'react-use'
import isNumeric from 'validator/lib/isNumeric'
import isDecimal from 'validator/lib/isDecimal'

import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
import { useRefreshExpertState } from 'hooks/useRefreshExpertState'
import { useEditableTextInput } from 'hooks/fields/useEditableTextInput'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'

export interface UseEditableHourlyRateProps {
  expert: Expert
  onSave?: () => unknown
}

export const useEditableHourlyRate = ({
  expert,
  onSave,
}: UseEditableHourlyRateProps) => {
  const refreshExpertState = useRefreshExpertState()
  const onSaveHours = async (value: string) => {
    if (
      value &&
      !(isNumeric(value, { no_symbols: true }) || isDecimal(value))
    ) {
      return
    }
    const result = await ExpertApi.update(expert.id, {
      expertData: {
        hourlyRate: +value,
      },
    })
    if (onSave) {
      onSave()
    }
    await throwIfErrorResponse(result)
    await refreshExpertState()
  }

  const editableTextInput = useEditableTextInput({
    initialValue: expert.hourlyRate?.toString() || '',
    onSave: onSaveHours,
  })

  useDebounce(
    () => {
      if (!editableTextInput.isDirty) {
        return
      }
      editableTextInput.save()
    },
    1000,
    [editableTextInput.isDirty, editableTextInput.input.value]
  )

  return editableTextInput
}
