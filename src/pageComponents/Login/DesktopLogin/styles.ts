import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import { Grid } from 'components/Grid'
import { Button } from 'components/Button'
import { ConfirmationCodeInput } from 'components/ConfirmationCodeInput'
import { AuthCodeControl } from 'components/ConfirmationCodeInput/styles'
import { Logo } from 'components/Logo'

export const LoginFormContainer = styled(Container)`
  ${({ theme }) => theme.breakpoints.only('tablet')} {
    background-color: ${({ theme }) =>
      theme.customComponents.desktopLogin.loginFormContainer.styleOverrides
        .backgroundColor};
    border-radius: 30px;
    max-width: 500px;
    transform: scale(0.9);
    margin-top: ${({ theme }) => theme.spacing(-4)};
  }
`

export const LoginForm = styled.form`
  ${({ theme }) => theme.breakpoints.only('tablet')} {
    padding: ${({ theme }) => theme.spacing(3, 3)};
  }
`

export const LoginPageHeader = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`

export const LoginButton = styled(Button)`
  width: 100%;
  height: 48px;
  padding-top: ${({ theme }) => theme.spacing(2.25)};
  padding-bottom: ${({ theme }) => theme.spacing(2.25)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    height: 40px;
  }
`

export const ForgotPasswordGrid = styled(Grid)`
  text-align: right;
`

export const ErrorMessageGrid = styled(Grid)`
  text-align: center;
`

export const LoginPageSubtitle = styled(Typography)`
  font-size: 1.25rem;
  opacity: 0.8;

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    font-size: 1.125rem;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
  ${({ theme }) => theme.breakpoints.only('tablet')} {
    margin-bottom: ${({ theme }) => theme.spacing(0)};
  }
`

export const CustomTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    height: 48px;
    input {
      padding: ${({ theme }) => theme.spacing(1.6)};
    }
  }
`

export const SignUpLinkGrid = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(1)};
`

export const SectionGridItem = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(1)};
`

export const LoginConfirmationCodeInput = styled(ConfirmationCodeInput)`
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    padding-left: 0px;
    padding-right: 0px;
  }

  ${AuthCodeControl} {
    div {
      display: flex;
      gap: 8px;

      input[type='number']::-webkit-inner-spin-button,
      input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    input {
      width: 50px;
      height: 50px;
      background: ${({ theme }) =>
        theme.customComponents.codeVerificationDialog.authCodeSection.input
          .styleOverrides.background};

      border: ${({ theme }) =>
        theme.customComponents.codeVerificationDialog.authCodeSection.input
          .styleOverrides.border};

      border-radius: 3px;
      color: ${({ theme }) =>
        theme.customComponents.codeVerificationDialog.authCodeSection.input
          .styleOverrides.color};
      font-size: 2rem;
      font-weight: 300;
      text-align: center;
    }
  }
`

export const BannerLogoTablet = styled(Logo)`
  position: relative;
  z-index: 1;
  transform: scale(1.25);
  margin-top: ${({ theme }) => theme.spacing(-3)};
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
  svg {
    path {
      fill: #ffffff;
    }
  }
`
