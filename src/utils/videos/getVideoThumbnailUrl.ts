import { Video } from 'interfaces/Video'
import { Config } from 'utils/config'
import { getVideoAssetUrl } from 'utils/videos/getVideoAssetUrl'

const NO_IMAGE_FOUND_PICTURE_URL = Config.getString(
  'NO_IMAGE_FOUND_PICTURE_URL'
)

export const getVideoThumbnailUrl = (video: Video) => {
  let selectedThumbnailId = video.selectedThumbnail
  if (!selectedThumbnailId) {
    selectedThumbnailId = video.thumbnails[0].id
  }
  const selectedThumbnail = video.thumbnails.find(
    (thumb) => thumb.id === selectedThumbnailId
  )
  if (!selectedThumbnail) {
    return NO_IMAGE_FOUND_PICTURE_URL
  }
  return getVideoAssetUrl(selectedThumbnail.file.fileKey)
}
