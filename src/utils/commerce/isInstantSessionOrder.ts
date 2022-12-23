import { Order, OrderItem, SessionOrderItem } from 'interfaces/Order'

export const isInstantSessionOrder = (order: Order) => {
  if (!order.items.length) {
    return false
  }
  const sessionItem = order.items[0] as OrderItem<SessionOrderItem>
  return sessionItem.data.instant
}
