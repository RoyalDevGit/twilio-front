import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { Link } from 'components/Link'
import { LoginOrSignupContainer } from 'components/LoginOrSignup/styles'
import { UserAvatar } from 'components/UserAvatar'
import { StatusBadge } from 'components/UserAvatar/styles'

export const MorePageContainer = styled.div`
  height: 100%;
`

export const MorePageTopSection = styled.div`
  background: ${({ theme }) =>
    theme.customComponents.morePage.morePageTopSectionBackground.styleOverrides
      .background};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  padding: ${({ theme }) => theme.spacing(1.5)};
`

export const MorePageTopSectionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
`

export const MorePageMenuTitle = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 300;
`

export const IsGuestContainer = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100% - 66px);
  align-items: center;
  ${LoginOrSignupContainer} {
    padding: 0;
  }
`
export const MorePageAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  width: 100%;
`

export const ProfileAvatarCircleOne = styled.div`
  background: ${({ theme }) =>
    theme.customComponents.morePage.morePageCircleOne.styleOverrides
      .background};
  border-radius: 85px;
  padding: ${({ theme }) => theme.spacing(1.5)};
  display: flex;
  flex-direction: column;
`

export const ProfileAvatarCircleTwo = styled.div`
  background: ${({ theme }) =>
    theme.customComponents.morePage.morePageCircleTwo.styleOverrides
      .background};
  border-radius: 80px;
  padding: ${({ theme }) => theme.spacing(1.25)};
`

export const ProfileAvatarCircleThree = styled.div`
  background-color: ${({ theme }) =>
    theme.customComponents.morePage.morePageAvatarBorder.styleOverrides
      .backgroundColor};
  background: ${({ theme }) =>
    theme.customComponents.morePage.morePageAvatarBorder.styleOverrides
      .background};
  border-radius: 85px;
  padding: ${({ theme }) => theme.spacing(0.5)};
`

export const ProfileAvatar = styled(UserAvatar)``

export const MorePageUserInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.7)};
`

export const LocationBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.8)};
`

export const MorePageStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  width: 100%;
`

export const OnlineStatusBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

export const CustomStatusBadge = styled(StatusBadge)`
  && .MuiBadge-badge {
    box-shadow: none;
    top: 11.5px;
    position: relative;
    ::after {
      animation: none;
      -webkit-animation: none;
    }
    border: none;
  }
`

export const StatusButton = styled(Button)`
  font-weight: 600;
`

export const MorePageSessionInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const MorePageSessionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MorePageBottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
  padding: ${({ theme }) => theme.spacing(1.5)};
  margin-top: ${({ theme }) => theme.spacing(1.5)};
`

export const CustomLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
`

export const UnreadCountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const UnreadCounterBadge = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) =>
    theme.customComponents.morePage.unreadCounterBadge.styleOverrides.color};
  width: 32px;
  height: 24px;
  border-radius: 181px;
  text-align: center;
`

export const CustomBox = styled.div``

export const LinkBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
