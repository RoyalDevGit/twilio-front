import { DateTime } from 'luxon'

export const parseAsAllDayStartDate = (dateString: string) => {
  const date = DateTime.fromISO(dateString, {
    zone: 'utc',
  })

  return date.startOf('day')
}

export const parseAsAllDayEndDate = (dateString: string) =>
  parseAsAllDayStartDate(dateString).endOf('day')
