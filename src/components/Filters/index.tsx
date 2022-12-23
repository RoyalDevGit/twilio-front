import { ChangeEvent, FC, SyntheticEvent } from 'react'
import { useTranslation } from 'next-i18next'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionSummary,
  CustomFormControlLabel,
  FilterByAccordionTitle,
  FilterAccordionContainer,
} from 'components/Filters/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { Switch } from 'components/Switch'
import { Checkbox } from 'components/Checkbox'
import { Category } from 'interfaces/Category'
import { Language } from 'interfaces/Language'

type OnSwitchChange = (
  event: ChangeEvent<HTMLInputElement>,
  checked: boolean
) => void

type SelectedOptions = Record<string, boolean>

type OnCheckboxChange = (
  event: SyntheticEvent<Element, Event>,
  checked: boolean
) => void

export interface FilterControlProps {
  categories?: Category[]
  languages?: Language[]
  onVerifiedChange?: OnSwitchChange
  onOnlineChange?: OnSwitchChange
  verified: boolean
  onlineNow: boolean
  selectedCategories: SelectedOptions
  selectedLanguages: SelectedOptions
  selectedRates: SelectedOptions
  selectedRatings: SelectedOptions
  onCategoryChange: OnCheckboxChange
  onLanguageChange: OnCheckboxChange
  onRateChange: OnCheckboxChange
  onRatingChange: OnCheckboxChange
}

export const FilterControl: FC<FilterControlProps> = ({
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
}) => {
  const { t } = useTranslation(LocaleNamespace.FilterBy)

  const hourlyPriceOptions = [
    { label: '$0 - $50', value: '0-50' },
    { label: '$50 - $75', value: '50-75' },
    { label: '$75 - $100', value: '75-100' },
    { label: '$100 - $300', value: '100-300' },
    { label: '$300+', value: '300-' },
  ]

  const ratingOptions = [
    { label: t('mobileFilterOnlyLabel', { number: 5 }), value: '5' },
    { label: t('mobileFilterAndUpLabel', { number: 4 }), value: '4-' },
    { label: t('mobileFilterAndUpLabel', { number: 3 }), value: '3-' },
    { label: t('mobileFilterAndUpLabel', { number: 2 }), value: '2-' },
    { label: t('mobileFilterAndUpLabel', { number: 1 }), value: '1-' },
  ]

  return (
    <FilterAccordionContainer>
      <CustomAccordion disableGutters elevation={0} square>
        <CustomAccordionSummary>
          <FilterByAccordionTitle>
            {t('mobileFilterVerifiedLabel')}
          </FilterByAccordionTitle>
          <Switch checked={verified} onChange={onVerifiedChange} />
        </CustomAccordionSummary>
      </CustomAccordion>
      <CustomAccordion disableGutters elevation={0} square>
        <CustomAccordionSummary>
          <FilterByAccordionTitle>
            {t('mobileFilterOnlineNowLabel')}
          </FilterByAccordionTitle>
          <Switch checked={onlineNow} onChange={onOnlineChange} />
        </CustomAccordionSummary>
      </CustomAccordion>
      {!!categories?.length && (
        <CustomAccordion disableGutters elevation={0} square>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <FilterByAccordionTitle>
              {t('mobileFilterExpertiseLabel')}
            </FilterByAccordionTitle>
          </AccordionSummary>
          <CustomAccordionDetails>
            {categories.map((option) => (
              <CustomFormControlLabel
                key={option.id}
                control={<Checkbox />}
                label={option.title}
                value={option.code}
                checked={!!selectedCategories[option.code]}
                labelPlacement="end"
                onChange={onCategoryChange}
              />
            ))}
          </CustomAccordionDetails>
        </CustomAccordion>
      )}
      {!!languages?.length && (
        <CustomAccordion disableGutters elevation={0} square>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <FilterByAccordionTitle>
              {t('mobileFilterLanguageLabel')}
            </FilterByAccordionTitle>
          </AccordionSummary>
          <CustomAccordionDetails>
            {languages.map((option) => (
              <CustomFormControlLabel
                key={option.id}
                control={<Checkbox />}
                label={option.name}
                value={option.code}
                checked={!!selectedLanguages[option.code]}
                labelPlacement="end"
                onChange={onLanguageChange}
              />
            ))}
          </CustomAccordionDetails>
        </CustomAccordion>
      )}
      <CustomAccordion disableGutters elevation={0} square>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FilterByAccordionTitle>
            {t('mobileFilterHourlyPriceLabel')}
          </FilterByAccordionTitle>
        </AccordionSummary>
        <CustomAccordionDetails>
          {hourlyPriceOptions.map((option) => (
            <CustomFormControlLabel
              key={option.value}
              control={<Checkbox />}
              label={option.label}
              value={option.value}
              checked={!!selectedRates[option.value]}
              labelPlacement="end"
              onChange={onRateChange}
            />
          ))}
        </CustomAccordionDetails>
      </CustomAccordion>
      <CustomAccordion disableGutters elevation={0} square>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FilterByAccordionTitle>
            {t('mobileFilterRatingLabel')}
          </FilterByAccordionTitle>
        </AccordionSummary>
        <CustomAccordionDetails>
          {ratingOptions.map((option) => (
            <CustomFormControlLabel
              key={option.value}
              control={<Checkbox />}
              label={option.label}
              value={option.value}
              checked={!!selectedRatings[option.value]}
              labelPlacement="end"
              onChange={onRatingChange}
            />
          ))}
        </CustomAccordionDetails>
      </CustomAccordion>
    </FilterAccordionContainer>
  )
}
