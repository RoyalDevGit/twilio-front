import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'
import { TagsSection } from 'components/CategoryChips/styles'
import { ArrowButtonContainer } from 'components/HorizontalScrollableContainer/styles'

const PageContainer = styled(Container)`
  position: relative;
`
const PageDiv = styled.div`
  position: relative;
`
export const ExploreContainer = styled.div``

export const ExplorePageTitles = styled(Typography)`
  font-size: 1.75rem;
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  margin-left: ${({ theme }) => theme.spacing(2)};
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

export const FeaturedExpertsSection = styled.div`
  gap: ${({ theme }) => theme.spacing(2)};
  justify-content: center;
  ${ArrowButtonContainer} {
    width: 100px;
    ${({ theme }) => theme.breakpoints.down('tablet')} {
      width: 50px;
    }
  }
`

export const CategoryChipsContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  ${TagsSection} {
    width: 100%;
    padding-left: ${({ theme }) => theme.spacing(1.5)};
    ${({ theme }) => theme.breakpoints.down('tablet')} {
      padding-left: ${({ theme }) => theme.spacing(0)};
    }
  }
  padding-left: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) =>
    theme.customComponents.explorePage.recommendedSection.styleOverrides
      .backgroundColor};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-left: ${({ theme }) => theme.spacing(0)};
  }
`

export const FilterContainer = styled.div`
  border-right: ${({ theme }) =>
    theme.customComponents.messagesPage.messagesPageBorder.styleOverrides
      .border};
  padding-right: ${({ theme }) => theme.spacing(3.875)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    padding-right: ${({ theme }) => theme.spacing(0)};
    border-right: none;
  }
`

export const MobileFilterButton = styled(Button)`
  width: 135px;
  ${({ theme }) => theme.breakpoints.up('laptop')} {
    display: none;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const DrawerFilterButton = styled(Button)`
  width: 135px;
  ${({ theme }) => theme.breakpoints.down('laptop')} {
    display: none;
  }
`

export const CategoryContainer = styled(PageDiv)`
  ${ArrowButtonContainer} {
    width: 100px;
  }
`

export const FeaturedExpertsContainer = styled(PageDiv)`
  ${ArrowButtonContainer} {
    width: 100px;
    ${({ theme }) => theme.breakpoints.down('tablet')} {
      width: 50px;
    }
  }
`

export const AllExpertsContainer = styled(PageContainer)``

export const RecommendedExpertsContainer = styled.div`
  background-color: ${({ theme }) =>
    theme.customComponents.explorePage.recommendedSection.styleOverrides
      .backgroundColor};
  margin-top: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(2.5)};
  padding-bottom: ${({ theme }) => theme.spacing(6)};

  ${ArrowButtonContainer} {
    width: 100px;
    ${({ theme }) => theme.breakpoints.down('tablet')} {
      width: 50px;
    }
  }
`

export const RecommendedExpertsSection = styled.div`
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
