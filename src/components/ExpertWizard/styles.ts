import styled from '@emotion/styled'
import Dialog from '@mui/material/Dialog'
import MobileStepper from '@mui/material/MobileStepper'
import Stepper from '@mui/material/Stepper'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { LogoMark, LogoText } from 'components/Logo/styles'

export const ExpertWizardDialog = styled(Dialog)`
  .MuiPaper-root {
    background: ${({ theme }) => theme.palette.background.default};
  }
`

export const ExpertWizardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${LogoMark} {
    svg {
      path {
        fill: ${({ theme }) =>
          theme.customComponents.logo.styleOverrides.color};
      }
    }
  }
  ${LogoText} {
    svg {
      path {
        fill: ${({ theme }) =>
          theme.customComponents.logo.styleOverrides.color};
      }
    }
  }
`

export const ExpertWizardBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    grid-template-columns: 1fr;
  }
  height: 100%;
`

export const ExpertWizardLeftPanel = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  padding-left: 127px;
  padding-right: 127px;
  margin-top: ${({ theme }) => theme.spacing(5)};
`

export const ExpertWizardButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(4)};
`

export const ExpertWizardButtons = styled(Button)``

export const ExpertWizardRightPanel = styled.div`
  position: relative;
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    display: none;
  }
`

export const FeaturedExpertsWallpaperBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: -0px;
  z-index: 0;
`

export const ExpertWizardRightPanelImage = styled.div`
  position: relative;
  background-image: url('/static/img/expert-wizard-left-panel.png');
  height: 100%;
  background-size: 100%;
`

export const CustomStepper = styled(Stepper)`
  .MuiStepLabel-root {
    padding: 0px;
    span {
      color: #ffffff;
    }
  }
  .MuiStepConnector-root {
    margin-left: 15px;
    color: #ffffff;
  }
  .MuiStepConnector-line {
    min-height: 44px;
    border-color: #3fa3ff;
  }
  z-index: 1;
  position: relative;
  margin-top: ${({ theme }) => theme.spacing(5)};
  padding-left: ${({ theme }) => theme.spacing(3)};
`

export const ProgressBar = styled(MobileStepper)`
  padding: 0px;
  .MuiLinearProgress-root {
    width: 100%;
  }
`

export const CompleteWizard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3.75)};
  margin-top: ${({ theme }) => theme.spacing(25)};
`

export const CompleteWizardTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CompleteWizardTitle = styled(Typography)`
  text-align: center;
  font-size: 1.75rem;
`

export const CompleteWizardSubtitle = styled(Typography)`
  text-align: center;
  width: 30%;

  ${({ theme }) => theme.breakpoints.down('fourK')} {
    width: 40%;
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    width: 55%;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    width: 70%;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 100%;
  }
`

export const CircularProgressContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(25)};
  display: flex;
  justify-content: center;
  align-items: center;
`
