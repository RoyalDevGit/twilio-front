import { useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@emotion/react'
import { useElementSize } from 'usehooks-ts'

import { AppShell } from 'components/AppShell'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { CategoryCard } from 'components/CategoryCard'
import {
  CategoryCardsGrid,
  CategoryCardsSection,
  ExploreContainer,
  ExplorePageTitles,
  FeaturedExpertsSection,
  // RecommendedExpertsContainer,
  // RecommendedExpertsSection,
  CategoryContainer,
  FeaturedExpertsContainer,
  AllExpertsContainer,
  FilterContainer,
  RecommendedCategoriesSection,
  CategoryChipsContainer,
  MobileFilterButton,
  DrawerFilterButton,
} from 'pageComponents/Explore/styles'
import { FeaturedExpertCard } from 'components/FeaturedExpertCard'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
// import { ExpertCardSmall } from 'components/ExpertCardSmall'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { HorizontalScrollableContainer } from 'components/HorizontalScrollableContainer'
import { Expert } from 'interfaces/Expert'
import { useExpertLoad } from 'hooks/api/expert/useExpertLoad'
import { ExpertCardGrid } from 'components/ExpertCardGrid'
import { CategoryChips } from 'components/CategoryChips'
import { Category } from 'interfaces/Category'
import { Link } from 'components/Link'
import { ExploreEmptyState } from 'components/ExploreEmptyState'
import { DrawerFilter } from 'components/Filters/DrawerFilter'
import { BottomSheetFilter } from 'components/Filters/BottomSheetFilter'
import { FilterButtonIcon } from 'icons/FilterButton'
import { useRouterFilters } from 'hooks/useRouterFilters'
import { Filter } from 'interfaces/Filter'

export interface ExplorePageProps {
  initialFeaturedExperts: Expert[]
  initialBrowseSectionExperts: Expert[]
  initialRecommendedExperts: Expert[]
  recommendedCategories: Category[]
}

export const ExplorePage: NextPage<ExplorePageProps> = ({
  initialBrowseSectionExperts: initialBrowseExperts,
  initialFeaturedExperts,
  // initialRecommendedExperts,
  recommendedCategories,
}) => {
  const { t } = useTranslation([
    LocaleNamespace.ExplorePage,
    LocaleNamespace.ExpertCard,
    LocaleNamespace.CategoryCard,
    LocaleNamespace.FilterBy,
    LocaleNamespace.FeaturedExpertCard,
    LocaleNamespace.ExploreEmptyState,
    LocaleNamespace.Common,
  ])
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [openMobileFilter, setOpenMobileFilter] = useState(false)
  const [openDrawerFilter, setOpenDrawerFilter] = useState(false)
  const routerFilters = useRouterFilters()

  const handleDrawerFilter = () => {
    setOpenDrawerFilter(true)
  }

  const onDrawerFilterDismiss = () => {
    setOpenDrawerFilter(false)
  }

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const handleMobileFilter = () => {
    setOpenMobileFilter(true)
  }

  const onMobileFilterDismiss = () => {
    setOpenMobileFilter(false)
  }

  const { experts: featuredExperts, loadMoreExperts } = useExpertLoad({
    initialExperts: initialFeaturedExperts,
    initialPageValue: 1,
    filters: routerFilters,
  })

  const renderExperts = () =>
    featuredExperts.map((f) => (
      <FeaturedExpertCard initialExpert={f} key={f.id} />
    ))

  // const renderRecommendations = () =>
  //   initialRecommendedExperts.map((r) => (
  //     <ExpertCardSmall
  //       expert={r}
  //       key={r.id}
  //       id={`expert-recommendation-${r.id}`}
  //     />
  //   ))

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const displayEmptyState = initialBrowseExperts?.length === 0 ? true : false

  const [filterContainerRef, { width }] = useElementSize()

  return (
    <AppShell
      drawer={
        <ConsumerDrawer
          open={drawerIsOpen}
          onClose={handleDrawerMenuClose}
          onToggleClick={handleDrawerMenuClick}
        />
      }
      mobileNavigation={
        <ConsumerMobileNavigation onDrawerMenuClick={handleDrawerMenuClick} />
      }
      onDrawerMenuClick={handleDrawerMenuClick}
      showFilter
      onOpenFilter={handleMobileFilter}
    >
      {displayEmptyState && <ExploreEmptyState />}

      {!displayEmptyState && (
        <ExploreContainer>
          <CategoryChipsContainer>
            <FilterContainer ref={filterContainerRef}>
              <MobileFilterButton
                variant="contained"
                color="primary"
                onClick={handleMobileFilter}
                startIcon={<FilterButtonIcon />}
              >
                {t('filterLabel')}
              </MobileFilterButton>
              <DrawerFilterButton
                variant="contained"
                color="primary"
                onClick={handleDrawerFilter}
                startIcon={<FilterButtonIcon />}
              >
                {t('filterLabel')}
              </DrawerFilterButton>
            </FilterContainer>

            <div style={{ width: `calc(100% - ${width}px)` }}>
              <CategoryChips categories={recommendedCategories} />
            </div>
          </CategoryChipsContainer>

          {!!recommendedCategories.length && (
            <CategoryContainer>
              <ExplorePageTitles>{t('categoryLabel')}</ExplorePageTitles>
              <CategoryCardsSection>
                <HorizontalScrollableContainer>
                  {!isMobile && (
                    <RecommendedCategoriesSection>
                      <CategoryCardsGrid>
                        {recommendedCategories
                          .slice(0, Math.ceil(recommendedCategories.length / 2))
                          .map((category) => (
                            <Link
                              key={category.id}
                              href={`/explore?${encodeURIComponent(
                                Filter.Category
                              )}=${encodeURIComponent(category.code)}`}
                            >
                              <CategoryCard category={category} />
                            </Link>
                          ))}
                      </CategoryCardsGrid>
                      <CategoryCardsGrid>
                        {recommendedCategories
                          .slice(Math.ceil(recommendedCategories.length / 2))
                          .map((category) => (
                            <Link
                              key={category.id}
                              href={`/explore?${encodeURIComponent(
                                Filter.Category
                              )}=${encodeURIComponent(category.code)}`}
                            >
                              <CategoryCard category={category} />
                            </Link>
                          ))}
                      </CategoryCardsGrid>
                    </RecommendedCategoriesSection>
                  )}

                  {isMobile && (
                    <CategoryCardsGrid>
                      {recommendedCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/explore?${encodeURIComponent(
                            Filter.Category
                          )}=${encodeURIComponent(category.code)}`}
                        >
                          <CategoryCard key={category.id} category={category} />
                        </Link>
                      ))}
                    </CategoryCardsGrid>
                  )}
                </HorizontalScrollableContainer>
              </CategoryCardsSection>
            </CategoryContainer>
          )}

          <FeaturedExpertsContainer>
            <ExplorePageTitles>{t('featuredExpertsLabel')}</ExplorePageTitles>
            <FeaturedExpertsSection>
              <HorizontalScrollableContainer
                onIntersectionRight={loadMoreExperts}
              >
                {renderExperts()}
              </HorizontalScrollableContainer>
            </FeaturedExpertsSection>
          </FeaturedExpertsContainer>
          <AllExpertsContainer>
            <ExplorePageTitles>{t('allExpertsLabel')}</ExplorePageTitles>
            <ExpertCardGrid experts={initialBrowseExperts} />
          </AllExpertsContainer>
          {/* <RecommendedExpertsContainer>
            <ExplorePageTitles>{t('recommendedLabel')}</ExplorePageTitles>
            <RecommendedExpertsSection>
              <HorizontalScrollableContainer>
                {renderRecommendations()}
              </HorizontalScrollableContainer>
            </RecommendedExpertsSection>
          </RecommendedExpertsContainer> */}
        </ExploreContainer>
      )}
      <BottomSheetFilter
        open={openMobileFilter}
        onOpen={handleMobileFilter}
        onClose={onMobileFilterDismiss}
      />
      {openDrawerFilter && (
        <DrawerFilter open={openDrawerFilter} onClose={onDrawerFilterDismiss} />
      )}
    </AppShell>
  )
}
