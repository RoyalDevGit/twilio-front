import { FC, useState, MouseEvent } from 'react'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowDropUp from '@mui/icons-material/ArrowDropUp'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import FlagOutlined from '@mui/icons-material/FlagOutlined'
import PushPinOutlined from '@mui/icons-material/PushPinOutlined'
import SubdirectoryArrowRight from '@mui/icons-material/SubdirectoryArrowRight'
import ThumbDownAlt from '@mui/icons-material/ThumbDownAlt'
import ThumbDownAltOutlined from '@mui/icons-material/ThumbDownAltOutlined'
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import { DateTime } from 'luxon'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'

import { Button } from 'components/Button'
import {
  Comment as IComment,
  CommentEntityType,
  CommentLikeStatusValue,
  CommentType,
} from 'interfaces/Comment'
import {
  ExpertOptionsIcon,
  CommentOptionsMenu,
  CommentPinnedRow,
  CommentRepliesButton,
  CommentShowMoreButton,
  CommentShowMoreRepliesButton,
  CommentText,
  GrayText,
  CommentActions,
  CommentAvatarSection,
  CommentAvatarSectionBox,
  CommentInfoSection,
  CommentDescription,
  CommentInteractionActions,
  CommentUserName,
  CommentActionsBox,
  CommentKebobMenu,
  CommentAvatarUserNameBox,
  CommentTimeBox,
  Comments,
  CommentButton,
  ReportAbuseLink,
  HelpfulReviews,
} from 'components/Comments/Comment/styles'
import { UserAvatar } from 'components/UserAvatar'
import { CreateCommentForm } from 'components/Comments/CreateCommentForm'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { CreateCommentParameter, useLoadComments } from 'hooks/useLoadComments'
import { getUserFullName } from 'utils/user/getUserFullName'
import { getUserPictureUrl } from 'utils/user/getUserPictureUrl'
import { StarRating } from 'components/StarRating'

interface Props {
  showRating?: boolean
  commentType: CommentType
  comment: IComment
  canPin: boolean
  onLike: (comment: IComment) => void
  onDislike: (comment: IComment) => void
  onReply: (comment: IComment) => void
  onReplyRemoved: (comment: IComment) => void
  onPin: (comment: IComment) => void
  onDelete: (comment: IComment) => void
  onReport?: (comment: IComment) => void
  replyDepth?: number
  depth?: number
}

const previewLength = 300

