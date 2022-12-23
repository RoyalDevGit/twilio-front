import { useCallback, useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

import {
  VideoDetails,
  VideoName,
  VideoDetailsSection,
  DateSection,
  FavoriteButton,
  FavoriteSection,
  VideoPlayer,
  VideoPlayerContainer,
  DescriptionSection,
  CommentsHeader,
} from 'pageComponents/Video/styles'
import { AppShell } from 'components/AppShell'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { Video } from 'interfaces/Video'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { getVideoUrl } from 'utils/url/getVideoUrl'

export interface VideoPageProps {
  initialVideo: Video
}

export const VideoPage: NextPage<VideoPageProps> = ({ initialVideo }) => {
  const { t } = useTranslation([
    LocaleNamespace.VideoDetail,
    LocaleNamespace.Comments,
  ])
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const [video] = useState(initialVideo)

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const isFavorite = true

  const onFavoriteClick = useCallback(async () => {
    if (isFavorite) {
      // const result = await VideoApi.unmarkAsFavorite(video.id)
      // if (result.ok()) {
      //   setVideo({
      //     ...video,
      //     // isFavorite: false,
      //   })
      // }
    } else {
      // const result = await VideoApi.markAsFavorite(video.id)
      // if (result.ok()) {
      //   setVideo({
      //     ...video,
      //     // isFavorite: true,
      //   })
      // }
    }
  }, [video])

  const uploadedDate = DateTime.fromISO(video.uploaded)

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
    >
      <VideoDetails>
        <VideoName>{video.title}</VideoName>
        <VideoPlayerContainer>
          <VideoPlayer
            src={getVideoUrl(video)}
            preload="auto"
            controls
            controlsList="nodownload"
          />
        </VideoPlayerContainer>
        <VideoDetailsSection>
          <DateSection>
            {uploadedDate.toLocaleString(DateTime.DATE_FULL)}{' '}
          </DateSection>
          <DescriptionSection>{video.description}</DescriptionSection>
        </VideoDetailsSection>
        <FavoriteSection>
          <FavoriteButton favorite={isFavorite} onClick={onFavoriteClick}>
            {!isFavorite && <FavoriteBorderIcon />}
            {isFavorite && <FavoriteIcon />}
            {t('favoriteVideo')}
          </FavoriteButton>
        </FavoriteSection>
        <CommentsHeader variant="h3">{t('commentsTitleLabel')}</CommentsHeader>
        {/* <CommentsSection
          showRatings
          commentType={CommentType.Comment}
          entityType={CommentEntityType.Video}
          entityId={video.id}
        /> */}
      </VideoDetails>
    </AppShell>
  )
}
