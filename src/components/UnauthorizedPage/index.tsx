import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  IconSection,
  LinksSection,
  MainContainer,
  NoPermissionText,
} from 'components/UnauthorizedPage/styles'
import { Unauthorized401Icon } from 'icons/Unauthorized401'
import { Link } from 'components/Link'

export const UnauthorizedPage: FC = () => {
  const { t } = useTranslation(LocaleNamespace.UnauthorizedPage)

  return (
    <MainContainer>
      <IconSection>
        <Unauthorized401Icon />
      </IconSection>

      <NoPermissionText>{t('noPermission')}</NoPermissionText>
      <LinksSection>
        <Link href={'/login'}>
          <NoPermissionText>{t('logIn')}</NoPermissionText>
        </Link>
        <NoPermissionText>{t('or')}</NoPermissionText>
        <Link href={'/signup'}>
          <NoPermissionText>{t('signUp')}</NoPermissionText>
        </Link>
      </LinksSection>
    </MainContainer>
  )
}
