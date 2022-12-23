import styled from '@emotion/styled'
import TextField from '@mui/material/TextField'

import { Button } from 'components/Button'

export const RateSessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const RatingSection = styled.div`
  display: flex;
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

export const SubmitCommentButton = styled(Button)``

export const EditButtonSection = styled.div``
