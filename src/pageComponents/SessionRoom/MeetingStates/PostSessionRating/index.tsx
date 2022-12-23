import { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ActionSection,
  GoBackButton,
  PostSessionRatingContainer,
  RatingComment,
  RatingCommentSection,
  RatingSection,
  SessionHasEnded,
  ShareReviewText,
  SocialMediaSection,
  SubmitCommentButton,
  SubmitSuccessIconSection,
  SuccessfullySubmittedText,
  ThankYouScreenButton,
  ThankYouText,
} from 'pageComponents/SessionRoom/MeetingStates/PostSessionRating/styles'
import { StarRating } from 'components/StarRating'
import { Link } from 'components/Link'
import { useEditableComment } from 'hooks/useEditableComment'
import { Session } from 'interfaces/Session'
import { CommentEntityType, CommentType } from 'interfaces/Comment'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { Expert } from 'interfaces/Expert'
import {
  LogoSection,
  WatermarkSection,
} from 'pageComponents/SessionRoom/MeetingStates/styles'
import { LogoCompleteTextIcon } from 'icons/Logo'
import { LogoWatermark } from 'icons/LogoWatermark'
import { SubmitSuccessIcon } from 'icons/SubmitSuccess'

interface PostSessionRatingProps {
  exitReason: 'left' | 'ended'
  session: Session
}

export const PostSessionRating: FC<PostSessionRatingProps> = ({
  exitReason,
  session,
}) => {
  const user = useCurrentUserAsserted()
  const { t } = useTranslation(LocaleNamespace.SessionRoom)
  const [saved, setSaved] = useState(false)

  const sessionExpert = session.expert as Expert
  const currentUserIsExpert = user.id === sessionExpert.user.id
  const sessionExpertId = sessionExpert.id

  const editableComment = useEditableComment({
    createdBy: user.id,
    commentType: CommentType.Review,
    entityType: CommentEntityType.Session,
    entityId: session.id,
  })

  const handleSave = () => {
    editableComment.onSave()
    setSaved(true)
  }

  let postSessionRatingTitle: string
  let ratingCommentLabel: string

  if (currentUserIsExpert) {
    postSessionRatingTitle = t('postSessionRatingTitleExpert')
    ratingCommentLabel = t('ratingCommentLabelExpert')
  } else {
    postSessionRatingTitle = t('postSessionRatingTitleConsumer')
    ratingCommentLabel = t('ratingCommentLabelConsumer')
  }

  if (saved) {
    return (
      <PostSessionRatingContainer>
        <SuccessfullySubmittedText>
          {t('successfullySubmitted')}
        </SuccessfullySubmittedText>
        <SubmitSuccessIconSection>
          <SubmitSuccessIcon />
        </SubmitSuccessIconSection>
        <ThankYouText>{t('thankYou')}</ThankYouText>

        <ActionSection>
          {!currentUserIsExpert && (
            <>
              <Link href={`/experts/${sessionExpertId}`}>
                <ThankYouScreenButton size="large" variant="contained">
                  {t('followUpSessionButton')}
                </ThankYouScreenButton>
              </Link>
              <Link href="/">
                <ThankYouScreenButton size="large" variant="outlined">
                  {t('expertSessionButton')}
                </ThankYouScreenButton>
              </Link>

              <ShareReviewText>{t('shareReview')}</ShareReviewText>
              <SocialMediaSection>
                <FacebookShareButton url={'https://facebook.com'}>
                  <FacebookIcon size={'2rem'} round />
                </FacebookShareButton>
                <FacebookMessengerShareButton
                  url={'https://www.messenger.com/'}
                  appId={''}
                >
                  <FacebookMessengerIcon size={'2rem'} round />
                </FacebookMessengerShareButton>
                <TwitterShareButton url={'https://twitter.com'}>
                  <TwitterIcon size={'2rem'} round />
                </TwitterShareButton>
                <WhatsappShareButton url={'https://www.whatsapp.com/'}>
                  <WhatsappIcon size={'2rem'} round />
                </WhatsappShareButton>
                <LinkedinShareButton url={'https://www.linkedin.com/'}>
                  <LinkedinIcon size={'2rem'} round />
                </LinkedinShareButton>
                <RedditShareButton url={'https://www.reddit.com/'}>
                  <RedditIcon size={'2rem'} round />
                </RedditShareButton>
                <EmailShareButton url={''} disabled>
                  <EmailIcon size={'2rem'} round />
                </EmailShareButton>
              </SocialMediaSection>
            </>
          )}
          {!!currentUserIsExpert && (
            <Link href="/">
              <ThankYouScreenButton size="large" variant="outlined">
                {t('expertSessionButton')}
              </ThankYouScreenButton>
            </Link>
          )}
        </ActionSection>
      </PostSessionRatingContainer>
    )
  }

  return (
    <PostSessionRatingContainer>
      <LogoSection>
        <Link href="/">
          <LogoCompleteTextIcon />
        </Link>
      </LogoSection>
      <SessionHasEnded variant="h5">
        {exitReason === 'ended'
          ? t('sessionHasEnded')
          : t('leftSessionNotification')}
      </SessionHasEnded>
      <Typography variant="h5">{postSessionRatingTitle}</Typography>
      <RatingSection>
        <StarRating
          name="hover-feedback"
          size="large"
          labelPosition="bottom"
          showLabel
          {...editableComment.startRatingInput}
        />
      </RatingSection>
      {!!editableComment.startRatingInput.value && (
        <>
          <RatingCommentSection>
            <Typography variant="h6">{ratingCommentLabel}</Typography>
            <RatingComment
              variant="outlined"
              placeholder={t('ratingCommentPlaceholder')}
              autoComplete="off"
              multiline
              rows={3}
              {...editableComment.textInput}
            />
          </RatingCommentSection>
          <SubmitCommentButton
            type="submit"
            size="large"
            variant="contained"
            onClick={handleSave}
            disabled={!editableComment.textInput.value}
          >
            {t('submit')}
          </SubmitCommentButton>
          {currentUserIsExpert && (
            <Link href="/">
              <GoBackButton size="large">{t('goBackButton')}</GoBackButton>
            </Link>
          )}
        </>
      )}
      <WatermarkSection>
        <LogoWatermark />
      </WatermarkSection>
    </PostSessionRatingContainer>
  )
}
