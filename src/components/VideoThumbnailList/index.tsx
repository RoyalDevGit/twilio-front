import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { DateTime } from 'luxon'

import { Link } from 'components/Link'
import { Video } from 'interfaces/Video'
import {
  VideoListGrid,
  VideoThumbnail,
  ThumbnailCover,
  ThumbnailBody,
  ThumbnailDetails,
  VideoName,
  DateSection,
  ActionSection,
  ThumbnailImage,
} from 'components/VideoThumbnailList/styles'
import { Button } from 'components/Button'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { getVideoThumbnailUrl } from 'utils/videos/getVideoThumbnailUrl'

interface Props {
  videos: Video[]
}

export const VideoThumbnailList: FC<React.PropsWithChildren<Props>> = ({
  videos,
}) => {
  const { t } = useTranslation(LocaleNamespace.VideoThumbnailList)
  return (
    <VideoListGrid>
      {videos.map((video) => {
        const uploadedDate = DateTime.fromISO(video.uploaded)

        return (
          <VideoThumbnail key={video.id}>
            <ThumbnailCover>
              <ThumbnailImage src={getVideoThumbnailUrl(video)} />
            </ThumbnailCover>
            <ThumbnailBody>
              <ThumbnailDetails>
                <VideoName>{video.title}</VideoName>
                <DateSection>
                  {uploadedDate.toLocaleString(DateTime.DATE_FULL)}{' '}
                </DateSection>
              </ThumbnailDetails>
              <ActionSection>
                <Link href={`/videos/${video.id}`}>
                  <Button variant="contained" size="large">
                    {t('play')}
                  </Button>
                </Link>
              </ActionSection>
            </ThumbnailBody>
          </VideoThumbnail>
        )
      })}
    </VideoListGrid>
  )
}
