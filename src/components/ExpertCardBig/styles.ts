import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { css } from '@emotion/react'

import { UserAvatar } from 'components/UserAvatar'
import { AvatarContainer } from 'components/UserAvatar/styles'
import { Button } from 'components/Button'
import { Image } from 'components/Image'

interface InterestedInExpertAvatarProps {
  iszoomed: string
}

export const InterestedInExpertAvatar = styled(
  UserAvatar
)<InterestedInExpertAvatarProps>`
  .MuiAvatar-root img {
    transition: transform 0.5s ease;
  }
  ${({ iszoomed, theme }) =>
    iszoomed === 'true' &&
    css`
      ${theme.breakpoints.up('laptop')} {
        .MuiAvatar-root img {
          transform: scale(1.1);
        }
      }
    `};
`

export const BigExpertCard = styled(Card)`
  min-width: 265px;
  height: 320px;
  border-radius: 5px;
  box-shadow: none;
  border: ${({ theme }) =>
    theme.customComponents.expertCardBig.interestedInExpertCard.styleOverrides
      .border};
`
export const CardActionAreaBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(5.5)};
  position: relative;
  top: ${({ theme }) => theme.spacing(0)};
`

export const ExpertCardMedia = styled(Image)`
  position: relative;
  top: ${({ theme }) => theme.spacing(0)};
`

export const GradientContainer = styled.div`
  width: 100%;
  height: 88px;
  border-radius: 5px;

  :after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`

export const InterestedInExpertAvatarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  ${AvatarContainer} {
    position: absolute;
    top: ${({ theme }) => theme.spacing(2)};
  }
  .MuiAvatar-root {
    border: ${({ theme }) =>
      theme.customComponents.expertCardBig.userAvatar.styleOverrides.border};
  }
`

export const InterestedInExpertIcon = styled(IconButton)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(0)};
  right: ${({ theme }) => theme.spacing(0)};
`

export const InterestedInExpertContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.8)};
  padding-top: ${({ theme }) => theme.spacing(3.5)};
`

export const InterestedInExpertNameBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ExpertName = styled(Typography)`
  font-size: 1.25rem;
  white-space: pre;
`

export const ExpertExpertise = styled(Typography)`
  font-size: 0.813rem;

  :empty::before {
    content: '';
    display: inline-block;
  }
`

export const InterestedInExpertContentBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1.25)};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
`
export const VerticalDivider = styled(Divider)`
  margin-top: ${({ theme }) => theme.spacing(0.8)};
  margin-bottom: ${({ theme }) => theme.spacing(0.8)};
  border-width: ${({ theme }) => theme.spacing(0.089)};
`

export const InterestedInExpertButton = styled(Button)`
  width: 100%;
  height: 40px;
  font-weight: 600;
  font-size: 0.8rem;
  line-height: 17px;
`
