import { useCallback } from 'react'

import { useRouter } from 'hooks/useRouter'
import { useFilterlessQuery } from 'hooks/useFilterlessQuery'

export const useResetFilters = () => {
  const router = useRouter()
  const filterlessQuery = useFilterlessQuery()
  const resetFilters = useCallback(() => {
    router.push({
      pathname: router.pathname,
      query: filterlessQuery,
    })
  }, [router, filterlessQuery])

  return resetFilters
}
