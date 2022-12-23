import { Expert } from 'interfaces/Expert'
import { Model, ModelRef } from 'interfaces/Model'

export interface SessionDurationOption extends Model {
  expert: ModelRef<Expert>
  duration: number
  price: number
  createdAt: string
}
