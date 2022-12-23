import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  FilterBySheetHeader,
  CancelButton,
  MobileFilterTitle,
} from 'components/Filters/BottomSheetFilter/styles'
import { BottomSheet } from 'components/BottomSheet'
import { FilterControl } from 'components/Filters'
import { useFilters } from 'hooks/useFilters'
import { DrawerFilterFooter } from 'components/Filters/styles'
import { Button } from 'components/Button'

export type BottomSheetFilterProps = SwipeableDrawerProps

export const BottomSheetFilter: FC<BottomSheetFilterProps> = ({
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onClose({})
  }

  const applyFilters = () => {
    apply()
    handleClose()
  }

  const handleReset = () => {
    reset()
    handleClose()
  }

  return (
    <BottomSheet
      {...props}
      onClose={onClose}
      onOpen={() => open}
      header={
        <FilterBySheetHeader>
          <span style={{ display: 'block', width: '60px' }} />
          <MobileFilterTitle>{t('mobileFilterLabel')}</MobileFilterTitle>
          <CancelButton onClick={handleClose}>{t('cancelButton')}</CancelButton>
        </FilterBySheetHeader>
      }
      footer={
        <DrawerFilterFooter>
          <Button variant="contained" color="primary" onClick={applyFilters}>
            {t('applyFilters')}
          </Button>
          <Button onClick={handleReset}>{t('resetButton')}</Button>
        </DrawerFilterFooter>
      }
    >
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
    </BottomSheet>
  )
}
