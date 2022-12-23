import styled from '@emotion/styled'
import MoreVert from '@mui/icons-material/MoreVert'
import { css } from '@emotion/react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MenuList from '@mui/material/MenuList'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import { Button, ButtonProps } from 'components/Button'
import { Link } from 'components/Link'

export const ExpertOptionsIcon = styled(MoreVert)(
  ({ theme }) => `
  color: ${theme.palette.common.white}
  font-size: 1rem;
  visibility: hidden;
`
)

export const CommentTitle = styled(Typography)`
  font-size: 1.75rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const Comments = styled(Box)<{ depth: number }>`
  padding-left: ${({ theme, depth }) => theme.spacing(depth * 5.5)};
  margin-top: ${({ theme }) => theme.spacing(2.5)};
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  width: 50%;
  &:hover ${ExpertOptionsIcon} {
    visibility: visible;
  }
  ${({ theme }) => theme.breakpoints.down('laptopL')} {
    width: 80%;
  }
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    width: 100%;
    padding-left: ${({ theme, depth }) => theme.spacing(depth * 3)};
  }
  ${({ theme }) => theme.breakpoints.down('mobileM')} {
    padding-left: ${({ theme, depth }) => theme.spacing(depth * 2)};
  }
`
export const CommentAvatarSection = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    margin-bottom: ${({ theme }) => theme.spacing(2.5)};
  }
`
export const CommentAvatarSectionBox = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(1.25)};
`
export const CommentAvatarUserNameBox = styled(Box)`
  display: flex;
  flex: 1 1 auto;
  gap: ${({ theme }) => theme.spacing(1.25)};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(0)};
  }
`

export const GrayText = styled(Typography)(
  ({ theme }) => `
    color: ${theme.palette.grey[500]};
`
)

export const CommentUserName = styled(Typography)`
  font-size: 1.25rem;
`

export const CommentTimeBox = styled(Box)`
  position: relative;
  top: 7px;
`

export const CommentInteractionActions = styled(Box)`
  display: flex;
  align-items: center;
  align-self: center;
`

export const CommentKebobMenu = styled(IconButton)`
  padding: ${({ theme }) => theme.spacing(0)};
`
interface CommentInfoSectionProps {
  moreSpacing: boolean
}
export const CommentInfoSection = styled.div<CommentInfoSectionProps>`
  margin: ${({ theme, moreSpacing }) =>
    moreSpacing ? theme.spacing(1, 0, 2.25, 6.25) : theme.spacing(0.25, 6.25)};
`
export const CommentDescription = styled.div``

export const CommentActions = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  margin: ${({ theme }) => theme.spacing(0, 6)};
`

export const CommentActionsBox = styled.div`
  margin: ${({ theme }) => theme.spacing(0.25)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`

export const CommentPinnedRow = styled(Stack)`
  svg {
    font-size: 0.7rem;
  }
`

export const CommentText = styled(Typography)`
  font-size: 0.875rem;
`

export const CommentRepliesButton = styled(Button)(
  ({ theme }) => `
    text-transform: none;
    justify-content: flex-start;
    padding: 0;

    svg {
      margin-right: ${theme.spacing(1)};
    }
`
)

export const CommentShowMoreButton = styled(Button)`
  padding-left: 0;
  p {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.palette.text.primary};
    :hover {
      text-decoration: underline;
    }
  }
`

export const CommentShowMoreRepliesButton = styled(Button)(
  ({ theme }) => css`
    margin: ${theme.spacing(1)} 0;
    width: fit-content;
    font-size: 0.7rem;

    svg {
      font-size: 1rem;
      margin-right: ${theme.spacing(1)};
    }
  `
)

export const CommentOptionsMenu = styled(MenuList)(
  ({ theme }) => `
  svg {
    color: ${theme.palette.grey[500]};
  }
`
)

interface CommentButtonProps extends ButtonProps {
  isLiked: boolean
}
export const CommentButton = styled(Button)<CommentButtonProps>`
  width: 75px;
  height: 35px;
  max-height: 45px;
  font-weight: 600;
  color: ${({ theme, isLiked }) =>
    isLiked
      ? theme.customComponents.expertProfile.expertFavoriteButton.styleOverrides
          .color
      : ''};
  ${({ theme }) => theme.breakpoints.down('tablet')} {
    display: none;
  }
`

export const ReportAbuseLink = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
  :hover {
    text-decoration: underline;
  }
`
export const HelpfulReviews = styled(Typography)`
  margin: ${({ theme }) => theme.spacing(0.75, 0)};
  opacity: 0.6;
`
