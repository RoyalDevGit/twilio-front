import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { useUpdateEffect } from 'react-use'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslation } from 'next-i18next'

import { useRouter } from 'hooks/useRouter'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { AppShell, AppShellBodyId } from 'components/AppShell'
import { NoSearchResults } from 'components/NoSearchResults'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { GlobalSearchIndex, GlobalSearchResult } from 'interfaces/Search'
import { Expert } from 'interfaces/Expert'
import { PageContainer } from 'components/PageContainer/styles'
import { ExpertCardGrid } from 'components/ExpertCardGrid'
import { SearchApi } from 'apis/SearchApi'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  DrawerFilterButton,
  FilterContainer,
  MobileFilterButton,
  ResultsContainer,
  SearchResultsContainer,
  SearchResultsHeader,
  StyledDivider,
} from 'pageComponents/SearchResults/styles'
import { DrawerFilter } from 'components/Filters/DrawerFilter'
import { BottomSheetFilter } from 'components/Filters/BottomSheetFilter'
import { FilterButtonIcon } from 'icons/FilterButton'
import { useRouterFilters } from 'hooks/useRouterFilters'

export interface SearchResultsPageProps {
  initialSearchResult: GlobalSearchResult
  initialRecommendedExperts: Expert[]
  initialPage: number
  initialLimit: number
  indices: GlobalSearchIndex[]
}

const getExpertHits = (searchResult: GlobalSearchResult) => {
  const experts = searchResult.items
    .filter((h) => h.index === 'experts')
    .map((e) => e.data as Expert)

  return experts
}

export const SearchResultsPage: NextPage<SearchResultsPageProps> = ({
  initialSearchResult,
  initialRecommendedExperts,
  initialPage,
  initialLimit,
  indices,
}) => {
  const { t } = useTranslation(LocaleNamespace.SearchResults)
  const router = useRouter()
  const routerFilters = useRouterFilters()
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [searchResult, setSearchResult] =
    useState<GlobalSearchResult>(initialSearchResult)
  const [openMobileFilter, setOpenMobileFilter] = useState(false)
  const [openDrawerFilter, setOpenDrawerFilter] = useState(false)

  const handleDrawerFilter = () => {
    setOpenDrawerFilter(true)
  }

  const onDrawerFilterDismiss = () => {
    setOpenDrawerFilter(false)
  }

  const handleMobileFilter = () => {
    setOpenMobileFilter(true)
  }

  const onMobileFilterDismiss = () => {
    setOpenMobileFilter(false)
  }

  const [expertResults, setExpertResults] = useState<Expert[]>(
    getExpertHits(initialSearchResult)
  )

  const { query: searchText } = router.query

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  useUpdateEffect(() => {
    setSearchResult(initialSearchResult)
    setExpertResults(getExpertHits(initialSearchResult))
    setCurrentPage(initialSearchResult.page as number)
  }, [initialSearchResult])

  const resultsFound = !!searchResult.total
  let resultsTotal = ''
  resultsTotal = searchResult.total.toString()

  const fetchMoreResults = useCallback(async () => {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    try {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      const searchResponse = await SearchApi.globalSearch({
        query: searchText as string,
        page: nextPage,
        limit: initialLimit,
        index: indices,
        filters: routerFilters,
      })
      if (!searchResponse.ok()) {
        return
      }
      const newSearchResult = await searchResponse.getData()
      setSearchResult(newSearchResult)

      const experts = newSearchResult.items
        .filter((h) => h.index === 'experts')
        .map((e) => e.data as Expert)
      setExpertResults([...expertResults, ...experts])
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, isLoading, expertResults])

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
      onOpenFilter={handleMobileFilter}
      showFilter
    >
      <PageContainer>
        {resultsFound && (
          <SearchResultsContainer maxWidth="fourK">
            <ResultsContainer>
              <FilterContainer>
                <SearchResultsHeader>
                  {t('searchResultsCount', { resultsTotal, searchText })}
                </SearchResultsHeader>
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
              <StyledDivider />
              <InfiniteScroll
                useWindow={false}
                getScrollParent={() => document.getElementById(AppShellBodyId)}
                loadMore={fetchMoreResults}
                hasMore={searchResult.hasNextPage}
                loader={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '12px',
                    }}
                  >
                    <CircularProgress />
                  </div>
                }
              >
                <ExpertCardGrid
                  experts={expertResults}
                  hideFavoriteIcon={true}
                />
              </InfiniteScroll>
            </ResultsContainer>
          </SearchResultsContainer>
        )}
        {!resultsFound && (
          <NoSearchResults
            initialRecommendedExperts={initialRecommendedExperts}
          />
        )}
      </PageContainer>
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
