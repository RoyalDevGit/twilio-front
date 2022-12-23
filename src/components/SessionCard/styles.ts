import styled from '@emotion/styled'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { Link } from 'components/Link'
import { ClickableContainer } from 'components/SessionCard/ClickableContainer'
import { UserAvatar } from 'components/UserAvatar'

export const SessionCardContainer = styled.div`
  width: 100%;
  background: ${({ theme }) =>
    theme.customComponents.sessionCard.sessionCardBackground.styleOverrides
      .background};
  border: ${({ theme }) =>
    theme.customComponents.sessionCard.sessionCardBackground.styleOverrides
      .border};
  padding: ${({ theme }) => theme.spacing(2)};
  display: grid;
  grid-template-columns: 0.5fr 4fr 0.9fr;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  position: relative;
  border-radius: 5px;

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    flex-direction: column;
    align-items: flex-start;
    grid-template-columns: 0.5fr 2fr 1fr;
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    grid-template-columns: 1fr;
    display: flex;
    align-items: center;
    text-align: center;
  }
`

export const CustomUserAvatar = styled(UserAvatar)``

export const SessionCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const ExpertNameSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

export const BadgeSection = styled.div`
  display: flex;
`
export const AvatarLink = styled(ClickableContainer)``
export const ExpertName = styled(ClickableContainer)``
export const SessionCardDateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const SessionCardBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.5)};
  align-items: center;
`

export const SessionCardDate = styled(Typography)``

export const SessionCardButton = styled(Button)`
  border-radius: 3px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 100%;
  }
`

export const SessionCardMenu = styled(IconButton)`
  justify-self: end;
  width: 40px;
  height: 40px;
  border-radius: 0px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    position: absolute;
    top: ${({ theme }) => theme.spacing(2)};
    right: ${({ theme }) => theme.spacing(2)};
  }
`

export const SeeDetailsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const CustomMenu = styled(Menu)`
  .MuiPaper-root {
    background-color: ${({ theme }) =>
      theme.customComponents.sessionCard.sessionCardBackground.styleOverrides
        .backgroundColor};
    box-shadow: ${({ theme }) =>
      theme.customComponents.sessionCard.sessionCardBackground.styleOverrides
        .boxShadow};
    border-radius: 3px;
    .MuiMenuItem-root {
      border-bottom: 1px solid;
      border-color: ${({ theme }) =>
        theme.customComponents.sessionCard.sessionCardBackground.styleOverrides
          .borderColor};
      :last-child {
        border-bottom: none;
      }
    }
  }
`

export const CustomLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
`
