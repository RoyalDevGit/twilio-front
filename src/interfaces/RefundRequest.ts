import { Model, ModelRef } from 'interfaces/Model'
import { Order, OrderRefundStatus } from 'interfaces/Order'
import { User } from 'interfaces/User'

export interface RefundRequest extends Model {
  status: OrderRefundStatus
  order: ModelRef<Order>
  description: string
  createdAt: string
  createdBy: ModelRef<User>
}
