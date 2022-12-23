import { Expert } from 'interfaces/Expert'
import { getStorageBucketFileUrl } from 'utils/url/getStorageBucketFileUrl'

export const getExpertBannerUrl = (expert: Expert) =>
  expert.bannerImage?.fileKey
    ? getStorageBucketFileUrl(expert.bannerImage.fileKey)
    : undefined
