import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  CategoryCardContainer,
  CategoryCardContent,
  CategoryCardMedia,
  CategoryCardMediaDefault,
  CategoryCardText,
  ExpertiseText,
} from 'components/CategoryCard/styles'
import { Category } from 'interfaces/Category'
import { getStorageBucketFileUrl } from 'utils/url/getStorageBucketFileUrl'

export interface CategoryCardProps {
  category: Category
}

export const CategoryCard: FC<React.PropsWithChildren<CategoryCardProps>> = ({
  category,
}) => {
  const { t } = useTranslation(LocaleNamespace.CategoryCard)

  return (
    <CategoryCardContainer>
      {!!category.iconImage && (
        <div
          style={{
            width: '150px',
            height: '100%',
            position: 'absolute',
            right: '0px',
          }}
        >
          <CategoryCardMedia
            src={
              category.iconImage?.fileKey
                ? getStorageBucketFileUrl(category.iconImage.fileKey)
                : ''
            }
            fill={true}
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            alt=""
          />
        </div>
      )}
      {!category.iconImage && (
        <CategoryCardMediaDefault
          src={'/static/img/default-category-img.svg'}
          fill={true}
          alt=""
        />
      )}

      <CategoryCardContent>
        <CategoryCardText>{t('expertsIn')}</CategoryCardText>
        <ExpertiseText chartcount={category.title.length}>
          {category.title}
        </ExpertiseText>
      </CategoryCardContent>
    </CategoryCardContainer>
  )
}
