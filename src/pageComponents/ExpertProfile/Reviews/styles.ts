import styled from '@emotion/styled'
import Divider from '@mui/material/Divider'

export const CommentSectionDivider = styled(Divider)`
  width: 60%;
  margin-top: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 100%;
  }
`

export const ExpertCommentSection = styled.div`
  margin: ${({ theme }) => theme.spacing(5, 8.5)};
`
