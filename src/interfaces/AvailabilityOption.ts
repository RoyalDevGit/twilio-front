import { Weekday } from 'interfaces/Event'
import { Expert } from 'interfaces/Expert'
import { Model, ModelRef } from 'interfaces/Model'

export interface AvailabilityTimeRange extends Model {
  startTime: string
  endTime: string
}

export interface AvailabilityOption extends Model {
  enabled: boolean
  expert: ModelRef<Expert>
  weekday: Weekday
  ranges: AvailabilityTimeRange[]
  createdAt: string
}
