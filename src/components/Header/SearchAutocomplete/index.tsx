import { FC, useState } from 'react'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'next-i18next'
import InputAdornment from '@mui/material/InputAdornment'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { useDebounce } from 'react-use'

import { useRouter } from 'hooks/useRouter'
import {
  ExpertMainExpertise,
  ExpertName,
  ExpertOption,
  ExpertOptionAvatarSection,
  ExpertOptionDetails,
  ParentCategoryTitle,
  SearchButton,
  SearchSubmitButton,
  StyledAutocomplete,
  SubcategoryOption,
  SubcategoryOptionDetails,
  SubcategoryTitle,
} from 'components/Header/SearchAutocomplete/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  MagnifyingGlassIcon,
  AutocompleteMagnifyingGlassIcon,
} from 'icons/MagnifyingGlass'
import { Expert } from 'interfaces/Expert'
import { getUserFullName } from 'utils/user/getUserFullName'
import { ExpertAvatar } from 'components/ExpertAvatar'
import { SearchApi } from 'apis/SearchApi'
import { GlobalSearchHit } from 'interfaces/Search'
import { Category } from 'interfaces/Category'

const SEARCH_DEBOUNCE = 300

export interface SearchAutocompleteProps {
  className?: string
  displaySearchButton?: boolean
}

export const SearchAutocomplete: FC<SearchAutocompleteProps> = ({
  className,
  displaySearchButton,
}) => {
  const router = useRouter()
  const { t } = useTranslation(LocaleNamespace.SearchAutocomplete)
  const [searchText, setSearchText] = useState<string>(
    (router.query.query as string) || ''
  )
  const [options, setOptions] = useState<GlobalSearchHit[]>([])

  useDebounce(
    () => {
      setOptions([])
      if (!searchText) {
        return
      }
      const loadSearchResults = async () => {
        const result = await SearchApi.globalSearch({
          query: searchText,
          page: 1,
          limit: 10,
        })
        if (result.ok()) {
          const { items } = await result.getData()
          setOptions(items)
        }
      }
      loadSearchResults()
    },
    SEARCH_DEBOUNCE,
    [searchText]
  )

  const getOptionLabel = (option: unknown) => {
    if (typeof option === 'string') {
      return option
    }
    const searchOption = option as GlobalSearchHit
    if (searchOption.index === 'experts') {
      const expert = searchOption.data as Expert
      return getUserFullName(expert.user)
    }

    if (searchOption.index === 'subcategories') {
      const category = searchOption.data as Category
      return category.title
    }
    return ''
  }

  const handleOnChange = (value: unknown) => {
    if (!value) {
      return
    }
    if (typeof value === 'string') {
      router.push({
        pathname: '/search',
        query: {
          query: value,
        },
      })
    }
    const searchOption = value as GlobalSearchHit

    if (searchOption.index === 'experts') {
      const expert = searchOption.data as Expert
      router.push({
        pathname: `/experts/${expert.id}`,
        query: {
          query: getOptionLabel(expert),
        },
      })
    }

    if (searchOption.index === 'subcategories') {
      const category = searchOption.data as Category
      router.push({
        pathname: '/search',
        query: {
          query: category.title,
        },
      })
    }
  }

  return (
    <>
      <StyledAutocomplete
        className={className}
        freeSolo
        autoComplete
        filterOptions={(x) => x}
        options={options}
        getOptionLabel={getOptionLabel}
        onChange={(_e, value) => handleOnChange(value)}
        inputValue={searchText}
        id="search-field-auto-complete"
        onInputChange={(_e, value) => {
          setSearchText(value)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={t('searchPlaceholder')}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchButton id="search-field-auto-complete-button">
                    <MagnifyingGlassIcon />
                  </SearchButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, opt) => {
          const option = opt as GlobalSearchHit

          if (option.index === 'subcategories') {
            const categoryOption = option.data as Category

            const titleMatches = match(categoryOption.title, searchText)
            const titleParts = parse(categoryOption.title, titleMatches)

            if (!categoryOption.parentCategory) {
              return null
            }
            const parentTitleMatches = match(
              categoryOption.parentCategory.title,
              searchText
            )
            const parentTitleParts = parse(
              categoryOption.parentCategory.title,
              parentTitleMatches
            )

            return (
              <li {...props} key={props.id}>
                <SubcategoryOption>
                  <AutocompleteMagnifyingGlassIcon />
                  <SubcategoryOptionDetails>
                    <SubcategoryTitle>
                      {titleParts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </SubcategoryTitle>
                    <ParentCategoryTitle>
                      {' '}
                      {t('categoryIn')}{' '}
                      {parentTitleParts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </ParentCategoryTitle>
                  </SubcategoryOptionDetails>
                </SubcategoryOption>
              </li>
            )
          }

          if (option.index === 'experts') {
            const expertOption = option.data as Expert
            const fullName = getUserFullName(expertOption.user)
            const expertNameMatches = match(fullName, searchText)
            const expertNameParts = parse(fullName, expertNameMatches)

            const expertiseMatches = match(
              expertOption.mainAreaOfExpertise || '',
              searchText
            )
            const expertiseParts = parse(
              expertOption.mainAreaOfExpertise || '',
              expertiseMatches
            )

            return (
              <li {...props} key={props.id}>
                <ExpertOption>
                  <ExpertOptionAvatarSection>
                    <ExpertAvatar
                      width={40}
                      height={40}
                      expert={expertOption}
                      showStatus
                    />
                  </ExpertOptionAvatarSection>
                  <ExpertOptionDetails>
                    <ExpertName>
                      {expertNameParts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </ExpertName>
                    <ExpertMainExpertise variant="subtitle2">
                      {expertiseParts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </ExpertMainExpertise>
                  </ExpertOptionDetails>
                </ExpertOption>
              </li>
            )
          }
          return null
        }}
      />

      {displaySearchButton && (
        <SearchSubmitButton
          onClick={() => handleOnChange(searchText)}
          color="primary"
          variant="contained"
          fullWidth
        >
          {t('searchButton')}
        </SearchSubmitButton>
      )}
    </>
  )
}
