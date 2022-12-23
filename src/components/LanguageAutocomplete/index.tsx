import { FC, useCallback, useState } from 'react'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { useDebounce } from 'react-use'
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'

import {
  LanguageOption,
  SubcategoryTitle,
} from 'components/LanguageAutocomplete/styles'
import { LanguageApi } from 'apis/LanguageApi'
import { Language } from 'interfaces/Language'

const SEARCH_DEBOUNCE = 300

export type LanguageAutocompleteProps = Omit<
  AutocompleteProps<Language, boolean, boolean, boolean>,
  'options' | 'renderTags'
>

export const LanguageAutocomplete: FC<LanguageAutocompleteProps> = ({
  onChange,
  ...props
}) => {
  const [searchText, setSearchText] = useState('')
  const [options, setOptions] = useState<Language[]>([])

  const loadSearchResults = useCallback(async () => {
    setOptions([])
    const result = await LanguageApi.search({
      query: searchText,
    })
    if (result.ok()) {
      const { items } = await result.getData()
      setOptions(items)
    }
  }, [searchText])

  useDebounce(
    () => {
      loadSearchResults()
    },
    SEARCH_DEBOUNCE,
    [searchText]
  )

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Autocomplete
      {...props}
      openOnFocus
      renderTags={() => null}
      filterOptions={(x) => x}
      filterSelectedOptions
      isOptionEqualToValue={(option, value) =>
        (option as Language).id === (value as Language).id
      }
      options={options}
      getOptionLabel={(option: unknown) => (option as Language).name}
      onChange={(_e, value, _reason) => {
        if (onChange) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange(_e, value, _reason)
        }
      }}
      onOpen={loadSearchResults}
      inputValue={searchText}
      onInputChange={(_e, value) => {
        setSearchText(value)
      }}
      renderOption={(props, option) => {
        const languageOption = option as Language

        const titleMatches = match(languageOption.name, searchText)
        const titleParts = parse(languageOption.name, titleMatches)

        return (
          <li {...props}>
            <LanguageOption>
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
            </LanguageOption>
          </li>
        )
      }}
    />
  )
}
