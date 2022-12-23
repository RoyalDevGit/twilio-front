import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import {
  LoginMessage,
  MessageSection,
} from 'components/GuestUserAuthReasonMessage/Checkout/styles'
import { GuestUserAuthReasonMessageCheckoutIcon } from 'icons/GuestUserAuthReasonMessageCheckout'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface GuestUserLoginCheckoutMessageProps {
  isLogin: boolean
}

export const GuestUserLoginCheckoutMessage: FC<
  GuestUserLoginCheckoutMessageProps
> = ({ isLogin }) => {
  const { t } = useTranslation(LocaleNamespace.GuestUserAuthReasonMessage)

  return (
    <MessageSection>
      <GuestUserAuthReasonMessageCheckoutIcon />
      <LoginMessage>
        {t(isLogin ? 'loginMessageCheckout' : 'signupMessageCheckout')}
      </LoginMessage>
    </MessageSection>
  )
}
