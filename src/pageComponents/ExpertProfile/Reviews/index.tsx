import { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { ExpertPage } from 'pageComponents/ExpertProfile'
import { Comment, CommentEntityType, CommentType } from 'interfaces/Comment'
import { CreateCommentParameter, useLoadComments } from 'hooks/useLoadComments'
import { CreateCommentForm } from 'components/Comments/CreateCommentForm'
import { CommentsList } from 'components/Comments/CommentsList'
import {
  CommentSectionDivider,
  ExpertCommentSection,
} from 'pageComponents/ExpertProfile/Reviews/styles'
import { ExpertChildrenPageProps } from 'interfaces/Expert'
import { ExpertApi } from 'apis/ExpertApi'
export interface ExpertReviewsPageProps extends ExpertChildrenPageProps {
  initialReviews: Comment[]
  canReview: boolean
  moreReviews: boolean
}
export const ExpertReviewsPage: NextPage<ExpertReviewsPageProps> = (props) => {
  const { initialReviews, initialExpert, canReview, moreReviews } = props
  const [expert, setExpert] = useState(initialExpert)
  const commentType = CommentType.Review
  const {
    comments,
    hasMore,
    loadComments,
    createComment,
    reply,
    removeReply,
    like,
    dislike,
    togglePin,
    deleteComment,
  } = useLoadComments(
    commentType,
    CommentEntityType.Expert,
    expert.id,
    initialReviews,
    moreReviews
  )

  const addReview = async (review: CreateCommentParameter) => {
    await createComment(review)
    const updatedExpertFetch = await ExpertApi.getById(expert.id)
    if (updatedExpertFetch.ok()) {
      const updatedExpert = await updatedExpertFetch.getData()
      setExpert(updatedExpert)
    }
  }

  useEffect(() => {
    setExpert(initialExpert)
  }, [initialExpert])

  return (
    <ExpertPage expert={expert} updateExpert={(updated) => setExpert(updated)}>
      <ExpertCommentSection>
        {canReview && (
          <>
            <CreateCommentForm commentType={commentType} onSubmit={addReview} />
            <CommentSectionDivider />
          </>
        )}
        {comments.length > 0 && (
          <CommentsList
            showRatings
            commentType={commentType}
            comments={comments}
            onLoadComments={loadComments}
            hasMoreComments={hasMore}
            onReply={(comment) => reply(comment.id)}
            onReplyRemoved={(comment) => removeReply(comment.id)}
            onLike={(comment) => like(comment.id)}
            onDislike={(comment) => dislike(comment.id)}
            onPin={(comment) => togglePin(comment.id)}
            onDelete={(comment) => deleteComment(comment.id)}
            data-testid="comment"
          />
        )}
      </ExpertCommentSection>
    </ExpertPage>
  )
}
