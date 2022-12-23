import { DateTime } from 'luxon'

export const getWeekStart = (date: DateTime): DateTime => {
  if (date.weekday === 1) {
    return date.startOf('day')
  }
  let previousMonday: DateTime | null = null
  let currentDate = date
  while (!previousMonday) {
    currentDate = currentDate.minus({ day: 1 })
    if (currentDate.weekday === 1) {
      previousMonday = currentDate
    }
  }
  return previousMonday.startOf('day')
}
