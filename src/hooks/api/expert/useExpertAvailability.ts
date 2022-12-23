import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { DateTime } from 'luxon'

import { ExpertApi } from 'apis/ExpertApi'
import { Expert } from 'interfaces/Expert'
import { ExpertAvailability } from 'interfaces/ExpertAvailability'

export interface ExpertAvailabilityHook {
  isLoading: boolean
  refresh: () => void
  reset: () => void
  selectedDate: DateTime | undefined
  availability: ExpertAvailability | undefined
  selectedDuration: number | undefined
  selectedInstantSessionDuration: number | undefined
  selectedTimeSlotId: string | undefined
  setSelectedDate: Dispatch<SetStateAction<DateTime | undefined>>
  setSelectedDuration: Dispatch<SetStateAction<number | undefined>>
  setSelectedInstantSessionDuration: Dispatch<
    SetStateAction<number | undefined>
  >
  setSelectedTimeSlotId: Dispatch<SetStateAction<string | undefined>>
  setFromDate: Dispatch<SetStateAction<DateTime>>
  setToDate: Dispatch<SetStateAction<DateTime>>
}

export interface UseExpertAvailabilityOptions {
  from: DateTime
  to: DateTime
  selectedDate?: DateTime
  selectedDuration?: number
  selectedInstantSessionDuration?: number
  selectedTimeSlotId?: string
}

export const useExpertAvailability = (
  expert: Expert | null | undefined,
  options: UseExpertAvailabilityOptions
): ExpertAvailabilityHook => {
  const {
    from: initialFrom,
    to: initialTo,
    selectedDate: initalSelectedDate,
    selectedDuration: initialSelectedDuration,
    selectedInstantSessionDuration: initialSelectedInstantSessionDuration,
    selectedTimeSlotId: initialSelectedTimeSlotId,
  } = options
  const [availability, setAvailability] = useState<
    ExpertAvailability | undefined
  >()
  const controllerRef = useRef<AbortController>()
  const [fromDate, setFromDate] = useState(initialFrom)
  const [toDate, setToDate] = useState(initialTo)
  const [selectedDate, setSelectedDate] = useState(initalSelectedDate)
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(
    initialSelectedDuration
  )
  const [selectedInstantSessionDuration, setSelectedInstantSessionDuration] =
    useState<number | undefined>(initialSelectedInstantSessionDuration)

  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<
    string | undefined
  >(initialSelectedTimeSlotId)
  const [refreshBit, setRefreshBit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const refresh = useCallback(() => {
    setRefreshBit(!refreshBit)
  }, [refreshBit])

  const reset = () => {
    if (availability) {
      setSelectedDate(DateTime.fromISO(availability.dates[0]))
    }
    setSelectedDuration(undefined)
    setSelectedInstantSessionDuration(undefined)
    setSelectedTimeSlotId(undefined)
    setFromDate(initialFrom)
    setToDate(initialTo)
  }

  useEffect(() => {
    const loadTimeSlots = async () => {
      try {
        if (!expert) {
          return
        }
        setIsLoading(true)

        if (controllerRef.current) {
          controllerRef.current.abort()
        }

        controllerRef.current = new AbortController()

        const availabilityResult = await ExpertApi.getAvailability(expert.id, {
          from: fromDate,
          to: toDate,
          selectedDate,
          selectedDuration,
          signal: controllerRef.current.signal,
        })
        const newAvailability = await availabilityResult.getData()

        const noChanges = newAvailability.hash === availability?.hash

        if (noChanges) {
          setIsLoading(false)
          return
        }

        setAvailability(newAvailability)
        // if (!selectedDate) {
        //   setSelectedDate(DateTime.fromISO(newAvailability.dates[0]))
        // }
        setIsLoading(false)
      } catch (e) {
        const err = e as Error
        if (err.name === 'AbortError') {
          return
        }
        setIsLoading(false)
      }
    }
    loadTimeSlots()
  }, [expert, refreshBit, fromDate, toDate, selectedDate, selectedDuration])

  return {
    isLoading,
    refresh,
    reset,
    selectedDate,
    availability,
    selectedDuration,
    selectedTimeSlotId,
    setSelectedDate,
    setSelectedDuration,
    selectedInstantSessionDuration,
    setSelectedInstantSessionDuration,
    setSelectedTimeSlotId,
    setFromDate,
    setToDate,
  }
}
