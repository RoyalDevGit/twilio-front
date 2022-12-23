import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import TextField from '@mui/material/TextField'

import { useRouter } from 'hooks/useRouter'
import {
  ForgotPasswordHeader,
  ForgotPasswordHeaderBox,
} from 'pageComponents/ForgotPassword/DesktopForgotPassword/styles'
import {
  LoginFormContainer,
  LoginForm,
  LoginButton,
  SignUpLinkGrid,
  ErrorMessageGrid,
} from 'pageComponents/Login/DesktopLogin/styles'
import { Grid } from 'components/Grid'
import { GlobalLoginStyle } from 'styles/GlobalLoginStyle'
import { emailRegex } from 'utils/regex/email'
import { AuthApi } from 'apis/AuthApi'
import { FormLabel } from 'components/Form/Label'
import { ApiErrorCode } from 'utils/error/ApiError'
import { JaggedUnderlinedLink } from 'components/JaggedUnderlineLink'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { PageWithWallpaper } from 'components/PageWithWallpaper'
import { LoginAndSignUpWallpaper } from 'components/LoginFeaturedExperts'
import { ResetPasswordDescription } from 'pageComponents/ForgotPassword/MobileForgotPassword/styles'
import { FormError } from 'components/Form/Error'

type FormData = {
  emailAddress: string
}

export const DesktopForgotPassword = () => {
  const { t } = useTranslation(['forgotPassword', 'common', 'loginPage'])
  const [forgetPasswordSuccess, setForgetPasswordSuccess] = useState('')
  const [forgetPassword, setForgetPassword] = useState(false)
  const [forgetPasswordError, setForgetPasswordError] = useState('')
  const { register, handleSubmit } = useForm<FormData>()

  const router = useRouter()
  const { query } = router

  const onSubmit = handleSubmit(async ({ emailAddress }: FormData) => {
    try {
      const result = await AuthApi.sendResetPasswordLink(emailAddress)
      if (result.ok()) {
        setForgetPassword(true)
        setForgetPasswordError('')
        setForgetPasswordSuccess(t('passwordResetConfirmation'))
      } else {
        const err = await result.getError()
        if (err.code === ApiErrorCode.NotFound) {
          setForgetPassword(true)
          setForgetPasswordError('')
          setForgetPasswordSuccess(t('passwordResetConfirmation'))
        } else {
          setForgetPassword(false)
          setForgetPasswordError(t('common:unknownError'))
        }
      }
    } catch (e) {
      setForgetPassword(false)
      setForgetPasswordError(t('common:unknownError'))
    }
  })

  return (
    <>
      <GlobalLoginStyle />
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>
      <PageWithWallpaper wallPaperChildren={<LoginAndSignUpWallpaper />}>
        <LoginFormContainer maxWidth="mobileM">
          <LoginForm noValidate onSubmit={onSubmit} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item mobileS={12}>
                <ForgotPasswordHeaderBox>
                  <ForgotPasswordHeader variant="h4">
                    {t('pageTitle')}
                  </ForgotPasswordHeader>
                  {forgetPassword ? (
                    <ResetPasswordDescription>
                      {forgetPasswordSuccess}
                    </ResetPasswordDescription>
                  ) : (
                    <ResetPasswordDescription>
                      {t('resetPasswordDescription')}
                    </ResetPasswordDescription>
                  )}
                </ForgotPasswordHeaderBox>
              </Grid>
              {forgetPassword ? (
                <Grid item mobileS={12}>
                  <LoginButton
                    href="/login"
                    color="secondary"
                    size="large"
                    variant="contained"
                  >
                    {t('backToLoginLabel')}
                  </LoginButton>
                </Grid>
              ) : (
                <>
                  <Grid item mobileS={12}>
                    <FormLabel required>{t('emailLabel')}</FormLabel>
                    <TextField
                      placeholder={t('emailPlaceholder')}
                      fullWidth
                      type="email"
                      {...register('emailAddress', {
                        required: true,
                        pattern: emailRegex,
                      })}
                    />
                  </Grid>
                  {!!forgetPasswordError && (
                    <ErrorMessageGrid item mobileS={12}>
                      <FormError>{forgetPasswordError}</FormError>
                    </ErrorMessageGrid>
                  )}
                  <Grid item mobileS={12}>
                    <LoginButton
                      state={forgetPassword ? 'loading' : 'normal'}
                      type="submit"
                      color="secondary"
                      size="large"
                      variant="contained"
                    >
                      {t('resetPassword')}
                    </LoginButton>
                  </Grid>
                  <SignUpLinkGrid item mobileS={12}>
                    {t('goBack')}{' '}
                    <JaggedUnderlinedLink
                      href={urlJoinWithQuery('/signup', query)}
                    >
                      {t('signIn')}
                    </JaggedUnderlinedLink>
                  </SignUpLinkGrid>
                </>
              )}
            </Grid>
          </LoginForm>
        </LoginFormContainer>
      </PageWithWallpaper>
    </>
  )
}
