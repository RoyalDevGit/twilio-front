import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'
import { useUpdateEffect } from 'react-use'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import {
  LoginFormContainer,
  LoginForm,
  LoginPageHeader,
  LoginButton,
  ForgotPasswordGrid,
  LoginPageSubtitle,
  SignUpLinkGrid,
  LoginConfirmationCodeInput,
  ErrorMessageGrid,
  CustomTextField,
  SectionGridItem,
  BannerLogoTablet,
} from 'pageComponents/Login/DesktopLogin/styles'
import { Grid } from 'components/Grid'
import { JaggedUnderlinedLink } from 'components/JaggedUnderlineLink'
import { GlobalLoginStyle } from 'styles/GlobalLoginStyle'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { emailRegex } from 'utils/regex/email'
import { PageWithWallpaper } from 'components/PageWithWallpaper'
import { FormLabel } from 'components/Form/Label'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { LoginAndSignUpWallpaper } from 'components/LoginFeaturedExperts'
import { Checkbox } from 'components/Checkbox'
import { Link } from 'components/Link'
import { UserRole } from 'interfaces/User'
import { FormError } from 'components/Form/Error'
import { CheckedCheckboxIcon } from 'icons/Checkbox/Checked'
import { UncheckedCheckboxIcon } from 'icons/Checkbox/Unchecked'
import { StyledDividerSimple } from 'pageComponents/Signup/styles'
import { OAuthButtonContainer } from 'components/SocialMediaButtons'
import {
  BannerLogo,
  MobileBannerImage,
  MobileLoginBannerSection,
  MobileLoginFormContainer,
} from 'pageComponents/Login/MobileLogin/styles'
import { OAuthType } from 'interfaces/OAuth'
import { GuestUserAuthReason } from 'components/GuestUserAuthReasonMessage'
import { LoginFormData, useLogin } from 'hooks/useLogin'
import { useRouter } from 'hooks/useRouter'

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
  if (props.isMobile) {
    return <MobileLoginFormContainer>{props.children}</MobileLoginFormContainer>
  }
  return (
    <PageWithWallpaper wallPaperChildren={<LoginAndSignUpWallpaper />}>
      {props.children}
    </PageWithWallpaper>
  )
}

export const DesktopLogin = () => {
  const { t } = useTranslation([
    LocaleNamespace.LoginPage,
    LocaleNamespace.Common,
    LocaleNamespace.GuestUserAuthReasonMessage,
  ])

  const router = useRouter()
  const { query } = router

  const onLogin = () => {
    location.href = '/'
    /**
     * For now let's server side route
     */
    // router.push({
    //   pathname: '/',
    //   query: stripOAuthFromQuery(query),
    // })
  }

  const {
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
  } = useLogin({ onLogin })
  const { register, handleSubmit } = useForm<LoginFormData>()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))
  const isTablet = useMediaQuery(theme.breakpoints.only('tablet'))

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
    <>
      <GlobalLoginStyle />
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>
      {isMobile && (
        <MobileLoginBannerSection>
          <MobileBannerImage
            src={'/static/img/mobile-banner.png'}
            fill={true}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            unoptimized={false}
            alt=""
          />
          <Link href="/">
            <BannerLogo />
          </Link>
        </MobileLoginBannerSection>
      )}

      <ResponsiveWrapper isMobile={isMobile}>
        {isTablet && (
          <Link href="/">
            <BannerLogoTablet />
          </Link>
        )}
        <LoginFormContainer maxWidth={isMobile ? false : 'mobileL'}>
          <LoginForm
            id="signin-form"
            noValidate
            onSubmit={handleFormSubmit}
            autoComplete="off"
          >
            <Grid container spacing={2} alignItems="center">
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
                    isLogin={true}
                  />
                )}
              </Grid>
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
                      {isTablet ? t('logInTablet') : t('primaryLoginButton')}
                    </LoginButton>
                  </Grid>
                  <SignUpLinkGrid item mobileS={12}>
                    {t('noAccountSignUp')}{' '}
                    <JaggedUnderlinedLink
                      href={urlJoinWithQuery('/signup', query)}
                    >
                      {t('signUp')}
                    </JaggedUnderlinedLink>
                  </SignUpLinkGrid>
                  <SectionGridItem item mobileS={12}>
                    <StyledDividerSimple> or </StyledDividerSimple>
                  </SectionGridItem>
                  <SectionGridItem item mobileS={12}>
                    <OAuthButtonContainer
                      path={OAuthType.Login}
                      role={UserRole.Consumer}
                    />
                  </SectionGridItem>
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
    </>
  )
}
