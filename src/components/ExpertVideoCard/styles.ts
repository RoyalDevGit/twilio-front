import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia, { CardMediaProps } from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'

import { Link } from 'components/Link'
import { UserAvatar } from 'components/UserAvatar'

export const VideoCardLink = styled(Link)`
  transition-duration: 0.7s;
  transition-property: color;
  color: ${({ theme }) => theme.palette.text.primary};

  font-size: 1.25rem;
`

export const VideoCard = styled(Card)`
  max-width: 240px;
  max-height: 295px;
  margin-top: ${({ theme }) => theme.spacing(1.25)};
  margin-bottom: ${({ theme }) => theme.spacing(3.75)};
  border-radius: 10px;
  cursor: pointer;
  :hover {
    ${VideoCardLink} {
      color: ${({ theme }) => theme.palette.secondary.main};
    }
    img {
      transform: scale(1.1);
    }
  }
`
interface VideoCardMediaProps extends CardMediaProps {
  component: 'img'
}
export const VideoCardMedia = styled(CardMedia)<VideoCardMediaProps>`
  height: 140px;
  position: relative;
  top: ${({ theme }) => theme.spacing(0)};

  transition: transform 0.5s ease;
`

export const VideoMediaBox = styled.div`
  overflow: hidden;
  width: 100%;
`

export const VideoActionAreaBox = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;
  top: ${({ theme }) => theme.spacing(0)};
`

export const VideoCardTimeChip = styled(Chip)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(1)};
  left: ${({ theme }) => theme.spacing(1)};
  background-color: #ffffffe5;
  color: black;
  border-radius: 3px;
  height: 20px;
`

export const FavoriteCardIcon = styled(IconButton)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(1)};
  right: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(0)};
`
export const VideoAvatarBox = styled(Box)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(15)};
  right: ${({ theme }) => theme.spacing(2)};
`

export const VideoCardAvatar = styled(UserAvatar)``

export const VideoCardExpertContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const VideoContentBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
