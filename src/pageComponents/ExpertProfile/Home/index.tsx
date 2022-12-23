import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'

import { useRouter } from 'hooks/useRouter'
import {
  ExpertTitle,
  ExpertDescription,
  ExpertTitleInfo,
  ExpertLeftPanelBox,
  // ExpertProfileTitle,
  TagsChips,
  ExpertEditProfileContainer,
  ExpertBodySection,
  ExpertLeftPanel,
  ExpertMiddlePanel,
  ExpertRightPanel,
  TagsContainer,
  ExpertCommentSection,
  // ExpertInterestedExpertsSection,
  BookSessionButton,
  ConnectNowButton,
  ExpertBookSessionContainer,
  TagsChipsContainer,
  NextAvailableTimeContainer,
  NextAvailableTimeLabel,
  NextAvailableTime,
  ExpertNextAvailableBookingContainer,
  BookNextAvailableSessionButton,
} from 'pageComponents/ExpertProfile/Home/styles'
import { ExpertPage } from 'pageComponents/ExpertProfile'
import { FadedDivider } from 'pageComponents/ExpertProfile/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
// import { ExpertCardBig } from 'components/ExpertCardBig'
import { AvailableSessions } from 'components/AvailableSessions'
import { CommentEntityType, CommentType, Comment } from 'interfaces/Comment'
import { Expert, ExpertChildrenPageProps } from 'interfaces/Expert'
import { MobileCheckout } from 'components/MobileCheckout'
// import { HorizontalScrollableContainer } from 'components/HorizontalScrollableContainer'
import { useSessionCheckout } from 'hooks/api/commerce/useSessionCheckout'
import { Order } from 'interfaces/Order'
import { Language } from 'interfaces/Language'
import { Category } from 'interfaces/Category'
import { useLoadComments } from 'hooks/useLoadComments'
import { CommentsList } from 'components/Comments/CommentsList'
import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { isGuestUser } from 'utils/user/isGuestUser'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { Link } from 'components/Link'
import { Grid } from 'components/Grid'

export interface ExpertHomePageProps extends ExpertChildrenPageProps {
  recommendedExperts: Expert[]
  initialOrder?: Order | null
  reviewComments: Comment[]
  moreReviews: boolean
}

