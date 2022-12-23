import { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'

import { useRouter } from 'hooks/useRouter'
import {
  BigExpertCard,
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
  VerticalDivider,
  ExpertCardMedia,
  GradientContainer,
} from 'components/ExpertCardBig/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { MiniStarRating } from 'components/MiniStarRating'
import { HeartIconEmpty } from 'icons/Heart/Empty'
import { HeartIconFilled } from 'icons/Heart/Filled'
import { Expert } from 'interfaces/Expert'
import { useExpertToggleFavorite } from 'hooks/api/expert/useExpertToggleFavorite'
import { getUserProfilePictureUrl } from 'utils/url/getUserProfilePictureUrl'
import { getExpertBannerImageUrl } from 'utils/url/getExpertBannerImageUrl'
import { RatePerHour } from 'components/RatePerHour'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

export interface ExpertCardBigProps {
  expert: Expert
  onFavoriteToggle?: (isFavorite?: boolean) => unknown
  id: string
  hideFavoriteIcon?: boolean
  onUnfavorite?: () => void
}

export const ExpertCardBig: FC<React.PropsWithChildren<ExpertCardBigProps>> = ({
  expert: initialExpert,
  onFavoriteToggle,
  id,
  hideFavoriteIcon,
  onUnfavorite,
}) => {
  const router = useRouter()
  const { t } = useTranslation(LocaleNamespace.ExpertCard)
  const [expert, setExpert] = useState(initialExpert)
  const [enableAvatarZoom, setEnableAvatarZoom] = useState(false)
  const prefersDarkMode = usePrefersDarkMode()

  const toggleFavorite = useExpertToggleFavorite(expert, {
    guestUserRedirectTo: `/experts/${expert.id}`,
  })

  const handleFavorite = async () => {
    const updatedExpert = await toggleFavorite()
    if (!updatedExpert) {
      return
    }
    setExpert(updatedExpert)
    if (onFavoriteToggle) {
      onFavoriteToggle(updatedExpert.isFavorite)
    }
    if (!updatedExpert.isFavorite) {
      if (onUnfavorite) {
        onUnfavorite()
      }
    }
  }

  const goToExpertDetails = () => router.push(`/experts/${expert.id}`)

  return (
    <BigExpertCard data-testid="expert-card">
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
            iszoomed={enableAvatarZoom.toString()}
            src={getUserProfilePictureUrl(expert.user)}
            firstName={expert.user.firstName}
            lastName={expert.user.lastName}
            width={127}
            height={127}
          />
        </InterestedInExpertAvatarContainer>
        {!hideFavoriteIcon && (
          <InterestedInExpertIcon
            data-testid="expert-card-fav-btn"
            onClick={handleFavorite}
          >
            {expert.isFavorite ? (
              <HeartIconFilled forceDark />
            ) : (
              <HeartIconEmpty forceDark />
            )}
          </InterestedInExpertIcon>
        )}
      </CardActionAreaBox>

      <InterestedInExpertContent>
        <InterestedInExpertNameBox>
          <ExpertName>
            {expert.user.firstName + ' ' + expert.user.lastName}
          </ExpertName>
          <ExpertExpertise>{expert.mainAreaOfExpertise}</ExpertExpertise>
        </InterestedInExpertNameBox>

        <InterestedInExpertContentBox>
          <MiniStarRating
            rating={expert.averageRatings?.overall?.rating ?? 0}
            count={expert.averageRatings?.overall?.count ?? 0}
          />
          <VerticalDivider orientation="vertical" flexItem variant="middle" />
          <RatePerHour ratePerHour={expert.hourlyRate ?? 0} />
        </InterestedInExpertContentBox>

        <InterestedInExpertButton
          id={id}
          onClick={goToExpertDetails}
          variant="contained"
          color="secondary"
          onMouseEnter={() => setEnableAvatarZoom(true)}
          onMouseLeave={() => setEnableAvatarZoom(false)}
        >
          {t('viewProfileButton')}
        </InterestedInExpertButton>
      </InterestedInExpertContent>
    </BigExpertCard>
  )
}
