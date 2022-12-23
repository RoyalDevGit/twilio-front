import { useTranslation } from 'next-i18next'
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react'
import { FC, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions'

import { Button } from 'components/Button'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  EndSessionButton,
  EndSessionMeetingControl,
  MenuControl,
  MenuItemText,
} from 'pageComponents/SessionRoom/MeetingControls/styles'
import { SessionEndIcon } from 'icons/SessionEnd'

export interface EndSessionButtonProps {
  onEnd: () => unknown
}

export const EndSessionControl: FC<EndSessionButtonProps> = ({ onEnd }) => {
  const { t } = useTranslation([LocaleNamespace.SessionRoom])

  const meetingManager = useMeetingManager()
  const [endSessionConfirmationIsOpen, setEndSessionConfirmationIsOpen] =
    useState(false)

  const [endSessionMenuAnchorEl, setEndSessionMenuAnchorEl] =
    useState<null | HTMLElement>(null)
  const endSessionMenuIsOpen = Boolean(endSessionMenuAnchorEl)
  const openEndSessionMenu = (event: React.MouseEvent<HTMLElement>) => {
    setEndSessionMenuAnchorEl(event.currentTarget)
  }
  const closeEndSessionMenu = () => {
    setEndSessionMenuAnchorEl(null)
  }

  const openEndSessionConfirmation = (): void => {
    closeEndSessionMenu()
    setEndSessionConfirmationIsOpen(true)
  }

  const closeEndSessionConfirmation = (): void => {
    setEndSessionConfirmationIsOpen(false)
  }

  const handleEnd = async () => {
    closeEndSessionConfirmation()
    onEnd()
  }

  const leaveMeeting = async () => {
    await meetingManager.leave()
  }

  return (
    <EndSessionMeetingControl>
      <EndSessionButton onClick={openEndSessionMenu}>
        <SessionEndIcon />
      </EndSessionButton>
      <MenuControl
        anchorEl={endSessionMenuAnchorEl}
        open={endSessionMenuIsOpen}
        onClose={closeEndSessionMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={leaveMeeting} disableRipple dense={true}>
          <MenuItemText>{t('leaveSession')}</MenuItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={openEndSessionConfirmation}
          disableRipple
          dense={true}
        >
          <MenuItemText>{t('endSession')}</MenuItemText>
        </MenuItem>
      </MenuControl>
      <Dialog
        open={endSessionConfirmationIsOpen}
        onClose={closeEndSessionConfirmation}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent id="responsive-dialog-title">
          <Typography variant="subtitle1" component="h2">
            {t('confirmEndSessionMessage')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEndSessionConfirmation}>
            {t('confirmEndSessionMessageCancel')}
          </Button>
          <Button onClick={handleEnd} color="error">
            {t('logoutConfirmationYes')}
          </Button>
        </DialogActions>
      </Dialog>
    </EndSessionMeetingControl>
  )
}
