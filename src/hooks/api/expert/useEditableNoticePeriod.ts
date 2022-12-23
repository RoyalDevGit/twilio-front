import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'

import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { Expert } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
import { useEditableNoticePeriodInput } from 'hooks/api/expert/useEditableNoticePeriodInput'
import { NoticePeriod } from 'components/NoticePeriodInput'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Config } from 'utils/config'
import { toHumanDuration } from 'utils/duration/toHumanDuration'

const NOTICE_PERIOD_MIN = Config.getDuration('NOTICE_PERIOD_MIN')
const NOTICE_PERIOD_MAX = Config.getDuration('NOTICE_PERIOD_MAX')

export interface UseEditableNoticePeriodProps {
  expert: Expert
  onSave: () => unknown
}

export const useEditableNoticePeriod = ({
  expert,
  onSave,
}: UseEditableNoticePeriodProps) => {
  const { t } = useTranslation(LocaleNamespace.ExpertAvailabilitySettings)

  const invalidNoticePeriodError = t('invalidNoticePeriod', {
    minDuration: toHumanDuration(NOTICE_PERIOD_MIN, {
      smallestUnit: 'minutes',
      largestUnit: 'days',
    }),
    maxDuration: toHumanDuration(NOTICE_PERIOD_MAX, {
      smallestUnit: 'minutes',
      largestUnit: 'days',
    }),
  })

  const [noticePeriod, setNoticePeriod] = useState<NoticePeriod>({
    days: 0,
    hours: 0,
  })
  const refreshUserState = useRefreshUserState()
  const onSaveNoticePeriod = async (noticePeriod: NoticePeriod) => {
    const daysInMinutes = noticePeriod.days * 24 * 60
    const hoursInMinutes = noticePeriod.hours * 60
    const minutes = daysInMinutes + hoursInMinutes
    if (!minutes) {
      throw new Error(invalidNoticePeriodError)
    }
    if (minutes < NOTICE_PERIOD_MIN.as('minutes')) {
      throw new Error(invalidNoticePeriodError)
    }
    if (minutes > NOTICE_PERIOD_MAX.as('minutes')) {
      throw new Error(invalidNoticePeriodError)
    }
    const result = await ExpertApi.update(expert.id, {
      expertData: {
        noticePeriod: minutes,
      },
    })
    if (onSave) {
      onSave()
    }

    await throwIfErrorResponse(result)
    await refreshUserState()
  }

  useEffect(() => {
    const minutes = expert.noticePeriod
    const now = DateTime.now()
    const timeSpan = now.plus({ minutes }).diff(now, ['days', 'hours'])
    const newNoticePeriod: NoticePeriod = {
      days: timeSpan.days,
      hours: timeSpan.hours,
    }
    setNoticePeriod(newNoticePeriod)
  }, [expert])

  const editableNoticePeriodInput = useEditableNoticePeriodInput({
    initialValue: noticePeriod,
    onSave: onSaveNoticePeriod,
  })

  return editableNoticePeriodInput
}
