import styled from '@emotion/styled'

import { Logo } from 'components/Logo'
import { LogoMark, LogoText } from 'components/Logo/styles'
import { Image } from 'components/Image'

export const MobileSignupBannerSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  position: relative;
  z-index: 1;
  svg {
    path {
      fill: #ffffff;
    }
  }

  ${LogoMark} {
    svg {
      width: 48px;
      height: 53px;
    }
  }

  ${LogoText} svg {
    width: 229px;
    height: 33px;
  }
`

export const MobileFirstTimeSignupFormContainer = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  display: flex;
  padding-top: ${({ theme }) => theme.spacing(4.5)};
  padding-bottom: ${({ theme }) => theme.spacing(2.5)};
`

export const MobileSignupFormContainer = styled.div`
  position: relative;
  top: 265px;
  min-height: 860px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background: ${({ theme }) => theme.palette.background.paper};
  display: flex;
  padding-top: 35px;
  padding-bottom: 20px;
`
