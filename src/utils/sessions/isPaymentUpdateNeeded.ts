import { Session } from 'interfaces/Session'
import { Order, OrderPaymentStatus } from 'interfaces/Order'

export const isPaymentUpdateNeeded = (session: Session, order?: Order) => {
  const sessionOrder = order || session.order
  return sessionOrder.paymentStatus === OrderPaymentStatus.FailedAuthorization
}
