import { FC, useState, MouseEventHandler } from 'react'
import { useTranslation } from 'next-i18next'

import { useRouter } from 'hooks/useRouter'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  FeaturedExpertCardContainer,
  ExpertName,
  RatingContainer,
  VerticalDivider,
  ExpertInformationContainer,
  ExpertCardMedia,
  GradientContainer,
  ExpertiseTitle,
  FeaturedExpertIcon,
  BookASessionButton,
  CustomRatePerHour,
  RatingSection,
  Count,
  RatingCountSection,
  RatingValue,
} from 'components/FeaturedExpertCard/styles'
import { HeartIconFilled } from 'icons/Heart/Filled'
import { HeartIconEmpty } from 'icons/Heart/Empty'
import { getStorageBucketFileUrl } from 'utils/url/getStorageBucketFileUrl'
import { Expert } from 'interfaces/Expert'
import { useExpertToggleFavorite } from 'hooks/api/expert/useExpertToggleFavorite'
import { StarIcon } from 'icons/Star/SmallStar'

export interface FeaturedExpertCardProps {
  initialExpert: Expert
}
export const FeaturedExpertCard: FC<
  React.PropsWithChildren<FeaturedExpertCardProps>
> = ({ initialExpert }) => {
  const router = useRouter()
  const { t } = useTranslation(LocaleNamespace.FeaturedExpertCard)
  const [expert, setExpert] = useState(initialExpert)
  const toggleFavorite = useExpertToggleFavorite(expert, {
    guestUserRedirectTo: `/experts/${expert.id}`,
  })

  const handleFavorite: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation()
    const updatedExpert = await toggleFavorite()
    if (!updatedExpert) {
      return
    }
    setExpert(updatedExpert)
  }

  const goToExpertDetails = () => router.push(`/experts/${expert.id}`)

  return (
    <FeaturedExpertCardContainer
      onClick={goToExpertDetails}
      data-testid="featured-expert-card"
    >
      <GradientContainer>
        <ExpertCardMedia
          src={
            expert.user.profilePicture?.fileKey
              ? getStorageBucketFileUrl(expert.user.profilePicture?.fileKey)
              : '/static/img/featured-experts/sam-anderson.png'
          }
          priority
          width={264}
          height={368}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          unoptimized={expert.user.profilePicture?.fileKey ? true : false}
          alt=""
        />
      </GradientContainer>
      <FeaturedExpertIcon
        onClick={handleFavorite}
        data-testid="featured-expert-card-fav-btn"
      >
        {expert?.isFavorite ? (
          <HeartIconFilled forceDark />
        ) : (
          <HeartIconEmpty forceDark />
        )}
      </FeaturedExpertIcon>
      <ExpertInformationContainer>
        <ExpertName>
          {t(expert.user.firstName + ' ' + expert.user.lastName)}
        </ExpertName>
        <ExpertiseTitle>{expert?.mainAreaOfExpertise}</ExpertiseTitle>
        <RatingContainer>
          <RatingSection>
            <StarIcon forceDark />
            <RatingValue>
              {(expert.averageRatings?.overall?.rating ?? 0).toFixed(2)}
            </RatingValue>
            <RatingCountSection>
              (<Count>{expert.averageRatings?.overall?.count ?? 0}</Count>)
            </RatingCountSection>
          </RatingSection>
          <VerticalDivider orientation="vertical" flexItem variant="middle" />
          <CustomRatePerHour ratePerHour={expert?.hourlyRate ?? 0} />
        </RatingContainer>
        <BookASessionButton
          onClick={goToExpertDetails}
          variant="contained"
          color="secondary"
          id={`get-expert-details-${expert.id}`}
        >
          {t('interestedInExpertsButton')}
        </BookASessionButton>
      </ExpertInformationContainer>
    </FeaturedExpertCardContainer>
  )
}
