import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import Divider from '@mui/material/Divider'
import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import {
  MyScheduleTabs,
  ScheduleBody,
  ScheduleContainer,
  ScheduleTitle,
  TabPanel,
  TitleContainer,
} from 'pageComponents/Schedule/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { AppShell } from 'components/AppShell'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { NavigationTabs } from 'components/NavigationTabs'
import { LinkTab } from 'components/LinkTab'
import { MOBILE_CALENDAR_BREAKPOINT } from 'components/Calendar/styles'

export interface ConsumerSchedulePageProps {
  children?: React.ReactNode
}

export const ConsumerSchedulePage: NextPage<ConsumerSchedulePageProps> = ({
  children,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(
    theme.breakpoints.down(MOBILE_CALENDAR_BREAKPOINT)
  )
  const { t } = useTranslation(LocaleNamespace.Schedule)

  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
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
      <ScheduleContainer>
        <>
          <TitleContainer>
            <ScheduleTitle>{t('myScheduleTitle')}</ScheduleTitle>
          </TitleContainer>
          <MyScheduleTabs>
            <NavigationTabs>
              <LinkTab
                href="/schedule"
                label={t(!isMobile ? 'viewScheduleTab' : 'myScheduleTitle')}
              />
              <LinkTab
                href="/schedule/sessions/upcoming"
                label={t('upcomingSessionsTab')}
              />
              <LinkTab
                href="/schedule/sessions/past"
                label={t('pastSessionsTab')}
              />
              <LinkTab
                href="/schedule/sessions/cancelled"
                label={t('cancelledSessionsTab')}
              />
            </NavigationTabs>
            <Divider style={{ width: '100%' }} />
          </MyScheduleTabs>
        </>
        <ScheduleBody>
          <TabPanel role="tabpanel">{children}</TabPanel>
        </ScheduleBody>
      </ScheduleContainer>
    </AppShell>
  )
}
