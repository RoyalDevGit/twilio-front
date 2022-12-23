import { FC, ReactNode, useEffect, useState } from 'react'
import { AvatarProps } from '@mui/material/Avatar'

import {
  AvatarContainer,
  StatusBadge,
  UserAvatarLogo,
} from 'components/UserAvatar/styles'
import { UserStatus } from 'interfaces/User'
import { ImageProps, Image } from 'components/Image'

interface Colors {
  backgroundColor: string
  foregroundColor: string
}

const getInitialLetter = (firstName?: string, lastName?: string): string => {
  if (!firstName || !lastName) {
    return '?'
  }
  return firstName[0].toUpperCase() + lastName[0].toUpperCase()
}

const getColorContrast = (userIdentifier: string): Colors => {
  let hash = 0
  for (let i = 0; i < userIdentifier.length; i++) {
    hash = userIdentifier.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash
  }
  const rgb = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    const val = (hash >> (i * 8)) & 255
    rgb[i] = val
  }
  const sum = Math.round((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000)
  const foregroundColor = sum > 128 ? 'black' : 'white'
  const backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
  return { foregroundColor, backgroundColor }
}

export interface UserAvatarProps
  extends AvatarProps,
    Pick<ImageProps, 'width' | 'height' | 'layout'> {
  firstName: string
  lastName: string
  src?: string
  status?: UserStatus
  children?: ReactNode
}

export const UserAvatar: FC<UserAvatarProps> = (props) => {
  const {
    className,
    firstName,
    lastName,
    src,
    status,
    width,
    height,
    layout,
    ...restProps
  } = props
  const [userInitials, setUserInitials] = useState('')
  const [background, setBackground] = useState('')
  const [foreground, setForeground] = useState('')

  useEffect(() => {
    const initials = getInitialLetter(firstName, lastName)
    const { foregroundColor, backgroundColor } = getColorContrast(
      `${firstName}${lastName}`
    )
    setForeground(foregroundColor)
    setBackground(backgroundColor)
    setUserInitials(initials)
  }, [firstName, lastName])

  const renderAvatarContent = () => {
    if (src) {
      return (
        <Image
          id="avatar-image"
          src={src}
          width={width}
          height={height}
          layout={layout}
          alt=""
        />
      )
    }
    return userInitials
  }

  const renderedAvatar = (
    <UserAvatarLogo
      foreground={foreground}
      background={background}
      {...restProps}
    >
      {renderAvatarContent()}
    </UserAvatarLogo>
  )

  if (status) {
    return (
      <AvatarContainer width={width} height={height} className={className}>
        <StatusBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          status={status}
        >
          {renderedAvatar}
        </StatusBadge>
      </AvatarContainer>
    )
  }

  return (
    <AvatarContainer width={width} height={height} className={className}>
      {renderedAvatar}
    </AvatarContainer>
  )
}
