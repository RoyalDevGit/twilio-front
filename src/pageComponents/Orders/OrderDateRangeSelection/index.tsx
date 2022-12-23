import { FC } from 'react'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import { DateTime } from 'luxon'
import TextField from '@mui/material/TextField'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { FormError } from 'components/Form/Error'
import { DateSelectionContainer } from 'pageComponents/Orders/OrderDateRangeSelection/styles'
import {
  DatesSelectionSection,
  DateSelection,
} from 'pageComponents/Orders/OrderDetail/styles'
import { CalendarOrderHistoryIcon } from 'icons/Calendar/OrderHistory'

export type DateRangeOptionOnChange = (
  from: DateTime | null,
  to: DateTime | null
) => unknown

export interface OrderDateRangeSelectionProps {
  from: DateTime | null
  to: DateTime | null
  onChange: DateRangeOptionOnChange
  error?: string
}

export const OrderDateRangeSelection: FC<OrderDateRangeSelectionProps> = ({
  from,
  to,
  onChange,
  error,
}) => {
  const { t } = useTranslation([
    LocaleNamespace.OrdersPage,
    LocaleNamespace.OrderCard,
    LocaleNamespace.Common,
  ])

  const handleStartTimeChange = (newFrom: DateTime | null) => {
    if (!newFrom) {
      return
    }

    if (onChange) {
      onChange(newFrom, to)
    }
  }

  const handleEndTimeChange = (newTo: DateTime | null) => {
    if (!newTo) {
      return
    }

    if (onChange) {
      onChange(from, newTo)
    }
  }

  return (
    <DateSelectionContainer>
      <DatesSelectionSection>
        <DateSelection
          value={from?.toJSDate()}
          onChange={(value) => handleStartTimeChange(value as DateTime | null)}
          renderInput={(params) => <TextField size="small" {...params} />}
          components={{
            OpenPickerIcon: CalendarOrderHistoryIcon,
          }}
        />
        <Typography variant="body1">{t('dateTo')}</Typography>
        <DateSelection
          value={to?.toJSDate()}
          onChange={(value) => handleEndTimeChange(value as DateTime | null)}
          renderInput={(params) => <TextField size="small" {...params} />}
          components={{
            OpenPickerIcon: CalendarOrderHistoryIcon,
          }}
        />
      </DatesSelectionSection>
      {!!error && <FormError>{error}</FormError>}
    </DateSelectionContainer>
  )
}
