import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'

import {
  MyFavoritesVideosContainer,
  VideoCardGrid,
} from 'pageComponents/Favorites/Videos/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { FavoritesPage } from 'pageComponents/Favorites'
import { ExpertVideoCard } from 'components/ExpertVideoCard'

// export interface FavoritesHomePageProps {}

export const FavoritesVideoPage: NextPage = () => {
  useTranslation([
    LocaleNamespace.FavoritesPage,
    LocaleNamespace.ExpertVideoCard,
    LocaleNamespace.FilterBy,
    LocaleNamespace.Common,
  ])

  const ExpertVideos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <FavoritesPage>
      <MyFavoritesVideosContainer>
        <VideoCardGrid>
          {ExpertVideos.map(() => (
            <ExpertVideoCard key={null} />
          ))}
        </VideoCardGrid>
      </MyFavoritesVideosContainer>
    </FavoritesPage>
  )
}
