import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@emotion/react'
import Typewriter from 'typewriter-effect'
import { DateTime } from 'luxon'

import { Image } from 'components/Image'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { AppShell } from 'components/AppShell'
import {
  ConsumerHomePageContainer,
  SectionTitle,
  ExpertCardsSection,
  UpcomingSessionsCardsSection,
  HomepageBox,
  // CategoryContainer,
  // CategoryCardsSection,
  // RecommendedCategoriesSection,
  // CategoryCardsGrid,
  HomePageGradientContainer,
  HomePageWelcomeLabel,
  CustomAutocomplete,
  HomePageHeaderBox,
  HeaderButton,
  TitleBox,
  HomePageToolbar,
  IconBox,
  HomePageBlurCustomIcon,
  UpcomingSessionsSection,
  GuestUserHomePageContainer,
  TextBubble,
  GuestUserHomePageToolbar,
  FeaturedExpertButton,
  PhoneImageSection,
  HeroImageSection,
  PhoneBubbleSection,
  FooterSection,
  StyledPageContainer,
  BubbleTextInitial,
} from 'pageComponents/Home/styles'
// import { ExpertCardSmall } from 'components/ExpertCardSmall'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { UpcomingAppointmentCard } from 'components/UpcomingAppointmentCard'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { ConsumerWizard } from 'components/ConsumerWizard'
import { HorizontalScrollableContainer } from 'components/HorizontalScrollableContainer'
import { Expert } from 'interfaces/Expert'
import { useExpertLoad } from 'hooks/api/expert/useExpertLoad'
import { Session, SessionStatus } from 'interfaces/Session'
import { Category } from 'interfaces/Category'
import { Link } from 'components/Link'
// import { CategoryCard } from 'components/CategoryCard'
import { LogoHorizontalStackedIcon, LogoVerticalTextIcon } from 'icons/Logo'
import {
  DrawerButton,
  ActionsSection,
  UserMenuSection,
} from 'components/Header/styles'
import { MessageTray } from 'components/Messaging/MessageTray'
import { HeaderUserMenu } from 'components/UserMenu'
import { HamburgerMenuIcon } from 'icons/HamburgerMenu'
import { NotificationTray } from 'components/NotificationTray'
import { LoginOrSignup } from 'components/LoginOrSignup'
import { useCurrentUser } from 'hooks/useCurrentUser'
import { isGuestUser } from 'utils/user/isGuestUser'
import { GuestHomePageHero } from 'components/GuestHomePageHero'
import { HomePageSeeWhatIsPossible } from 'components/HomePageSeeWhatIsPossible'
// import { Filter } from 'interfaces/Filter'
import { FeaturedExpertCard } from 'components/FeaturedExpertCard'
import { HomePageFAQ } from 'components/HomePageFAQ'
import { GuestHomePageFooter } from 'components/GuestHomePageFooter'
import { SessionApi } from 'apis/SessionApi'
import { Config } from 'utils/config'
import {
  CategoryCardsGrid,
  CategoryCardsSection,
  CategoryContainer,
  ExplorePageTitles,
  RecommendedCategoriesSection,
} from 'pageComponents/Explore/styles'
import { CategoryCard } from 'components/CategoryCard'
import { Filter } from 'interfaces/Filter'

export interface ConsumerHomePageProps {
  initialRecommendedExperts: Expert[]
  initialFeaturedExperts: Expert[]
  upcomingSessions: Session[]
  recentSessions: Session[]
  recommendedCategories: Category[]
}

const UPCOMING_SESSION_DURATION = Config.getDuration(
  'UPCOMING_SESSION_DURATION'
)

