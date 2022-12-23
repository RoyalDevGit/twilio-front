import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import { Logo } from 'components/Logo'
import { Grid } from 'components/Grid'
import { Button } from 'components/Button'
import { LoginForm } from 'pageComponents/Login/DesktopLogin/styles'
import { FormLabel } from 'components/Form/Label'
import { Image } from 'components/Image'

export const MobileLoginBannerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  height: 300px;
  width: 100%;
`

export const MobileBannerImage = styled(Image)`
  z-index: 0;
  height: 400px;
`

const StyledLogo = styled(Logo)``

export const BannerLogo = styled(StyledLogo)`
  margin-top: 36px;
  position: relative;
  z-index: 1;
  svg {
    path {
      fill: #ffffff;
    }
  }
`

export const MobileLoginFormContainer = styled.div`
  position: relative;
  top: 265px;
  height: 860px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background: ${({ theme }) => theme.palette.background.paper};

  display: flex;
`

export const FormContainer = styled(Container)`
  border-radius: 30px 30px;
`

export const MobileLoginForm = styled(LoginForm)`
  margin-top: ${({ theme }) => theme.spacing(2.5)};
`

export const MobileLoginLinkGrid = styled(Grid)`
  text-align: left;
`

export const MobileFormLabel = styled(FormLabel)`
  font-size: 0.875rem;
`

export const StyledDivider = styled(Divider)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-size: 0.875rem;
`

export const GoogleSignInButton = styled(Button)`
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing(2.25)};
  padding-bottom: ${({ theme }) => theme.spacing(2.25)};

  svg {
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
`

export const ForgetPasswordError = styled.div`
  font-size: 1rem;

  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(0.75)};
  color: ${({ theme }) => theme.palette.secondary.main};
`

export const ForgotPasswordHeader = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(2)};
`

export const ResetPasswordDescription = styled(Typography)`
  opacity: 0.7;
`
