import { NextPage } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

import { GlobalLoginStyle } from 'styles/GlobalLoginStyle'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { DesktopLogin } from 'pageComponents/Login/DesktopLogin'

export const LoginPage: NextPage = () => {
  const { t } = useTranslation([
    LocaleNamespace.LoginPage,
    LocaleNamespace.Common,
    LocaleNamespace.GuestUserAuthReasonMessage,
  ])

  return (
    <>
      <GlobalLoginStyle />
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>
      <DesktopLogin />
    </>
  )
}
