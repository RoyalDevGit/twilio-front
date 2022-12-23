import { EventDate } from 'interfaces/Event'
import { Model, ModelRef } from 'interfaces/Model'
import { PaymentMethod } from 'interfaces/PaymentMethod'
import { Price } from 'interfaces/Price'
import { Session } from 'interfaces/Session'
import { User } from 'interfaces/User'

export enum OrderStatus {
  Open = 'open',
  Submitting = 'submitting',
  Submitted = 'submitted',
  Processing = 'processing',
  Paid = 'paid',
  Fulfilling = 'fulfilling',
  Complete = 'complete',
  Cancelled = 'cancelled',
}

export enum OrderPaymentStatus {
  NotStarted = 'not_started',
  Authorized = 'authorized',
  FailedAuthorization = 'failed_auth',
  Captured = 'captured',
}

export enum OrderItemStatus {
  Unfulfilled = 'unfulfilled',
  Fulfilled = 'fulfilled',
}

export enum OrderRefundStatus {
  RefundRequested = 'refund_requested',
  RefundCompleted = 'refund_completed',
  PartialRefundCompleted = 'partial_refund_completed',
}

export enum OrderItemType {
  Session = 'session',
  SessionExtension = 'session_extension',
}

export interface SessionOrderItem {
  startDate: EventDate
  duration: number
  timeSlotId?: string
  expert: string
  consumer: string
  instant: boolean
  notes?: string
}

export interface SessionExtensionOrderItem {
  session: string
  duration: number
}

export interface OrderItem<T = unknown> {
  itemType: OrderItemType
  status: OrderItemStatus
  data: T
  totalPrice: Price
}
export interface Order extends Model {
  orderNumber: number
  status: OrderStatus
  paymentStatus: OrderPaymentStatus
  items: OrderItem[]
  totalPrice: Price
  paymentMethod?: ModelRef<PaymentMethod>
  stripeOrderId: string
  stripeOrderClientSecret?: string | null
  createdAt: string
  createdBy: ModelRef<User>
  updatedAt: string
  session?: Session
  parentOrder: ModelRef<Order>
  subOrders?: Order[]
  grandTotalPrice: Price
  paymentFailureDate?: string
}
