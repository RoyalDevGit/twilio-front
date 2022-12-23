import { FC, useMemo } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { DrawerProps } from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { useRecoilState } from 'recoil'
import { useTranslation } from 'next-i18next'

import {
  StyledDrawer,
  ToggleAndLogo,
  DrawerLogo,
  AppDrawerFooter,
  AppDrawerFooterLabel,
} from 'components/AppDrawer/styles'
import { DrawerCollapsedState, drawerCollapsedState } from 'state/drawerState'
import { Link } from 'components/Link'
import {
  mobileNavigationBreakpoint,
  collapsibleDrawerBreakpoint,
} from 'components/AppShell'
import { HamburgerMenuIcon } from 'icons/HamburgerMenu'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

export interface AppDrawerProps extends DrawerProps {
  onToggleClick?: () => unknown
}

export const AppDrawer: FC<React.PropsWithChildren<AppDrawerProps>> = ({
  open,
  children,
  onClose,
  onToggleClick,
  ...drawerProps
}) => {
  const { t } = useTranslation(LocaleNamespace.Drawer)
  const theme = useTheme()
  const isCollapsible = useMediaQuery(
    theme.breakpoints.down(collapsibleDrawerBreakpoint)
  )
  const hasMobileNavigation = useMediaQuery(
    theme.breakpoints.down(mobileNavigationBreakpoint)
  )

  const [drawerState, setDrawerState] = useRecoilState(drawerCollapsedState)

  const isOpen = useMemo(() => {
    if (isCollapsible) {
      return open
    }
    return drawerState === DrawerCollapsedState.Expanded
  }, [isCollapsible, open, drawerState])

  const toggleHandler = () => {
    if (!isCollapsible) {
      setDrawerState(
        drawerState === DrawerCollapsedState.Expanded
          ? DrawerCollapsedState.Collapsed
          : DrawerCollapsedState.Expanded
      )
    }

    if (onToggleClick) {
      onToggleClick()
    }
  }

  return (
    <StyledDrawer
      open={isOpen}
      anchor={hasMobileNavigation ? 'right' : 'left'}
      onClose={onClose}
      {...drawerProps}
      variant={isCollapsible ? 'temporary' : 'permanent'}
    >
      <ToggleAndLogo>
        <IconButton onClick={toggleHandler}>
          <HamburgerMenuIcon id="header-app-drawer-toggle" />
        </IconButton>
        <Link href="/" id="header-app-drawer-root-link">
          <DrawerLogo />
        </Link>
      </ToggleAndLogo>
      {children}
      {isOpen && (
        <AppDrawerFooter>
          <Link href={'/support'}>
            <AppDrawerFooterLabel>
              {t('supportFooterLabel')}
            </AppDrawerFooterLabel>
          </Link>
          <Link href={'/support'}>
            <AppDrawerFooterLabel>
              {t('termsAndConditionsLink')}
            </AppDrawerFooterLabel>
          </Link>
        </AppDrawerFooter>
      )}
    </StyledDrawer>
  )
}
