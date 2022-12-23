import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { useRouter } from 'hooks/useRouter'
import {
  LoginButtonDark,
  LoginButtonLight,
  LoginOrSignupContainer,
  SignupButtonDark,
} from 'components/LoginOrSignup/styles'
import { Button } from 'components/Button'
import { Link } from 'components/Link'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

interface HeaderProps {
  onDrawerMenuClick?: () => void
  onOpenFilter?: () => void
  showFilter?: boolean
}

export const LoginOrSignup: FC<React.PropsWithChildren<HeaderProps>> = () => {
  const { t } = useTranslation(LocaleNamespace.LoginOrSignUp)
  const router = useRouter()
  const loginLink = urlJoinWithQuery('/login', {
    redirectTo: router.asPath,
  })
  const signupLink = urlJoinWithQuery('/signup', {
    redirectTo: router.asPath,
  })

  const useDarkMode = usePrefersDarkMode()

  return (
    <LoginOrSignupContainer>
      <Link href={loginLink}>
        {useDarkMode ? (
          <LoginButtonDark variant="outlined">{t('login')}</LoginButtonDark>
        ) : (
          <LoginButtonLight variant="outlined">{t('login')}</LoginButtonLight>
        )}
      </Link>
      <Link href={signupLink}>
        {useDarkMode ? (
          <SignupButtonDark variant="contained">{t('signup')}</SignupButtonDark>
        ) : (
          <Button variant="contained">{t('signup')}</Button>
        )}
      </Link>
    </LoginOrSignupContainer>
  )
}
