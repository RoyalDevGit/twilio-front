import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { ExpertAvatar } from 'components/ExpertAvatar'
import { ResponsiveDialog } from 'components/ResponsiveDialog'
import { Link } from 'components/Link'

export const ExpertBannerContainer = styled.div`
  position: relative;
`

interface ExpertBannerProps {
  src?: string | null
}

export const ExpertBanner = styled.div<ExpertBannerProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: ${({ theme }) =>
      theme.customComponents.bannerGradient.expertBannerGradient.styleOverrides
        .background},
    url('${({ src }) => src}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  height: 500px;
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    height: 316px;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    height: 200px;
  }
`

export const MobileMenuContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`

export const KebobMenuMobile = styled(IconButton)`
  ${({ theme }) => theme.breakpoints.up('tablet')} {
    display: none;
  }
`

export const ExpertContainer = styled.div`
  position: relative;
`

export const HeaderContainerBody = styled.div`
  position: absolute;
  top: -220px;
  left: 0px;
  right: 0px;
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    top: -190px;
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    top: -160px;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    top: -170px;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    top: -170px;
    padding-bottom: ${({ theme }) => theme.spacing(10)};
  }
`
export const ExpertAvatarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3.5)};
  gap: ${({ theme }) => theme.spacing(4)};
  align-items: end;
  justify-items: center;
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    grid-template-columns: 2fr 1fr;
    justify-items: start;
    padding-left: ${({ theme }) => theme.spacing(8)};
    padding-right: ${({ theme }) => theme.spacing(8)};
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    grid-template-columns: 2fr 1fr;
    padding-left: ${({ theme }) => theme.spacing(4)};
    padding-right: ${({ theme }) => theme.spacing(4)};
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    padding-left: ${({ theme }) => theme.spacing(3)};
    padding-right: ${({ theme }) => theme.spacing(3)};
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`

export const ExpertLeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    justify-self: start;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
    justify-self: center;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`
export const ExpertAvatarInfo = styled.div``

export const ExpertAvatarBox = styled(Box)`
  position: relative;
  top: 0px;
`

export const CustomExpertAvatar = styled(ExpertAvatar)`
  position: relative;
  top: 0px;
  border: none;
  box-shadow: ${({ theme }) =>
    theme.customComponents.expertProfile.avatarOutlineColor.styleOverrides
      .boxShadow};
  border-radius: 50%;
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    width: 209px;
    height: 209px;
  }
`

export const PlayIconContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
`

export const ExpertAvatarPlayIcon = styled(IconButton)`
  position: absolute;
  right: 10px;
`

export const ExpertAvatarMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(1)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    align-items: center;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`

export const ExpertAvatarIconBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const VerifiedExpertLabel = styled(Typography)`
  font-size: 0.875rem;
  font-weight: 500;
`

export const ExpertName = styled(Typography)`
  font-size: 2.375rem;
  line-height: normal;
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    text-align: center;
  }
`

export const ExpertExpertiseArea = styled(Typography)`
  font-size: 1rem;
`

export const ExpertInformation = styled(Typography)`
  font-size: 0.875rem;
`

export const ExpertRightSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    justify-self: end;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    justify-self: center;
    gap: ${({ theme }) => theme.spacing(0)};
  }
`

export const ReviewsAndRatesContainer = styled.div`
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing(5)};
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    gap: ${({ theme }) => theme.spacing(2)};
  }
`

export const ExpertReviews = styled.div`
  display: none;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: flex;
    flex-direction: column;
  }
`

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
`

export const RatingValue = styled(Typography)`
  font-size: 1.375rem;
  color: ${({ theme }) =>
    theme.customComponents.miniStarRating.ratingValue.styleOverrides.color};
`

export const RatingCount = styled(Typography)`
  font-size: 1.375rem;
`

export const ExpertRate = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing(0.5)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(0)};
    align-items: flex-start;
    justify-content: center;
  }
`

export const ExpertRateLabel = styled(Typography)`
  font-size: 0.813rem;
`

export const ExpertRateCostLabel = styled(Typography)`
  font-size: 1.5rem;
`

export const ExpertFollowing = styled.div`
  display: flex;
  justify-content: flex-end;

  font-size: 1.188rem;
  gap: ${({ theme }) => theme.spacing(2.75)};
`

export const ExpertFollowingBox = styled.div`
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const ExpertFollowingNumbers = styled(Typography)`
  font-size: 1.125rem;
`

export const ExpertFollowingLabel = styled(Typography)`
  font-size: 0.813rem;
`

export const KebabMenu = styled(IconButton)`
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const SocialMediaLinks = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
`

// EXPERT PROFILE TABS SECTION

export const ExpertNavigationSection = styled.div``

export const ExpertNavigationTabs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FadedDivider = styled(Divider)`
  width: 100%;
  /* background: rgb(255, 255, 255);
  border-color: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.5408653846153846) 0%,
    rgba(255, 255, 255, 0.96) 40%,
    rgba(255, 255, 255, 0.9639423076923077) 60%,
    rgba(255, 255, 255, 0.5408653846153846) 100%
  ); */
`

export const TabPanel = styled.div`
  margin-top: ${({ theme }) => theme.spacing(5)};
`

export const ExpertVideoDialog = styled(ResponsiveDialog)`
  .MuiPaper-root {
    background: black;
  }
`

export const VideoPlayerBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
`

export const ExpertVideoPlayer = styled.video`
  max-width: 400px;
  height: 100%;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 100%;
    height: 100%;
  }
`

export const VideoPlayerHeader = styled(Box)`
  text-align: right;
`

export const VideoPlayerCloseButton = styled(IconButton)``

export const DesktopRating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};

  .MuiRating-root {
    position: relative;
    top: 3px;
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`
