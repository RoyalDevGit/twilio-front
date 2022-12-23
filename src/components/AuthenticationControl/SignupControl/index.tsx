import { FC, ReactNode } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useUpdateEffect } from 'react-use'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import Divider from '@mui/material/Divider'

import {
  LoginFormContainer,
  LoginForm,
  LoginPageHeader,
  LoginButton,
  ErrorMessageGrid,
  LoginConfirmationCodeInput,
} from 'pageComponents/Login/DesktopLogin/styles'
import {
  TermsOfEventLink,
  TermsOfEventLabel,
  CustomTextField,
} from 'pageComponents/Signup/styles'
import { Grid } from 'components/Grid'
import { emailRegex } from 'utils/regex/email'
import { FormLabel } from 'components/Form/Label'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Checkbox } from 'components/Checkbox'
import { FormError } from 'components/Form/Error'
import { MobileFirstTimeSignupFormContainer } from 'pageComponents/Signup/MobileSignup/styles'
import { PasswordValidator } from 'components/Password/PasswordValidator'
import { SignupFormData, useSignup } from 'hooks/useSignup'
import { UserRole } from 'interfaces/User'
import { SignupFormContainer } from 'components/AuthenticationControl/styles'
import { OAuthButtonContainer } from 'components/SocialMediaButtons'
import { OAuthType } from 'interfaces/OAuth'

interface ResponsiveWrapperProps {
  children: ReactNode
  isMobile: boolean
  roleSelected?: string
}

/**
 * This will help provide a unified responsive design on
 * both mobile and destktop without having to create two files
 * @param props
 * @returns
 */
function ResponsiveWrapper(props: ResponsiveWrapperProps) {
  if (!props.roleSelected) {
    return (
      <MobileFirstTimeSignupFormContainer>
        {props.children}
      </MobileFirstTimeSignupFormContainer>
    )
  }

  return <SignupFormContainer>{props.children}</SignupFormContainer>
}

interface SignupControlProps {
  onSignup?: () => unknown
}

