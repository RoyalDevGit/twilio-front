import { FC } from 'react'

import {
  RatingContainer,
  RatingCount,
  RatingCountContainer,
  RatingValue,
} from 'components/MiniStarRating/styles'
import { StarIcon } from 'icons/Star/SmallStar'

export interface MiniStarRatingProps {
  rating: number
  count: number
  className?: string
}

export const MiniStarRating: FC<
  React.PropsWithChildren<MiniStarRatingProps>
> = ({ rating, count, className }) => (
  <RatingContainer className={className}>
    <StarIcon />
    <RatingValue>{rating.toFixed(2)}</RatingValue>
    <RatingCountContainer>
      (<RatingCount>{count}</RatingCount>)
    </RatingCountContainer>
  </RatingContainer>
)
