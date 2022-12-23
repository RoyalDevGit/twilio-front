import { User } from 'interfaces/User'
import { getStorageBucketFileUrl } from 'utils/url/getStorageBucketFileUrl'

export const getUserProfilePictureUrl = (user: User) => {
  if (user.profilePicture) {
    return getStorageBucketFileUrl(user.profilePicture.fileKey)
  }
  return undefined
}
