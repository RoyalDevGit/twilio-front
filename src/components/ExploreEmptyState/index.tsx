import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Link } from 'components/Link'
import {
  CheckBack,
  MainContainer,
  MainHeader,
} from 'components/ExploreEmptyState/styles'
import { ExploreEmptyStateMagnifierIcon } from 'icons/ExploreEmptyStateMagnifier'
import { Button } from 'components/Button'

export const ExploreEmptyState: FC = () => {
  const { t } = useTranslation(LocaleNamespace.ExploreEmptyState)

  return (
    <MainContainer>
      <ExploreEmptyStateMagnifierIcon />
      <MainHeader variant="h4">{t('mainHeader')}</MainHeader>
      <CheckBack>{t('checkBack')}</CheckBack>
      <Link href="/signup">
        <Button variant="contained" size="large" color="primary">
          {t('signUpButton')}
        </Button>
      </Link>
    </MainContainer>
  )
}
