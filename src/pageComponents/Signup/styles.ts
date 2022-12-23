import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { Grid } from 'components/Grid'
import { Link } from 'components/Link'
import { Logo } from 'components/Logo'

export const TermsOfEventLabel = styled.label`
  font-size: 0.875rem;
`

export const TermsOfEventLink = styled(Link)``

export const SignupAsContainer = styled(Container)`
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const StyledDivider = styled(Divider)`
  display: flex;
  display: inline-flex;
  width: 100%;
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing(7)};

  ${({ theme }) => theme.breakpoints.only('laptop')} {
    margin-top: ${({ theme }) => theme.spacing(3)};
  }
`

export const StyledDividerSimple = styled(Divider)`
  font-size: 0.875rem;
`

export const SignUpButtonSection = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacing(5.75)};
  text-align: center;

  ${({ theme }) => theme.breakpoints.only('laptop')} {
    margin-top: ${({ theme }) => theme.spacing(3)};
  }
`

export const SignUpButton = styled(Button)`
  width: 100%;
`

export const CustomTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    height: 48px;
    input {
      padding: ${({ theme }) => theme.spacing(1.6)};
    }
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    .MuiOutlinedInput-root {
      height: 40px;
      input {
        padding: ${({ theme }) => theme.spacing(1.1)};
      }
    }
  }
`

export const SignupButtonText = styled(Typography)`
  font-size: 1rem;
  font-weight: 600;
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

export const StyledGrid = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(3, 3)};
  margin-top: ${({ theme }) => theme.spacing(-6)};
`
