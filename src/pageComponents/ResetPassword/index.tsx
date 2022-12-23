import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { NextPage } from 'next'

import { GlobalLoginStyle } from 'styles/GlobalLoginStyle'
import { DesktopResetPassword } from 'pageComponents/ResetPassword/DesktopResetPassword'

export const ResetPassword: NextPage = () => {
  const { t } = useTranslation(['resetPassword', 'common', 'signupPage'])

  return (
    <>
      <GlobalLoginStyle />
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>
      <DesktopResetPassword />
    </>
  )
}
