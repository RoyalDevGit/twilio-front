import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import {
  EmptyStateButton,
  FavoriteExpertsContainer,
  FavoritesEmptyState,
  FavoritesEmptyStateDescription,
  FavoritesEmptyStateLabel,
  FavoritesEmptyStateLabelBox,
} from 'pageComponents/Favorites/Home/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { FavoritesPage, FavoritesPageProps } from 'pageComponents/Favorites'
import { ExpertApi } from 'apis/ExpertApi'
import { Expert } from 'interfaces/Expert'
import { useApiPagination } from 'hooks/useApiPagination'
import { QueryResponse } from 'interfaces/Query'
import { QueryResponsePagination } from 'components/QueryResponsePagination'
import { ExpertCardGrid } from 'components/ExpertCardGrid'
import { FavoriteHeartBookmarkIcon } from 'icons/FavoriteHeartBookmark'
import { useRouterFilters } from 'hooks/useRouterFilters'

export interface FavoriteExpertsPageProps extends FavoritesPageProps {
  initialFavoriteExperts?: QueryResponse<Expert>
}

export const FavoritesHomePage: NextPage<FavoriteExpertsPageProps> = ({
  initialFavoriteExperts,
}) => {
  const { t } = useTranslation([
    LocaleNamespace.FavoritesPage,
    LocaleNamespace.ExpertCard,
    LocaleNamespace.FilterBy,
    LocaleNamespace.Common,
  ])
  const routerFilters = useRouterFilters()

  const favoritesPagination = useApiPagination<Expert>({
    initialValue: initialFavoriteExperts,
    dataFetcher: async (page, limit) => {
      const favoriteExpertsResult = await ExpertApi.queryFavorites({
        page,
        limit,
        ...routerFilters,
      })

      const favoriteExpertsLoaded = await favoriteExpertsResult.getData()
      return favoriteExpertsLoaded
    },
  })

  useEffect(() => {
    favoritesPagination.refresh()
  }, [routerFilters])

  const onUnfavorite = () => {
    favoritesPagination.refresh()
  }

  const FavoritesPageEmptyState = (
    <FavoritesEmptyState>
      <FavoriteHeartBookmarkIcon />
      <FavoritesEmptyStateLabelBox>
        <FavoritesEmptyStateLabel>
          {t('emptyStateLabel')}
        </FavoritesEmptyStateLabel>
        <FavoritesEmptyStateDescription>
          {t('emptyStateDescriptionLabel')}
        </FavoritesEmptyStateDescription>
      </FavoritesEmptyStateLabelBox>
      <EmptyStateButton href="/explore" variant="outlined" color="primary">
        {t('emptyStateButton')}
      </EmptyStateButton>
    </FavoritesEmptyState>
  )

  return (
    <FavoritesPage>
      {!favoritesPagination.value?.items.length ? (
        FavoritesPageEmptyState
      ) : (
        <FavoriteExpertsContainer>
          {favoritesPagination.value?.items.length && (
            <ExpertCardGrid
              justifyContent="flex-start"
              experts={favoritesPagination.value.items}
              onUnfavorite={onUnfavorite}
            />
          )}
          <QueryResponsePagination
            queryResponse={favoritesPagination.value}
            onPageChange={favoritesPagination.onPageChange}
            onRowsPerPageChange={favoritesPagination.onRowsPerPageChange}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </FavoriteExpertsContainer>
      )}
    </FavoritesPage>
  )
}
