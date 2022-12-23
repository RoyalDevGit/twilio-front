import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MoreVert from '@mui/icons-material/MoreVert'
import MenuList from '@mui/material/MenuList'

import { UserAvatar } from 'components/UserAvatar'
import { Button } from 'components/Button'

export const ExpertOptionsIcon = styled(MoreVert)(
  ({ theme }) => `
  color: ${theme.palette.common.white}
  font-size: 1rem;
  visibility: hidden;
`
)

export const CommentReviewCard = styled(Card)`
  max-width: 338px;
  width: 487px;
  margin-top: ${({ theme }) => theme.spacing(1.25)};
  margin-bottom: ${({ theme }) => theme.spacing(1.25)};
  border-radius: 10px;
  ${({ theme }) => theme.breakpoints.down('mobileL')} {
    width: 310px;
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    width: 255px;
  }
`

export const Comments = styled(Box)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  margin-left: ${({ theme }) => theme.spacing(2)};
  width: 90%;
  &:hover ${ExpertOptionsIcon} {
    visibility: visible;
  }
`

export const CommentAvatarSection = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-bottom: ${({ theme }) => theme.spacing(2.5)};
  }
`
export const CommentAvatarSectionBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(1.25)};
`

export const CommentCardAvatar = styled(UserAvatar)``

export const CommentAvatarUserNameBox = styled(Box)`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0)};
`

export const CommentShowMoreButton = styled(Button)`
  padding-left: 0;
  p {
    font-size: 0.875rem;
  }
`

export const CommentUserName = styled(Typography)`
  font-size: 1.25rem;
`

export const CommentBox = styled(Box)`
  position: relative;
  top: 5px;
  left: -3px;
`

export const CommentInteractionActions = styled(Box)`
  display: flex;
  align-items: center;
`

export const CommentKebobMenu = styled(IconButton)`
  padding: ${({ theme }) => theme.spacing(0)};
`

export const CommentInfoSection = styled(Box)`
  margin-top: ${({ theme }) => theme.spacing(1.25)};
`

export const ReviewTitle = styled(Typography)`
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`
export const CommentText = styled(Typography)`
  font-size: 0.875rem;
`

export const CommentDescription = styled.div`
  font-size: 0.875rem;
`

export const GrayText = styled(Typography)(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
`
)

export const CommentImgBox = styled(Box)`
  margin-top: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`

export const CommentActions = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`

export const HelpfulReviewsLabel = styled(Typography)`
  font-size: 0.938rem;
  color: ${({ theme }) => theme.palette.grey[400]};
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    font-size: 0.75rem;
  }
`

export const CommentActionsBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`

export const HelpfulCommentButton = styled(Button)`
  border-color: ${({ theme }) => theme.palette.grey[400]};
  color: ${({ theme }) => theme.palette.text.primary};
`

export const ReportCommentButton = styled(Button)`
  border-color: ${({ theme }) => theme.palette.grey[400]};
  color: ${({ theme }) => theme.palette.grey[400]};
`

export const CommentOptionsMenu = styled(MenuList)(
  ({ theme }) => `
  svg {
    color: ${theme.palette.grey[500]};
  }
`
)