export const ExpertHomePage: NextPage<ExpertHomePageProps> = (props) => {
  const {
    initialExpert,
    // recommendedExperts,
    // initialOrder,
    reviewComments,
    moreReviews,
  } = props
  const [expert, setExpert] = useState(initialExpert)
  const { t } = useTranslation([
    LocaleNamespace.ExpertProfileSettings,
    LocaleNamespace.MobileCheckout,
    LocaleNamespace.AvailableSessions,
    LocaleNamespace.ExpertCard,
    LocaleNamespace.Comments,
    LocaleNamespace.Common,
  ])

  useEffect(() => {
    setExpert(initialExpert)
  }, [initialExpert])

  const user = useCurrentUserAsserted()
  const isGuest = isGuestUser(user)

  const [mobileCheckoutIsOpen, setMobileCheckoutIsOpen] = useState(false)
  const [instantSessionCheckoutIsOpen, setInstantSessionCheckoutIsOpen] =
    useState(false)

  const initialFrom = DateTime.now().toUTC().startOf('day')
  const initialTo = initialFrom.plus({ months: 3 }).endOf('day')
  const expertId = expert.id
  let initialSelectedDuration: number | undefined
  let initialSelectedTimeSlotId: string | undefined
  // if (initialOrder && initialOrder.items.length) {
  //   const sessionItem = initialOrder.items[0] as OrderItem<SessionOrderItem>
  //   const { data: sessionData } = sessionItem
  //   if (!sessionData.instant) {
  //     initialSelectedTimeSlotId = sessionData.timeSlotId
  //   }
  // }

  const checkout = useSessionCheckout({
    from: initialFrom,
    to: initialTo,
    selectedDuration: initialSelectedDuration,
    selectedTimeSlotId: initialSelectedTimeSlotId,
    expert,
    // order: initialOrder,
    isGuest,
    initAutoSave: false,
    autoLoadOrder: false,
  })

  const commentType = CommentType.Review
  const commentEntityType = CommentEntityType.Expert
  const {
    comments,
    hasMore,
    loadComments,
    reply,
    removeReply,
    like,
    dislike,
    togglePin,
    deleteComment,
  } = useLoadComments(
    commentType,
    commentEntityType,
    expertId,
    reviewComments,
    moreReviews
  )

  // useEffect(() => {
  //   if (!checkout.availability) {
  //     return
  //   }
  //   if (!checkout.availability.selectedDate && checkout.availability.dates) {
  //     checkout.setSelectedDate(DateTime.fromISO(checkout.availability.dates[0]))
  //   }
  // }, [checkout.availability])

  const handleMobileBookingClick = async () => {
    await checkout.createOrUpdateOrder()
    setMobileCheckoutIsOpen(true)
    setInstantSessionCheckoutIsOpen(false)
  }

  const handleMobileInstantSessionClick = async () => {
    await checkout.createOrUpdateOrder()
    setMobileCheckoutIsOpen(true)
    setInstantSessionCheckoutIsOpen(true)
  }

  const onMobileCheckoutDismiss = () => {
    setInstantSessionCheckoutIsOpen(false)
    setMobileCheckoutIsOpen(false)
  }

  const goToSessionCheckout = async () => {
    await checkout.createOrUpdateOrder()
    checkout.setIsInstantSession(false)
    checkout.setRedirectOnOrderSave(true)
  }

  const goToInstantSessionCheckout = async () => {
    await checkout.createOrUpdateOrder()
    checkout.setSelectedInstantSessionDuration(
      checkout.availability?.instant.durations[0].minutes
    )
    checkout.setIsInstantSession(true)
    checkout.setRedirectOnOrderSave(true)
  }

  const handleDateSelection = (date: DateTime) => {
    checkout.setIsInstantSession(false)
    checkout.setSelectedDate(date)
  }

  const handleDurationSelection = (duration: number) => {
    checkout.setIsInstantSession(false)
    checkout.setSelectedDuration(duration)
    checkout.setSelectedTimeSlotId(undefined)
  }

  const handleTimeSlotSelection = (timeSlotId: string) => {
    checkout.setIsInstantSession(false)
    checkout.setSelectedTimeSlotId(timeSlotId)
  }

  // const filteredRecommendedExperts = recommendedExperts.filter(
  //   (recommended) => recommended.id !== expertId
  // )

  const hasSessionAvailability = !!checkout.availability?.dates.length
  const isAvailableForInstantSession =
    !!checkout.availability?.instant.durations.length

  const router = useRouter()
  const expertSameAsUser = user?.id === expert.user.id

  const signupLink = urlJoinWithQuery('/signup', {
    as: 'consumer',
    redirectTo: router.asPath,
  })

  const renderInstantSessionButton = () => {
    if (!isAvailableForInstantSession) {
      return null
    }

    if (isGuest) {
      return (
        <Link href={signupLink}>
          <ConnectNowButton>{t('connectNowButton')}</ConnectNowButton>
        </Link>
      )
    }

    return (
      <ConnectNowButton onClick={handleMobileInstantSessionClick}>
        {t('connectNowButton')}
      </ConnectNowButton>
    )
  }

  const renderMobileSessionBooking = () => {
    if (expertSameAsUser) {
      return null
    }
    if (!hasSessionAvailability && !isAvailableForInstantSession) {
      return null
    }

    if (isAvailableForInstantSession) {
      return (
        <ExpertBookSessionContainer>
          {renderInstantSessionButton()}
          {hasSessionAvailability && (
            <BookSessionButton
              variant="contained"
              color="secondary"
              onClick={handleMobileBookingClick}
            >
              {t('checkAvailabilityButton')}
            </BookSessionButton>
          )}
        </ExpertBookSessionContainer>
      )
    }

    if (checkout.availability?.nextAvailableTimeSlot) {
      return (
        <ExpertNextAvailableBookingContainer>
          <NextAvailableTimeContainer item>
            <NextAvailableTimeLabel>
              {t('nextAvailableTime')}
            </NextAvailableTimeLabel>
            <NextAvailableTime>
              {DateTime.fromISO(
                checkout.availability.nextAvailableTimeSlot.startDate
              ).toFormat('ccc, MMM d, yyyy, h:mm a')}
            </NextAvailableTime>
          </NextAvailableTimeContainer>
          {hasSessionAvailability && (
            <Grid item sx={{ flex: '1 1 auto' }}>
              <BookNextAvailableSessionButton
                variant="contained"
                color="secondary"
                onClick={handleMobileBookingClick}
              >
                {t('checkAvailabilityButton')}
              </BookNextAvailableSessionButton>
            </Grid>
          )}
        </ExpertNextAvailableBookingContainer>
      )
    }

    return null
  }

  return (
    <ExpertPage expert={expert} updateExpert={(updated) => setExpert(updated)}>
      {renderMobileSessionBooking()}

      <ExpertEditProfileContainer>
        <ExpertBodySection maxWidth="laptopL">
          <ExpertLeftPanel>
            {!!expert.expertiseCategories?.length && (
              <ExpertLeftPanelBox>
                <ExpertTitle>{t('expertIn')}</ExpertTitle>
                {(expert.expertiseCategories as Category[]).map((category) => (
                  <ExpertTitleInfo key={category.id}>
                    {category.title}
                  </ExpertTitleInfo>
                ))}
              </ExpertLeftPanelBox>
            )}
            <ExpertLeftPanelBox>
              <ExpertTitle>{t('expertSince')}</ExpertTitle>
              <ExpertTitleInfo>
                {DateTime.fromISO(expert.expertSince).toFormat('MMMM yyyy')}
              </ExpertTitleInfo>
            </ExpertLeftPanelBox>
            {!!expert.languages?.length && (
              <ExpertLeftPanelBox>
                <ExpertTitle>{t('expertFluentIn')}</ExpertTitle>
                {(expert.languages as Language[]).map((language) => (
                  <ExpertTitleInfo key={language.id}>
                    {language.name}
                  </ExpertTitleInfo>
                ))}
              </ExpertLeftPanelBox>
            )}
            {!!expert.experiences?.length && (
              <ExpertLeftPanelBox>
                <ExpertTitle>{t('expertExperience')}</ExpertTitle>
                {expert.experiences.map((xp) => (
                  <ExpertTitleInfo key={xp}>{xp}</ExpertTitleInfo>
                ))}
              </ExpertLeftPanelBox>
            )}
            {!!expert.educations?.length && (
              <ExpertLeftPanelBox>
                <ExpertTitle>{t('expertEducation')}</ExpertTitle>
                {expert.educations.map((education) => (
                  <ExpertTitleInfo key={education}>{education}</ExpertTitleInfo>
                ))}
              </ExpertLeftPanelBox>
            )}
          </ExpertLeftPanel>
          <ExpertMiddlePanel>
            <ExpertDescription>
              {expert.description ? expert.description['en'] || '' : ''}
            </ExpertDescription>
            {!!expert.tags?.length && (
              <TagsContainer>
                <Typography>{t('expertTags')}</Typography>
                <TagsChipsContainer>
                  {expert.tags.map((tags) => (
                    <TagsChips
                      label={tags}
                      key={tags}
                      clickable
                      variant="outlined"
                    />
                  ))}
                </TagsChipsContainer>
              </TagsContainer>
            )}
          </ExpertMiddlePanel>
          <ExpertRightPanel>
            {!expertSameAsUser && (
              <AvailableSessions
                expert={expert}
                sessionCheckout={checkout}
                availability={checkout.availability}
                date={checkout.selectedDate}
                duration={checkout.selectedDuration}
                timeSlot={checkout.selectedTimeSlotId}
                onInstantSession={goToInstantSessionCheckout}
                onBookingClick={goToSessionCheckout}
                onDateChange={handleDateSelection}
                onDurationChange={handleDurationSelection}
                onTimeSlotChange={handleTimeSlotSelection}
              />
            )}
          </ExpertRightPanel>
        </ExpertBodySection>
      </ExpertEditProfileContainer>
      <FadedDivider />
      {comments.length > 0 && (
        <>
          <ExpertCommentSection>
            <CommentsList
              showRatings={true}
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
            />
          </ExpertCommentSection>
          <FadedDivider />
        </>
      )}
      {/* {!!filteredRecommendedExperts.length && (
        <ExpertInterestedExpertsSection>
          <ExpertProfileTitle>{t('interestedInExperts')}</ExpertProfileTitle>
          <HorizontalScrollableContainer>
            {filteredRecommendedExperts.map((r) => (
              <ExpertCardBig
                expert={r}
                key={r.id}
                id={`recommended-expert-card-${r.id}`}
              />
            ))}
          </HorizontalScrollableContainer>
        </ExpertInterestedExpertsSection>
      )} */}

      <MobileCheckout
        sessionCheckout={checkout}
        expert={expert}
        open={mobileCheckoutIsOpen}
        instant={instantSessionCheckoutIsOpen}
        onDismiss={onMobileCheckoutDismiss}
      />
    </ExpertPage>
  )
}
