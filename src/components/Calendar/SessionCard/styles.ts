import styled from '@emotion/styled'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import { Button } from 'components/Button'
import { Link } from 'components/Link'
import { UserAvatar } from 'components/UserAvatar'

export const SessionCardContainer = styled(Card)`
  border: ${({ theme }) =>
    theme.customComponents.calendar.sessionCard.sessionCard?.styleOverrides
      ?.border};
  background: transparent;
  margin-bottom: ${({ theme }) => theme.spacing(1.2)};
  box-shadow: 0px 1px 4px 0px hsl(210deg 38% 40% / 30%);
  border-radius: 5px;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    border: none;
    background-color: ${({ theme }) =>
      theme.customComponents.calendar.sessionListContainer.mobileState
        .styleOverrides.color};
    margin-bottom: 5px;
    padding: 18px 16px 4px;
  }
`

export const SessionCardContent = styled(CardContent)`
  display: flex;
  gap: 16px;
  @media (max-width: 1750px) {
    display: block;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    display: flex !important;
    padding: 5px;
    gap: 12px;
    border-radius: none;
    padding-bottom: 8px;
    :last-child {
      padding-bottom: 12px;
    }
  }
`

export const AvatarSection = styled.div``

export const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 auto;
`

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  @media (max-width: 1750px) {
    display: block;
    margin-top: 5px;
    padding-top: 5px;
    a {
      display: block;
    }
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    display: flex;
    border: none;
  }
`

export const SessionCardAvatar = styled(UserAvatar)``

export const SessionTime = styled.span``

export const OtherParticipantName = styled(Link)`
  color: ${({ theme }) => theme.palette.primary.main};
  :hover {
    color: ${({ theme }) => theme.palette.primary.main};
    transition: all 0.3s 0s ease;
    text-decoration: underline;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    transition: none;
  }
  font-size: 1.2rem;
  font-weight: bold;
`

export const DetailsButton = styled(Button)``

export const MessageContainer = styled.div`
  align-items: center;
  display: flex;
`

export const MessageContainerText = styled.span`
  margin-left: 10px;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
  :hover {
    text-decoration: underline;
  }
`
