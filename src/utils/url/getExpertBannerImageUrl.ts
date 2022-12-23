import { Expert } from 'interfaces/Expert'
import { getStorageBucketFileUrl } from 'utils/url/getStorageBucketFileUrl'

export const getExpertBannerImageUrl = (
  expert: Expert,
  isDarkTheme = false
) => {
  if (expert.bannerImage) {
    return getStorageBucketFileUrl(expert.bannerImage.fileKey)
  }

  return isDarkTheme
    ? '/static/img/es-banner-default-dark.png'
    : '/static/img/es-banner-default-light.jpg'
}
