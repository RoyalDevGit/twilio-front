import { useEffect, useState } from 'react'
import { ParsedUrlQuery } from 'querystring'

import { useRouter } from 'hooks/useRouter'
import { Filter } from 'interfaces/Filter'
import {
  parseFilterAsBoolean,
  parseFilterAsStringArray,
} from 'utils/filters/parseFilters'
import { ExpertFilterQueryParams } from 'interfaces/ExpertFilterQueryParams'

export const useRouterFilters = () => {
  const router = useRouter()

  const getCurrentRouterFilters = (
    query: ParsedUrlQuery
  ): ExpertFilterQueryParams => ({
    verified: parseFilterAsBoolean(query[Filter.Verified]),
    onlineNow: parseFilterAsBoolean(query[Filter.OnlineNow]),
    category: parseFilterAsStringArray(query[Filter.Category]),
    language: parseFilterAsStringArray(query[Filter.Language]),
    rate: parseFilterAsStringArray(query[Filter.ExpertRate]),
    rating: parseFilterAsStringArray(query[Filter.Rating]),
  })

  const [routerFilters, setRouterFilters] = useState(
    getCurrentRouterFilters(router.query)
  )

  useEffect(() => {
    setRouterFilters(getCurrentRouterFilters(router.query))
  }, [router.query])

  return routerFilters
}
