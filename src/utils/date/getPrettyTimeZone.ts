import { TimeZone } from 'interfaces/TimeZone'

export const getPrettyTimeZone = (tz: TimeZone) => {
  const simpleFormat = tz.rawFormat.split(',')[0]
  const split = simpleFormat.split(' ')
  const offset = split[0]
  const description = split.slice(1).join(' ')
  return `(GMT${offset}) ${description}`
}
