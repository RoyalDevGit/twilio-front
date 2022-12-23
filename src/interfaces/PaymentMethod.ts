import { Model, ModelRef } from 'interfaces/Model'
import { User } from 'interfaces/User'

export enum PaymentMethodStatus {
  Incomplete = 'incomplete',
  Ready = 'ready',
  Deleted = 'deleted',
}

export enum PaymentMethodType {
  CreditCard = 'credit_card',
}

export interface CardPaymentMethod {
  brand: string
  last4: string
  expirationMonth: number
  expirationYear: number
  funding: string
}

export interface PaymentMethod extends Model {
  status: PaymentMethodStatus
  paymentMethodType: PaymentMethodType
  stripeSetupIntentId: string
  stripeSetupIntentClientSecret: string | null
  stripePaymentMethodId?: string
  preferred: boolean
  createdAt: string
  createdBy: ModelRef<User>
  updatedAt: string
  card?: CardPaymentMethod
}
