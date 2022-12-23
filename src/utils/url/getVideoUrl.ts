import { Video } from 'interfaces/Video'
import { getVideoAssetUrl } from 'utils/videos/getVideoAssetUrl'

export const getVideoUrl = (video: Partial<Video>) => {
  const fileKey = video?.file?.fileKey
  if (!fileKey) {
    return undefined
  }

  return getVideoAssetUrl(fileKey)
}
