import { FC, ReactNode } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { Header } from 'components/Header'
import {
  AppShellBody,
  AppShellDrawer,
  AppShellGrid,
  AppShellMain,
  AppShellMobileNavigation,
} from 'components/AppShell/styles'
import { ExpertWizardBootstrap } from 'components/ExpertWizard/ExpertWizardBootstrap'

export const mobileNavigationBreakpoint = 'tablet'
export const collapsibleDrawerBreakpoint = 'laptopL'

interface AppShellProps {
  drawer?: ReactNode
  mobileNavigation?: ReactNode
  onDrawerMenuClick?: () => void
  onOpenFilter?: () => void
  showHeader?: boolean
  showFilter?: boolean
}

export const AppShellBodyId = 'app-shell-body'

export const AppShell: FC<React.PropsWithChildren<AppShellProps>> = ({
  onDrawerMenuClick,
  onOpenFilter,
  drawer,
  mobileNavigation,
  children,
  showHeader = true,
  showFilter,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(
    theme.breakpoints.down(mobileNavigationBreakpoint)
  )

  return (
    <AppShellGrid>
      <AppShellDrawer>{drawer}</AppShellDrawer>
      <ExpertWizardBootstrap />
      <AppShellMain>
        {showHeader && (
          <Header
            onOpenFilter={onOpenFilter}
            showFilter={showFilter}
            onDrawerMenuClick={onDrawerMenuClick}
          />
        )}
        <AppShellBody id={AppShellBodyId}>{children}</AppShellBody>
        <AppShellMobileNavigation>
          {isMobile && mobileNavigation}
        </AppShellMobileNavigation>
      </AppShellMain>
    </AppShellGrid>
  )
}
