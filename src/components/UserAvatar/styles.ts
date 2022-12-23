import Avatar from '@mui/material/Avatar'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import Badge, { BadgeProps } from '@mui/material/Badge'

import { UserStatus } from 'interfaces/User'

const ripple = keyframes`
  0% {
    transform: scale(.8);
    opacity: 1;
  }

  100% {
    transform: scale(2.4);
    opacity: 0;
  }
`

interface UserAvatarLogoProps {
  foreground: string
  background: string
}

export const UserAvatarLogo = styled(Avatar)<UserAvatarLogoProps>`
  ${({ foreground, background }) => css`
    color: ${foreground};
    background: ${background};
    box-sizing: content-box;
    font-size: 2.38rem;
    font-weight: 300;
  `}
`

interface StatusBadgeProps extends BadgeProps {
  status?: UserStatus
}

const getColorBasedOnStatus = (status?: UserStatus): string => {
  switch (status) {
    case UserStatus.Available:
      return '#23BE87'
    case UserStatus.InSession:
      return '#D66D21'
    case UserStatus.Unavailable:
      return '#505365'
  }
  return '#505365'
}

export const StatusBadge = styled(Badge)<StatusBadgeProps>(
  ({ theme, status }) => {
    if (status === UserStatus.Available) {
      return css`
        .MuiBadge-badge {
          background-color: ${getColorBasedOnStatus(status)};
          color: ${getColorBasedOnStatus(status)};
          box-shadow: 0 0 0 2px ${theme.palette.background.paper};

          ::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            animation: ${ripple} 1.2s infinite ease-in-out;
            border: 1px solid currentColor;
            content: '';
          }
        }
      `
    }

    return css`
      .MuiBadge-badge {
        background-color: ${getColorBasedOnStatus(status)};
        color: ${getColorBasedOnStatus(status)};
        box-shadow: 0 0 0 2px ${theme.palette.background.paper};

        ::after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid currentColor;
          content: '';
        }
      }
    `
  }
)

interface AvatarContainerProps {
  width: string | number | undefined
  height: string | number | undefined
}

export const AvatarContainer = styled.span<AvatarContainerProps>`
  display: inline-block;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  .BaseBadge-root {
    width: 100%;
    height: 100%;
  }
  .MuiAvatar-root {
    width: 100%;
    height: 100%;
  }
`
