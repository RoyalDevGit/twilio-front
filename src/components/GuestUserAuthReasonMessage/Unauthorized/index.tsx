import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import {
  LoginMessage,
  MessageSection,
} from 'components/GuestUserAuthReasonMessage/Unauthorized/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Image } from 'components/Image'

export interface GuestUserLoginUnauthorizedMessageProps {
  isLogin: boolean
}

export const GuestUserLoginUnauthorizedMessage: FC<
  GuestUserLoginUnauthorizedMessageProps
> = ({ isLogin }) => {
  const { t } = useTranslation(LocaleNamespace.GuestUserAuthReasonMessage)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  let imageWidth = 62
  let imageHeight = 75

  if (isMobile) {
    imageWidth = 72
    imageHeight = 85
  }

  return (
    <MessageSection>
      <Image
        src="/static/img/unauthorized-page-icon.png"
        width={imageWidth}
        height={imageHeight}
        alt=""
      />
      <LoginMessage>
        {t(isLogin ? 'loginMessageUnauthorized' : 'signupMessageUnauthorized')}
      </LoginMessage>
    </MessageSection>
  )
}
