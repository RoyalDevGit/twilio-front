import { FC, useEffect, useState } from 'react'

import { HorizontalScrollableContainer } from 'components/HorizontalScrollableContainer'
import { CategoryChip, TagsSection } from 'components/CategoryChips/styles'
import { Category } from 'interfaces/Category'
import { Link } from 'components/Link'
import { Filter } from 'interfaces/Filter'
import { useRouterFilters } from 'hooks/useRouterFilters'

export interface CategoryChipsProps {
  categories: Category[]
  className?: string
}

export const CategoryChips: FC<CategoryChipsProps> = ({
  categories,
  className,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, boolean>
  >({})
  const routerFilters = useRouterFilters()

  useEffect(() => {
    const newSelectedFilters = {} as Record<string, boolean>
    routerFilters.category.forEach((cat) => {
      newSelectedFilters[cat] = true
    })
    setSelectedFilters(newSelectedFilters)
  }, [routerFilters])

  return (
    <TagsSection className={className}>
      <HorizontalScrollableContainer>
        {categories.map((chip) => (
          <Link
            key={chip.id}
            href={`/explore?${encodeURIComponent(
              Filter.Category
            )}=${encodeURIComponent(chip.code)}`}
          >
            <CategoryChip
              label={chip.title}
              clickable
              variant="outlined"
              selected={selectedFilters[chip.code]}
            />
          </Link>
        ))}
      </HorizontalScrollableContainer>
    </TagsSection>
  )
}
