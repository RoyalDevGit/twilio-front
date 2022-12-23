import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { SearchAutocomplete } from 'components/Header/SearchAutocomplete'
import { StyledAutocomplete } from 'components/Header/SearchAutocomplete/styles'
import { ArrowButtonContainer } from 'components/HorizontalScrollableContainer/styles'
import { PageContainer } from 'components/PageContainer/styles'
import { HomePageBlurIcon } from 'icons/HomePageBlur'

export const StyledPageContainer = styled(PageContainer)`
  padding-bottom: ${({ theme }) => theme.spacing(0)};
`

export const HomePageGradientContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(4.875)};
  width: 100%;
  background-color: ${({ theme }) =>
    theme.customComponents.homePageGradient.homePageGradientBanner
      .styleOverrides.backgroundColor};
  padding-bottom: ${({ theme }) => theme.spacing(5.125)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(3)};
  }
  position: relative;
`

export const GuestUserHomePageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 410px;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(4.875)};
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing(5.125)};
  align-items: flex-start;
  padding-left: ${({ theme }) => theme.spacing(7)};

  background-image: ${({ theme }) =>
    theme.customComponents.consumerHomePage.guestUserHomePageContainer
      .styleOverrides.backgroundImage};
  background-size: contain;
  background-position-x: right;
  background-color: ${({ theme }) =>
    theme.customComponents.consumerHomePage.guestUserHomePageContainer
      .styleOverrides.backgroundColor};
  background-repeat: no-repeat;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-left: ${({ theme }) => theme.spacing(1)};
  }

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    gap: ${({ theme }) => theme.spacing(0)};
    padding-bottom: ${({ theme }) => theme.spacing(0)};
    background-image: none;
  }
`

export const HomePageBlurCustomIcon = styled(HomePageBlurIcon)`
  position: absolute;
  top: 0px;
  height: 100%;
  width: 100%;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    top: -70px;
  }
`

export const HomePageToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: ${({ theme }) => theme.spacing(3)};
  width: 100%;
  z-index: 5;

  ${({ theme }) => theme.breakpoints.up('laptopL')} {
    justify-content: flex-end;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    justify-content: flex-end;
  }
`
export const GuestUserHomePageToolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  z-index: 5;
  margin-top: ${({ theme }) => theme.spacing(-6)};

  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    justify-content: space-between;
    margin-top: ${({ theme }) => theme.spacing(5.125)};
    margin-left: ${({ theme }) => theme.spacing(-3)};
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    justify-content: flex-end;
    margin-top: ${({ theme }) => theme.spacing(-9)};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    margin-top: ${({ theme }) => theme.spacing(-8)};
    margin-bottom: ${({ theme }) => theme.spacing(0)};

    .MuiButton-root {
      transform: scale(0.9);
    }
  }
`

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`

export const TitleBox = styled.div`
  z-index: 5;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-top: ${({ theme }) => theme.spacing(-10)};
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    margin-top: ${({ theme }) => theme.spacing(-6.25)};
  }
`

export const HomePageHeaderBox = styled.div`
  display: flex;
  z-index: 5;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3.125)};
  padding-left: ${({ theme }) => theme.spacing(2)};
  padding-right: ${({ theme }) => theme.spacing(2)};
  width: 100%;
  text-align: center;
`

export const HomePageWelcomeLabel = styled.div`
  font-weight: 300;
  font-size: 1.75rem;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    font-size: 1.625rem;
  }
`

export const CustomAutocomplete = styled(SearchAutocomplete)`
  &${StyledAutocomplete} {
    max-width: 925px;
    width: 100%;
  }
`

export const HeaderButton = styled(Button)`
  font-size: 1rem;
`

export const ConsumerHomePageContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding-left: ${({ theme }) => theme.spacing(6.5)};
  padding-right: ${({ theme }) => theme.spacing(6.5)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-left: ${({ theme }) => theme.spacing(2.5)};
    padding-right: ${({ theme }) => theme.spacing(2.5)};
  }
`

export const SectionTitle = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 300;
`

export const HomepageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`

export const UpcomingSessionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`

export const UpcomingSessionsCardsSection = styled.div`
  ${ArrowButtonContainer} {
    width: 60px;
  }
`

export const ExpertCardsSection = styled.div`
  gap: ${({ theme }) => theme.spacing(4)};

  ${({ theme }) => theme.breakpoints.down('fourK')} {
    grid-template-columns: repeat(5, 210px);
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    grid-template-columns: repeat(3, 210px);
    gap: ${({ theme }) => theme.spacing(1.5)};
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    grid-template-columns: repeat(2, 210px);
    gap: ${({ theme }) => theme.spacing(4)};
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    grid-template-columns: repeat(2, 50%);
    gap: ${({ theme }) => theme.spacing(1)};
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    grid-template-columns: repeat(1, 70%);
    gap: ${({ theme }) => theme.spacing(1.5)};
    justify-content: center;
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    grid-template-columns: repeat(1, 80%);
    gap: ${({ theme }) => theme.spacing(1.5)};
    justify-content: center;
  }

  ${ArrowButtonContainer} {
    width: 100px;
  }
`

const PageDiv = styled.div`
  position: relative;
`

export const CategoryContainer = styled(PageDiv)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  ${ArrowButtonContainer} {
    width: 100px;
  }
`

export const CategoryCardsSection = styled.div`
  justify-content: center;
  ${ArrowButtonContainer} {
    width: 100px;
    ${({ theme }) => theme.breakpoints.down('tablet')} {
      width: 50px;
    }
  }
`

export const RecommendedCategoriesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const CategoryCardsGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const SearchSubmitButton = styled(Button)`
  width: 95%;
  margin-bottom: ${({ theme }) => theme.spacing(7)};
`

export const HeroImageSection = styled.div`
  display: flex;
  position: absolute;
  margin-left: 70%;

  ${({ theme }) => theme.breakpoints.up('fourK')} {
    margin-left: 60%;
  }
  ${({ theme }) => theme.breakpoints.down('fourK')} {
    margin-left: 60%;
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    margin-left: 48%;
  }
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    margin-left: 55%;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const PhoneBubbleSection = styled.div`
  position: relative;
  top: 114px;
`

export const PhoneImageSection = styled.div`
  position: relative;
`

export const TextBubble = styled.div`
  flex-wrap: wrap;
  position: relative;
  height: 112px;
  width: 212px;
  top: -200px;
  left: 240px;
  background: #ffffff;
  color: #000000;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 35px 35px 0px 35px;
  padding: ${({ theme }) => theme.spacing(1.25, 2.5)};

  ${({ theme }) => theme.breakpoints.down('laptop')} {
    top: -140px;
    left: 70px;
  }
`

export const FeaturedExpertButton = styled(Button)`
  width: 172px;
  height: 40px;
`

export const FooterSection = styled.div`
  height: 476px;
  margin-top: ${({ theme }) => theme.spacing(7)};

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-top: ${({ theme }) => theme.spacing(5)};
  }
`

export const BubbleTextInitial = styled(Typography)`
  line-height: 1.25;
  margin-right: ${({ theme }) => theme.spacing(0.5)};
`
