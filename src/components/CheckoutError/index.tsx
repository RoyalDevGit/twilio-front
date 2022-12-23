import { FC, ReactNode } from 'react'

import {
  CheckoutErrorContainer,
  ExclamationIcon,
} from 'components/CheckoutError/styles'
import { FormError } from 'components/Form/Error'

interface CheckoutErrorProps {
  children?: ReactNode
}

export const CheckoutError: FC<CheckoutErrorProps> = ({ children }) => (
  <CheckoutErrorContainer>
    <ExclamationIcon />
    <FormError>{children}</FormError>
  </CheckoutErrorContainer>
)
