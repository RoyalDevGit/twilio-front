import { useState, ChangeEvent } from 'react'
import { useMount } from 'react-use'
import { useRecoilState } from 'recoil'
import { ParsedUrlQuery } from 'querystring'
import { useTranslation } from 'next-i18next'

import { useRouter } from 'hooks/useRouter'
import { userState } from 'state/userState'
import { AuthApi } from 'apis/AuthApi'
import { ApiError, ApiErrorCode } from 'utils/error/ApiError'
import { TwoFactorAuthMethod, UserRole } from 'interfaces/User'
import {
  getOAuthErrorCookieAndDelete,
  isOAuthStateActive,
  stripOAuthFromQuery,
} from 'utils/oAuth/oAuthUtils'
import { TwoFactorErrorInfo } from 'interfaces/TwoFactorErrorInfo'
import { getCurrentTimeZone } from 'utils/date/getCurrentTimeZone'
import { isGuestUser } from 'utils/user/isGuestUser'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { AuthReason } from 'interfaces/AuthReason'

const removeSignupQueryParams = (query: ParsedUrlQuery) => {
  const cleanQuery = { ...query }
  delete cleanQuery['as']
  return cleanQuery
}

export type SignupFormData = {
  firstName: string
  lastName: string
  companyName: string
  emailAddress: string
  password: string
  confirmedPassword: string
  acceptedTerms: boolean
}

interface UseSignupProps {
  onSignup?: () => unknown
  initialSignupAs?: UserRole
}

export const useSignup = ({ onSignup, initialSignupAs }: UseSignupProps) => {
  const router = useRouter()
  const { query } = router
  const { t } = useTranslation([LocaleNamespace.SignupPage])
  const [user, setUser] = useRecoilState(userState)
  const cleanQuery = removeSignupQueryParams(query)
  const authReasonParam = query.authReason as AuthReason | undefined
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [signUpError, setSignUpError] = useState('')
  const [password, setPassword] = useState('')
  const [, setConfirmedPassword] = useState('')
  const [passwordScore, setPasswordScore] = useState(0)
  const [signupAs, setSignupAs] = useState<UserRole | undefined>(
    initialSignupAs
  )
  const [oAuthError, setOAuthError] = useState('')
  const oAuthEnabled: boolean = isOAuthStateActive(router)
  const [confirmationCode, setConfirmationCode] = useState('')
  const [twoFAError, setTwoFAError] = useState('')
  const [showTwoFA, setShowTwoFA] = useState(false)
  const [twoFAMessage, setTwoFAMessage] = useState('')
  const [twoFAMethod, setTwoFAMethod] = useState<
    TwoFactorAuthMethod | undefined
  >()
  const isGuest = isGuestUser(user)

  const handleOAuthApiError = (err: ApiError) => {
    switch (err.code) {
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
        setSignUpError(t('common:unknownError'))
        break
    }
  }

  const onSubmit2FACode = async () => {
    try {
      if (oAuthEnabled && showTwoFA) {
        setTwoFAMessage('')
        setIsSigningUp(true)
        const result = await AuthApi.oAuth2FA(`/api/oauth/login/2fa`, {
          otp: showTwoFA ? confirmationCode : undefined,
          twoFactorAuthMethod: showTwoFA ? twoFAMethod : undefined,
        })
        if (result.ok()) {
          const newUser = await result.getData()
          setUser(newUser)
          router.push({
            pathname: '/',
            query: stripOAuthFromQuery(cleanQuery),
          })
        } else {
          const err = await result.getError()
          handleOAuthApiError(err)
          setIsSigningUp(false)
        }
      }
    } catch (e) {
      setIsSigningUp(false)
      setTwoFAMessage(t('unknown2FAInstructions'))
    }
  }

  const onSubmit = async ({
    emailAddress,
    password,
    firstName,
    lastName,
    confirmedPassword,
    acceptedTerms,
  }: SignupFormData) => {
    try {
      setIsSigningUp(true)
      setSignUpError('')
      if (confirmedPassword !== password) {
        setSignUpError(t('passwordsNotMatch'))
        setIsSigningUp(false)
        return
      } else if (passwordScore < 0) {
        setSignUpError(t('password:invalidPassword'))
        setIsSigningUp(false)
        return
      } else if (!acceptedTerms) {
        setSignUpError(t('mustAcceptTerms'))
        setIsSigningUp(false)
        return
      }

      const roles: UserRole[] = [UserRole.Consumer]

      if (signupAs && signupAs === UserRole.Expert) {
        roles.push(UserRole.Expert)
      }

      const result = await AuthApi.signup({
        firstName,
        lastName,
        emailAddress,
        password,
        roles,
        timeZone: getCurrentTimeZone(),
        guestUserId: isGuest ? user?.id : undefined,
      })

      if (result.ok()) {
        const newUser = await result.getData()
        setUser(newUser)
        if (onSignup) {
          onSignup()
        }
      } else {
        const err = await result.getError()
        if (err.code === ApiErrorCode.AlreadyExists) {
          setSignUpError(t('emailAlreadyExists'))
        } else if (err.code === ApiErrorCode.InvalidPassword) {
          setSignUpError(t('password:invalidPassword'))
        } else {
          setSignUpError(t('common:unknownError'))
        }
        setIsSigningUp(false)
      }
    } catch (e) {
      setIsSigningUp(false)
      setSignUpError(t('common:unknownError'))
    }
  }

  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.currentTarget.value)
  }

  const handleConfirmedPasswordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setConfirmedPassword(e.currentTarget.value)
  }

  const handleSignupAsSelection = (userRoleSelected: UserRole) => {
    setSignupAs(userRoleSelected)
  }

  useMount(() => {
    if (oAuthEnabled) {
      const error: ApiError | null = getOAuthErrorCookieAndDelete(router)
      if (error) {
        handleOAuthApiError(error)
      }
    }
  })

  return {
    authReasonParam,
    isSigningUp,
    signUpError,
    password,
    oAuthError,
    twoFAError,
    showTwoFA,
    twoFAMessage,
    confirmationCode,
    cleanQuery,
    signupAs,
    setConfirmationCode,
    setPasswordScore,
    onSubmit2FACode,
    onSubmit,
    handlePasswordChange,
    handleConfirmedPasswordChange,
    handleSignupAsSelection,
    setSignupAs,
  }
}
