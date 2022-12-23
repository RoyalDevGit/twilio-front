import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import TextField from '@mui/material/TextField'

import { useRouter } from 'hooks/useRouter'
import {
  ForgetPasswordError,
  MobileFormLabel,
  FormContainer,
  BannerLogo,
  MobileLoginBannerSection,
  MobileLoginForm,
  MobileLoginFormContainer,
  MobileLoginLinkGrid,
  StyledDivider,
  GoogleSignInButton,
  ForgotPasswordHeader,
  ResetPasswordDescription,
  MobileBannerImage,
} from 'pageComponents/ForgotPassword/MobileForgotPassword/styles'
import { Grid } from 'components/Grid'
import { emailRegex } from 'utils/regex/email'
import { AuthApi } from 'apis/AuthApi'
import { ApiErrorCode } from 'utils/error/ApiError'
import { JaggedUnderlinedLink } from 'components/JaggedUnderlineLink'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import {
  ErrorMessageGrid,
  LoginButton,
} from 'pageComponents/Login/DesktopLogin/styles'
import { GoogleIcon } from 'icons/Google'
import { ForgotPasswordHeaderBox } from 'pageComponents/ForgotPassword/DesktopForgotPassword/styles'
import { FormError } from 'components/Form/Error'
import { Link } from 'components/Link'

type FormData = {
  emailAddress: string
}

export const MobileForgotPassword = () => {
  const { t } = useTranslation(['forgotPassword', 'common'])
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

      <MobileLoginFormContainer>
        <FormContainer>
          <MobileLoginForm noValidate onSubmit={onSubmit} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item mobileS={12}>
                <ForgotPasswordHeaderBox>
                  <ForgotPasswordHeader variant="h4">
                    {t('pageTitle')}
                  </ForgotPasswordHeader>
                  <ResetPasswordDescription>
                    {t('resetPasswordDescription')}
                  </ResetPasswordDescription>
                </ForgotPasswordHeaderBox>
              </Grid>
              {forgetPassword ? (
                <ForgetPasswordError>
                  {forgetPasswordSuccess}
                </ForgetPasswordError>
              ) : (
                <>
                  <Grid item mobileS={12}>
                    <MobileFormLabel required>
                      {t('emailLabel')}
                    </MobileFormLabel>
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
                      color="primary"
                      variant="contained"
                    >
                      {t('resetPassword')}
                    </LoginButton>
                  </Grid>
                  <MobileLoginLinkGrid item mobileS={12}>
                    {t('goBack')}{' '}
                    <JaggedUnderlinedLink
                      href={urlJoinWithQuery('/signup', query)}
                    >
                      {t('signIn')}
                    </JaggedUnderlinedLink>
                  </MobileLoginLinkGrid>
                  <Grid item mobileS={12}>
                    <StyledDivider> or </StyledDivider>
                    <GoogleSignInButton variant="outlined">
                      <GoogleIcon />
                      {t('googleSignInButton')}
                    </GoogleSignInButton>
                  </Grid>
                </>
              )}
            </Grid>
          </MobileLoginForm>
        </FormContainer>
      </MobileLoginFormContainer>
    </>
  )
}
