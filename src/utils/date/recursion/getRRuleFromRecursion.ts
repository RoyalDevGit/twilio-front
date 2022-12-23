import {
  RRule,
  Frequency as RRuleFrequency,
  Weekday as RRuleWeekday,
} from 'rrule'
import { DateTime } from 'luxon'

import { EventFrequency, EventRecursion, Weekday } from 'interfaces/Event'

export const getRRuleFrequency = (
  eventFrequency: EventFrequency
): RRuleFrequency => {
  switch (eventFrequency) {
    case EventFrequency.Yearly:
      return RRuleFrequency.YEARLY
    case EventFrequency.Monthly:
      return RRuleFrequency.MONTHLY
    case EventFrequency.Weekly:
      return RRuleFrequency.WEEKLY
    case EventFrequency.Daily:
      return RRuleFrequency.DAILY
    case EventFrequency.Hourly:
      return RRuleFrequency.HOURLY
    case EventFrequency.Minutely:
      return RRuleFrequency.MINUTELY
    case EventFrequency.Secondly:
      return RRuleFrequency.SECONDLY
  }
}

export const getRRuleWeekday = (eventWeekday: Weekday): RRuleWeekday => {
  switch (eventWeekday) {
    case Weekday.Sunday:
      return RRule.SU
    case Weekday.Monday:
      return RRule.MO
    case Weekday.Tuesday:
      return RRule.TU
    case Weekday.Wednesday:
      return RRule.WE
    case Weekday.Thursday:
      return RRule.TH
    case Weekday.Friday:
      return RRule.FR
    case Weekday.Saturday:
      return RRule.SA
  }
}

export const getRRuleWeekdays = (
  eventWeekdays: Weekday[] | undefined
): RRuleWeekday[] | null => {
  if (!eventWeekdays?.length) {
    return null
  }
  return eventWeekdays.map(getRRuleWeekday)
}

export const getRRuleFromRecursion = (recursion: EventRecursion) => {
  const { interval, endDate, maxOccurrences, position, monthDay } = recursion
  return new RRule({
    freq: getRRuleFrequency(recursion.frequency),
    interval,
    until: endDate ? DateTime.fromISO(endDate).toJSDate() : undefined,
    count: maxOccurrences,
    byweekday: getRRuleWeekdays(recursion.weekdays),
    bysetpos: position,
    bymonthday: monthDay,
  })
}

export const getRecursionText = (recursion: EventRecursion) => {
  const rrule = getRRuleFromRecursion(recursion)
  return rrule.toText()
}
