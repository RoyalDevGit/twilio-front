import { useEffect, useState } from 'react'

import { ExpertApi } from 'apis/ExpertApi'
import { Expert } from 'interfaces/Expert'
import { ExpertFilterQueryParams } from 'interfaces/ExpertFilterQueryParams'

interface UseExpertLoadOptions {
  initialExperts?: Expert[]
  initialPageValue?: number
  filters?: ExpertFilterQueryParams
}
export const useExpertLoad = ({
  initialExperts,
  initialPageValue,
  filters,
}: UseExpertLoadOptions) => {
  const [nextFeaturedExpertPage, setNextFeaturedExpertPage] = useState(
    initialExperts ? 2 : initialPageValue ?? 1
  )
  const [experts, setExperts] = useState(initialExperts ?? [])

  const loadMoreExperts = async () => {
    let hasFetchedMoreResults: boolean

    const expertsResult = await ExpertApi.query({
      page: nextFeaturedExpertPage,
      limit: 20,
      ...filters,
    })
    if (expertsResult.ok()) {
      const result = await expertsResult.getData()
      if (result.items.length > 0) {
        setExperts([...experts, ...result.items])
        setNextFeaturedExpertPage(nextFeaturedExpertPage + 1)
      }
      hasFetchedMoreResults = result.items.length <= 0
    } else {
      hasFetchedMoreResults = expertsResult.ok()
    }
    return hasFetchedMoreResults
  }

  useEffect(() => {
    setExperts(initialExperts ?? [])
    setNextFeaturedExpertPage(initialExperts ? 2 : initialPageValue ?? 1)
  }, [initialExperts])

  return {
    loadMoreExperts,
    experts,
  }
}
