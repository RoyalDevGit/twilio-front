import { User } from 'interfaces/User'
import { getStorageBucketFileUrl } from 'utils/url/getStorageBucketFileUrl'

export const getUserPictureUrl = (user: User) =>
  user.profilePicture?.fileKey
    ? getStorageBucketFileUrl(user.profilePicture.fileKey)
    : undefined
