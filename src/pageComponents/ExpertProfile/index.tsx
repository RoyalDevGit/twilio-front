import { NextPage } from 'next'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import Divider from '@mui/material/Divider'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

import { FavoriteButton } from 'pageComponents/ExpertProfile/FavoriteButton'
import {
  CustomExpertAvatar,
  ExpertAvatarBox,
  ExpertAvatarIconBox,
  ExpertAvatarInfo,
  ExpertAvatarMain,
  ExpertAvatarPlayIcon,
  ExpertBanner,
  ExpertContainer,
  ExpertExpertiseArea,
  ExpertFollowing,
  ExpertFollowingBox,
  ExpertFollowingLabel,
  ExpertFollowingNumbers,
  ExpertName,
  ExpertRate,
  ExpertVideoDialog,
  ExpertVideoPlayer,
  KebabMenu,
  TabPanel,
  VerifiedExpertLabel,
  VideoPlayerCloseButton,
  VideoPlayerBox,
  VideoPlayerHeader,
  ExpertBannerContainer,
  ExpertLeftSide,
  ExpertRightSide,
  HeaderContainerBody,
  ExpertAvatarContainer,
  PlayIconContainer,
  ExpertRateCostLabel,
  ExpertRateLabel,
  KebobMenuMobile,
  MobileMenuContainer,
  ExpertInformation,
  ReviewsAndRatesContainer,
  ExpertNavigationTabs,
  ExpertNavigationSection,
  FadedDivider,
  SocialMediaLinks,
  ExpertReviews,
  RatingCount,
  RatingContainer,
  RatingValue,
  DesktopRating,
} from 'pageComponents/ExpertProfile/styles'
import { AppShell } from 'components/AppShell'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ExpertPageProps } from 'interfaces/Expert'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { StarRating } from 'components/StarRating'
import { getExpertBannerImageUrl } from 'utils/url/getExpertBannerImageUrl'
import { getVideoUrl } from 'utils/url/getVideoUrl'
import { Video } from 'interfaces/Video'
import { CloseCircleIcon } from 'icons/Close'
import { KebabIcon } from 'icons/KebabIcon'
import { ExpertIntroVideoIcon } from 'icons/ExpertIntroVideo'
import { NavigationTabs } from 'components/NavigationTabs'
import { useExpertToggleFavorite } from 'hooks/api/expert/useExpertToggleFavorite'
import { BigStarIcon } from 'icons/Star/BigStar'
import { LinkTab } from 'components/LinkTab'
import { VerifiedExpertIcon } from 'icons/VerifiedExpert'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'
import { PageContainer } from 'components/PageContainer/styles'
import { useCurrentUser } from 'hooks/useCurrentUser'
import { isGuestUser } from 'utils/user/isGuestUser'

