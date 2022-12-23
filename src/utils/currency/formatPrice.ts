import { Price } from 'interfaces/Price'

export const formatPrice = (price: Price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currencyCode,
    minimumFractionDigits: 2,
  }).format(price.amount)
