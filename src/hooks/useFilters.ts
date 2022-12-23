import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { useMount } from 'react-use'
import { ParsedUrlQueryInput } from 'querystring'

import { Category } from 'interfaces/Category'
import { Language } from 'interfaces/Language'
import { LanguageApi } from 'apis/LanguageApi'
// import { CategoryApi } from 'apis/CategoryApi'
import { useResetFilters } from 'hooks/useResetFilters'
import { Filter } from 'interfaces/Filter'
import { useRouterFilters } from 'hooks/useRouterFilters'
import { useFilterlessQuery } from 'hooks/useFilterlessQuery'
import { useRouter } from 'hooks/useRouter'

const getSelectedOptions = (options: Record<string, boolean>) => {
  const selectedOptions: string[] = []
  Object.entries(options).forEach(([key, selected]) => {
    if (selected) {
      selectedOptions.push(key)
    }
  })
  return selectedOptions
}

const convertStringArrayToSelectedOptions = (keys: string[]) => {
  const selectedOptions = {} as Record<string, boolean>
  keys.forEach((key) => {
    selectedOptions[key] = true
  })
  return selectedOptions
}

export const useFilters = () => {
  const [languages, setLanguages] = useState<Language[]>([])
  const [categories] = useState<Category[]>([])

  const router = useRouter()
  const routerFilters = useRouterFilters()
  const filterlessQuery = useFilterlessQuery()
  const resetFilters = useResetFilters()
  const [selectedLanguages, setSelectedLanguages] = useState<
    Record<string, boolean>
  >({})
  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, boolean>
  >({})
  const [selectedRates, setSelectedRates] = useState<Record<string, boolean>>(
    {}
  )
  const [selectedRatings, setSelectedRatings] = useState<
    Record<string, boolean>
  >({})
  const [verified, setVerified] = useState(false)
  const [onlineNow, setOnlineNow] = useState(false)

  const setSelectionsFromUrl = () => {
    setSelectedLanguages(
      convertStringArrayToSelectedOptions(routerFilters.language)
    )
    setSelectedCategories(
      convertStringArrayToSelectedOptions(routerFilters.category)
    )
    setSelectedRates(convertStringArrayToSelectedOptions(routerFilters.rate))
    setSelectedRatings(
      convertStringArrayToSelectedOptions(routerFilters.rating)
    )
    setVerified(routerFilters.verified)
    setOnlineNow(routerFilters.onlineNow)
  }

  useMount(() => {
    setSelectionsFromUrl()
  })

  const apply = () => {
    const queryWithFilters: ParsedUrlQueryInput = {
      ...filterlessQuery,
      [Filter.Category]: getSelectedOptions(selectedCategories),
      [Filter.Language]: getSelectedOptions(selectedLanguages),
      [Filter.ExpertRate]: getSelectedOptions(selectedRates),
      [Filter.Rating]: getSelectedOptions(selectedRatings),
    }

    if (verified) {
      queryWithFilters[Filter.Verified] = true
    }

    if (onlineNow) {
      queryWithFilters[Filter.OnlineNow] = true
    }
    router.push({
      pathname: router.pathname,
      query: queryWithFilters,
    })
  }

  const reset = () => {
    resetFilters()
  }

  const onLanguageChange = (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const key = event.target.value as string
    setSelectedLanguages({
      ...selectedLanguages,
      [key]: checked,
    })
  }

  const onCategoryChange = (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const key = event.target.value as string
    setSelectedCategories({
      ...selectedCategories,
      [key]: checked,
    })
  }

  const onRateChange = (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const key = event.target.value as string
    setSelectedRates({
      ...selectedRates,
      [key]: checked,
    })
  }

  const onRatingChange = (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const key = event.target.value as string
    setSelectedRatings({
      ...selectedRatings,
      [key]: checked,
    })
  }

  const onVerifiedChange = (
    _event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setVerified(checked)
  }

  const onOnlineChange = (
    _event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setOnlineNow(checked)
  }

  const loadLanguages = async () => {
    const languageResult = await LanguageApi.search()
    if (!languageResult.ok()) {
      return
    }
    const data = await languageResult.getData()
    setLanguages(data.items)
  }

  // const loadCategories = async () => {
  //   const categoryResult = await CategoryApi.queryRecommended({
  //     page: 1,
  //     limit: 100,
  //   })
  //   if (!categoryResult.ok()) {
  //     return
  //   }
  //   const data = await categoryResult.getData()
  //   setCategories(data.items)
  // }

  useMount(() => {
    loadLanguages()
    // loadCategories()
  })

  return {
    languages,
    categories,
    verified,
    onlineNow,
    selectedCategories,
    selectedLanguages,
    selectedRates,
    selectedRatings,
    onLanguageChange,
    onCategoryChange,
    onRateChange,
    onRatingChange,
    onVerifiedChange,
    onOnlineChange,
    apply,
    reset,
  }
}
