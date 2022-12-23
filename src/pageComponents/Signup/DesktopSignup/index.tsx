import { ReactNode, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useUpdateEffect } from 'react-use'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'

import {
  LoginFormContainer,
  LoginForm,
  LoginPageHeader,
  LoginButton,
  LoginPageSubtitle,
  SignUpLinkGrid,
  ErrorMessageGrid,
  LoginConfirmationCodeInput,
  SectionGridItem,
} from 'pageComponents/Login/DesktopLogin/styles'
import {
  TermsOfEventLink,
  TermsOfEventLabel,
  SignupAsContainer,
  StyledDivider,
  StyledDividerSimple,
  CustomTextField,
  SignupButtonText,
  SignUpButton,
  SignUpButtonSection,
  BannerLogoTablet,
  StyledGrid,
} from 'pageComponents/Signup/styles'
import { Grid } from 'components/Grid'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { emailRegex } from 'utils/regex/email'
import { PageWithWallpaper } from 'components/PageWithWallpaper'
import { FormLabel } from 'components/Form/Label'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { JaggedUnderlinedLink } from 'components/JaggedUnderlineLink'
import { SignupAs } from 'components/SignupAs'
import { Checkbox } from 'components/Checkbox'
import { FormError } from 'components/Form/Error'
import { OAuthButtonContainer } from 'components/SocialMediaButtons'
import {
  BannerLogo,
  MobileBannerImage,
  MobileFirstTimeSignupFormContainer,
  MobileSignupBannerSection,
  MobileSignupFormContainer,
} from 'pageComponents/Signup/MobileSignup/styles'
import { PasswordValidator } from 'components/Password/PasswordValidator'
import { OAuthType } from 'interfaces/OAuth'
import { DesktopSignupWallpaper } from 'components/DesktopSignupWallpaper'
import { Link } from 'components/Link'
import { LoginAndSignUpWallpaper } from 'components/LoginFeaturedExperts'
import { GuestUserAuthReason } from 'components/GuestUserAuthReasonMessage'
import { SignupFormData, useSignup } from 'hooks/useSignup'
import { useRouter } from 'hooks/useRouter'
import { UserRole } from 'interfaces/User'

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
  if (props.isMobile) {
    if (!props.roleSelected) {
      return (
        <MobileFirstTimeSignupFormContainer>
          {props.children}
        </MobileFirstTimeSignupFormContainer>
      )
    }

    return (
      <MobileSignupFormContainer>{props.children}</MobileSignupFormContainer>
    )
  }
  if (!props.roleSelected) {
    return (
      <PageWithWallpaper
        wallPaperChildren={<DesktopSignupWallpaper />}
        isSignUp={true}
      >
        {props.children}
      </PageWithWallpaper>
    )
  }
  return (
    <PageWithWallpaper wallPaperChildren={<LoginAndSignUpWallpaper />}>
      {props.children}
    </PageWithWallpaper>
  )
}

export const DesktopSignup = () => {
  const { t } = useTranslation([
    LocaleNamespace.SignupPage,
    LocaleNamespace.Password,
    LocaleNamespace.Common,
    LocaleNamespace.LoginPage,
    LocaleNamespace.GuestUserAuthReasonMessage,
  ])

  const router = useRouter()
  const { query } = router
  const {
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
  } = useSignup({
    onSignup: () => {
      location.href = '/'
      // router.push({
      //   pathname: '/',
      //   query: stripOAuthFromQuery(cleanQuery),
      // })
    },
  })
  const { register, handleSubmit } = useForm<SignupFormData>()
  const passwordField = register('password', { required: true })
  const confirmPasswordField = register('confirmedPassword', { required: true })
  const handleFormSubmit = handleSubmit(onSubmit)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))
  const isTablet = useMediaQuery(theme.breakpoints.only('tablet'))

  const asParam = query.as as UserRole | undefined

  useEffect(() => {
    if (asParam) {
      const asParamLower = asParam.toLowerCase()
      if (asParamLower === UserRole.Consumer) {
        setSignupAs(UserRole.Consumer)
        return
      }
      if (asParamLower === UserRole.Expert) {
        setSignupAs(UserRole.Expert)
        return
      }
    }
    setSignupAs(undefined)
  }, [asParam])

  useUpdateEffect(() => {
    if (confirmationCode && confirmationCode.length === 6) {
      onSubmit2FACode()
    }
  }, [confirmationCode])

  return (
    <>
      {isMobile && !!signupAs && (
        <MobileSignupBannerSection>
          <MobileBannerImage
            src={'/static/img/mobile-signup/mobile-signup-image.png'}
            fill={true}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            alt=""
            unoptimized={false}
          />
          <Link href="/">
            <BannerLogo />
          </Link>
        </MobileSignupBannerSection>
      )}
      <ResponsiveWrapper isMobile={isMobile} roleSelected={signupAs}>
        {isTablet && (
          <Link href="/">
            <BannerLogoTablet />
          </Link>
        )}
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
          <LoginFormContainer maxWidth={isMobile ? false : 'mobileL'}>
            <LoginForm
              id="signup-form"
              noValidate
              onSubmit={handleFormSubmit}
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item mobileS={12}>
                  <LoginPageHeader variant="h4">
                    {isTablet ? t('pageHeaderTablet') : t('pageHeader')}
                  </LoginPageHeader>

                  {!authReasonParam && (
                    <LoginPageSubtitle>
                      {isTablet
                        ? t('pleaseEnterYourDetailsTablet')
                        : t('pleaseEnterYourDetails')}
                    </LoginPageSubtitle>
                  )}

                  {authReasonParam && (
                    <GuestUserAuthReason
                      authReason={authReasonParam}
                      isLogin={false}
                    />
                  )}
                </Grid>
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
            <StyledGrid container spacing={2}>
              <SignUpLinkGrid item mobileS={12}>
                {isTablet ? t('alreadyHaveAnAccount') : t('haveAnAccount')}{' '}
                <JaggedUnderlinedLink
                  href={urlJoinWithQuery('/login', cleanQuery)}
                >
                  {t('signIn')}
                </JaggedUnderlinedLink>
              </SignUpLinkGrid>
              <SectionGridItem item mobileS={12}>
                <StyledDividerSimple> or </StyledDividerSimple>
              </SectionGridItem>
              <SectionGridItem item mobileS={12}>
                <OAuthButtonContainer role={signupAs} path={OAuthType.SignUp} />
              </SectionGridItem>
            </StyledGrid>
          </LoginFormContainer>
        )}
        {!signupAs && !showTwoFA && (
          <SignupAsContainer maxWidth="tablet">
            <Grid container>
              <Grid item mobileS={12}>
                <SignupAs onSelection={handleSignupAsSelection} />
              </Grid>
            </Grid>
            {!isMobile && <StyledDivider> or </StyledDivider>}

            <Grid container>
              <SignUpButtonSection item mobileS={12}>
                <Link
                  id="signup-login"
                  href={urlJoinWithQuery('/login', cleanQuery)}
                >
                  <SignUpButton fullWidth variant="contained" color="secondary">
                    <SignupButtonText>{t('signInButton')}</SignupButtonText>
                  </SignUpButton>
                </Link>
              </SignUpButtonSection>
            </Grid>
          </SignupAsContainer>
        )}
        {!!oAuthError && (
          <Grid item mobileS={12}>
            <FormError>{oAuthError}</FormError>
          </Grid>
        )}
      </ResponsiveWrapper>
    </>
  )
}
