import { Video } from 'interfaces/Video'
import { getVideoUrl } from 'utils/url/getVideoUrl'

export const downloadVideo = (video: Video) => {
  window.open(getVideoUrl(video))
}
