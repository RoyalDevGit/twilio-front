import styled from '@emotion/styled'
import Typography from '@mui/material/Typography'

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.4)};
  color: ${({ theme }) =>
    theme.customComponents.miniStarRating.ratingContainer.styleOverrides.color};
`

export const RatingValue = styled(Typography)`
  font-size: 1rem;
  color: ${({ theme }) =>
    theme.customComponents.miniStarRating.ratingValue.styleOverrides.color};
`

export const RatingCountContainer = styled(Typography)`
  font-size: 1rem;
  color: ${({ theme }) =>
    theme.customComponents.miniStarRating.ratingCount.styleOverrides.color};
`
export const RatingCount = styled.span`
  text-decoration: underline;
`
