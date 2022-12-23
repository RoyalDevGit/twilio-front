import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { DateTime } from 'luxon'
import { useMount } from 'react-use'

import { AppShell } from 'components/AppShell'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import {
  CustomBox,
  CustomLink,
  CustomStatusBadge,
  IsGuestContainer,
  LinkBox,
  LocationBox,
  MorePageAvatarContainer,
  MorePageBottomSection,
  MorePageContainer,
  MorePageMenuTitle,
  MorePageSessionBox,
  MorePageSessionInformation,
  MorePageStatusContainer,
  MorePageTopSection,
  MorePageTopSectionBox,
  MorePageUserInformation,
  OnlineStatusBox,
  ProfileAvatar,
  ProfileAvatarCircleOne,
  ProfileAvatarCircleThree,
  ProfileAvatarCircleTwo,
  StatusButton,
  UnreadCountContainer,
  UnreadCounterBadge,
} from 'pageComponents/More/styles'
import { useExpert } from 'hooks/useExpert'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { getUserPictureUrl } from 'utils/user/getUserPictureUrl'
import { PinPointIcon } from 'icons/PinPoint'
import { Button } from 'components/Button'
import { logout } from 'utils/auth/logout'
import { RightCaretIcon } from 'icons/Caret/Right'
import { SessionByStatus } from 'apis/UserApi'
import { useEditableStatus } from 'hooks/api/user/useEditableStatus'
import { UserStatus } from 'interfaces/User'
import { useUserSocket } from 'hooks/useUserSocket'
import { NotificationsApi } from 'apis/NotificationsApi'
import {
  TrayNotification,
  NotificationStatus,
} from 'interfaces/TrayNotification'
import { useMessagingChannels } from 'hooks/useMessagingChannels'
import { LoginOrSignup } from 'components/LoginOrSignup'
import { isGuestUser } from 'utils/user/isGuestUser'

export interface MorePageProps {
  sessionCounts: SessionByStatus
}

