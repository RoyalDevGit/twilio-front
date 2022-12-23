import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { useTheme } from '@emotion/react'
import useMediaQuery from '@mui/material/useMediaQuery'

import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  CustomAutocomplete,
  GuestUserHomePageContainer,
  GuestUserHomePageHeaderBox,
  GuestUserHomePageWelcomeLabel,
  GuestUserPopularTags,
  GuestUserPopularTagsLabel,
  PopularCategoryChip,
} from 'components/GuestHomePageHero/styles'
import { Link } from 'components/Link'

export const GuestHomePageHero: FC = () => {
  const { t } = useTranslation(LocaleNamespace.GuestHomePageHero)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const popularCategories = [
    { id: 0, title: 'Geography' },
    { id: 1, title: 'Economy' },
    { id: 2, title: 'Sports' },
    { id: 3, title: 'Society' },
  ]

  return (
    <GuestUserHomePageContainer>
      <GuestUserHomePageHeaderBox>
        <GuestUserHomePageWelcomeLabel>
          {t('guestUserHomePageWelcomeLabel')}
        </GuestUserHomePageWelcomeLabel>
        <CustomAutocomplete displaySearchButton={isMobile} />
        {!isMobile && (
          <GuestUserPopularTags>
            <GuestUserPopularTagsLabel>
              {t('guestUserHomePageTagsLabel')}
            </GuestUserPopularTagsLabel>
            {popularCategories.map((chip) => (
              <Link
                key={chip.id}
                href={`/search?query=${encodeURIComponent(chip.title)}`}
              >
                <PopularCategoryChip
                  label={chip.title}
                  clickable
                  variant="outlined"
                />
              </Link>
            ))}
          </GuestUserPopularTags>
        )}
      </GuestUserHomePageHeaderBox>
    </GuestUserHomePageContainer>
  )
}
