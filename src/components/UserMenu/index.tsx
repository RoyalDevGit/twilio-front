import {
  FC,
  lazy,
  LazyExoticComponent,
  MouseEvent,
  Suspense,
  useState,
  useCallback,
} from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'

import { Button } from 'components/Button'
import { logout } from 'utils/auth/logout'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { UserAvatar } from 'components/UserAvatar'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { useExpert } from 'hooks/useExpert'
import { getUserFullName } from 'utils/user/getUserFullName'
import { getUserPictureUrl } from 'utils/user/getUserPictureUrl'
import {
  CustomMenu,
  CustomStatusBadge,
  ExpertName,
  ExpertOnlineStatusContainer,
  ExpertStatusInformation,
  ExpertStatusNameBox,
  IconAvatarSection,
  OnlineStatusBox,
  CustomMenuItem,
  StatusButton,
  CustomLink,
} from 'components/UserMenu/styles'
import { DownCaretIcon } from 'icons/Caret/Down'
import { ExpertWizardProps } from 'components/ExpertWizard'
import { useEditableStatus } from 'hooks/api/user/useEditableStatus'
import { UserStatus } from 'interfaces/User'

export const HeaderUserMenu: FC<React.PropsWithChildren<unknown>> = () => {
  const { t } = useTranslation(LocaleNamespace.Common)
  const user = useCurrentUserAsserted()
  const userFullName = getUserFullName(user)
  const userPictureUrl = getUserPictureUrl(user)
  const expert = useExpert()
  const editableStatus = useEditableStatus(user)
  const [logoutConfirmationIsOpen, setLogoutConfirmationIsOpen] =
    useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [ExpertWizard, setExpertWizard] = useState<
    LazyExoticComponent<FC<ExpertWizardProps>> | undefined
  >()

  const openExpertWizard = (): void => {
    const ExpertWizard = lazy(() =>
      import('../ExpertWizard').then(({ ExpertWizard: WelcomeWizard }) => ({
        default: WelcomeWizard,
      }))
    )
    setExpertWizard(ExpertWizard)
    closeUserMenu()
    setDialogIsOpen(true)
  }

  const closeExpertWizard = (): void => {
    setDialogIsOpen(false)
  }

  const openUserMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const closeUserMenu = (): void => {
    setAnchorEl(null)
  }

  const closeLogoutConfirmation = (): void => {
    setLogoutConfirmationIsOpen(false)
  }

  const confirmLogout = (): void => {
    closeUserMenu()
    setLogoutConfirmationIsOpen(true)
  }

  const onLogout = async (): Promise<void> => {
    closeLogoutConfirmation()
    logout()
  }

  const toggleExpertStatus = useCallback(() => {
    if (user.status === UserStatus.Available) {
      editableStatus.setValue(false)
    } else {
      editableStatus.setValue(true)
    }
  }, [user])

  const isAvailable = user.status === UserStatus.Available

  return (
    <>
      <IconAvatarSection
        id="user-menu-open"
        onClick={openUserMenu}
        sx={{ p: 1 }}
      >
        <UserAvatar
          alt={userFullName}
          src={userPictureUrl}
          firstName={user.firstName}
          lastName={user.lastName}
          status={user?.status}
          width={40}
          height={40}
        />
        <DownCaretIcon />
      </IconAvatarSection>
      <CustomMenu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={closeUserMenu}
      >
        {!!expert && (
          <ExpertOnlineStatusContainer>
            <UserAvatar
              alt={userFullName}
              src={userPictureUrl}
              firstName={user.firstName}
              lastName={user.lastName}
              width={40}
              height={40}
            />

            <ExpertStatusInformation>
              <ExpertStatusNameBox>
                <ExpertName>{userFullName}</ExpertName>
                <OnlineStatusBox>
                  <CustomStatusBadge
                    overlap="circular"
                    variant="dot"
                    status={user?.status}
                  />
                  <Typography>
                    {isAvailable ? t('online') : t('offline')}
                  </Typography>
                </OnlineStatusBox>
              </ExpertStatusNameBox>
              <StatusButton
                onClick={toggleExpertStatus}
                id="user-menu-toggle-expert-status"
                color="primary"
                variant="outlined"
              >
                {isAvailable
                  ? t('expertStatusOffline')
                  : t('expertStatusOnline')}
              </StatusButton>
            </ExpertStatusInformation>
          </ExpertOnlineStatusContainer>
        )}
        {!!expert && (
          <CustomLink key="myExpertProfile" href={`/experts/${expert.id}`}>
            <CustomMenuItem
              id={`user-menu-experts-${expert.id}`}
              onClick={closeUserMenu}
            >
              <Typography textAlign="center">
                {t('common:myExpertProfile')}
              </Typography>
            </CustomMenuItem>
          </CustomLink>
        )}
        {!expert && (
          <CustomMenuItem
            id="user-menu-open-expert-wizard"
            onClick={openExpertWizard}
          >
            <Typography textAlign="center">
              {t('common:becomeAnExpert')}
            </Typography>
          </CustomMenuItem>
        )}
        <CustomLink key="expertOrdersPage" href={`/orders`}>
          <CustomMenuItem id="user-menu-orders" onClick={closeUserMenu}>
            <Typography textAlign="center">{t('common:ordersPage')}</Typography>
          </CustomMenuItem>
        </CustomLink>
        <CustomLink
          href={expert ? '/settings/expert/profile' : '/settings/account'}
        >
          <CustomMenuItem
            id={
              expert
                ? 'user-menu-settings-expert-profile'
                : 'user-menu-settings-account'
            }
            onClick={closeUserMenu}
          >
            <Typography textAlign="center">{t('common:settings')}</Typography>
          </CustomMenuItem>
        </CustomLink>
        <CustomMenuItem id="user-menu-logout" onClick={confirmLogout}>
          <Typography textAlign="center">{t('common:logout')}</Typography>
        </CustomMenuItem>
      </CustomMenu>

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
          <Button
            id="user-menu-logout-confirmation-no"
            onClick={closeLogoutConfirmation}
          >
            {t('common:logoutConfirmationNo')}
          </Button>
          <Button
            id="user-menu-logout-confirmation-yes"
            onClick={onLogout}
            color="primary"
          >
            {t('common:logoutConfirmationYes')}
          </Button>
        </DialogActions>
      </Dialog>

      {ExpertWizard && (
        <Suspense>
          <ExpertWizard open={dialogIsOpen} onClose={closeExpertWizard} />
        </Suspense>
      )}
    </>
  )
}
