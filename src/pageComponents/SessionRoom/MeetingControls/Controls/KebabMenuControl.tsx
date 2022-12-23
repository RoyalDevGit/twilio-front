import { useTranslation } from 'next-i18next'
import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'

import { Switch } from 'components/Switch'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  KebabMenuButton,
  KebabMeetingControl,
  StyledMenuItem,
  NoiseCancellationSection,
} from 'pageComponents/SessionRoom/MeetingControls/styles'
import { KebabIcon } from 'icons/KebabIcon'

export const KebabMenuControl: FC = () => {
  const { t } = useTranslation([LocaleNamespace.SessionRoom])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [noiseCancellationToggle, setNoiseCancellationToggle] = useState(false)

  const openMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = (): void => {
    setAnchorEl(null)
  }

  const handleNoiseCancellationToggle = (_e: ChangeEvent<HTMLInputElement>) => {
    const toggleValue = noiseCancellationToggle ? false : true
    setNoiseCancellationToggle(toggleValue)
  }

  return (
    <KebabMeetingControl>
      <Tooltip
        title={anchorEl ? t('closeMenu') : t('openMenu')}
        placement="top"
      >
        <KebabMenuButton onClick={openMenu}>
          <KebabIcon />
        </KebabMenuButton>
      </Tooltip>
      <Menu
        sx={{ mt: '-55px' }}
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
        onClose={closeMenu}
      >
        <NoiseCancellationSection>
          <StyledMenuItem enabled={noiseCancellationToggle}>
            <Switch
              checked={noiseCancellationToggle}
              onChange={(e) => handleNoiseCancellationToggle(e)}
            />
          </StyledMenuItem>
          <Typography>{t('noiseCancellationMenuItem')}</Typography>
        </NoiseCancellationSection>
      </Menu>
    </KebabMeetingControl>
  )
}
