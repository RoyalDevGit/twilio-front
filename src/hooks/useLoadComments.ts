import { useReducer, useState } from 'react'
import { DateTime } from 'luxon'

import {
  Comment,
  CommentEntityType,
  CommentLikeStatusValue,
  CommentType,
} from 'interfaces/Comment'
import { CommentApi } from 'apis/CommentApi'

type CommentActions =
  | {
      type: 'LOAD'
      comments: Comment[]
      hasMore: boolean
    }
  | { type: 'CREATE'; comment: Comment }
  | { type: 'DELETE'; id: string }
  | { type: 'UPDATE'; id: string; update: Partial<Comment> }

interface CommentReducerState {
  comments: Comment[]
  currentPage: number
  hasMore: boolean
}

export interface CreateCommentParameter {
  content: string
  subject?: string
  rating?: number
}

function sortComments(comments: Comment[]) {
  const dateSort = (a: Comment, b: Comment) => {
    const dateA = DateTime.fromISO(a.createdAt)
    const dateB = DateTime.fromISO(b.createdAt)
    return dateB.diff(dateA).toMillis()
  }
  const pinned = comments.filter(({ pinned }) => pinned).sort(dateSort)
  const unpinned = comments.filter(({ pinned }) => !pinned).sort(dateSort)

  return pinned.concat(unpinned)
}

function commentsReducer(
  prevState: CommentReducerState,
  action: CommentActions
): CommentReducerState {
  if (action.type === 'LOAD') {
    const { comments, currentPage } = prevState
    const commentMap = new Map(comments.map((comment) => [comment.id, comment]))
    // Filter out comments that already exist because the user just created them
    const newComments = action.comments.filter(({ id }) => !commentMap.has(id))
    return {
      ...prevState,
      comments: comments.concat(newComments),
      currentPage: currentPage + 1,
      hasMore: action.hasMore,
    }
  } else if (action.type === 'CREATE') {
    const { comments } = prevState
    return {
      ...prevState,
      comments: [action.comment].concat(comments),
    }
  } else if (action.type === 'UPDATE') {
    const { comments } = prevState
    const newComments = comments.map((comment) => {
      if (comment.id === action.id) {
        return { ...comment, ...action.update }
      } else return comment
    })
    return {
      ...prevState,
      comments: newComments,
    }
  } else if (action.type === 'DELETE') {
    const { comments } = prevState
    const newComments = comments.filter(({ id }) => id !== action.id)
    return {
      ...prevState,
      comments: newComments,
    }
  }
  throw new Error('Invalid Action')
}

const initialReducerState: CommentReducerState = {
  comments: [],
  currentPage: 0,
  hasMore: false,
}

export function useLoadComments(
  commentType: CommentType,
  entityType: CommentEntityType,
  entityId: string,
  initialComments: Comment[] = [],
  shouldLoadMore = false
) {
  const [saving, setSaving] = useState(false)
  const [{ comments, currentPage, hasMore }, dispatch] = useReducer(
    commentsReducer,
    {
      ...initialReducerState,
      comments: sortComments(initialComments),
      hasMore: shouldLoadMore,
    }
  )

  async function loadComments() {
    if (!hasMore) return
    setSaving(true)
    const res = await CommentApi.query({
      commentType,
      entityId,
      entityType,
      page: currentPage + 1,
      limit: 10,
    })
    if (res.ok()) {
      const data = await res.getData()
      setSaving(false)
      dispatch({
        type: 'LOAD',
        comments: sortComments(data.items),
        hasMore: data.hasNextPage,
      })
    } else {
      console.error(await res.getError().catch((e) => e))
    }
  }

  async function createComment({
    content,
    subject = '',
    rating,
  }: CreateCommentParameter) {
    if (commentType === CommentType.Review) {
      if (!rating) {
        throw new Error('A Rating is required for a review.')
      }
    }
    const ratings = rating ? { overall: rating } : undefined
    const res = await CommentApi.create({
      commentType,
      entityId,
      entityType,
      content,
      subject,
      ratings,
    })
    if (res.ok()) {
      const comment = await res.getData()
      if (comment) {
        dispatch({
          type: 'CREATE',
          comment,
        })
      }
    } else {
      console.error(await res.getError())
    }
  }

  async function reply(id: string) {
    const comment = comments.find((comment) => id === comment.id)
    if (!comment) throw new Error('Comment does not exist')
    dispatch({
      type: 'UPDATE',
      id,
      update: { totalReplies: comment.totalReplies + 1 },
    })
  }

  async function removeReply(id: string) {
    const comment = comments.find((comment) => id === comment.id)
    if (!comment) throw new Error('Comment does not exist')
    dispatch({
      type: 'UPDATE',
      id,
      update: { totalReplies: comment.totalReplies - 1 },
    })
  }

  async function like(id: string) {
    const comment = comments.find((comment) => id === comment.id)
    if (!comment) throw new Error('Comment does not exist')
    const res =
      comment.likeStatus !== CommentLikeStatusValue.Liked
        ? await CommentApi.like(id)
        : await CommentApi.clearLikeStatus(id)
    if (res.ok()) {
      const { likeCount, dislikeCount, likeStatus } = await res.getData()
      dispatch({
        type: 'UPDATE',
        id,
        update: { likeCount, dislikeCount, likeStatus },
      })
    }
  }

  async function dislike(id: string) {
    const comment = comments.find((comment) => id === comment.id)
    if (!comment) throw new Error('Comment does not exist')
    const res =
      comment.likeStatus !== CommentLikeStatusValue.Disliked
        ? await CommentApi.dislike(id)
        : await CommentApi.clearLikeStatus(id)
    if (res.ok()) {
      const { likeCount, dislikeCount, likeStatus } = await res.getData()
      dispatch({
        type: 'UPDATE',
        id,
        update: { likeCount, dislikeCount, likeStatus },
      })
    }
  }

  async function togglePin(id: string) {
    const comment = comments.find((comment) => id === comment.id)
    if (!comment) throw new Error('Comment does not exist')
    const res = await CommentApi.update(id, { pinned: !comment.pinned })
    if (res.ok()) {
      dispatch({
        type: 'UPDATE',
        id,
        update: { pinned: !comment.pinned },
      })
    }
  }

  async function deleteComment(id: string) {
    const comment = comments.find((comment) => id === comment.id)
    if (!comment) throw new Error('Comment does not exist')
    const res = await CommentApi.delete(id)
    if (res.ok()) {
      dispatch({ type: 'DELETE', id })
    }
  }

  return {
    comments,
    hasMore,
    loadComments,
    createComment,
    saving,
    currentPage,
    reply,
    removeReply,
    like,
    dislike,
    togglePin,
    deleteComment,
  }
}
