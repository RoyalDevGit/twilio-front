import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Container from '@mui/material/Container'

import { Logo } from 'components/Logo'
import { Image } from 'components/Image'

export interface MainProps {
  isSignUpPage?: boolean
}

export const Main = styled.main<MainProps>`
  display: flex;
  min-height: 100vh;
  max-height: 100%;

  ${({ isSignUpPage, theme }) =>
    isSignUpPage &&
    css`
      background: ${theme.customComponents.pageWithWallpaper.main.styleOverrides
        .background};
    `};

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    display: -webkit-box;
  }
`

export const MainSignUp = styled(Container)`
  display: flex;
  align-items: center;
  padding-right: ${({ theme }) => theme.spacing(12)};
  padding-left: ${({ theme }) => theme.spacing(16)};
`

const StyledLogo = styled(Logo)``

export const WallpaperLogo = styled(StyledLogo)`
  position: relative;
  top: ${({ theme }) => theme.spacing(0.25)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`

export const Wallpaper = styled.div`
  padding-top: ${({ theme }) => theme.spacing(4)};
  padding-right: ${({ theme }) => theme.spacing(0)};
  padding-bottom: ${({ theme }) => theme.spacing(4)};
  padding-left: ${({ theme }) => theme.spacing(4)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgb(246, 246, 246);
  background: ${({ theme }) =>
    theme.customComponents.pageWithWallpaper.wallpaperGradient.styleOverrides
      .background};
  flex-basis: 50%;
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    display: none;
  }
  position: relative;
`

export const LoginAndSignupWallpaper = styled(Image)`
  position: absolute;
  object-fit: cover;
`

export const WallpaperPageContainer = styled.div`
  flex-basis: 50%;
  padding-top: ${({ theme }) => theme.spacing(9)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    flex-basis: 100%;
  }

  ${({ theme }) => theme.breakpoints.only('tablet')} {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-image: url('/static/img/tablet-login/tablet-login.png');
    background-size: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
`

export const SignUpPageWallpaper = styled.div`
  flex-basis: 50%;

  ${({ theme }) => theme.breakpoints.down('fourK')} {
    flex-basis: 46%;
  }

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    flex-basis: 52%;
  }

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    display: none;
  }
`

export const SignUpPageWallpaperPageContainer = styled(Container)`
  flex-basis: 50%;

  ${({ theme }) => theme.breakpoints.down('fourK')} {
    flex-basis: 54%;
  }

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    flex-basis: 48%;
  }

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    flex-basis: 100%;
  }
`
