import { NextPage } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

import { GlobalLoginStyle } from 'styles/GlobalLoginStyle'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { DesktopSignup } from 'pageComponents/Signup/DesktopSignup'

export const SignupPage: NextPage = () => {
  const { t } = useTranslation([
    LocaleNamespace.SignupPage,
    LocaleNamespace.Common,
  ])
  return (
    <>
      <GlobalLoginStyle />
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>
      <DesktopSignup />
    </>
  )
}
