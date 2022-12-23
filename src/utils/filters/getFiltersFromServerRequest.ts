import { ParsedUrlQuery } from 'querystring'

import { Filter } from 'interfaces/Filter'
import { ExpertFilterQueryParams } from 'interfaces/ExpertFilterQueryParams'
import {
  parseFilterAsBoolean,
  parseFilterAsStringArray,
} from 'utils/filters/parseFilters'

export const getFiltersFromServerRequest = (
  query: ParsedUrlQuery
): ExpertFilterQueryParams => {
  const result: ExpertFilterQueryParams = {
    verified: parseFilterAsBoolean(query?.[Filter.Verified]),
    onlineNow: parseFilterAsBoolean(query?.[Filter.OnlineNow]),
    category: parseFilterAsStringArray(query?.[Filter.Category]),
    language: parseFilterAsStringArray(query?.[Filter.Language]),
    rate: parseFilterAsStringArray(query?.[Filter.ExpertRate]),
    rating: parseFilterAsStringArray(query?.[Filter.Rating]),
  }

  return result
}
