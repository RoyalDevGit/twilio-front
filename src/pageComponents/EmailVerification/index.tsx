import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useMount } from 'react-use'
import { useTranslation } from 'next-i18next'

import { Link } from 'components/Link'
import { Grid } from 'components/Grid'
import { GlobalLoginStyle } from 'styles/GlobalLoginStyle'
import {
  EmailVerificationContainer,
  EmailVerificationMain,
  EmailVerificationMessage,
  EmailVerifiedSuccessfully,
  VerifiedHeader,
} from 'pageComponents/EmailVerification/styles'
import { getErrorCookieAndDelete } from 'utils/cookies/errorCookie'
import { getEnumValues } from 'utils/enum/enumUtils'
import { ApiErrorCode } from 'utils/error/ApiError'
import { Button } from 'components/Button'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { EmailVerificationIcon } from 'icons/EmailVerificationIcon'

export const EmailVerificationPage: NextPage = () => {
  const { t } = useTranslation(LocaleNamespace.EmailVerificationPage)
  const [cookieErrorCode, setCookieErrorCode] = useState('')

  useMount(() => {
    const errorCookieValue = getErrorCookieAndDelete()
    if (errorCookieValue) {
      const apiErrorCode = getEnumValues(ApiErrorCode).find(
        (code) => code.toString() === errorCookieValue
      ) as string | undefined

      setCookieErrorCode(apiErrorCode || ApiErrorCode.Unknown)
    }
  })

  let errorLabel
  let successLabel = t('emailVerifiedSuccessfully')
  if (cookieErrorCode) {
    switch (cookieErrorCode) {
      case ApiErrorCode.NotFound:
        errorLabel = t('emailVerificationNotFound')
        break
      case ApiErrorCode.PreviouslyCompleted:
        successLabel = t('emailAlreadyVerified')
        break
      case ApiErrorCode.Expired:
        errorLabel = t('emailVerificationExpired')
        break
      default:
        errorLabel = t('emailVerificationFailed')
        break
    }
  }

  return (
    <EmailVerificationContainer maxWidth="tablet">
      <GlobalLoginStyle />
      <Head>
        <title>{t('emailVerificationPageTitle')}</title>
      </Head>
      <EmailVerificationMain>
        <Grid container spacing={2}>
          {!!errorLabel && (
            <Grid item mobileS={12}>
              <EmailVerificationMessage variant="h5">
                {errorLabel}
              </EmailVerificationMessage>
            </Grid>
          )}
          {!errorLabel && (
            <EmailVerifiedSuccessfully>
              <Grid item mobileS={12}>
                <EmailVerificationIcon />
                <VerifiedHeader>{t('verified')}</VerifiedHeader>
                <EmailVerificationMessage>
                  {successLabel}
                </EmailVerificationMessage>
              </Grid>
              <Grid item mobileS={12}>
                <Link href="/">
                  <Button color="primary" variant="contained">
                    {t('emailVerificationContinueToApp')}
                  </Button>
                </Link>
              </Grid>
            </EmailVerifiedSuccessfully>
          )}
        </Grid>
      </EmailVerificationMain>
    </EmailVerificationContainer>
  )
}
