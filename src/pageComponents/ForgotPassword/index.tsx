import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { NextPage } from 'next'

import { GlobalLoginStyle } from 'styles/GlobalLoginStyle'
import { DesktopForgotPassword } from 'pageComponents/ForgotPassword/DesktopForgotPassword'
import { MobileForgotPassword } from 'pageComponents/ForgotPassword/MobileForgotPassword'

export const ForgotPasswordPage: NextPage = () => {
  const { t } = useTranslation(['forgotPassword', 'common'])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  return (
    <>
      <GlobalLoginStyle />
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>
      {isMobile && <MobileForgotPassword />}

      {!isMobile && <DesktopForgotPassword />}
    </>
  )
}
