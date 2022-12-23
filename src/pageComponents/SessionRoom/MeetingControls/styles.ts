import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { css } from '@emotion/react'
import Typography from '@mui/material/Typography'

export const MeetingControlsContainer = styled.div`
  position: relative;
  bottom: 0;
  padding: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(2)};
  }

  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
`

export const MeetingControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const MeetingControlButton = styled(IconButton)`
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme.customComponents.meetingControls.meetingControlButton.styleOverrides
      .backgroundColor};

  :hover {
    background-color: #5b5c68;
  }

  &.Mui-disabled {
    background-color: #808080;
    opacity: 0.5;
  }

  svg {
    color: #ffffff;
  }
`

export const EndSessionMeetingControl = styled(MeetingControl)`
  ${({ theme }) => theme.breakpoints.up('tablet')} {
    position: absolute;
    right: ${({ theme }) => theme.spacing(2)};
  }
`

export const SessionTimeRemainingContainer = styled.div`
  position: fixed;
  height: 50px;
  width: 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.breakpoints.up('tablet')} {
    left: ${({ theme }) => theme.spacing(2)};
    bottom: 0;
    margin-bottom: ${({ theme }) => theme.spacing(1.2)};
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 100vw;
    display: flex;
    top: 12px;
  }
`
export const SessionTimeRemainingTitle = styled(Typography)`
  font-weight: 500;
  font-size: 13px;
`
export const SessionTimeRemainingTimer = styled(Typography)`
  font-weight: 500;
  font-size: 25px;
`
export const EndSessionButton = styled(MeetingControlButton)`
  width: auto;
`
export const MenuControl = styled(Menu)`
  .MuiPaper-root {
    transform: translateY(-5px) !important;
  }
`

export const MenuItemText = styled.span``

export const ScreenShareMeetingControl = styled(MeetingControl)`
  @media (pointer: coarse) {
    display: none;
  }
`

export const ScreenShareButton = styled(MeetingControlButton)``

export const ActiveScreenShareButton = styled(ScreenShareButton)`
  background-color: #3fa3ff;
`

export const KebabMeetingControl = styled(MeetingControl)`
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const KebabMenuButton = styled(MeetingControlButton)``

interface StyledMenuItemProps {
  enabled: boolean
}

export const StyledMenuItem = styled(MenuItem)<StyledMenuItemProps>`
  display: flex;

  :hover {
    background-color: transparent;
  }

  .MuiSwitch-root .MuiSwitch-track {
    background-color: rgba(63, 163, 255, 1) !important;
  }

  ${({ enabled }) =>
    !enabled &&
    css`
      .MuiSwitch-root .MuiSwitch-track {
        background-color: rgba(120, 120, 128, 0.7) !important;
      }
    `}
`

export const NoiseCancellationSection = styled.div`
  display: flex;
  align-items: center;
  padding-right: ${({ theme }) => theme.spacing(2)};
`
