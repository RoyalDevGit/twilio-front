import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import {
  DrawerList,
  DrawerListItem,
  DrawerListItemIcon,
  StyledDrawerLink,
  CollapsedActiveItemIndicator,
  MenuTextAndNotification,
} from 'components/AppDrawer/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { AppDrawer, AppDrawerProps } from 'components/AppDrawer'
import { HomeIcon } from 'icons/Navigation/Home'
import { FavoritesIcon } from 'icons/Navigation/Favorites'
import { ExploreIcon } from 'icons/Navigation/Explore'
import { ScheduleIcon } from 'icons/Navigation/Schedule'
import { isGuestUser } from 'utils/user/isGuestUser'
import { useCurrentUser } from 'hooks/useCurrentUser'

export const ConsumerDrawer: FC<React.PropsWithChildren<AppDrawerProps>> = ({
  onClose,
  ...drawerProps
}) => {
  const { t } = useTranslation([LocaleNamespace.Drawer, LocaleNamespace.Common])
  const user = useCurrentUser()

  const closeHandler = () => {
    if (onClose) {
      onClose({}, 'escapeKeyDown')
    }
  }

  const isGuest = isGuestUser(user)

  const isGuestMenu = (
    <>
      <StyledDrawerLink
        href="/explore"
        id="header-app-drawer-consumer-explore-link"
      >
        <CollapsedActiveItemIndicator />
        <DrawerListItem onClick={closeHandler}>
          <DrawerListItemIcon>
            <ExploreIcon />
          </DrawerListItemIcon>
          <MenuTextAndNotification>{t('explore')}</MenuTextAndNotification>
        </DrawerListItem>
      </StyledDrawerLink>
      <StyledDrawerLink
        href="/schedule"
        id="header-app-drawer-consumer-schedule-link"
      >
        <CollapsedActiveItemIndicator />
        <DrawerListItem>
          <DrawerListItemIcon>
            <ScheduleIcon />
          </DrawerListItemIcon>
          <MenuTextAndNotification>{t('schedule')}</MenuTextAndNotification>
        </DrawerListItem>
      </StyledDrawerLink>
      <StyledDrawerLink
        href="/favorites"
        id="header-app-drawer-favorites-root-link"
      >
        <CollapsedActiveItemIndicator />
        <DrawerListItem onClick={closeHandler}>
          <DrawerListItemIcon>
            <FavoritesIcon />
          </DrawerListItemIcon>
          <MenuTextAndNotification>{t('favorites')}</MenuTextAndNotification>
        </DrawerListItem>
      </StyledDrawerLink>
    </>
  )

  return (
    <AppDrawer {...drawerProps} onClose={onClose}>
      <DrawerList>
        <StyledDrawerLink href="/" id="header-app-drawer-consumer-root-link">
          <CollapsedActiveItemIndicator />
          <DrawerListItem onClick={closeHandler}>
            <DrawerListItemIcon>
              <HomeIcon />
            </DrawerListItemIcon>
            <MenuTextAndNotification>{t('home')}</MenuTextAndNotification>
          </DrawerListItem>
        </StyledDrawerLink>

        {isGuest ? (
          isGuestMenu
        ) : (
          <>
            <StyledDrawerLink
              href="/schedule"
              id="header-app-drawer-consumer-schedule-link"
            >
              <CollapsedActiveItemIndicator />
              <DrawerListItem>
                <DrawerListItemIcon>
                  <ScheduleIcon />
                </DrawerListItemIcon>
                <MenuTextAndNotification>
                  {t('schedule')}
                </MenuTextAndNotification>
              </DrawerListItem>
            </StyledDrawerLink>
            <StyledDrawerLink
              href="/favorites"
              id="header-app-drawer-favorites-root-link"
            >
              <CollapsedActiveItemIndicator />
              <DrawerListItem onClick={closeHandler}>
                <DrawerListItemIcon>
                  <FavoritesIcon />
                </DrawerListItemIcon>
                <MenuTextAndNotification>
                  {t('favorites')}
                </MenuTextAndNotification>
              </DrawerListItem>
            </StyledDrawerLink>
            <StyledDrawerLink
              href="/explore"
              id="header-app-drawer-consumer-explore-link"
            >
              <CollapsedActiveItemIndicator />
              <DrawerListItem onClick={closeHandler}>
                <DrawerListItemIcon>
                  <ExploreIcon />
                </DrawerListItemIcon>
                <MenuTextAndNotification>
                  {t('explore')}
                </MenuTextAndNotification>
              </DrawerListItem>
            </StyledDrawerLink>
          </>
        )}
      </DrawerList>
    </AppDrawer>
  )
}
