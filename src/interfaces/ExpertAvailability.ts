import { Price } from 'interfaces/Price'

export interface ExpertAvailableTimeSlot {
  id: string
  date: string
  duration: number
  startDate: string
  endDate: string
  price: Price
}

export interface ExpertAvailableDuration {
  minutes: number
  price: Price
}

export interface ExpertInstantAvailability {
  durations: ExpertAvailableDuration[]
}

export interface ExpertAvailability {
  hash: string
  nextAvailableTimeSlot?: ExpertAvailableTimeSlot
  from: string
  to: string
  selectedDate?: string
  selectedDuration?: number
  dates: string[]
  durations: ExpertAvailableDuration[]
  timeSlots: ExpertAvailableTimeSlot[]
  instant: ExpertInstantAvailability
}