export const ExpertPage: NextPage<ExpertPageProps> = ({
  children,
  expert,
  updateExpert,
}) => {
  const { t } = useTranslation(LocaleNamespace.ExpertProfile)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const toggleFavorite = useExpertToggleFavorite(expert)
  const prefersDarkMode = usePrefersDarkMode()
  const user = useCurrentUser()
  const isGuest = isGuestUser(user)

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const closeOptionsMenu = () => {
    setAnchorEl(null)
  }

  const [isOpen, setIsOpen] = React.useState(false)
  const openIntroVideoDialog = () => {
    setIsOpen(true)
  }

  const closeIntroVideoDialog = () => {
    setIsOpen(false)
  }

  const handleFavorite = async () => {
    const updatedExpert = await toggleFavorite()
    if (!updatedExpert) {
      return
    }
    updateExpert(updatedExpert)
  }

  return (
    <AppShell
      drawer={
        <ConsumerDrawer
          open={drawerIsOpen}
          onClose={handleDrawerMenuClose}
          onToggleClick={handleDrawerMenuClick}
        />
      }
      mobileNavigation={
        <ConsumerMobileNavigation onDrawerMenuClick={handleDrawerMenuClick} />
      }
      onDrawerMenuClick={handleDrawerMenuClick}
    >
      <ExpertBannerContainer>
        <ExpertBanner src={getExpertBannerImageUrl(expert, prefersDarkMode)} />
        <MobileMenuContainer>
          {!!expert.socialMediaLinks && (
            <KebobMenuMobile onClick={handleClick}>
              <KebabIcon />
            </KebobMenuMobile>
          )}
        </MobileMenuContainer>
      </ExpertBannerContainer>
      <ExpertContainer>
        <HeaderContainerBody>
          <ExpertAvatarContainer>
            <ExpertLeftSide>
              <ExpertAvatarInfo>
                <ExpertAvatarBox>
                  <CustomExpertAvatar
                    width={272}
                    height={272}
                    expert={expert}
                  />
                  {!!expert.introVideo && (
                    <PlayIconContainer>
                      <ExpertAvatarPlayIcon onClick={openIntroVideoDialog}>
                        <ExpertIntroVideoIcon />
                      </ExpertAvatarPlayIcon>
                    </PlayIconContainer>
                  )}
                </ExpertAvatarBox>
              </ExpertAvatarInfo>
              <ExpertAvatarMain>
                {expert.verified && (
                  <ExpertAvatarIconBox>
                    <VerifiedExpertIcon />
                    <VerifiedExpertLabel>
                      {t('verifiedExpertLabel')}
                    </VerifiedExpertLabel>
                  </ExpertAvatarIconBox>
                )}
                <ExpertName>{`${expert.user.firstName} ${expert.user.lastName}`}</ExpertName>
                <ExpertExpertiseArea>
                  {expert.mainAreaOfExpertise}
                </ExpertExpertiseArea>
                <ExpertInformation>{expert.location}</ExpertInformation>
                {!!expert.averageRatings?.overall && (
                  <DesktopRating>
                    <StarRating
                      value={expert.averageRatings.overall.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                    <span>({expert.averageRatings.overall.count})</span>
                  </DesktopRating>
                )}
              </ExpertAvatarMain>
            </ExpertLeftSide>
            <ExpertRightSide>
              <ReviewsAndRatesContainer>
                <ExpertReviews>
                  <ExpertRateLabel>{t('expertReviewsTab')}</ExpertRateLabel>
                  <RatingContainer>
                    <BigStarIcon />
                    <RatingValue>
                      {expert.averageRatings?.overall?.rating.toFixed(2) ?? 0}
                    </RatingValue>
                    <RatingCount>
                      ({expert.averageRatings?.overall?.count ?? 0})
                    </RatingCount>
                  </RatingContainer>
                </ExpertReviews>
                <Divider
                  orientation="vertical"
                  variant="fullWidth"
                  flexItem
                  sx={{ borderRightWidth: 1.5 }}
                />
                {!!expert.hourlyRate && (
                  <ExpertRate>
                    <ExpertRateLabel>{t('expertRate')}</ExpertRateLabel>
                    <ExpertRateCostLabel>
                      {t('expertRatePerHour', {
                        rate: `$${expert.hourlyRate}`,
                      })}
                    </ExpertRateCostLabel>
                  </ExpertRate>
                )}
              </ReviewsAndRatesContainer>
              <ExpertFollowing>
                <ExpertFollowingBox>
                  <ExpertFollowingNumbers id="total-favorites-count">
                    {expert.totalFavorites}
                  </ExpertFollowingNumbers>
                  <ExpertFollowingLabel>
                    {t('expertFollowers')}
                  </ExpertFollowingLabel>
                </ExpertFollowingBox>
                <FavoriteButton
                  isFavorite={isGuest ? false : expert.isFavorite}
                  onClick={handleFavorite}
                >
                  {t('expertFavoriteButton')}
                </FavoriteButton>
                {!!expert.socialMediaLinks && (
                  <KebabMenu onClick={handleClick}>
                    <KebabIcon />
                  </KebabMenu>
                )}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={closeOptionsMenu}
                >
                  {!!expert.socialMediaLinks?.instagram && (
                    <SocialMediaLinks
                      href={expert.socialMediaLinks.instagram}
                      target="_blank"
                    >
                      <MenuItem sx={{ gap: 1 }} onClick={closeOptionsMenu}>
                        <InstagramIcon />
                      </MenuItem>
                    </SocialMediaLinks>
                  )}
                  {!!expert.socialMediaLinks?.twitter && (
                    <SocialMediaLinks
                      href={expert.socialMediaLinks.twitter}
                      target="_blank"
                    >
                      <MenuItem sx={{ gap: 1 }} onClick={closeOptionsMenu}>
                        <TwitterIcon />
                      </MenuItem>
                    </SocialMediaLinks>
                  )}
                  {!!expert.socialMediaLinks?.youTube && (
                    <SocialMediaLinks
                      href={expert.socialMediaLinks.youTube}
                      target="_blank"
                    >
                      <MenuItem sx={{ gap: 1 }} onClick={closeOptionsMenu}>
                        <YouTubeIcon />
                      </MenuItem>
                    </SocialMediaLinks>
                  )}
                  {!!expert.socialMediaLinks?.facebook && (
                    <SocialMediaLinks
                      href={expert.socialMediaLinks.facebook}
                      target="_blank"
                    >
                      <MenuItem sx={{ gap: 1 }} onClick={closeOptionsMenu}>
                        <FacebookIcon />
                      </MenuItem>
                    </SocialMediaLinks>
                  )}
                  {!!expert.socialMediaLinks?.linkedIn && (
                    <SocialMediaLinks
                      href={expert.socialMediaLinks.linkedIn}
                      target="_blank"
                    >
                      <MenuItem sx={{ gap: 1 }} onClick={closeOptionsMenu}>
                        <LinkedInIcon />
                      </MenuItem>
                    </SocialMediaLinks>
                  )}
                </Menu>
              </ExpertFollowing>
            </ExpertRightSide>
          </ExpertAvatarContainer>
          <ExpertNavigationSection>
            <ExpertNavigationTabs>
              <FadedDivider />
              <NavigationTabs>
                <LinkTab
                  id={`expert-about-tab-${expert.id}`}
                  href={`/experts/${expert.id}`}
                  label={t('expertAboutTab')}
                />
                <LinkTab
                  id={`expert-reviews-tab-${expert.id}`}
                  href={`/experts/${expert.id}/reviews`}
                  label={t('expertReviewsTab')}
                  data-testid="reviews-page"
                />
              </NavigationTabs>
              <FadedDivider />
            </ExpertNavigationTabs>
          </ExpertNavigationSection>
          <TabPanel role="tabpanel">
            <PageContainer>{children}</PageContainer>
          </TabPanel>
        </HeaderContainerBody>
      </ExpertContainer>

      {!!expert.introVideo && (
        <ExpertVideoDialog open={isOpen} onClose={closeIntroVideoDialog}>
          <VideoPlayerHeader>
            <VideoPlayerCloseButton onClick={closeIntroVideoDialog}>
              <CloseCircleIcon />
            </VideoPlayerCloseButton>
          </VideoPlayerHeader>
          <VideoPlayerBox>
            <ExpertVideoPlayer
              src={getVideoUrl(expert.introVideo as Video)}
              preload="auto"
              autoPlay
              controls
              controlsList="nodownload"
            />
          </VideoPlayerBox>
        </ExpertVideoDialog>
      )}
    </AppShell>
  )
}
