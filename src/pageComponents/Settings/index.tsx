import { useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import Divider from '@mui/material/Divider'

import {
  ProfilePageTabs,
  ProfilePageBody,
  ProfilePageContainer,
  ProfilePageTitle,
  TabPanel,
} from 'pageComponents/Settings/styles'
import { AppShell } from 'components/AppShell'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { NavigationTabs } from 'components/NavigationTabs'
import { LinkTab } from 'components/LinkTab'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { useExpert } from 'hooks/useExpert'

export interface SettingsPageProps {
  children?: React.ReactNode
}

export const SettingsPage: NextPage<SettingsPageProps> = ({ children }) => {
  const { t } = useTranslation(LocaleNamespace.Settings)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const expert = useExpert()
  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  return (
    <AppShell
      drawer={
        <ConsumerDrawer
          open={drawerIsOpen}
          onClose={handleDrawerMenuClose}
          onToggleClick={handleDrawerMenuClick}
        />
      }
      mobileNavigation={
        <ConsumerMobileNavigation onDrawerMenuClick={handleDrawerMenuClick} />
      }
      onDrawerMenuClick={handleDrawerMenuClick}
    >
      <ProfilePageContainer>
        <>
          <ProfilePageTitle>{t('settingsTitle')}</ProfilePageTitle>
          <ProfilePageTabs>
            <NavigationTabs>
              {!!expert && [
                <LinkTab
                  id={`settings-expert-profile-link`}
                  key="profile"
                  href={`/settings/expert/profile`}
                  label={t('editProfileTab')}
                />,
                <LinkTab
                  id={`settings-expert-availability-link`}
                  key="availability"
                  href={`/settings/expert/availability`}
                  label={t('availabilityTab')}
                />,
                <LinkTab
                  id={`settings-expert-durations-link`}
                  key="durations"
                  href={`/settings/expert/durations`}
                  label={t('durationAndPriceTab')}
                />,
              ]}
              <LinkTab
                id={`settings-account-link`}
                href={`/settings/account`}
                label={t('accountInformationTab')}
              />
              <LinkTab
                id={`settings-security-link`}
                href={`/settings/security`}
                label={t('securityTab')}
              />
              <LinkTab
                id={`settings-payment-methods-link`}
                href={`/settings/payment-methods`}
                label={t('paymentMethodsTab')}
              />
              <LinkTab
                id={`settings-preferences-link`}
                href={`/settings/preferences`}
                label={t('preferencesTab')}
              />
            </NavigationTabs>
            <Divider style={{ width: '100%' }} />
          </ProfilePageTabs>
        </>

        <ProfilePageBody>
          <TabPanel role="tabpanel">{children}</TabPanel>
        </ProfilePageBody>
      </ProfilePageContainer>
    </AppShell>
  )
}
