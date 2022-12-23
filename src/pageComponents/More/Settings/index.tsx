import { NextPage } from 'next'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'

import { useRouter } from 'hooks/useRouter'
import { AppShell } from 'components/AppShell'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { CustomLink, MorePageMenuTitle } from 'pageComponents/More/styles'
import { useExpert } from 'hooks/useExpert'
import {
  MorePageSettingsContainer,
  MorePageTitleContainer,
  MorePageLinksSection,
  IconButtonBox,
} from 'pageComponents/More/Settings/styles'
import { BackArrowIcon } from 'icons/Arrow/Back'

export const MorePageSettings: NextPage = () => {
  const { t } = useTranslation([
    LocaleNamespace.MorePage,
    LocaleNamespace.Common,
  ])
  const expert = useExpert()
  const router = useRouter()

  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const goBack = () => router.push(`/more-menu`)

  return (
    <AppShell
      mobileNavigation={
        <ConsumerMobileNavigation onDrawerMenuClick={handleDrawerMenuClick} />
      }
      onDrawerMenuClick={handleDrawerMenuClick}
      showHeader={false}
    >
      <MorePageSettingsContainer>
        <MorePageTitleContainer>
          <IconButtonBox>
            <BackArrowIcon onClick={goBack} />
          </IconButtonBox>
          <MorePageMenuTitle>{t('morePageSettingsLabel')}</MorePageMenuTitle>
        </MorePageTitleContainer>

        <MorePageLinksSection>
          {!!expert && (
            <>
              <CustomLink href="/settings/expert/profile">
                <Typography variant="h6">
                  {t('morePageEditProfileLabel')}
                </Typography>
              </CustomLink>
              <CustomLink href="/settings/expert/availability">
                <Typography variant="h6">
                  {t('morePageAvailabilityLabel')}
                </Typography>
              </CustomLink>
              <CustomLink href="/settings/expert/durations">
                <Typography variant="h6">
                  {t('morePageDurationAndPriceLabel')}
                </Typography>
              </CustomLink>
            </>
          )}
          <CustomLink href="/settings/account">
            <Typography variant="h6">
              {t('morePageAccountInformationLabel')}
            </Typography>
          </CustomLink>
          <CustomLink href="/settings/security">
            <Typography variant="h6">{t('morePageSecurityLabel')}</Typography>
          </CustomLink>
          <CustomLink href="/settings/payment-methods">
            <Typography variant="h6">
              {t('morePagePaymentMethodsLabel')}
            </Typography>
          </CustomLink>
          <CustomLink href="/settings/preferences">
            <Typography variant="h6">
              {t('morePagePreferencesLabel')}
            </Typography>
          </CustomLink>
        </MorePageLinksSection>
      </MorePageSettingsContainer>
    </AppShell>
  )
}