export const ConsumerHomePage: NextPage<ConsumerHomePageProps> = ({
  // initialRecommendedExperts,
  initialFeaturedExperts,
  // upcomingSessions,
  // recentSessions,
  recommendedCategories,
}) => {
  const { t } = useTranslation([
    LocaleNamespace.HomePage,
    LocaleNamespace.SignupPage,
    LocaleNamespace.LoginPage,
    LocaleNamespace.ExpertCard,
    LocaleNamespace.CategoryCard,
    LocaleNamespace.UpcomingAppointmentCard,
    LocaleNamespace.FilterBy,
    LocaleNamespace.FeaturedExpertCard,
    LocaleNamespace.Common,
    LocaleNamespace.GuestHomePageHero,
    LocaleNamespace.GuestHomePageFooter,
    LocaleNamespace.LoginOrSignUp,
  ])
  const user = useCurrentUser()
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [upcomingSessions, setUpcommingSessions] = useState<Session[]>([])

  const { experts: featuredExperts, loadMoreExperts } = useExpertLoad({
    initialExperts: initialFeaturedExperts,
    initialPageValue: 1,
  })

  const [, setAnchorEl] = useState<null | HTMLElement>(null)

  const loadSessions = async () => {
    const upcomingSessionsResult = await SessionApi.query({
      page: 1,
      limit: 10,
      status: [SessionStatus.NotStarted],
      from: DateTime.now(),
      to: DateTime.now().plus({
        milliseconds: UPCOMING_SESSION_DURATION.as('milliseconds'),
        days: 2,
      }),
      sort: 'session.startDate.date',
      sortDirection: 'asc',
    })
    if (!upcomingSessionsResult.ok()) {
      return
    }
    const upcomingSessionsData = await upcomingSessionsResult.getData()
    setUpcommingSessions(upcomingSessionsData.items)
  }

  useEffect(() => {
    if (user) {
      loadSessions()
    }
  }, [])

  const closeNotificationsMenu = () => {
    setAnchorEl(null)
    setMenuIsOpen(false)
  }

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
  }

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  // const recentExperts: Expert[] = []

  // recentSessions.filter((session) => {
  //   const sessionExpert = session.expert as Expert
  //   const foundExpert = recentExperts.find((e) => e.id === sessionExpert.id)
  //   if (foundExpert) {
  //     return
  //   }
  // })

  // const renderRecentlyConnectedCards = () =>
  //   recentExperts.map((r) => (
  //     <ExpertCardBig
  //       expert={r}
  //       key={r.id}
  //       id={`home-expert-card-big-${r.id}`}
  //     />
  //   ))

  // const renderRecommendedCards = () =>
  //   initialRecommendedExperts.map((r) => (
  //     <ExpertCardSmall
  //       expert={r}
  //       key={r.id}
  //       id={`home-expert-card-small-${r.id}`}
  //     />
  //   ))

  const renderExperts = () =>
    featuredExperts.map((f) => (
      <FeaturedExpertCard initialExpert={f} key={f.id} />
    ))

  const renderUpcomingSessionsCards = () =>
    upcomingSessions.map((upcomingSession) => (
      <UpcomingAppointmentCard
        key={upcomingSession.id}
        session={upcomingSession}
      />
    ))

  const renderUserSection = () => {
    if (!user || user.isGuest) {
      return <LoginOrSignup />
    }
    return (
      <IconBox>
        <ActionsSection>
          <NotificationTray
            isHomePage={true}
            open={menuIsOpen}
            onClose={closeNotificationsMenu}
          />
          <MessageTray />
        </ActionsSection>
        <UserMenuSection>{user && <HeaderUserMenu />}</UserMenuSection>
      </IconBox>
    )
  }

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const isGuest = isGuestUser(user)

  const bubbleText = [
    t('bubbleText1'),
    t('bubbleText2'),
    t('bubbleText3'),
    t('bubbleText4'),
    t('bubbleText5'),
    t('bubbleText6'),
    t('bubbleText7'),
    t('bubbleText8'),
    t('bubbleText9'),
    t('bubbleText10'),
    t('bubbleText11'),
    t('bubbleText12'),
  ]

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
      showHeader={false}
    >
      <StyledPageContainer>
        {!isGuest && (
          <HomePageGradientContainer>
            <HomePageToolbar>
              <DrawerButton
                edge="start"
                color="inherit"
                onClick={handleDrawerMenuClick}
              >
                <HamburgerMenuIcon />
              </DrawerButton>
              {renderUserSection()}
            </HomePageToolbar>
            <HomePageBlurCustomIcon />
            <TitleBox>
              {isMobile ? (
                <LogoVerticalTextIcon />
              ) : (
                <LogoHorizontalStackedIcon />
              )}
            </TitleBox>
            <HomePageHeaderBox>
              <HomePageWelcomeLabel>
                {t('homePageWelcomeLabel')}
              </HomePageWelcomeLabel>
              <CustomAutocomplete />
              <Link href="/explore">
                <HeaderButton variant="text" color="primary">
                  {t('homePageButtonLabel')}
                </HeaderButton>
              </Link>
            </HomePageHeaderBox>
          </HomePageGradientContainer>
        )}
        {isGuest && (
          <GuestUserHomePageContainer>
            <GuestUserHomePageToolbar>
              <DrawerButton
                edge="start"
                color="inherit"
                onClick={handleDrawerMenuClick}
              >
                <HamburgerMenuIcon />
              </DrawerButton>
              {renderUserSection()}
            </GuestUserHomePageToolbar>
            <TitleBox>{isMobile && <LogoHorizontalStackedIcon />}</TitleBox>
            <GuestHomePageHero />
            <HeroImageSection>
              <PhoneBubbleSection>
                <PhoneImageSection>
                  <Image
                    src="/static/img/home-page/phone-image.png"
                    width={280}
                    height={340}
                    unoptimized={false}
                    alt=""
                  />
                </PhoneImageSection>
                <TextBubble>
                  <BubbleTextInitial>
                    {t('bubbleTextInitial')}
                  </BubbleTextInitial>
                  <Typewriter
                    options={{
                      strings: bubbleText,
                      autoStart: true,
                      loop: true,
                      delay: 75,
                      deleteSpeed: 20,
                    }}
                  />
                </TextBubble>
              </PhoneBubbleSection>
            </HeroImageSection>
          </GuestUserHomePageContainer>
        )}
        <ConsumerHomePageContainer>
          <UpcomingSessionsSection>
            {upcomingSessions?.length > 0 && (
              <>
                <SectionTitle>{t('upcomingSessionsLabel')}</SectionTitle>
                <UpcomingSessionsCardsSection>
                  <HorizontalScrollableContainer>
                    {renderUpcomingSessionsCards()}
                  </HorizontalScrollableContainer>
                </UpcomingSessionsCardsSection>
              </>
            )}
          </UpcomingSessionsSection>
          {!isGuest && <ConsumerWizard />}
          {isGuest && !isMobile && <HomePageSeeWhatIsPossible />}
          {/* {!!recommendedCategories.length && (
            <CategoryContainer>
              <SectionTitle>{t('categoryLabel')}</SectionTitle>
              <CategoryCardsSection>
                <HorizontalScrollableContainer>
                  {!isMobile && (
                    <RecommendedCategoriesSection>
                      <CategoryCardsGrid>
                        {recommendedCategories
                          .slice(0, Math.ceil(recommendedCategories.length / 2))
                          .map((category) => (
                            <Link
                              key={category.id}
                              href={`/explore?${encodeURIComponent(
                                Filter.Category
                              )}=${encodeURIComponent(category.code)}`}
                            >
                              <CategoryCard category={category} />
                            </Link>
                          ))}
                      </CategoryCardsGrid>
                      <CategoryCardsGrid>
                        {recommendedCategories
                          .slice(Math.ceil(recommendedCategories.length / 2))
                          .map((category) => (
                            <Link
                              key={category.id}
                              href={`/explore?${encodeURIComponent(
                                Filter.Category
                              )}=${encodeURIComponent(category.code)}`}
                            >
                              <CategoryCard category={category} />
                            </Link>
                          ))}
                      </CategoryCardsGrid>
                    </RecommendedCategoriesSection>
                  )}

                  {isMobile && (
                    <CategoryCardsGrid>
                      {recommendedCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/search?query=${encodeURIComponent(
                            category.title
                          )}`}
                        >
                          <CategoryCard category={category} />
                        </Link>
                      ))}
                    </CategoryCardsGrid>
                  )}
                </HorizontalScrollableContainer>
              </CategoryCardsSection>
            </CategoryContainer>
          )} */}
          {/* <HomepageBox>
            {recentExperts.length > 0 && (
              <>
                <SectionTitle>{t('recentSessionsLabel')}</SectionTitle>
                <ExpertCardsSection>
                  <HorizontalScrollableContainer>
                    {renderRecentlyConnectedCards()}
                  </HorizontalScrollableContainer>
                </ExpertCardsSection>
              </>
            )}
          </HomepageBox> */}
          {/* {!isGuest && (
            <HomepageBox>
              <>
                <SectionTitle>{t('recommendedLabel')}</SectionTitle>
                <ExpertCardsSection>
                  <HorizontalScrollableContainer
                    onIntersectionRight={loadMoreExperts}
                  >
                    {renderRecommendedCards()}
                  </HorizontalScrollableContainer>
                </ExpertCardsSection>
              </>
            </HomepageBox>
          )} */}
          <HomepageBox>
            {!!recommendedCategories.length && (
              <CategoryContainer>
                <ExplorePageTitles>{t('categoryLabel')}</ExplorePageTitles>
                <CategoryCardsSection>
                  <HorizontalScrollableContainer>
                    {!isMobile && (
                      <RecommendedCategoriesSection>
                        <CategoryCardsGrid>
                          {recommendedCategories
                            .slice(
                              0,
                              Math.ceil(recommendedCategories.length / 2)
                            )
                            .map((category) => (
                              <Link
                                key={category.id}
                                href={`/explore?${encodeURIComponent(
                                  Filter.Category
                                )}=${encodeURIComponent(category.code)}`}
                              >
                                <CategoryCard category={category} />
                              </Link>
                            ))}
                        </CategoryCardsGrid>
                        <CategoryCardsGrid>
                          {recommendedCategories
                            .slice(Math.ceil(recommendedCategories.length / 2))
                            .map((category) => (
                              <Link
                                key={category.id}
                                href={`/explore?${encodeURIComponent(
                                  Filter.Category
                                )}=${encodeURIComponent(category.code)}`}
                              >
                                <CategoryCard category={category} />
                              </Link>
                            ))}
                        </CategoryCardsGrid>
                      </RecommendedCategoriesSection>
                    )}

                    {isMobile && (
                      <CategoryCardsGrid>
                        {recommendedCategories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/explore?${encodeURIComponent(
                              Filter.Category
                            )}=${encodeURIComponent(category.code)}`}
                          >
                            <CategoryCard
                              key={category.id}
                              category={category}
                            />
                          </Link>
                        ))}
                      </CategoryCardsGrid>
                    )}
                  </HorizontalScrollableContainer>
                </CategoryCardsSection>
              </CategoryContainer>
            )}
          </HomepageBox>
          <HomepageBox>
            <>
              <SectionTitle>{t('featuredExpertsLabel')}</SectionTitle>
              <ExpertCardsSection>
                <HorizontalScrollableContainer
                  onIntersectionRight={loadMoreExperts}
                >
                  {renderExperts()}
                </HorizontalScrollableContainer>
              </ExpertCardsSection>
              <FeaturedExpertButton variant="contained" color="primary">
                {t('homePageFeaturedExpertsButton')}
              </FeaturedExpertButton>
            </>
          </HomepageBox>
          {isGuest && isMobile && <HomePageSeeWhatIsPossible />}
          {isGuest && <HomePageFAQ />}
        </ConsumerHomePageContainer>
        {isGuest && (
          <FooterSection>
            <GuestHomePageFooter />
          </FooterSection>
        )}
      </StyledPageContainer>
    </AppShell>
  )
}
