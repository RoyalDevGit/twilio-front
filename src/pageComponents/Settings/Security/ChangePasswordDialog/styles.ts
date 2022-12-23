import styled from '@emotion/styled'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'

import { MOBILE_CHANGE_PASSWORD_BREAKPOINT } from 'pageComponents/Settings/Security/ChangePasswordDialog'
import { CloseButton } from 'components/CloseButton'
import { ResponsiveDialog } from 'components/ResponsiveDialog'

export const ButtonsSection = styled(DialogActions)`
  padding: ${({ theme }) => theme.spacing(2, 2)};
  ${({ theme }) => theme.breakpoints.down(MOBILE_CHANGE_PASSWORD_BREAKPOINT)} {
    display: flex;
    flex-direction: column-reverse;
    gap: ${({ theme }) => theme.spacing(1.8)};
  }
`
export const TitleSection = styled.div`
  padding: 9px 0px;
  .MuiTypography-root {
    padding: 0px 24px;
  }
  .MuiIconButton-root {
    top: 4px;
  }
  ${({ theme }) => theme.breakpoints.down(MOBILE_CHANGE_PASSWORD_BREAKPOINT)} {
    display: flex;
    .MuiIconButton-root {
      top: 11px;
    }
  }
`
export const NavigateBack = styled(IconButton)`
  margin-right: ${({ theme }) => theme.spacing(-3)};
`
export const MobileTitleContainer = styled.div`
  display: flex;
  flex: 10;
  flex-direction: row;
  align-items: center;
  ${NavigateBack} {
    top: 0 !important;
  }
`
export const StepContentSection = styled.div`
  ${({ theme }) => theme.breakpoints.down(MOBILE_CHANGE_PASSWORD_BREAKPOINT)} {
    flex: 1 1 auto;
  }
`
export const VerificationErrorSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: ${({ theme }) => theme.spacing(2)};
`
export const DialogTitleMobile = styled(DialogTitle)`
  font-size: 1.063rem;
  flex: 8;
  text-align: center;
`
export const MainContainer = styled.div`
  max-width: 545px;
  min-height: 250px;
  max-height: 1000px;
  ${({ theme }) => theme.breakpoints.down(MOBILE_CHANGE_PASSWORD_BREAKPOINT)} {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) =>
      theme.customComponents.securityPage.changePasswordDialog.dialog
        .styleOverrides.backgroundColor};
    display: flex;
    flex-direction: column;
  }
`
export const CloseDialogButton = styled(CloseButton)``

export const Dialog = styled(ResponsiveDialog)`
  ${({ theme }) => theme.breakpoints.down(MOBILE_CHANGE_PASSWORD_BREAKPOINT)} {
    .MuiPaper-root {
      background-color: ${({ theme }) =>
        theme.customComponents.securityPage.changePasswordDialog.dialog
          .styleOverrides.backgroundColor};
    }
  }
`
