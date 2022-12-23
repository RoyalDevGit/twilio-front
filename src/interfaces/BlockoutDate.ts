import { Expert } from 'interfaces/Expert'
import { Model, ModelRef } from 'interfaces/Model'

export interface BlockoutDate extends Model {
  expert: ModelRef<Expert>
  date: string
  createdAt: string
}
