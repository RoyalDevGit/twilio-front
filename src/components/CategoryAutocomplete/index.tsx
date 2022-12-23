import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'

import {
  ParentCategoryTitle,
  SubcategoryOption,
  SubcategoryTitle,
} from 'components/CategoryAutocomplete/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { CategoryApi } from 'apis/CategoryApi'
import { Category } from 'interfaces/Category'

export type CategoryAutocompleteProps = Omit<
  AutocompleteProps<Category, true, true, false>,
  'options' | 'renderTags' | 'multiple'
>

export const CategoryAutocomplete: FC<CategoryAutocompleteProps> = ({
  onChange,
  ...props
}) => {
  const { t } = useTranslation(LocaleNamespace.SearchAutocomplete)
  const [searchText, setSearchText] = useState('')
  const [options, setOptions] = useState<Category[]>([])

  const fetchAllCategories = async () => {
    const result = await CategoryApi.subcategorySearch({
      query: searchText,
    })

    const { items } = await result.getData()

    setOptions(items)
  }

  useEffect(() => {
    fetchAllCategories()
  }, [])

  return (
    <>
      {options.length > 0 && (
        <Autocomplete<Category, true, true, false>
          {...props}
          data-testid="category-autocomplete"
          multiple
          autoComplete
          openOnFocus
          renderTags={() => null}
          disableClearable
          filterOptions={(x) =>
            x.filter((cat) => cat.title.includes(searchText))
          }
          filterSelectedOptions
          isOptionEqualToValue={(option, value) => option.id === value.id}
          options={options}
          getOptionLabel={(option: unknown) => (option as Category).title}
          onChange={(_e, value, _reason) => {
            if (onChange) {
              onChange(_e, value, _reason)
            }
          }}
          // onOpen={loadSearchResults}
          inputValue={searchText}
          onInputChange={(_e, value) => {
            setSearchText(value || '')
          }}
          renderOption={(props, option) => {
            const categoryOption = option as Category

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
              <li data-testid="category-autocomplete-option" {...props}>
                <SubcategoryOption>
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
                  <ParentCategoryTitle variant="subtitle2">
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
                </SubcategoryOption>
              </li>
            )
          }}
        />
      )}
    </>
  )
}
