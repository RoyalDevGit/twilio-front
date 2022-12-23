import { useState } from 'react'
import { NextPage } from 'next'

import { AppShell } from 'components/AppShell'
import { ExpertContainer } from 'pageComponents/Settings/Expert/styles'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'

interface ExpertProfilePageProps {
  children?: React.ReactNode
}

export const ExpertProfilePage: NextPage<ExpertProfilePageProps> = ({
  children,
}) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

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
      <ExpertContainer>{children}</ExpertContainer>
    </AppShell>
  )
}
