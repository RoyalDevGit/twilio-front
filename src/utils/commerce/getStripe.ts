import { Stripe, loadStripe } from '@stripe/stripe-js'

import { Config } from 'utils/config'

const STRIPE_PUBLISHABLE_KEY = Config.getString('STRIPE_PUBLISHABLE_KEY')

let stripePromise: Promise<Stripe | null>
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY, {
      betas: ['process_order_beta_1'],
      apiVersion: '2020-08-27; orders_beta=v3',
    })
  }
  return stripePromise
}
