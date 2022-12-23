import { FC } from 'react'

import { UserAvatar, UserAvatarProps } from 'components/UserAvatar'
import { Expert } from 'interfaces/Expert'
import { getUserPictureUrl } from 'utils/user/getUserPictureUrl'

export interface ExpertAvatarProps
  extends Omit<UserAvatarProps, 'src' | 'firstName' | 'lastName' | 'status'> {
  expert: Expert | undefined
  showStatus?: boolean
  width: number
  height: number
}

export const ExpertAvatar: FC<ExpertAvatarProps> = ({
  expert,
  showStatus,
  width,
  height,
  ...props
}) => {
  let firstName = ''
  let lastName = ''
  let pictureUrl = ''

  if (expert?.user) {
    firstName = expert.user.firstName
    lastName = expert.user.lastName
    pictureUrl = getUserPictureUrl(expert.user) || ''
  }

  return (
    <UserAvatar
      {...props}
      src={pictureUrl}
      firstName={firstName}
      lastName={lastName}
      status={showStatus ? expert?.user?.status : undefined}
      width={width}
      height={height}
    />
  )
}
