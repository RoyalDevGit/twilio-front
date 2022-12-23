import { FC, useEffect, useRef, useState } from 'react'
import { useIntersection } from 'react-use'
import { useTranslation } from 'next-i18next'
import CircularProgress from '@mui/material/CircularProgress'

import { Config } from 'utils/config'
import { Comment } from 'components/Comments/Comment'
import { LoadingContainer } from 'components/Comments/CommentsList/styles'
import { Comment as IComment, CommentType } from 'interfaces/Comment'
import { CommentTitle } from 'components/Comments/Comment/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'

const COMMENT_REPLY_DEPTH = Config.getNumber('COMMENT_REPLY_DEPTH')

interface Props {
  showRatings?: boolean
  commentType: CommentType
  comments: IComment[]
  onLoadComments: () => Promise<void>
  hasMoreComments: boolean
  onReply: (comment: IComment) => void
  onReplyRemoved: (comment: IComment) => void
  onLike: (comment: IComment) => void
  onDislike: (comment: IComment) => void
  onPin: (comment: IComment) => void
  onDelete: (comment: IComment) => void
}

export const CommentsList: FC<React.PropsWithChildren<Props>> = ({
  showRatings,
  commentType,
  comments,
  onLoadComments,
  hasMoreComments,
  onReply,
  onReplyRemoved,
  onLike,
  onDislike,
  onPin,
  onDelete,
}) => {
  const { t } = useTranslation(LocaleNamespace.Comments)
  const [loading, setLoading] = useState(false)
  const intersectionRef = useRef<HTMLDivElement>(null)
  const intersection = useIntersection(intersectionRef, {})

  useEffect(() => {
    if (intersection?.isIntersecting === true && !loading) {
      handleLoadComments()
    }
  }, [intersection?.isIntersecting, loading])

  async function handleLoadComments() {
    setLoading(true)
    await onLoadComments()
    setLoading(false)
  }

  const inReviewMode = commentType === CommentType.Review
  return (
    <>
      <CommentTitle>
        {inReviewMode ? t('reviewsTitleLabel') : t('commentsTitleLabel')}
      </CommentTitle>
      {comments.map((comment) => (
        <Comment
          showRating={showRatings}
          commentType={commentType}
          canPin={true}
          key={comment.id}
          comment={comment}
          onLike={onLike}
          onDislike={onDislike}
          onPin={onPin}
          replyDepth={COMMENT_REPLY_DEPTH}
          onReply={onReply}
          onReplyRemoved={onReplyRemoved}
          onDelete={onDelete}
        />
      ))}
      {hasMoreComments && (
        <LoadingContainer ref={intersectionRef}>
          {loading && <CircularProgress />}
        </LoadingContainer>
      )}
    </>
  )
}
