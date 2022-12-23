import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { OAuthType } from 'interfaces/OAuth'
import { OAuthButtonContainer } from 'components/SocialMediaButtons'
import {
  AuthenticationSelectorContainer,
  SignUpWithEmailButton,
} from 'components/AuthenticationSelector/styles'
import { UserRole } from 'interfaces/User'
import { EmailIcon } from 'icons/Email'

interface AuthenticationSelectorProps {
  mode: 'signup' | 'login'
  onEmailSignup?: () => unknown
}

export const AuthenticationSelector: FC<
  React.PropsWithChildren<AuthenticationSelectorProps>
> = ({ mode, onEmailSignup }) => {
  const { t } = useTranslation(LocaleNamespace.Common)

  return (
    <AuthenticationSelectorContainer>
      <Button variant="contained" color="primary">
        {mode === 'signup'
          ? t('authenticationSelectorSignupMode')
          : t('authenticationSelectorLoginMode')}
      </Button>
      <Divider />

      <div>
        {mode === 'signup' && (
          <SignUpWithEmailButton onClick={onEmailSignup}>
            <EmailIcon />
            <Typography>{t(`emailSignupButton`)}</Typography>
          </SignUpWithEmailButton>
        )}
        <OAuthButtonContainer
          path={mode === 'signup' ? OAuthType.SignUp : OAuthType.Login}
          role={UserRole.Consumer}
        />
      </div>
    </AuthenticationSelectorContainer>
  )
}
