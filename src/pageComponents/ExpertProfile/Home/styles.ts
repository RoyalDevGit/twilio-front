import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'

import { Button } from 'components/Button'
import { StyledButton } from 'components/Button/styles'
import { ArrowButtonContainer } from 'components/HorizontalScrollableContainer/styles'
import { Grid } from 'components/Grid'

export const ExpertEditProfileContainer = styled(Container)``

export const ExpertBookSessionContainer = styled.div`
  display: none;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    position: fixed;
    bottom: 58px;
    width: 100%;
    padding: 12px;
    background: ${({ theme }) => theme.palette.background.default};
    z-index: 105;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    padding-left: ${({ theme }) => theme.spacing(1)};
    padding-right: ${({ theme }) => theme.spacing(1)};
  }
`

export const ExpertNextAvailableBookingContainer = styled(Grid)`
  display: none;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    position: fixed;
    bottom: 58px;
    width: 100%;
    padding: 12px;
    background: ${({ theme }) => theme.palette.background.default};
    z-index: 105;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    padding-left: ${({ theme }) => theme.spacing(1)};
    padding-right: ${({ theme }) => theme.spacing(1)};
  }
`

export const ConnectNowButton = styled(Button)`
  width: 100%;
  height: 48px;
  border-radius: 3px;
  &${StyledButton} {
    background: ${({ theme }) =>
      theme.customComponents.availableSessions.connectWithExpertButton
        .styleOverrides.background};
    color: #090b1b;
  }
`

export const NextAvailableTimeContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const NextAvailableTimeLabel = styled(Typography)`
  font-weight: 500;
  font-size: 0.813rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`
export const NextAvailableTime = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 400;
`

export const BookSessionButton = styled(Button)`
  width: 100%;
  height: 48px;
  border-radius: 3px;
`

export const BookNextAvailableSessionButton = styled(Button)`
  width: 100%;
  height: 48px;
  border-radius: 3px;
  white-space: pre;
`

export const ExpertBodySection = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: ${({ theme }) => theme.spacing(10)};
  justify-items: start;
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    grid-template-columns: 1fr 2fr 1fr;
    gap: ${({ theme }) => theme.spacing(4)};
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    grid-template-columns: 1fr 2fr;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    grid-template-columns: 1fr 2fr;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    grid-template-columns: 1fr;
  }
`

export const ExpertLeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  gap: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    justify-self: start;
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    justify-self: center;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    justify-self: start;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    justify-self: center;
    margin-bottom: ${({ theme }) => theme.spacing(2.5)};
  }
`

export const ExpertLeftPanelBox = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(0.75)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    align-items: center;
  }
`

export const ExpertTitle = styled(Typography)`
  color: ${({ theme }) =>
    theme.customComponents.expertProfile.expertLabel.styleOverrides.color};
  font-size: 0.813rem;
`

export const ExpertTitleInfo = styled(Typography)`
  font-size: 1rem;

  margin-top: ${({ theme }) => theme.spacing(0.75)};
`

export const ExpertMiddlePanel = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    align-items: flex-start;
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    justify-content: space-between;
    justify-self: center;
  }
`

export const ExpertDescription = styled.div`
  width: 100%;
  white-space: pre-line;
  display: contents;

  font-size: 1rem;
`

export const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(2.75)};
  margin-bottom: ${({ theme }) => theme.spacing(2.75)};
  gap: ${({ theme }) => theme.spacing(2.5)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
  }
`

export const TagsChipsContainer = styled.div`
  display: flex;
  gap: 5px;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`

export const TagsChips = styled(Chip)`
  border-radius: 5px;
  font-size: 0.875rem;
`

export const ExpertRightPanel = styled.div`
  width: 100%;
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    justify-self: center;
    grid-row: 2;
    grid-column: 1 / span 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const ExpertProfileTitle = styled(Typography)`
  font-size: 1.75rem;
  margin-top: ${({ theme }) => theme.spacing(2.5)};
`

export const ExpertCommentSection = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(5)};
`

export const ExpertInterestedExpertsSection = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${ArrowButtonContainer} {
    width: 100px;
  }
`
