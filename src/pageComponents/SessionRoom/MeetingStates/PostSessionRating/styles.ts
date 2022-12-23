import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { Button } from 'components/Button'

export const PostSessionRatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  text-align: center;
`

export const SubmitSuccessIconSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(12)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`

export const SessionHasEnded = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  opacity: 0.6;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-top: ${({ theme }) => theme.spacing(2)};
  }
`
export const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`

export const RatingCommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const RatingComment = styled(TextField)`
  width: 628px;

  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 390px;
  }
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    width: 340px;
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    width: 280px;
  }
`

export const SubmitCommentButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(9)};
`

export const GoBackButton = styled(Button)``

export const SuccessfullySubmittedText = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 500;
  opacity: 0.6;
`

export const ThankYouText = styled(Typography)`
  font-size: 2.375rem;
  font-weight: 300;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`

export const ShareReviewText = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) =>
    theme.customComponents.postSessionRating.shareReviewText.styleOverrides
      .color};
`

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  min-width: 245px;
`

export const ThankYouScreenButton = styled(Button)`
  width: 100%;
`

export const SocialMediaSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};

  svg {
    :hover {
      transform: scale(1.2);
    }
  }
`
