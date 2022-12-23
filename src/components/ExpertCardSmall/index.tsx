import { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'

import { useRouter } from 'hooks/useRouter'
import {
  SmallExpertCard,
  CardActionAreaBox,
  InterestedInExpertAvatar,
  InterestedInExpertIcon,
  InterestedInExpertContent,
  InterestedInExpertNameBox,
  InterestedInExpertContentBox,
  InterestedInExpertButton,
  InterestedInExpertAvatarContainer,
  ExpertExpertise,
  ExpertName,
  ExpertCardMedia,
  GradientContainer,
} from 'components/ExpertCardSmall/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { RatePerHour } from 'components/RatePerHour'
import { MiniStarRating } from 'components/MiniStarRating'
import { HeartIconFilled } from 'icons/Heart/Filled'
import { HeartIconEmpty } from 'icons/Heart/Empty'
import { Expert } from 'interfaces/Expert'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'
import { getExpertBannerImageUrl } from 'utils/url/getExpertBannerImageUrl'
import { useExpertToggleFavorite } from 'hooks/api/expert/useExpertToggleFavorite'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

export interface ExpertCardSmallProps {
  expert: Expert
  id: string
  onUnfavorite?: () => void
}
export const ExpertCardSmall: FC<
  React.PropsWithChildren<ExpertCardSmallProps>
> = ({ expert: initialExpert, id, onUnfavorite }) => {
  const router = useRouter()
  const { t } = useTranslation(LocaleNamespace.ExpertCard)
  const [expert, setExpert] = useState(initialExpert)
  const toggleFavorite = useExpertToggleFavorite(expert, {
    guestUserRedirectTo: `/experts/${expert.id}`,
  })
  const [enableAvatarZoom, setEnableAvatarZoom] = useState(false)
  const prefersDarkMode = usePrefersDarkMode()

  const handleFavorite = async () => {
    const updatedExpert = await toggleFavorite()
    if (!updatedExpert) {
      return
    }
    setExpert(updatedExpert)
    if (!updatedExpert.isFavorite) {
      if (onUnfavorite) {
        onUnfavorite()
      }
    }
  }

  const goToExpertDetails = () => router.push(`/experts/${expert.id}`)

  const MAX_NAME_LENGTH = 19
  let expertName = `${expert.user.firstName} ${expert.user.lastName}`

  if (expertName.length > MAX_NAME_LENGTH) {
    expertName = `${expert.user.firstName} ${expert.user.lastName[0]}.`
  }

  return (
    <SmallExpertCard data-testid="expert-card-small">
      <CardActionAreaBox>
        <GradientContainer>
          <ExpertCardMedia
            src={getExpertBannerImageUrl(expert, prefersDarkMode)}
            fill={true}
            alt=""
          />
        </GradientContainer>
        <InterestedInExpertAvatarContainer>
          <InterestedInExpertAvatar
            isZoomed={enableAvatarZoom}
            src={getUserProfilePictureUrl(expert.user)}
            firstName={expert.user.firstName}
            lastName={expert.user.lastName}
            width={88}
            height={88}
          />
        </InterestedInExpertAvatarContainer>
        <InterestedInExpertIcon
          data-testid="expert-card-small-fav-btn"
          onClick={handleFavorite}
          id={`handled-favorite-${id}`}
        >
          {expert.isFavorite ? (
            <HeartIconFilled forceDark />
          ) : (
            <HeartIconEmpty forceDark />
          )}
        </InterestedInExpertIcon>
      </CardActionAreaBox>

      <InterestedInExpertContent>
        <InterestedInExpertNameBox>
          <ExpertName>{expertName}</ExpertName>
          <ExpertExpertise>{expert.mainAreaOfExpertise}</ExpertExpertise>
        </InterestedInExpertNameBox>

        <InterestedInExpertContentBox>
          <MiniStarRating
            rating={expert.averageRatings?.overall?.rating ?? 0}
            count={expert.averageRatings?.overall?.count ?? 0}
          />
          <RatePerHour ratePerHour={expert.hourlyRate || 0} />
        </InterestedInExpertContentBox>

        <InterestedInExpertButton
          data-testid="expert-card-small-view-profile-btn"
          variant="contained"
          color="secondary"
          onClick={goToExpertDetails}
          onMouseEnter={() => setEnableAvatarZoom(true)}
          onMouseLeave={() => setEnableAvatarZoom(false)}
        >
          {t('viewProfileButton')}
        </InterestedInExpertButton>
      </InterestedInExpertContent>
    </SmallExpertCard>
  )
}
