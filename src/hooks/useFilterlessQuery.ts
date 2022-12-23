import omit from 'lodash/omit'
import { useEffect, useState } from 'react'
import { ParsedUrlQuery } from 'querystring'

import { useRouter } from 'hooks/useRouter'
import { getEnumValues } from 'utils/enum/enumUtils'
import { Filter } from 'interfaces/Filter'

const cleanQuery = (query: ParsedUrlQuery) =>
  omit(query, getEnumValues(Filter)) as ParsedUrlQuery

export const useFilterlessQuery = () => {
  const router = useRouter()
  const [filterlessQuery, setFilterlessQuery] = useState<ParsedUrlQuery>(
    cleanQuery(router.query)
  )

  useEffect(() => {
    setFilterlessQuery(cleanQuery(router.query))
  }, [router.query])
  return filterlessQuery
}
