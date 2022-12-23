import { FC, useState } from 'react'
import Rating, { RatingProps } from '@mui/material/Rating'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  LabelSection,
  RatingBox,
  RatingLabel,
  RatingLabelPosition,
  RatingSection,
} from 'components/StarRating/styles'

export type StarRatingChangeHandler = (hoverProps: {
  value: number | null
  label: string
}) => unknown
export interface StarRatingProps extends Omit<RatingProps, 'onChange'> {
  labelPosition?: RatingLabelPosition
  showLabel?: boolean
  onChange?: StarRatingChangeHandler
}

export const StarRating: FC<StarRatingProps> = ({
  labelPosition = 'right',
  showLabel = false,
  onChange,
  value,
  ...otherProps
}) => {
  const { t } = useTranslation(LocaleNamespace.StarRating)
  const [hover, setHover] = useState(-1)
  const labels: { [index: string]: string } = {
    1: t('ratingLabel-1'),
    2: t('ratingLabel-2'),
    3: t('ratingLabel-3'),
    4: t('ratingLabel-4'),
    5: t('ratingLabel-5'),
  }

  const handleHover = (_event: React.SyntheticEvent, value: number) => {
    setHover(value)
  }

  const handleChange = (_event: React.SyntheticEvent, value: number | null) => {
    if (onChange) {
      let label = ''
      if (value && value !== -1) {
        label = labels[value]
      }
      onChange({ value, label })
    }
  }

  let label = ''
  if (hover && hover !== -1) {
    label = labels[hover]
  } else if (value) {
    label = labels[value]
  }

  return (
    <RatingBox labelPosition={labelPosition} showLabel={showLabel}>
      <RatingSection>
        <Rating
          {...otherProps}
          value={value}
          onChange={handleChange}
          onChangeActive={handleHover}
        />
      </RatingSection>
      {showLabel && (
        <LabelSection>
          <RatingLabel>{label}</RatingLabel>
        </LabelSection>
      )}
    </RatingBox>
  )
}
