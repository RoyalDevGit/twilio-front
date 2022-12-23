import { ChangeEvent, useState, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useRouter } from 'hooks/useRouter'
import { ForgotPasswordHeader } from 'pageComponents/ForgotPassword/styles'
import {
  LoginFormContainer,
  LoginForm,
  LoginButton,
  SignUpLinkGrid,
  ErrorMessageGrid,
} from 'pageComponents/Login/DesktopLogin/styles'
import { Grid } from 'components/Grid'
import { GlobalLoginStyle } from 'styles/GlobalLoginStyle'
import { AuthApi } from 'apis/AuthApi'
import { FormLabel } from 'components/Form/Label'
import { ApiErrorCode } from 'utils/error/ApiError'
import { JaggedUnderlinedLink } from 'components/JaggedUnderlineLink'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { PageWithWallpaper } from 'components/PageWithWallpaper'
import { LoginAndSignUpWallpaper } from 'components/LoginFeaturedExperts'
import { FormError } from 'components/Form/Error'
import {
  BannerLogo,
  MobileBannerImage,
  MobileLoginBannerSection,
  MobileLoginFormContainer,
} from 'pageComponents/ResetPassword/MobileResetPassword/styles'
import { PasswordValidator } from 'components/Password/PasswordValidator'
import { Link } from 'components/Link'

type FormData = {
  password: string
  confirmedPassword: string
}

interface IResponsiveWrapperProps {
  children: ReactNode
  isMobile: boolean
}

/**
 * This will help provide a unified responsive design on
 * both mobile and destktop without having to create two files
 * @param props
 * @returns
 */
function ResponsiveWrapper(props: IResponsiveWrapperProps) {
  if (props.isMobile) {
    return <MobileLoginFormContainer>{props.children}</MobileLoginFormContainer>
  }
  return (
    <PageWithWallpaper wallPaperChildren={<LoginAndSignUpWallpaper />}>
      {props.children}
    </PageWithWallpaper>
  )
}

export const DesktopResetPassword = () => {
  const { t } = useTranslation([
    'resetPassword',
    'common',
    'signupPage',
    'password',
    'loginPage',
  ])
  const router = useRouter()
  const [resetPassword, setResetPassword] = useState(false)
  const [resetPasswordError, setResetPasswordError] = useState('')
  const { register, handleSubmit } = useForm<FormData>()
  const [password, setPassword] = useState('')
  const [, setConfirmedPassword] = useState('')
  const [passwordScore, setPasswordScore] = useState(0)
  const { query } = router
  const { token } = query

  const passwordField = register('password', { required: true })
  const confirmPasswordField = register('confirmedPassword', { required: true })
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const onSubmit = handleSubmit(
    async ({ password, confirmedPassword }: FormData) => {
      try {
        setResetPassword(true)
        setResetPasswordError('')
        if (confirmedPassword !== password) {
          setResetPasswordError(t('passwordsNotMatch'))
          setResetPassword(false)
          return
        } else if (passwordScore < 1) {
          setResetPasswordError(t('invalidPassword'))
          setResetPassword(false)
          return
        }
        const result = await AuthApi.resetPassword(password, token as string)
        if (result.ok()) {
          router.push({
            pathname: '/',
            query,
          })
        } else {
          const err = await result.getError()
          if (err.code === ApiErrorCode.Expired) {
            setResetPasswordError(t('resetLinkHasExpired'))
          } else if (err.code === ApiErrorCode.InvalidPassword) {
            setResetPasswordError(t('password:invalidPassword'))
          } else {
            setResetPasswordError(t('common:unknownError'))
          }
          setResetPassword(false)
        }
      } catch (e) {
        setResetPassword(false)
        setResetPasswordError(t('common:unknownError'))
      }
    }
  )

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
        <LoginFormContainer maxWidth={isMobile ? false : 'mobileM'}>
          <LoginForm noValidate onSubmit={onSubmit} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item mobileS={12}>
                <ForgotPasswordHeader variant="h4">
                  {t('resetPassword')}
                </ForgotPasswordHeader>
              </Grid>
              <Grid item mobileS={12}>
                <FormLabel required>{t('signupPage:passwordLabel')}</FormLabel>
                <TextField
                  fullWidth
                  placeholder={t('signupPage:passwordPlaceholder')}
                  type="password"
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
                <FormLabel required>
                  {t('signupPage:confirmPasswordLabel')}
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder={t('signupPage:confirmPasswordPlaceholder')}
                  type="password"
                  {...confirmPasswordField}
                  onChange={(e) => {
                    confirmPasswordField.onChange(e)
                    handleConfirmedPasswordChange(e)
                  }}
                />
              </Grid>
              {!!resetPasswordError && (
                <ErrorMessageGrid item mobileS={12}>
                  <FormError>{resetPasswordError}</FormError>
                </ErrorMessageGrid>
              )}
              <Grid item mobileS={12}>
                <LoginButton
                  state={resetPassword ? 'loading' : 'normal'}
                  type="submit"
                  color="secondary"
                  size="large"
                  variant="contained"
                >
                  {t('resetPasswordButton')}
                </LoginButton>
              </Grid>
              <SignUpLinkGrid item mobileS={12}>
                {t('goBack')}{' '}
                <JaggedUnderlinedLink href={urlJoinWithQuery('/signup', query)}>
                  {t('signIn')}
                </JaggedUnderlinedLink>
              </SignUpLinkGrid>
            </Grid>
          </LoginForm>
        </LoginFormContainer>
      </ResponsiveWrapper>
    </>
  )
}
