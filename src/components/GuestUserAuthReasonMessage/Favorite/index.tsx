import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import {
  LoginMessage,
  MessageSection,
} from 'components/GuestUserAuthReasonMessage/Favorite/styles'
import { GuestUserAuthReasonMessageFavoriteIcon } from 'icons/GuestUserAuthReasonMessageFavorite'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface GuestUserLoginFavoriteMessageProps {
  isLogin: boolean
}

export const GuestUserLoginFavoriteMessage: FC<
  GuestUserLoginFavoriteMessageProps
> = ({ isLogin }) => {
  const { t } = useTranslation(LocaleNamespace.GuestUserAuthReasonMessage)

  return (
    <MessageSection>
      <GuestUserAuthReasonMessageFavoriteIcon />
      <LoginMessage>
        {t(isLogin ? 'loginMessageFavorite' : 'signupMessageFavorite')}
      </LoginMessage>
    </MessageSection>
  )
}
