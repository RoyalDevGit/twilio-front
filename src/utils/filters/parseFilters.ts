import { ParsedQs } from 'qs'

export type FilterValue = string | string[] | ParsedQs | ParsedQs[] | undefined

export const parseFilterAsBoolean = (filterValue: FilterValue) =>
  filterValue?.toString().toLowerCase() === 'true'

export const parseFilterAsStringArray = (
  filterValue: FilterValue
): string[] => {
  if (!filterValue) {
    return []
  }
  if (Array.isArray(filterValue)) {
    return filterValue as string[]
  }
  return [filterValue as string]
}
