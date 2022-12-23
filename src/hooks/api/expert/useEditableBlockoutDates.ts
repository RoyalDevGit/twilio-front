import { useCallback, useState } from 'react'
import { DateTime } from 'luxon'

import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
import { BlockoutDate } from 'interfaces/BlockoutDate'

export interface UseEditableBlockoutDatesProps {
  expert: Expert
  initialValue: Partial<BlockoutDate>[]
  onSave: () => unknown
  onRemove: () => unknown
}

export const useEditableBlockoutDates = ({
  expert,
  initialValue,
  onSave,
  onRemove,
}: UseEditableBlockoutDatesProps) => {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [value, setValue] = useState<Partial<BlockoutDate>[]>(
    initialValue || []
  )

  const onAdd = useCallback(
    async (date: DateTime) => {
      try {
        setSaving(true)
        const newBlockoutDate = {
          expert: expert.id,
          date: date.toUTC().toISO(),
        }
        setValue([...value, newBlockoutDate])
        const result = await ExpertApi.createBlockoutDate(
          expert.id,
          newBlockoutDate
        )
        if (result.ok()) {
          const savedDate = await result.getData()
          setValue((value) =>
            value.map((blackoutDate) => {
              if (blackoutDate === newBlockoutDate) {
                return savedDate
              }
              return blackoutDate
            })
          )
        } else {
          const error = await result.getError()
          setError(error.message)
        }
        if (onSave) {
          onSave()
        }
      } finally {
        setSaving(false)
      }
    },
    [value]
  )

  const removeHandler = useCallback(
    async (option: Partial<BlockoutDate>) => {
      if (option.id) {
        setSaving(true)
        const result = await ExpertApi.deleteBlockoutDate(expert.id, option.id)
        if (!result.ok()) {
          const error = await result.getError()
          setError(error.message)
        }
        setSaving(false)
        if (onRemove) {
          onRemove()
        }
      }
      setValue(value.filter((o) => o !== option))
    },
    [value]
  )

  return {
    saving,
    error,
    value,
    setValue,
    onAdd,
    onRemove: removeHandler,
  }
}
