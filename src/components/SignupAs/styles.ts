import styled from '@emotion/styled'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'

import { Logo } from 'components/Logo'
import { LogoMark, LogoText } from 'components/Logo/styles'
import { Image } from 'components/Image'

export const SignupAsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.breakpoints.up('tablet')} {
    flex-direction: row;
  }
`

export const StyledExpertCard = styled.div``

export const ExpertCardTop = styled.div`
  height: fit-content;
  background: ${({ theme }) =>
    theme.customComponents.signupAs.expertCardTop.styleOverrides.background};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ExpertCardBottom = styled.div`
  height: 66px;
  background: ${({ theme }) =>
    theme.customComponents.signupAs.expertCardBottom.styleOverrides.background};
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: '0.3';

  :hover {
    color: rgba(63, 163, 255, 1);
  }
`

export const CardButton = styled(ButtonBase)`
  flex: 1 1 auto;
  border-radius: 10px;
  border: ${({ theme }) =>
    theme.customComponents.signupAs.cardButton.styleOverrides.border};
  overflow: hidden;
  width: 100%;

  :hover {
    ${ExpertCardBottom} {
      color: rgba(63, 163, 255, 1);
    }
  }
`

export const ExpertCardText = styled.span`
  font-size: 1rem;
  font-weight: 600;
`

export const LogoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`

export const SignupAsLogo = styled(Logo)`
  display: flex;
  flex-direction: column;
  ${LogoMark} {
    svg {
      width: 63px;
      height: 70px;
    }
  }

  ${LogoText} svg {
    width: 248px;
    height: 40px;
  }
`

export const LogoSubheader = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 400;
`

export const StyledVideo = styled.video`
  width: 100%;
`

export const MobileCardImage = styled(Image)``
