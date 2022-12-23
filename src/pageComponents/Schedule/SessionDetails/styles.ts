import styled from '@emotion/styled'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { Link } from 'components/Link'
import { UserAvatar } from 'components/UserAvatar'

export const SessionDetailsPageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const SessionDetailsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.25)};
  flex: 0;
`

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`

export const SessionDetailsTitle = styled(Typography)`
  font-weight: 300;
  font-size: 1.75rem;
`

export const SessionDetailsButtonBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.25)};
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    flex-direction: column;
  }
`

export const SessionDetailsButtons = styled(Button)`
  font-weight: 600;
  font-size: 1rem;
  padding: ${({ theme }) => theme.spacing(0)};
`

export const SessionDetailsDivider = styled(Divider)``

export const SessionDetailsBody = styled.div`
  margin-top: ${({ theme }) => theme.spacing(3)};
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: ${({ theme }) => theme.spacing(2.5)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    grid-template-columns: 1fr;
  }
  flex: 1 1 auto;
  padding-bottom: ${({ theme }) => theme.spacing(2)};
`
interface SessionDetailsContainerProps {
  chatHistory?: boolean
}

export const SessionDetailsContainer = styled.div<SessionDetailsContainerProps>`
  display: flex;
  border: 1px solid;
  border-color: ${({ theme }) =>
    theme.customComponents.sessionDetails.sessionDetailsBorder.styleOverrides
      .borderColor};
  border-radius: 5px;
  gap: ${({ theme }) => theme.spacing(2.5)};
  padding: ${({ theme }) => theme.spacing(2.5)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
  }
`

export const SessionDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const ExpertSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(3)};
`

export const ExpertInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
`

export const ExpertiseText = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  margin-top: ${({ theme }) => theme.spacing(-1)};
`

export const CustomUserAvatar = styled(UserAvatar)``

export const SessionInformationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 90%;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 100%;
  }
`

export const ExpertName = styled(Link)`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
  :hover {
    color: ${({ theme }) => theme.palette.primary.main};
    transition: all 0.3s 0s ease;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    transition: none;
  }
`
export const SessionDateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(-1)};
  gap: ${({ theme }) => theme.spacing(3.75)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    flex-direction: column;
    align-items: flex-start;
  }

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    gap: ${({ theme }) => theme.spacing(1.75)};
  }
`

export const SessionCostSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const SessionCostAndNotesLabel = styled(Typography)`
  font-size: 0.813rem;
  font-weight: 500;
  color: ${({ theme }) =>
    theme.customComponents.sessionDetails.SessionCostAndNotesLabel
      .styleOverrides.color};
`

export const SessionCostValue = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 500;
`

export const SessionNotesSection = styled.div`
  display: flex;
  flex-direction: column;
`
export const SessionMenuSection = styled.div`
  display: flex;
  flex: 1;
  align-items: end;
  flex-direction: column;
  margin-right: ${({ theme }) => theme.spacing(-2)};
`
export const SessionNotes = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
`

export const DateCardBox = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1.25)};
  align-items: center;
`

export const SessionInformation = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 0.875rem;
  }
`

export const SessionLabels = styled(Typography)`
  font-weight: 600;
`

export const SessionDetailsChatContainer = styled.div`
  border: 1px solid;
  border-color: ${({ theme }) =>
    theme.customComponents.sessionDetails.sessionDetailsBorder.styleOverrides
      .borderColor};
  border-radius: 5px;
  padding: ${({ theme }) => theme.spacing(2.5)};
`

export const RecordingsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const BadgeSection = styled.div`
  display: flex;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 100%;
    text-align: left;
  }
`
export const ActionSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(3)};
`

export const ActionLink = styled(Link)``

export const CheckInButton = styled(Button)`
  min-width: fit-content;
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
export const ActionMenu = styled(Menu)`
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