export const Comment: FC<React.PropsWithChildren<Props>> = ({
  showRating,
  commentType,
  comment,
  canPin,
  onLike,
  onDislike,
  onPin,
  onReport,
  replyDepth = 0,
  depth = 0,
  onReply,
  onReplyRemoved,
  onDelete,
}) => {
  const { t } = useTranslation(LocaleNamespace.Comments)
  const user = comment.createdBy
  const userFullName = getUserFullName(user)
  const userPictureUrl = getUserPictureUrl(user)
  const [showingMoreText, setShowingMoreText] = useState(false)
  const {
    comments: commentReplies,
    currentPage: currentReplyPage,
    hasMore: hasMoreReplies,
    loadComments,
    createComment,
    reply,
    like,
    dislike,
    deleteComment,
    removeReply,
  } = useLoadComments(
    CommentType.Comment,
    CommentEntityType.Comment,
    comment.id
  )
  const inReviewMode = commentType === CommentType.Review
  const [repliesOpen, setRepliesOpen] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null
  )

  async function handleCreateComment(commentToCreate: CreateCommentParameter) {
    await createComment(commentToCreate)
    onReply(comment)
    handleCloseCommentForm()
  }

  async function handleReply(comment: IComment) {
    reply(comment.id)
  }

  function handleClickReply() {
    setShowCommentForm(true)
  }

  function handleCloseCommentForm() {
    setShowCommentForm(false)
  }

  function handleOpenReplies() {
    if (currentReplyPage === 0) {
      loadComments()
    }
    setRepliesOpen(!repliesOpen)
  }

  function handleOpenMenu(event: MouseEvent<HTMLButtonElement>) {
    setMenuAnchorEl(event.currentTarget)
  }

  function handleCloseMenu() {
    setMenuAnchorEl(null)
  }

  function handleClickShowMore() {
    return setShowingMoreText((prev) => !prev)
  }

  function handleLike(comment: IComment) {
    like(comment.id)
  }

  function handleDislike(comment: IComment) {
    dislike(comment.id)
  }

  async function handleDelete(reply: IComment) {
    await deleteComment(reply.id)
    removeReply(reply.id)
    onReplyRemoved(comment)
  }

  const {
    createdBy,
    content,
    createdAt,
    likeCount,
    dislikeCount,
    totalReplies,
    pinned,
    likeStatus,
    ratings,
  } = comment

  const commentIsLiked = likeStatus === CommentLikeStatusValue.Liked
  const previewText = content?.slice(0, previewLength) || null
  const showReadMoreButton = (content?.length ?? 0) > previewLength
  const createdDate = DateTime.fromISO(createdAt)
  const userName = `${createdBy.firstName} ${createdBy.lastName}`
  return (
    <>
      <Comments depth={depth}>
        <CommentAvatarSection>
          <CommentAvatarSectionBox>
            <UserAvatar
              alt={userFullName}
              src={userPictureUrl}
              firstName={user.firstName}
              lastName={user.lastName}
              width={40}
              height={40}
            />
            <Box>
              {pinned && (
                <CommentPinnedRow
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <PushPinOutlined />

                  <GrayText variant="body2" fontSize="small">
                    {t('pinnedBy')} {pinned}
                  </GrayText>
                </CommentPinnedRow>
              )}
              <CommentAvatarUserNameBox>
                <Box>
                  <CommentUserName variant="h6">{userName}</CommentUserName>
                </Box>
                <Box>
                  <CommentTimeBox>
                    <GrayText variant="body2">
                      {createdDate.toRelative()}
                    </GrayText>
                  </CommentTimeBox>
                </Box>
              </CommentAvatarUserNameBox>
            </Box>
          </CommentAvatarSectionBox>
          <CommentInteractionActions>
            {showRating && (
              <StarRating
                name="read-only"
                size="small"
                value={ratings?.overall ?? 0}
                readOnly
              />
            )}
            {!inReviewMode && (
              <CommentKebobMenu onClick={handleOpenMenu}>
                <ExpertOptionsIcon />
              </CommentKebobMenu>
            )}
          </CommentInteractionActions>
        </CommentAvatarSection>

        <CommentInfoSection
          moreSpacing={!showReadMoreButton && likeCount === 0}
        >
          <CommentDescription>
            {showingMoreText ? content : previewText}
            {showReadMoreButton && !showingMoreText && (
              <CommentText variant="body1">...</CommentText>
            )}
          </CommentDescription>
          {showReadMoreButton && (
            <CommentShowMoreButton
              onClick={handleClickShowMore}
              variant="text"
              size="small"
            >
              <GrayText>
                {showingMoreText ? t('readLess') : t('readMore')}
              </GrayText>
            </CommentShowMoreButton>
          )}
        </CommentInfoSection>
        <CommentActions>
          {inReviewMode && (
            <>
              {likeCount > 0 && (
                <HelpfulReviews>
                  {t('reviewsHelpful', { count: likeCount })}
                </HelpfulReviews>
              )}
              <CommentActionsBox>
                <CommentButton
                  variant={commentIsLiked ? 'contained' : 'outlined'}
                  isLiked={commentIsLiked}
                  color="tertiary"
                  onClick={() => onLike(comment)}
                >
                  {t('reviewsHelpfulButton')}
                </CommentButton>
                <ReportAbuseLink href={'/support'}>
                  <Typography>{t('reviewsReportAbuseLink')}</Typography>
                </ReportAbuseLink>
              </CommentActionsBox>
            </>
          )}
          {!inReviewMode && (
            <>
              <CommentActionsBox>
                <IconButton onClick={() => onLike(comment)}>
                  {likeStatus === CommentLikeStatusValue.Liked ? (
                    <ThumbUpAlt />
                  ) : (
                    <ThumbUpAltOutlined />
                  )}
                </IconButton>
                <GrayText variant="body2">{likeCount}</GrayText>
                <IconButton onClick={() => onDislike(comment)}>
                  {likeStatus === CommentLikeStatusValue.Disliked ? (
                    <ThumbDownAlt />
                  ) : (
                    <ThumbDownAltOutlined />
                  )}
                </IconButton>
                <GrayText variant="body2">{dislikeCount}</GrayText>
                {replyDepth > 0 && (
                  <Button variant="text" onClick={handleClickReply}>
                    {t('replyButton')}
                  </Button>
                )}
              </CommentActionsBox>
              {showCommentForm && (
                <CreateCommentForm
                  commentType={commentType}
                  onSubmit={handleCreateComment}
                  onCancel={handleCloseCommentForm}
                />
              )}
              {replyDepth > 0 && totalReplies > 0 && (
                <CommentRepliesButton
                  variant="text"
                  onClick={handleOpenReplies}
                >
                  {repliesOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                  {`${t('viewLabel')} ${totalReplies} ${t(`replyLabel`)}`}
                </CommentRepliesButton>
              )}
            </>
          )}
        </CommentActions>
      </Comments>
      <Popover
        id={menuAnchorEl ? 'comment-menu' : undefined}
        open={!!menuAnchorEl}
        anchorEl={menuAnchorEl}
        onClose={handleCloseMenu}
      >
        <CommentOptionsMenu>
          {canPin && (
            <MenuItem onClick={() => onPin?.(comment)}>
              <ListItemIcon>
                <PushPinOutlined />
              </ListItemIcon>
              <ListItemText>{t('pinActionLabel')}</ListItemText>
            </MenuItem>
          )}

          <MenuItem onClick={() => onDelete(comment)}>
            <ListItemIcon>
              <DeleteOutline />
            </ListItemIcon>
            <ListItemText>{t('deleteActionLabel')}</ListItemText>
          </MenuItem>

          <MenuItem onClick={() => onReport?.(comment)}>
            <ListItemIcon>
              <FlagOutlined />
            </ListItemIcon>
            <ListItemText>{t('reportActionLabel')}</ListItemText>
          </MenuItem>
        </CommentOptionsMenu>
      </Popover>

      {repliesOpen && (
        <>
          {commentReplies?.map((comment) => (
            <Comment
              commentType={commentType}
              comment={comment}
              key={comment.id}
              onLike={handleLike}
              onDislike={handleDislike}
              onPin={() => onPin?.(comment)}
              onReport={() => onReport?.(comment)}
              canPin={canPin}
              replyDepth={replyDepth - 1}
              depth={depth + 1}
              onReply={handleReply}
              onReplyRemoved={(comment) => removeReply(comment.id)}
              onDelete={handleDelete}
            />
          ))}
          {hasMoreReplies && (
            <CommentShowMoreRepliesButton variant="text" onClick={loadComments}>
              <SubdirectoryArrowRight />
            </CommentShowMoreRepliesButton>
          )}
        </>
      )}
    </>
  )
}
