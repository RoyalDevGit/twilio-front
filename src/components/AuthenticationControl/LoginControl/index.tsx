import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { useUpdateEffect } from 'react-use'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { FC, ReactNode } from 'react'
import Divider from '@mui/material/Divider'

import {
  LoginForm,
  LoginButton,
  ForgotPasswordGrid,
  LoginConfirmationCodeInput,
  ErrorMessageGrid,
  CustomTextField,
} from 'pageComponents/Login/DesktopLogin/styles'
import { Grid } from 'components/Grid'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { emailRegex } from 'utils/regex/email'
import { FormLabel } from 'components/Form/Label'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Checkbox } from 'components/Checkbox'
import { Link } from 'components/Link'
import { FormError } from 'components/Form/Error'
import { CheckedCheckboxIcon } from 'icons/Checkbox/Checked'
import { UncheckedCheckboxIcon } from 'icons/Checkbox/Unchecked'
import { LoginFormData, useLogin } from 'hooks/useLogin'
import { useRouter } from 'hooks/useRouter'
import { LoginFormContainer } from 'components/AuthenticationControl/styles'
import { OAuthButtonContainer } from 'components/SocialMediaButtons'
import { OAuthType } from 'interfaces/OAuth'
import { UserRole } from 'interfaces/User'

interface ResponsiveWrapperProps {
  children: ReactNode
  isMobile: boolean
}

/**
 * This will help provide a unified responsive design on
 * both mobile and destktop without having to create two files
 * @param props
 * @returns
 */
function ResponsiveWrapper(props: ResponsiveWrapperProps) {
  return <LoginFormContainer>{props.children}</LoginFormContainer>
}

interface LoginControlProps {
  onLogin?: () => unknown
}

export const LoginControl: FC<LoginControlProps> = ({ onLogin }) => {
  const { t } = useTranslation([
    LocaleNamespace.LoginPage,
    LocaleNamespace.Common,
    LocaleNamespace.GuestUserAuthReasonMessage,
  ])

  const router = useRouter()
  const { query } = router

  const {
    oAuthError,
    isLoggingIn,
    loginError,
    twoFAError,
    twoFAMessage,
    confirmationCode,
    showTwoFA,
    setConfirmationCode,
    onSubmit,
  } = useLogin({ onLogin })
  const { register, handleSubmit } = useForm<LoginFormData>()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const handleFormSubmit = handleSubmit(onSubmit)

  const handleConfirmationCodeChange = (code: string) => {
    setConfirmationCode(code)
  }

  useUpdateEffect(() => {
    if (confirmationCode && confirmationCode.length === 6) {
      handleFormSubmit()
    }
  }, [confirmationCode])

  return (
    <ResponsiveWrapper isMobile={isMobile}>
      <LoginFormContainer>
        <LoginForm
          id="signin-form"
          noValidate
          onSubmit={handleFormSubmit}
          autoComplete="off"
        >
          <Grid container spacing={2} alignItems="center">
            {!showTwoFA && (
              <>
                <Grid item mobileS={12}>
                  <FormLabel required>{t('emailLabel')}</FormLabel>
                  <CustomTextField
                    id="login-email-field"
                    placeholder={t('emailPlaceholder')}
                    type="email"
                    variant="outlined"
                    fullWidth
                    {...register('emailAddress', {
                      required: true,
                      pattern: emailRegex,
                    })}
                  />
                </Grid>
                <Grid item mobileS={12}>
                  <FormLabel required>{t('passwordLabel')}</FormLabel>
                  <CustomTextField
                    id="login-password-field"
                    placeholder={t('passwordHelper')}
                    type="password"
                    variant="outlined"
                    fullWidth
                    {...register('password', { required: true })}
                  />
                </Grid>
                <Grid item mobileS={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="login-remember-me"
                        icon={<UncheckedCheckboxIcon />}
                        checkedIcon={<CheckedCheckboxIcon />}
                      />
                    }
                    label={t<string>('rememberMe')}
                  />
                </Grid>
                <ForgotPasswordGrid item mobileS={6}>
                  <Link
                    id="login-forgot-password"
                    href={urlJoinWithQuery('/forgot-password', query)}
                  >
                    {t('forgotPassword')}
                  </Link>
                </ForgotPasswordGrid>
                {!!loginError && (
                  <ErrorMessageGrid item mobileS={12}>
                    <FormError>{loginError}</FormError>
                  </ErrorMessageGrid>
                )}
                <Grid item mobileS={12}>
                  <LoginButton
                    state={isLoggingIn ? 'loading' : 'normal'}
                    type="submit"
                    color="primary"
                    variant="contained"
                    id="login-sign-in-button"
                  >
                    {t('primaryLoginButton')}
                  </LoginButton>
                </Grid>
                <Grid item mobileS={12}>
                  <Divider flexItem variant="fullWidth" />
                </Grid>
                <Divider flexItem variant="fullWidth" />
                <Grid item mobileS={12}>
                  <OAuthButtonContainer
                    path={OAuthType.Login}
                    role={UserRole.Consumer}
                  />
                </Grid>
              </>
            )}
            {showTwoFA && (
              <>
                <Grid item mobileS={12}>
                  <Typography>{twoFAMessage}</Typography>
                  <LoginConfirmationCodeInput
                    value={confirmationCode}
                    onChange={handleConfirmationCodeChange}
                  />
                </Grid>
                {!!twoFAError && (
                  <ErrorMessageGrid item mobileS={12}>
                    <FormError>{twoFAError}</FormError>
                  </ErrorMessageGrid>
                )}
                <Grid item mobileS={12}>
                  <LoginButton
                    state={isLoggingIn ? 'loading' : 'normal'}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {t('submit2FACode')}
                  </LoginButton>
                </Grid>
              </>
            )}
          </Grid>
        </LoginForm>
        {!!oAuthError && (
          <ErrorMessageGrid item mobileS={12}>
            <FormError>{oAuthError}</FormError>
          </ErrorMessageGrid>
        )}
      </LoginFormContainer>
    </ResponsiveWrapper>
  )
}