export const SignupControl: FC<SignupControlProps> = ({ onSignup }) => {
  const { t } = useTranslation([
    LocaleNamespace.SignupPage,
    LocaleNamespace.Password,
    LocaleNamespace.Common,
    LocaleNamespace.LoginPage,
    LocaleNamespace.GuestUserAuthReasonMessage,
  ])
  const {
    isSigningUp,
    signUpError,
    password,
    oAuthError,
    twoFAError,
    showTwoFA,
    twoFAMessage,
    confirmationCode,
    signupAs,
    setConfirmationCode,
    setPasswordScore,
    onSubmit2FACode,
    onSubmit,
    handlePasswordChange,
    handleConfirmedPasswordChange,
  } = useSignup({
    onSignup,
    initialSignupAs: UserRole.Consumer,
  })
  const { register, handleSubmit } = useForm<SignupFormData>()
  const passwordField = register('password', { required: true })
  const confirmPasswordField = register('confirmedPassword', { required: true })
  const handleFormSubmit = handleSubmit(onSubmit)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))
  useUpdateEffect(() => {
    if (confirmationCode && confirmationCode.length === 6) {
      onSubmit2FACode()
    }
  }, [confirmationCode])

  return (
    <ResponsiveWrapper isMobile={isMobile} roleSelected={signupAs}>
      {showTwoFA && (
        <LoginFormContainer maxWidth={isMobile ? false : 'mobileM'}>
          <Grid item mobileS={12}>
            <LoginPageHeader variant="h4">{t('welcomeBack')}</LoginPageHeader>
          </Grid>
          <Grid item mobileS={12}>
            <Typography>{twoFAMessage}</Typography>
            <LoginConfirmationCodeInput
              value={confirmationCode}
              onChange={(code) => setConfirmationCode(code)}
            />
          </Grid>
          {!!twoFAError && (
            <ErrorMessageGrid item mobileS={12}>
              <FormError>{twoFAError}</FormError>
            </ErrorMessageGrid>
          )}
          <Grid item mobileS={12}>
            <LoginButton
              state={isSigningUp ? 'loading' : 'normal'}
              type="submit"
              variant="contained"
              color="primary"
              onClick={onSubmit2FACode}
            >
              {t('submit2FACode')}
            </LoginButton>
          </Grid>
        </LoginFormContainer>
      )}
      {!!signupAs && !showTwoFA && (
        <SignupFormContainer>
          <LoginForm
            id="signup-form"
            noValidate
            onSubmit={handleFormSubmit}
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item mobileS={12}>
                <FormLabel required>{t('firstNameLabel')}</FormLabel>
                <CustomTextField
                  id="signup-first-name"
                  placeholder={t('firstNamePlaceholder')}
                  type="text"
                  variant="outlined"
                  fullWidth
                  {...register('firstName', {
                    required: true,
                  })}
                />
              </Grid>
              <Grid item mobileS={12}>
                <FormLabel required>{t('lastNameLabel')}</FormLabel>
                <CustomTextField
                  id="signup-last-name"
                  placeholder={t('lastNamePlaceholder')}
                  type="text"
                  variant="outlined"
                  fullWidth
                  {...register('lastName', {
                    required: true,
                  })}
                />
              </Grid>
              <Grid item mobileS={12}>
                <FormLabel required>{t('emailLabel')}</FormLabel>
                <CustomTextField
                  id="signup-email"
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
                  id="signup-password"
                  placeholder={t('passwordPlaceholder')}
                  type="password"
                  variant="outlined"
                  fullWidth
                  {...passwordField}
                  onChange={(e) => {
                    passwordField.onChange(e)
                    handlePasswordChange(e)
                  }}
                />
                <PasswordValidator
                  password={password}
                  onChangeScore={(score) => {
                    setPasswordScore(score)
                  }}
                />
              </Grid>
              <Grid item mobileS={12}>
                <FormLabel required>{t('confirmPasswordLabel')}</FormLabel>
                <CustomTextField
                  id="signup-confirm-password"
                  placeholder={t('confirmPasswordPlaceholder')}
                  type="password"
                  variant="outlined"
                  fullWidth
                  {...confirmPasswordField}
                  onChange={(e) => {
                    confirmPasswordField.onChange(e)
                    handleConfirmedPasswordChange(e)
                  }}
                />
              </Grid>
              <Grid item mobileS={12}>
                <FormGroup>
                  <FormControlLabel
                    {...register('acceptedTerms')}
                    control={
                      <Checkbox color="secondary" id="signup-accept-terms" />
                    }
                    label={
                      <TermsOfEventLabel>
                        <span>{t('acceptanceOfTerms')}</span>{' '}
                        <TermsOfEventLink
                          href="/terms-of-service"
                          id="signup-terms-of-service"
                        >
                          {t('termsOfService')}
                        </TermsOfEventLink>
                      </TermsOfEventLabel>
                    }
                  />
                </FormGroup>
              </Grid>
              {!!signUpError && (
                <ErrorMessageGrid item mobileS={12}>
                  <FormError id="signup-error">{signUpError}</FormError>
                </ErrorMessageGrid>
              )}
              <Grid item mobileS={12}>
                <LoginButton
                  id="signup-button"
                  state={isSigningUp ? 'loading' : 'normal'}
                  type="submit"
                  color="primary"
                  size="large"
                  variant="contained"
                >
                  {t('signupButton')}
                </LoginButton>
              </Grid>
            </Grid>
          </LoginForm>
          <Divider flexItem variant="fullWidth" />
          <Grid container spacing={2}>
            <Grid item mobileS={12}>
              <OAuthButtonContainer role={signupAs} path={OAuthType.SignUp} />
            </Grid>
          </Grid>
        </SignupFormContainer>
      )}
      {!!oAuthError && (
        <Grid item mobileS={12}>
          <FormError>{oAuthError}</FormError>
        </Grid>
      )}
    </ResponsiveWrapper>
  )
}
