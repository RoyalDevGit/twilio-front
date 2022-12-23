import { useState } from 'react'
import { useMount } from 'react-use'
import { useRecoilState } from 'recoil'
import { useTranslation } from 'next-i18next'

import { userState } from 'state/userState'
import { AuthApi } from 'apis/AuthApi'
import { ApiError, ApiErrorCode } from 'utils/error/ApiError'
import { TwoFactorErrorInfo } from 'interfaces/TwoFactorErrorInfo'
import { TwoFactorAuthMethod } from 'interfaces/User'
import { isGuestUser } from 'utils/user/isGuestUser'
import {
  getOAuthErrorCookieAndDelete,
  isOAuthStateActive,
} from 'utils/oAuth/oAuthUtils'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { AuthReason } from 'interfaces/AuthReason'
import { useRouter } from 'hooks/useRouter'

export type LoginFormData = {
  emailAddress: string
  password: string
}

interface UseLoginProps {
  onLogin?: () => unknown
}

export const useLogin = ({ onLogin }: UseLoginProps) => {
  const { t } = useTranslation([
    LocaleNamespace.LoginPage,
    LocaleNamespace.Common,
    LocaleNamespace.GuestUserAuthReasonMessage,
  ])
  const router = useRouter()
  const { query } = router
  const [confirmationCode, setConfirmationCode] = useState('')
  const authReasonParam = query.authReason as AuthReason | undefined
  const oAuthEnabled: boolean = isOAuthStateActive(router)
  const [oAuthError, setOAuthError] = useState('')
  const [user, setUser] = useRecoilState(userState)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [twoFAError, setTwoFAError] = useState('')
  const [showTwoFA, setShowTwoFA] = useState(false)
  const [twoFAMessage, setTwoFAMessage] = useState('')
  const [twoFAMethod, setTwoFAMethod] = useState<
    TwoFactorAuthMethod | undefined
  >()
  const isGuest = isGuestUser(user)

  const handleAuthentication = async (
    emailAddress: string,
    password: string
  ) => {
    if (oAuthEnabled && showTwoFA) {
      const userResult = await AuthApi.oAuth2FA(`/api/oauth/login/2fa`, {
        otp: showTwoFA ? confirmationCode : undefined,
        twoFactorAuthMethod: showTwoFA ? twoFAMethod : undefined,
      })
      return userResult
    } else {
      const userResult = await AuthApi.login({
        emailAddress,
        password,
        twoFactorAuthMethod: showTwoFA ? twoFAMethod : undefined,
        otp: showTwoFA ? confirmationCode : undefined,
        guestUserId: isGuest ? user?.id : undefined,
      })
      return userResult
    }
  }

  const handleApiError = (err: ApiError) => {
    switch (err.code) {
      case ApiErrorCode.IncorrectCredentials:
        setLoginError(t('incorrectCredentials'))
        break
      case ApiErrorCode.NotFound:
        setLoginError(t('userNotFound'))
        break
      case ApiErrorCode.Incorrect2FA:
        setTwoFAError(t('incorrect2FACodeMessage'))
        break
      case ApiErrorCode.Require2FA:
        // eslint-disable-next-line no-case-declarations
        const twoFAError = err as ApiError<TwoFactorErrorInfo>
        setShowTwoFA(true)
        setTwoFAMethod(twoFAError.data?.method)
        switch (twoFAError.data?.method) {
          case TwoFactorAuthMethod.Authenticator:
            setTwoFAMessage(t('2FAAuthenticatorAppInstructions'))
            break
          case TwoFactorAuthMethod.SMS:
            setTwoFAMessage(t('2FASmsInstructions'))
            break
          default:
            setTwoFAMessage(t('unknown2FAInstructions'))
            break
        }
        break
      case ApiErrorCode.OAuthCodeExpired:
        setOAuthError(t('oAuthCodeExpired'))
        break
      case ApiErrorCode.OAuthCodeAlreadyUsed:
        setOAuthError(t('oAuthCodeAlreadyUsed'))
        break
      case ApiErrorCode.OAuthCodeUnknown:
        if (showTwoFA) {
          setTwoFAError(t('oAuthUknown'))
        } else {
          setOAuthError(t('oAuthUknown'))
        }
        break
      default:
        setLoginError(t('common:unknownError'))
        break
    }
  }

  const onSubmit = async ({ emailAddress, password }: LoginFormData) => {
    try {
      setIsLoggingIn(true)
      setLoginError('')
      const userResult = await handleAuthentication(emailAddress, password)
      if (userResult.ok()) {
        const user = await userResult.getData()
        setUser(user)
        if (onLogin) {
          onLogin()
        }
      } else {
        const err = await userResult.getError()
        handleApiError(err)
        setIsLoggingIn(false)
      }
    } catch (e) {
      setLoginError(t('common:unknownError'))
      setIsLoggingIn(false)
    }
  }

  useMount(() => {
    if (oAuthEnabled) {
      const error: ApiError | null = getOAuthErrorCookieAndDelete(router)
      if (error) {
        handleApiError(error)
      }
    }
  })

  return {
    oAuthError,
    isLoggingIn,
    loginError,
    twoFAError,
    twoFAMessage,
    authReasonParam,
    confirmationCode,
    showTwoFA,
    setConfirmationCode,
    onSubmit,
  }
}
