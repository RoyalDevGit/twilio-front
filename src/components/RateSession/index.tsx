import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  EditButtonSection,
  RateSessionContainer,
  RatingComment,
  RatingCommentSection,
  RatingSection,
  SubmitCommentButton,
} from 'components/RateSession/styles'
import { StarRating } from 'components/StarRating'
import { Session } from 'interfaces/Session'
import { CommentEntityType, CommentType } from 'interfaces/Comment'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { useEditableComment } from 'hooks/useEditableComment'
import { Button } from 'components/Button'

interface RateSessionProps {
  session: Session
}

export const RateSession: FC<RateSessionProps> = ({ session }) => {
  const user = useCurrentUserAsserted()
  const { t } = useTranslation(LocaleNamespace.RateSession)

  const editableComment = useEditableComment({
    createdBy: user.id,
    commentType: CommentType.Review,
    entityType: CommentEntityType.Session,
    entityId: session.id,
  })

  return (
    <RateSessionContainer>
      <RatingSection>
        <StarRating
          name="hover-feedback"
          size="large"
          showLabel
          {...editableComment.startRatingInput}
        />
      </RatingSection>
      {!!editableComment.startRatingInput.value && (
        <>
          <RatingCommentSection>
            <Typography variant="h6">{t('addReviewLabel')}</Typography>
            <RatingComment
              variant="outlined"
              placeholder={t('reviewPlaceholder')}
              autoComplete="off"
              multiline
              rows={3}
              {...editableComment.textInput}
              disabled={!editableComment.editing}
            />
          </RatingCommentSection>

          {!editableComment.hasExistingComment && (
            <SubmitCommentButton
              type="submit"
              size="large"
              onClick={editableComment.onSave}
              disabled={!editableComment.textInput.value}
            >
              {t('submit')}
            </SubmitCommentButton>
          )}

          {editableComment.hasExistingComment && editableComment.editing && (
            <EditButtonSection>
              <Button
                onClick={editableComment.onSave}
                disabled={!editableComment.textInput.value}
              >
                {t('save')}
              </Button>
              <Button onClick={editableComment.cancel}> {t('cancel')}</Button>
            </EditButtonSection>
          )}

          {editableComment.hasExistingComment && !editableComment.editing && (
            <EditButtonSection>
              <Button onClick={editableComment.enable}> {t('edit')}</Button>
            </EditButtonSection>
          )}
        </>
      )}
    </RateSessionContainer>
  )
}