export const MorePage: NextPage<MorePageProps> = ({ sessionCounts }) => {
  const { t } = useTranslation([
    LocaleNamespace.MorePage,
    LocaleNamespace.Common,
  ])
  const user = useCurrentUserAsserted()
  const expert = useExpert()
  const editableStatus = useEditableStatus(user)
  const userPictureUrl = getUserPictureUrl(user)
  const [notifications, setNotifications] = useState<TrayNotification[]>([])
  const { channels } = useMessagingChannels()
  const [logoutConfirmationIsOpen, setLogoutConfirmationIsOpen] =
    useState(false)
  const closeLogoutConfirmation = (): void => {
    setLogoutConfirmationIsOpen(false)
  }

  const confirmLogout = (): void => {
    setLogoutConfirmationIsOpen(true)
  }

  const onLogout = async (): Promise<void> => {
    closeLogoutConfirmation()
    logout()
  }
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const toggleExpertStatus = useCallback(() => {
    if (user.status === UserStatus.Available) {
      editableStatus.setValue(false)
    } else {
      editableStatus.setValue(true)
    }
  }, [user])

  const isAvailable = user.status === UserStatus.Available

  let totalUnread = 0
  channels.forEach((channel) => {
    const channelUnreadCount = channel.unreadCount || 0
    totalUnread = totalUnread + channelUnreadCount
  })

  const loadNotifications = async () => {
    const fromDate = DateTime.now().plus({ weeks: -2 })
    const toDate = DateTime.now().endOf('day')

    const notificationsResult = await NotificationsApi.query({
      page: 1,
      limit: 10,
      from: fromDate,
      to: toDate,
      status: [NotificationStatus.Sent, NotificationStatus.Read],
      sort: 'createdAt',
      sortDirection: 'desc',
    })

    if (notificationsResult.ok()) {
      const notificationsData = await notificationsResult.getData()
      setNotifications(notificationsData.items)
    }
  }
  useMount(() => {
    loadNotifications()
  })

  useUserSocket({
    onNotificationReceived: (notification) => {
      setNotifications((current) => [notification, ...current])
    },
  })

  let notificationsCount = 0
  notifications.forEach((n) => {
    if (n.status === NotificationStatus.Sent) {
      notificationsCount = notificationsCount + 1
    }
  })

  const isGuest = isGuestUser(user)

  return (
    <AppShell
      mobileNavigation={
        <ConsumerMobileNavigation onDrawerMenuClick={handleDrawerMenuClick} />
      }
      onDrawerMenuClick={handleDrawerMenuClick}
      showHeader={false}
    >
      <MorePageContainer>
        <MorePageTopSection>
          <MorePageMenuTitle>{t('morePageMenuLabel')}</MorePageMenuTitle>
          {!isGuest && (
            <MorePageTopSectionBox>
              <MorePageAvatarContainer>
                <ProfileAvatarCircleOne>
                  <ProfileAvatarCircleTwo>
                    <ProfileAvatarCircleThree>
                      <ProfileAvatar
                        firstName={user.firstName}
                        lastName={user.lastName}
                        src={userPictureUrl}
                        status={expert?.user?.status}
                        width={118}
                        height={118}
                      />
                    </ProfileAvatarCircleThree>
                  </ProfileAvatarCircleTwo>
                </ProfileAvatarCircleOne>
                <MorePageUserInformation>
                  <Typography variant="h5" fontWeight={500}>
                    {user.firstName} {user.lastName}
                  </Typography>
                  {!!expert && (
                    <Typography>{expert?.mainAreaOfExpertise}</Typography>
                  )}
                  {!!user.location && (
                    <LocationBox>
                      <PinPointIcon />
                      <Typography variant="body2">{user.location}</Typography>
                    </LocationBox>
                  )}
                </MorePageUserInformation>
              </MorePageAvatarContainer>
              <MorePageStatusContainer>
                <OnlineStatusBox>
                  <CustomStatusBadge
                    overlap="circular"
                    variant="dot"
                    status={expert?.user?.status}
                  />
                  <Typography>
                    {isAvailable ? t('common:online') : t('common:offline')}
                  </Typography>
                </OnlineStatusBox>
                <StatusButton
                  onClick={toggleExpertStatus}
                  color="primary"
                  variant="outlined"
                  fullWidth
                >
                  {isAvailable
                    ? t('common:expertStatusOffline')
                    : t('common:expertStatusOnline')}
                </StatusButton>
              </MorePageStatusContainer>
              <MorePageSessionInformation>
                <MorePageSessionBox>
                  <MorePageMenuTitle>
                    {sessionCounts.not_started || 0}
                  </MorePageMenuTitle>
                  <Typography variant="body2">
                    {t('morePageUpcomingSessionsLabel')}
                  </Typography>
                </MorePageSessionBox>
                <Divider flexItem orientation="vertical" variant="middle" />
                <MorePageSessionBox>
                  <MorePageMenuTitle>
                    {sessionCounts.ended || 0}
                  </MorePageMenuTitle>
                  <Typography variant="body2">
                    {t('morePageCompletedSessionsLabel')}
                  </Typography>
                </MorePageSessionBox>
              </MorePageSessionInformation>
            </MorePageTopSectionBox>
          )}
        </MorePageTopSection>
        {isGuest ? (
          <IsGuestContainer>
            <LoginOrSignup />
          </IsGuestContainer>
        ) : (
          <MorePageBottomSection>
            <CustomLink href="/more-menu/settings">
              <LinkBox>
                <Typography variant="h6">
                  {t('morePageSettingsLabel')}
                </Typography>
                <RightCaretIcon size="S" />
              </LinkBox>
            </CustomLink>
            <CustomLink href="/orders">
              <Typography variant="h6">
                {t('morePageOrderHistoryLabel')}
              </Typography>
            </CustomLink>
            <CustomLink href="/notifications">
              <UnreadCountContainer>
                <Typography variant="h6">
                  {t('morePageNotificationsLabel')}
                </Typography>
                <UnreadCounterBadge>{notificationsCount}</UnreadCounterBadge>
              </UnreadCountContainer>
            </CustomLink>
            <CustomLink href="/messages">
              <UnreadCountContainer>
                <Typography variant="h6">
                  {t('morePageMessagesLabel')}
                </Typography>
                <UnreadCounterBadge>{totalUnread}</UnreadCounterBadge>
              </UnreadCountContainer>
            </CustomLink>
            <CustomLink href="/favorites">
              <Typography variant="h6">
                {t('morePageFavoritesLabel')}
              </Typography>
            </CustomLink>
            <CustomBox onClick={confirmLogout}>
              <Typography variant="h6">{t('morePageSignOutLabel')}</Typography>
            </CustomBox>
          </MorePageBottomSection>
        )}
      </MorePageContainer>
      <Dialog
        open={logoutConfirmationIsOpen}
        onClose={closeLogoutConfirmation}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent id="responsive-dialog-title">
          <Typography variant="subtitle1" component="h2">
            {t('common:logoutConfirmationTitle')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLogoutConfirmation}>
            {t('common:logoutConfirmationNo')}
          </Button>
          <Button onClick={onLogout} color="primary">
            {t('common:logoutConfirmationYes')}
          </Button>
        </DialogActions>
      </Dialog>
    </AppShell>
  )
}
