import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { useTranslation } from 'next-i18next'

import { Button } from 'components/Button'
import {
  CommentContainer,
  CommentFormButtonGroup,
  CommentFormContainer,
  CommentFormField,
  CommentFormInputs,
  CommentTitle,
  RatingContainer,
  TextFieldLabel,
} from 'components/Comments/CreateCommentForm/styles'
import { UserAvatar } from 'components/UserAvatar'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { getUserFullName } from 'utils/user/getUserFullName'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { getUserPictureUrl } from 'utils/user/getUserPictureUrl'
import { StarRating } from 'components/StarRating'
import { CommentType } from 'interfaces/Comment'
import { CreateCommentParameter } from 'hooks/useLoadComments'

interface Props {
  onSubmit: (value: CreateCommentParameter) => unknown
  commentType: CommentType
  onCancel?: () => unknown
}

export const CreateCommentForm: FC<React.PropsWithChildren<Props>> = ({
  onSubmit,
  commentType,
  onCancel,
}) => {
  const inReviewMode = commentType === CommentType.Review
  const { t } = useTranslation(LocaleNamespace.Comments)
  const user = useCurrentUserAsserted()
  const userFullName = getUserFullName(user)
  const userPictureUrl = getUserPictureUrl(user)
  const [showButtons, setShowButtons] = useState(false)
  const [reviewSubject, setReviewSubject] = useState('')
  const [text, setText] = useState('')
  const [reviewRating, setReviewRating] = useState<number | undefined>(0)

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.ctrlKey && e.code === 'Enter') {
      handleSubmit()
    }
  }

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target
    setText(value)
    setShowButtons(true)
  }

  const handleSubmit = async () => {
    const requestBody = inReviewMode
      ? {
          content: text,
          subject: reviewSubject,
          rating: reviewRating,
        }
      : {
          content: text,
        }
    await onSubmit(requestBody)
    resetForm()
  }

  function handleCancel() {
    setShowButtons(false)
    setText('')
    onCancel?.()
  }

  // const handleSubjectFormField = (
  //   e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  //   const { value } = e.target
  //   setReviewSubject(value)
  // }

  const resetForm = () => {
    setReviewSubject('')
    setText('')
    setReviewRating(0)
  }

  return (
    <>
      {inReviewMode && <CommentTitle>{t('addAReviewLabel')}</CommentTitle>}
      <CommentFormContainer>
        <UserAvatar
          alt={userFullName}
          src={userPictureUrl}
          firstName={user.firstName}
          lastName={user.lastName}
          width={40}
          height={40}
        />

        <CommentFormInputs>
          {inReviewMode && (
            <CommentContainer>
              <RatingContainer>
                <TextFieldLabel>{t('rateLabel')}</TextFieldLabel>
                <StarRating
                  value={reviewRating}
                  showLabel
                  onChange={({ value: newValue }) => {
                    setReviewRating(newValue ?? undefined)
                  }}
                />
              </RatingContainer>
              {/* <TextFieldLabel>{t('subjectLineLabel')}</TextFieldLabel>
              <CommentFormField
                value={reviewSubject}
                onChange={(e) => handleSubjectFormField(e)}
                onKeyDown={handleKeyDown}
                placeholder={t('subjectPlaceholder')}
                autoComplete="off"
                multiline
                fullWidth
              /> */}
            </CommentContainer>
          )}
          <TextFieldLabel>
            {inReviewMode ? t('leaveReviewLabel') : t('leaveCommentLabel')} *
          </TextFieldLabel>
          <CommentFormField
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            variant="outlined"
            placeholder={
              inReviewMode ? t('experiencePlaceholder') : t('addACommentLabel')
            }
            autoComplete="off"
            multiline
            rows={3}
            fullWidth
          />
          <CommentFormButtonGroup>
            {(showButtons || text) && (
              <>
                <Button variant="text" onClick={handleCancel}>
                  {t('cancelCommentLabel')}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!inReviewMode}
                  onClick={handleSubmit}
                >
                  {t('commentLabel')}
                </Button>
              </>
            )}
          </CommentFormButtonGroup>
        </CommentFormInputs>
      </CommentFormContainer>
    </>
  )
}
