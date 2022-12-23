import { FC, useEffect, useState } from 'react'
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import { useTimeout } from 'react-use'
import { Stripe, StripeElements } from '@stripe/stripe-js'

import { getStripe } from 'utils/commerce/getStripe'
import {
  PaymentElementContainer,
  StripeElementContainer,
  StripeElementLoadingContainer,
} from 'components/StripePaymentElement/styles'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

export type StripeInitializationHandler = (
  stripe: Stripe,
  elements: StripeElements
) => unknown
interface StripePaymentElementProps {
  clientSecret?: string | null
  onInitialize?: StripeInitializationHandler
}

export const useStripePaymentElement = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null)
  const [elements, setElements] = useState<StripeElements | null>(null)
  const [initialized, setInitialized] = useState(false)

  const onInitialize: StripeInitializationHandler = (stripe, elements) => {
    setStripe(stripe)
    setElements(elements)
    setInitialized(true)
  }

  return {
    initialized,
    onInitialize,
    stripe,
    elements,
  }
}

const PaymentForm: FC<StripePaymentElementProps> = ({ onInitialize }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isInitialized, setIsInitialized] = useState(false)
  const [mockLoadingFinished] = useTimeout(1000)

  const isLoading = !mockLoadingFinished() || !stripe || !elements

  useEffect(() => {
    if (isInitialized || isLoading || !stripe || !elements || !onInitialize) {
      return
    }
    onInitialize(stripe, elements)
    setIsInitialized(true)
  }, [isLoading, isInitialized, stripe, elements])

  if (isLoading) {
    return (
      <StripeElementLoadingContainer>
        <CircularProgress />
      </StripeElementLoadingContainer>
    )
  }

  return (
    <StripeElementContainer>
      <PaymentElementContainer data-testid="payment-element-container">
        <PaymentElement />
      </PaymentElementContainer>
    </StripeElementContainer>
  )
}

export const StripePaymentElement: FC<StripePaymentElementProps> = (props) => {
  const { clientSecret } = props
  const useDarkMode = usePrefersDarkMode()
  const theme = useTheme()
  if (!clientSecret) {
    return null
  }
  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        appearance: {
          theme: useDarkMode ? 'night' : 'stripe',
          variables: {
            colorDanger: theme.palette.error.main,
          },
        },
      }}
    >
      <PaymentForm {...props} />
    </Elements>
  )
}
