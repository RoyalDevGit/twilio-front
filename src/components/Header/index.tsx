import { FC } from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { NotificationTray } from 'components/NotificationTray'
import { HeaderUserMenu } from 'components/UserMenu'
import {
  HeaderContainer,
  HeaderGrid,
  SearchSection,
  DrawerButton,
  UserMenuSection,
  ActionsSection,
  FilterIconContainer,
} from 'components/Header/styles'
import { HamburgerMenuIcon } from 'icons/HamburgerMenu'
import { SearchAutocomplete } from 'components/Header/SearchAutocomplete'
import { MessageTray } from 'components/Messaging/MessageTray'
import { FilterIcon } from 'icons/Navigation/Filter'
import { useCurrentUser } from 'hooks/useCurrentUser'
import { LoginOrSignup } from 'components/LoginOrSignup'
import { isGuestUser } from 'utils/user/isGuestUser'

interface HeaderProps {
  onDrawerMenuClick?: () => void
  onOpenFilter?: () => void
  showFilter?: boolean
}

export const Header: FC<React.PropsWithChildren<HeaderProps>> = ({
  onDrawerMenuClick,
  onOpenFilter,
  showFilter,
}) => {
  const user = useCurrentUser()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const isGuest = isGuestUser(user)

  const renderUserSection = () => {
    if (isGuest) {
      return isMobile ? null : <LoginOrSignup />
    }
    return (
      <>
        <ActionsSection>
          <NotificationTray open={false} />
          <MessageTray />
        </ActionsSection>
        <UserMenuSection>
          <HeaderUserMenu />
        </UserMenuSection>
      </>
    )
  }

  return (
    <HeaderContainer position="sticky">
      <Toolbar>
        <HeaderGrid>
          <DrawerButton
            edge="start"
            color="inherit"
            onClick={onDrawerMenuClick}
          >
            <HamburgerMenuIcon />
          </DrawerButton>
          <SearchSection>
            <SearchAutocomplete />
          </SearchSection>
          {renderUserSection()}
          {showFilter && (
            <FilterIconContainer>
              <IconButton onClick={onOpenFilter}>
                <FilterIcon />
              </IconButton>
            </FilterIconContainer>
          )}
        </HeaderGrid>
      </Toolbar>
    </HeaderContainer>
  )
}
