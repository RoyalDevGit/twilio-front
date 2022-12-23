import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  AuthenticationControlContainer,
  AuthenticationModeToggle,
  AuthenticationModeToggleButton,
  AuthenticationModeToggleLabel,
  ControlContainer,
} from 'components/AuthenticationControl/styles'
import { SignupControl } from 'components/AuthenticationControl/SignupControl'
import { LoginControl } from 'components/AuthenticationControl/LoginControl'

export type AuthenticationMode = 'signup' | 'login'
interface AuthenticationControlProps {
  mode: AuthenticationMode
  onAuthentication?: () => unknown
  onAuthenticationModeChange?: (mode: AuthenticationMode) => unknown
}

export const AuthenticationControl: FC<AuthenticationControlProps> = ({
  mode,
  onAuthentication,
  onAuthenticationModeChange,
}) => {
  const { t } = useTranslation(LocaleNamespace.LoginPage)

  return (
    <AuthenticationControlContainer>
      <AuthenticationModeToggle>
        <AuthenticationModeToggleLabel>
          {mode === 'signup' ? t('haveAccountLogin') : t('noAccountSignUp')}
        </AuthenticationModeToggleLabel>
        <AuthenticationModeToggleButton
          variant="text"
          color="primary"
          onClick={() =>
            onAuthenticationModeChange?.(mode === 'signup' ? 'login' : 'signup')
          }
        >
          {mode === 'signup' ? t('logIn') : t('signUp')}
        </AuthenticationModeToggleButton>
      </AuthenticationModeToggle>
      <ControlContainer>
        {mode === 'signup' ? (
          <SignupControl onSignup={onAuthentication} />
        ) : (
          <LoginControl onLogin={onAuthentication} />
        )}
      </ControlContainer>
    </AuthenticationControlContainer>
  )
}
