import { ChangeEventHandler, useCallback, useState } from 'react'
import { useMount } from 'react-use'

import { StarRatingChangeHandler } from 'components/StarRating'
import { CommentApi } from 'apis/CommentApi'
import { Comment } from 'interfaces/Comment'

interface UseEditableComment
  extends Pick<Comment, 'commentType' | 'entityType' | 'entityId'> {
  createdBy: string
}

export const useEditableComment = ({
  createdBy,
  commentType,
  entityType,
  entityId,
}: UseEditableComment) => {
  const [rating, setRating] = useState<number | null>(null)
  const [existingComment, setExistingComment] = useState<Comment | undefined>()
  const [commentText, setCommentText] = useState('')
  const [editing, setEditing] = useState(false)

  useMount(() => {
    const loadComment = async () => {
      const result = await CommentApi.query({
        createdBy,
        commentType,
        entityType,
        entityId,
        page: 1,
        limit: 1,
      })
      const paginatedResult = await result.getData()
      if (paginatedResult.items.length) {
        const loadedComment = paginatedResult.items[0]
        setExistingComment(loadedComment)
        setRating(loadedComment.ratings?.overall || null)
        setCommentText(loadedComment.content || '')
      }
    }
    loadComment()
  })

  const persistChanges = useCallback(async () => {
    if (!rating) {
      return
    }
    if (existingComment) {
      const updateResult = await CommentApi.update(existingComment.id, {
        content: commentText,
        ratings: {
          ...(existingComment.ratings || {}),
          overall: rating,
        },
      })
      const updatedComment = await updateResult.getData()
      setExistingComment(updatedComment)
    } else {
      const updateResult = await CommentApi.create({
        commentType,
        entityType,
        entityId,
        content: commentText,
        ratings: {
          overall: rating,
        },
      })
      const newComment = await updateResult.getData()
      setExistingComment(newComment)
    }
  }, [existingComment, commentText, rating])

  const onRatingChange: StarRatingChangeHandler = ({ value }) => {
    setRating(value)
    enable()
  }

  const onTextInputChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setCommentText(e.currentTarget.value)
  }

  const enable = () => {
    setEditing(true)
  }

  const cancel = useCallback(() => {
    setEditing(false)
    setRating(existingComment?.ratings?.overall || null)
    setCommentText(existingComment?.content || '')
  }, [existingComment])

  const onSave = () => {
    setEditing(false)
    persistChanges()
  }

  return {
    hasExistingComment: !!existingComment,
    editing,
    enable,
    cancel,
    onRatingChange,
    onSave,
    startRatingInput: {
      value: rating,
      onChange: onRatingChange,
    },
    textInput: {
      value: commentText,
      onChange: onTextInputChange,
    },
  }
}
