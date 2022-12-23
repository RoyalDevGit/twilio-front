import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const VideoDetails = styled(Container)`
  padding-top: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(3)};
`
export const VideoName = styled.div`
  font-size: 2rem;
`
interface FavoriteButtonProps {
  favorite: boolean
}
export const FavoriteButton = styled(Button)<FavoriteButtonProps>`
  font-size: 1rem;
  padding-left: ${({ theme }) => theme.spacing(0.25)};
  padding-right: ${({ theme }) => theme.spacing(0.25)};
  svg {
    color: ${({ theme }) => theme.palette.secondary.main};
    margin-right: ${({ theme }) => theme.spacing(0.5)};
  }
`
export const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`
export const FavoriteSection = styled(Section)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`
export const VideoDetailsSection = styled(Section)`
  margin-bottom: ${({ theme }) => theme.spacing(0)};
`

export const DescriptionSection = styled.div``

export const DateSection = styled.span`
  margin-right: ${({ theme }) => theme.spacing(0.5)};
`
export const VideoPlayerContainer = styled.div`
  max-width: 756px;
`

export const VideoPlayer = styled.video`
  width: 100%;
`
export const CommentsHeader = styled(Typography)(
  ({ theme }) => `
	margin-bottom: ${theme.spacing(2)}
`
)
