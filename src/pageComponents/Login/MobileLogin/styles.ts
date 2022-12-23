import styled from '@emotion/styled'

import { Logo } from 'components/Logo'
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
  height: 100%;
  position: relative;
  z-index: 1;
  svg {
    path {
      fill: #ffffff;
    }
  }
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    align-items: center;
    margin-bottom: 36px;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    top: ${({ theme }) => theme.spacing(12)};
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
  padding-top: ${({ theme }) => theme.spacing(3)};
`
