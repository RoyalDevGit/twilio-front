import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Typography from '@mui/material/Typography'

export type RatingLabelPosition = 'top' | 'right' | 'bottom' | 'left'

interface RatingBoxProps {
  labelPosition: RatingLabelPosition
  showLabel: boolean
}

export const RatingSection = styled.div`
  grid-area: rating;
`

export const LabelSection = styled.div`
  grid-area: label;
`

export const RatingLabel = styled(Typography)``

export const RatingBox = styled.div<RatingBoxProps>(
  ({ theme, labelPosition, showLabel }) => {
    if (!showLabel) {
      return
    }

    switch (labelPosition) {
      case 'top':
        return css`
          display: grid;
          gap: ${theme.spacing(1)};
          grid-template-areas:
            'label'
            'rating';
          grid-template-columns: 1fr;
          grid-template-rows: 24px 1fr;
          align-items: center;
          justify-items: center;
        `
      case 'bottom':
        return css`
          display: grid;
          gap: ${theme.spacing(1)};
          grid-template-areas:
            'rating'
            'label';
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 24px;
          align-items: center;
          justify-items: center;
        `
      case 'right':
        return css`
          display: grid;
          gap: ${theme.spacing(1)};
          grid-template-columns: 1fr 92px;
          grid-template-areas: 'rating label';
          align-items: center;
          justify-items: center;

          ${LabelSection} {
            justify-self: flex-start;
          }
        `
      case 'left':
        return css`
          display: grid;
          gap: ${theme.spacing(1)};
          grid-template-columns: 92px 1fr;
          grid-template-areas: 'label rating';
          align-items: center;
          justify-items: center;

          ${LabelSection} {
            justify-self: flex-end;
          }
        `
    }
  }
)
