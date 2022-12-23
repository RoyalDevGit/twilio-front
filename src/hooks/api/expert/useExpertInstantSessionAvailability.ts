import { useCallback, useEffect, useRef, useState } from 'react'

import { ExpertApi } from 'apis/ExpertApi'
import { Expert } from 'interfaces/Expert'
import { ExpertInstantAvailability } from 'interfaces/ExpertAvailability'

export interface ExpertAvailabilityHook {
  isLoading: boolean
  refresh: () => void
  availability: ExpertInstantAvailability | undefined
}

export interface UseExpertInstantSessionAvailabilityOptions {
  ignoreActiveSession?: boolean
}

export const useExpertInstantSessionAvailability = (
  expert: Expert | null | undefined,
  {
    ignoreActiveSession = false,
  }: UseExpertInstantSessionAvailabilityOptions = {}
): ExpertAvailabilityHook => {
  const [availability, setAvailability] = useState<
    ExpertInstantAvailability | undefined
  >()
  const controllerRef = useRef<AbortController>()
  const [refreshBit, setRefreshBit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const refresh = useCallback(() => {
    setRefreshBit(!refreshBit)
  }, [refreshBit])

  useEffect(() => {
    const loadAvailability = async () => {
      try {
        if (!expert) {
          return
        }
        setIsLoading(true)

        if (controllerRef.current) {
          controllerRef.current.abort()
        }

        controllerRef.current = new AbortController()

        const availabilityResult =
          await ExpertApi.getInstantSessionAvailability(expert.id, {
            ignoreActiveSession,
            signal: controllerRef.current.signal,
          })
        const newAvailability = await availabilityResult.getData()

        setAvailability(newAvailability)
        setIsLoading(false)
      } catch (e) {
        const err = e as Error
        if (err.name === 'AbortError') {
          return
        }
        setIsLoading(false)
      }
    }
    loadAvailability()
  }, [expert, refreshBit, ignoreActiveSession])

  return {
    isLoading,
    refresh,
    availability,
  }
}
