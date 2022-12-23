import { FC, MouseEvent, useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'next-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { Global } from '@emotion/react'
import { DateTime } from 'luxon'

import {
  DesktopKebabSection,
  DrawerAvatar,
  DrawerLink,
  DrawerLinkText,
  DrawerMessage,
  MessageBox,
  MobileBottomDrawer,
  NotificationAvatar,
  NotificationBody,
  NotificationItemContainer,
  NotificationMenuButton,
  NotificationMenuSection,
  NotificationNewSection,
  StyledDivider,
  TimeElapsed,
  TimeElapsedNew,
} from 'components/NotificationItem/styles'
import { NotificationNewIcon } from 'icons/NotificationNew'
import { NotificationKebabMenuIcon } from 'icons/NotificationKebabMenu/Desktop'
import { NotificationLogoIcon } from 'icons/NotificationLogo'
import { Link } from 'components/Link'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { NotificationMobileMenuIcon } from 'icons/NotificationKebabMenu/Mobile'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'
import { UserAvatar } from 'components/UserAvatar'
import { getUserPictureUrl } from 'utils/user/getUserPictureUrl'
import {
  NotificationStatus,
  TrayNotification,
} from 'interfaces/TrayNotification'
import { renderNotificationCTA } from 'components/NotificationCTAs/renderNotificationCTA'

export interface NotificationItemProps {
  notification: TrayNotification
  displayMobileKebab?: boolean
}

export const NotificationItem: FC<NotificationItemProps> = ({
  notification,
  displayMobileKebab,
}) => {
  const { referencedUser, message, createdAt } = notification
  const { t } = useTranslation([LocaleNamespace.Notifications])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openBottomDrawer, setOpenBottomDrawer] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))
  const [isOpen, setIsOpen] = useState(false)
  const useDarkMode = usePrefersDarkMode()

  const openMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
    setIsOpen(true)
  }

  const closeMenu = (): void => {
    setAnchorEl(null)
    setIsOpen(false)
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenBottomDrawer(newOpen)
  }

  const drawerBackground = useDarkMode ? '#414157' : '#FFFFFF'

  const getTimeElapsed = (dateCreated: string): string | null => {
    const createdDate = DateTime.fromISO(dateCreated)
    return createdDate.toRelative()
  }

  const isNew = notification.status !== NotificationStatus.Read

  return (
    <NotificationItemContainer isNew={isNew}>
      {!!referencedUser && (
        <NotificationAvatar>
          <UserAvatar
            src={getUserPictureUrl(referencedUser)}
            firstName={referencedUser?.firstName}
            lastName={referencedUser?.lastName}
            width={40}
            height={40}
          />
        </NotificationAvatar>
      )}
      {!referencedUser && (
        <NotificationAvatar>
          <NotificationLogoIcon />
        </NotificationAvatar>
      )}

      <NotificationBody>
        <MessageBox>
          {message} <span>{renderNotificationCTA(notification)}</span>
        </MessageBox>
        {isNew && (
          <TimeElapsedNew color="primary">
            {getTimeElapsed(createdAt)}
          </TimeElapsedNew>
        )}
        {!isNew && <TimeElapsed>{getTimeElapsed(createdAt)}</TimeElapsed>}
      </NotificationBody>
      <NotificationMenuSection isOpen={isOpen}>
        {!isMobile && !displayMobileKebab && (
          <DesktopKebabSection>
            <NotificationMenuButton onClick={openMenu}>
              <NotificationKebabMenuIcon />
            </NotificationMenuButton>
          </DesktopKebabSection>
        )}
        {displayMobileKebab && (
          <>
            <NotificationMenuButton onClick={toggleDrawer(true)}>
              <NotificationMobileMenuIcon />
            </NotificationMenuButton>
            <Global
              styles={{
                '.MuiDrawer-root > .MuiPaper-root': {
                  height: '268px',
                  overflow: 'visible',
                  borderRadius: '10px',
                  backgroundColor: drawerBackground,
                },
              }}
            />
          </>
        )}

        <SwipeableDrawer
          anchor="bottom"
          open={openBottomDrawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={56}
          disableSwipeToOpen={true}
          disableDiscovery={true}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <MobileBottomDrawer>
            <NotificationAvatar>
              {!referencedUser && (
                <DrawerAvatar>
                  <NotificationLogoIcon />
                </DrawerAvatar>
              )}
              {!!referencedUser && (
                <DrawerAvatar>
                  <UserAvatar
                    alt={referencedUser.lastName}
                    src={getUserPictureUrl(referencedUser)}
                    firstName={referencedUser?.firstName}
                    lastName={referencedUser?.lastName}
                    width={72}
                    height={72}
                  />
                </DrawerAvatar>
              )}
            </NotificationAvatar>
            <DrawerMessage>{message}</DrawerMessage>
            <StyledDivider />
            <DrawerLink href={'/support'}>
              <DrawerLinkText>{t('reportIssueMenuItem')}</DrawerLinkText>
            </DrawerLink>
          </MobileBottomDrawer>
        </SwipeableDrawer>

        <Menu
          sx={{ mt: '60px' }}
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem>
            <Link href={'/support'}>{t('reportIssueMenuItem')}</Link>
          </MenuItem>
        </Menu>
      </NotificationMenuSection>
      {!isMobile && (
        <NotificationNewSection isNew={isNew}>
          <NotificationNewIcon />
        </NotificationNewSection>
      )}
    </NotificationItemContainer>
  )
}
