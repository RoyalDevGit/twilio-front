import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Typography from '@mui/material/Typography'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  HeaderContainer,
  HeaderTextContainer,
  // IndustryList,
  // IndustryLink,
  SectionContainer,
  SectionDivider,
  HeaderImage,
  SectionTitle,
  // IndustryListSection,
} from 'components/NoSearchResults/styles'
import { ExpertCardSmall } from 'components/ExpertCardSmall'
import { LightOrDark } from 'components/LightOrDark'
import { useExpertLoad } from 'hooks/api/expert/useExpertLoad'
import { HorizontalScrollableContainer } from 'components/HorizontalScrollableContainer'
import { Expert } from 'interfaces/Expert'
// import { CategoryApi } from 'apis/CategoryApi'
// import { Category } from 'interfaces/Category'
// import { useApiPagination } from 'hooks/useApiPagination'

export interface NoSearchResultsProps {
  initialRecommendedExperts: Expert[]
}

export const NoSearchResults: FC<NoSearchResultsProps> = ({
  initialRecommendedExperts,
}) => {
  const { t } = useTranslation([
    LocaleNamespace.SearchResults,
    LocaleNamespace.ExpertCard,
  ])

  // const [categoriesMidddleIndex, setCategoriesMiddleIndex] = useState(0)

  // const categoriesPagination = useApiPagination<Category>({
  //   dataFetcher: async (page) => {
  //     const categoriesResult = await CategoryApi.queryRecommended({
  //       page,
  //       limit: 20,
  //     })

  //     const categoriesData = await categoriesResult.getData()
  //     setCategoriesMiddleIndex(Math.ceil(categoriesData.items.length / 2))
  //     return categoriesData
  //   },
  // })

  const { experts: recommendedExperts, loadMoreExperts } = useExpertLoad({
    initialExperts: initialRecommendedExperts,
    initialPageValue: 1,
  })

  const recommendedExpertsCards = () =>
    recommendedExperts.map((expert) => (
      <ExpertCardSmall
        expert={expert}
        key={expert.id}
        id={`no-search-results-${expert.id}`}
      />
    ))

  return (
    <>
      <HeaderContainer>
        <LightOrDark
          light={
            <HeaderImage
              width={320}
              height={232}
              src="/static/img/header-svg-light.svg"
              alt=""
            />
          }
          dark={
            <HeaderImage
              width={320}
              height={232}
              src="/static/img/header-svg-dark.svg"
              alt=""
            />
          }
        />
        <HeaderTextContainer>
          <Typography variant="h2">{t('noSearchResultsFound')}</Typography>
          <Typography variant="body2">
            {t('noSearchResultsInstructions')}
          </Typography>
        </HeaderTextContainer>
      </HeaderContainer>
      <SectionDivider />
      <SectionContainer>
        <SectionTitle variant="h4">{t('alsoInterestedInLabel')}</SectionTitle>
        <HorizontalScrollableContainer onIntersectionRight={loadMoreExperts}>
          {recommendedExpertsCards()}
        </HorizontalScrollableContainer>
      </SectionContainer>
      <SectionDivider />
      {/* <SectionContainer>
        <SectionTitle variant="h4">{t('searchByIndustryLabel')}</SectionTitle>
        <IndustryListSection>
          {!!categoriesPagination.value && categoriesPagination.value.items && (
            <>
              <IndustryList>
                {categoriesPagination.value.items
                  .slice(0, categoriesMidddleIndex)
                  .map((category) => (
                    <IndustryLink
                      key={category.id}
                      href={`/search?query=${encodeURIComponent(
                        category.title
                      )}`}
                    >
                      {category.title}
                    </IndustryLink>
                  ))}
              </IndustryList>

              <IndustryList>
                {categoriesPagination.value.items
                  .slice(categoriesMidddleIndex)
                  .map((category) => (
                    <IndustryLink
                      key={category.id}
                      href={`/search?query=${encodeURIComponent(
                        category.title
                      )}`}
                    >
                      {category.title}
                    </IndustryLink>
                  ))}
              </IndustryList>
            </>
          )}
        </IndustryListSection>
      </SectionContainer> */}
    </>
  )
}
