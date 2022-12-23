import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import {
  NavigationLink,
  NavigationLinkList,
  NavigationListItem,
  NavigationListItemIcon,
  NavigationText,
} from 'components/MobileNavigation/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  MobileNavigation,
  MobileNavigationProps,
} from 'components/MobileNavigation'
import { HomeIcon } from 'icons/Navigation/Home'
import { ScheduleIcon } from 'icons/Navigation/Schedule'
import { MoreIcon } from 'icons/Navigation/More'
import { ExploreIcon } from 'icons/Navigation/Explore'
import { useCurrentUser } from 'hooks/useCurrentUser'
import { isGuestUser } from 'utils/user/isGuestUser'

export const ConsumerMobileNavigation: FC<MobileNavigationProps> = () => {
  const { t } = useTranslation([LocaleNamespace.MobileNavigation])
  const user = useCurrentUser()
  const isGuest = isGuestUser(user)

  const isGuestMenu = (
    <>
      <NavigationLink href="/explore">
        <NavigationListItem>
          <NavigationListItemIcon>
            <ExploreIcon />
          </NavigationListItemIcon>
          <NavigationText>{t('explore')}</NavigationText>
        </NavigationListItem>
      </NavigationLink>
      <NavigationLink href="/schedule">
        <NavigationListItem>
          <NavigationListItemIcon>
            <ScheduleIcon />
          </NavigationListItemIcon>
          <NavigationText>{t('schedule')}</NavigationText>
        </NavigationListItem>
      </NavigationLink>
    </>
  )

  return (
    <MobileNavigation>
      <NavigationLinkList>
        <NavigationLink href="/">
          <NavigationListItem>
            <NavigationListItemIcon>
              <HomeIcon />
            </NavigationListItemIcon>
            <NavigationText>{t('home')}</NavigationText>
          </NavigationListItem>
        </NavigationLink>
        {isGuest ? (
          isGuestMenu
        ) : (
          <>
            <NavigationLink href="/schedule">
              <NavigationListItem>
                <NavigationListItemIcon>
                  <ScheduleIcon />
                </NavigationListItemIcon>
                <NavigationText>{t('schedule')}</NavigationText>
              </NavigationListItem>
            </NavigationLink>
            <NavigationLink href="/explore">
              <NavigationListItem>
                <NavigationListItemIcon>
                  <ExploreIcon />
                </NavigationListItemIcon>
                <NavigationText>{t('explore')}</NavigationText>
              </NavigationListItem>
            </NavigationLink>
          </>
        )}
        <NavigationLink href="/more-menu">
          <NavigationListItem>
            <NavigationListItemIcon>
              <MoreIcon />
            </NavigationListItemIcon>
            <NavigationText>{t('more')}</NavigationText>
          </NavigationListItem>
        </NavigationLink>
      </NavigationLinkList>
    </MobileNavigation>
  )
}
