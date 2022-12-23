import { useCallback, useEffect, useState } from 'react'

import { QueryResponse } from 'interfaces/Query'

type QueryResponseFetcher<T> = (
  page: number,
  limit: number
) => Promise<QueryResponse<T>>

export interface UsePaginationOptions<T> {
  initialValue?: QueryResponse<T>
  initialPage?: number
  initialLimit?: number
  dataFetcher: QueryResponseFetcher<T>
}

export const useApiPagination = <T>(options: UsePaginationOptions<T>) => {
  const { initialValue, dataFetcher, initialPage, initialLimit } = options
  const [hadInitialData] = useState(initialValue ? true : false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [fetchCount, setFetchCount] = useState(0)
  const [value, setValue] = useState(initialValue)
  const [page, setPage] = useState(initialPage || initialValue?.page || 1)
  const [limit, setLimit] = useState(initialLimit || initialValue?.limit || 10)
  const [refreshBit, setRefreshBit] = useState(false)

  useEffect(() => {
    if (hadInitialData && !fetchCount) {
      setFetchCount(fetchCount + 1)
      return
    }
    const loadData = async () => {
      try {
        setIsLoading(true)
        const paginationResult = await dataFetcher(page, limit)
        setValue(paginationResult)
      } catch (e) {
        const err = e as Error
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
    setFetchCount(fetchCount + 1)
  }, [refreshBit, page, limit])

  const onPageChange = (newPage: number) => {
    setPage(newPage)
  }
  const onRowsPerPageChange = (newLimit: number) => {
    setLimit(newLimit)
  }
  const refresh = useCallback(() => {
    setRefreshBit(!refreshBit)
  }, [refreshBit])

  return {
    isLoading,
    page,
    limit,
    value,
    error,
    refresh,
    onPageChange,
    onRowsPerPageChange,
  }
}
