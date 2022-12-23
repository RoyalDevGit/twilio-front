import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import {
  BodyGrid,
  ChildrenContainer,
  DrawerFilterButton,
  FavoritesBody,
  FavoritesContainer,
  FavoritesTitle,
  FavoritesTitleBox,
  MobileFilterButton,
} from 'pageComponents/Favorites/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { ConsumerDrawer } from 'components/AppDrawer/Consumer'
import { AppShell } from 'components/AppShell'
import { ConsumerMobileNavigation } from 'components/MobileNavigation/Consumer'
import { PageContainer } from 'components/PageContainer/styles'
import { DrawerFilter } from 'components/Filters/DrawerFilter'
import { BottomSheetFilter } from 'components/Filters/BottomSheetFilter'
import { FilterButtonIcon } from 'icons/FilterButton'

export interface FavoritesPageProps {
  children?: React.ReactNode
}

export const FavoritesPage: NextPage<FavoritesPageProps> = ({ children }) => {
  const { t } = useTranslation(LocaleNamespace.FavoritesPage)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [openMobileFilter, setOpenMobileFilter] = useState(false)
  const [openDrawerFilter, setOpenDrawerFilter] = useState(false)

  const handleDrawerFilter = () => {
    setOpenDrawerFilter(true)
  }

  const onDrawerFilterDismiss = () => {
    setOpenDrawerFilter(false)
  }

  const handleMobileFilter = () => {
    setOpenMobileFilter(true)
  }

  const onMobileFilterDismiss = () => {
    setOpenMobileFilter(false)
  }

  const handleDrawerMenuClick = (): void => {
    setDrawerIsOpen(!drawerIsOpen)
  }

  const handleDrawerMenuClose = (): void => {
    setDrawerIsOpen(false)
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
      onOpenFilter={handleMobileFilter}
      showFilter
    >
      <PageContainer>
        <BodyGrid>
          <ChildrenContainer>
            <FavoritesContainer>
              <FavoritesTitleBox>
                <FavoritesTitle>{t('favoritesPageTitle')}</FavoritesTitle>

                <MobileFilterButton
                  variant="contained"
                  color="primary"
                  onClick={handleMobileFilter}
                  startIcon={<FilterButtonIcon />}
                >
                  {t('filterLabel')}
                </MobileFilterButton>
                <DrawerFilterButton
                  variant="contained"
                  color="primary"
                  onClick={handleDrawerFilter}
                  startIcon={<FilterButtonIcon />}
                >
                  {t('filterLabel')}
                </DrawerFilterButton>
              </FavoritesTitleBox>
              <FavoritesBody data-testid="favorites-list">
                {children}
              </FavoritesBody>
            </FavoritesContainer>
          </ChildrenContainer>
        </BodyGrid>
      </PageContainer>
      <BottomSheetFilter
        open={openMobileFilter}
        onOpen={handleMobileFilter}
        onClose={onMobileFilterDismiss}
      />
      {openDrawerFilter && (
        <DrawerFilter open={openDrawerFilter} onClose={onDrawerFilterDismiss} />
      )}
    </AppShell>
  )
}
