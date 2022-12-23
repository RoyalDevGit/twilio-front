import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { DrawerProps } from '@mui/material/Drawer'

import {
  CancelButton,
  DrawerFilterHeader,
  FilterByDrawer,
} from 'components/Filters/DrawerFilter/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { FilterControl } from 'components/Filters'
import { useFilters } from 'hooks/useFilters'
import { DrawerFilterFooter } from 'components/Filters/styles'
import { Button } from 'components/Button'

export type DrawerFilterProps = DrawerProps

export const DrawerFilter: FC<DrawerFilterProps> = ({
  open,
  onClose,
  ...props
}) => {
  const { t } = useTranslation(LocaleNamespace.FilterBy)
  const {
    categories,
    languages,
    onVerifiedChange,
    onOnlineChange,
    verified,
    onlineNow,
    selectedCategories,
    selectedLanguages,
    selectedRates,
    selectedRatings,
    onCategoryChange,
    onLanguageChange,
    onRateChange,
    onRatingChange,
    apply,
    reset,
  } = useFilters()

  const handleClose = () => {
    if (!onClose) {
      return
    }
    onClose({}, 'backdropClick')
  }

  const applyFilters = () => {
    apply()
    handleClose()
  }

  const handleReset = () => {
    reset()
    handleClose()
  }

  const drawerWidth = 400

  return (
    <FilterByDrawer
      variant="temporary"
      {...props}
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <DrawerFilterHeader>
        <CancelButton onClick={handleClose}>{t('cancelButton')}</CancelButton>
      </DrawerFilterHeader>
      <FilterControl
        categories={categories}
        languages={languages}
        onVerifiedChange={onVerifiedChange}
        onOnlineChange={onOnlineChange}
        verified={verified}
        onlineNow={onlineNow}
        selectedCategories={selectedCategories}
        selectedLanguages={selectedLanguages}
        selectedRates={selectedRates}
        selectedRatings={selectedRatings}
        onCategoryChange={onCategoryChange}
        onLanguageChange={onLanguageChange}
        onRateChange={onRateChange}
        onRatingChange={onRatingChange}
      />
      <DrawerFilterFooter>
        <Button variant="contained" color="primary" onClick={applyFilters}>
          {t('applyFilters')}
        </Button>
        <Button onClick={handleReset}>{t('resetButton')}</Button>
      </DrawerFilterFooter>
    </FilterByDrawer>
  )
}
