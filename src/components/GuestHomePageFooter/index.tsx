import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { useTheme } from '@emotion/react'
import useMediaQuery from '@mui/material/useMediaQuery'

import { Image } from 'components/Image'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  ContentSection,
  DescriptionText,
  MainSection,
  MainTitle,
  MobileSection,
  StyledButton,
  StyledDivider,
  SupportLink,
  SupportLinksSection,
  VerticalDivider,
} from 'components/GuestHomePageFooter/styles'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'
import { Link } from 'components/Link'

export const GuestHomePageFooter: FC = () => {
  const { t } = useTranslation(LocaleNamespace.GuestHomePageFooter)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'))

  const useDarkMode = usePrefersDarkMode()

  const imageSrc = useDarkMode
    ? '/static/img/home-page/guest-user-footer-dark.png'
    : '/static/img/home-page/guest-user-footer-light.png'

  return (
    <MainSection>
      {!isMobile && (
        <>
          <Image
            src={imageSrc}
            fill={true}
            style={{
              objectFit: 'cover',
            }}
            alt=""
            unoptimized={false}
          />
          <ContentSection>
            <MainTitle>{t('mainTitle')}</MainTitle>
            <DescriptionText>{t('descriptionText')}</DescriptionText>
            <Link href={'/signup'}>
              <StyledButton variant="contained" color="tertiary">
                {t('joinNowButton')}
              </StyledButton>
            </Link>
          </ContentSection>
        </>
      )}

      {isMobile && (
        <MobileSection>
          <ContentSection>
            <MainTitle>{t('mainTitle')}</MainTitle>
            <DescriptionText>{t('descriptionText')}</DescriptionText>
            <Link href={'/signup'}>
              <StyledButton variant="contained" color="tertiary">
                {t('joinNowButton')}
              </StyledButton>
            </Link>
          </ContentSection>
          <Image
            src="/static/img/home-page/guest-user-mobile-footer.png"
            width={425}
            height={370}
            style={{
              objectFit: 'contain',
            }}
            alt=""
          />
          <StyledDivider />
          <SupportLinksSection>
            <Link href={'/support'}>
              <SupportLink>{t('supportLink')}</SupportLink>
            </Link>
            <VerticalDivider orientation="vertical" />
            <Link href={'/support'}>
              <SupportLink>{t('termsAndConditionsLink')}</SupportLink>
            </Link>
          </SupportLinksSection>
        </MobileSection>
      )}
    </MainSection>
  )
}
