import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { HomePageSearchProfileIcon } from 'icons/HomePageSeeWhatIsPossible/BrowseProfiles'
import { HomePageOneOnOneIcon } from 'icons/HomePageSeeWhatIsPossible/OneOnOne'
import { HomepageProfileBiosIcon } from 'icons/HomePageSeeWhatIsPossible/ProfileBios'
import { HomePageSearchExpert } from 'icons/HomePageSeeWhatIsPossible/SearchExpert'
import { HomepageStopwatchIcon } from 'icons/HomePageSeeWhatIsPossible/Stopwatch'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import {
  SeeWhatIsPossibleContainer,
  SeeWhatIsPossibleBox,
  SeeWhatsIsPossibleImageContainer,
  SeeWhatsIsPossibleImage,
  SeeWhatsIsPossibleDescription,
  SeeWhatsIsPossibleDescriptionBox,
  SeeWhatsIsPossibleDescriptionLabel,
  SeeWhatsIsPossibleButton,
  SeeWhatIsPossibleTitle,
} from 'components/HomePageSeeWhatIsPossible/styles'

export const HomePageSeeWhatIsPossible: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { t } = useTranslation(LocaleNamespace.HomePage)

  return (
    <SeeWhatIsPossibleContainer>
      <SeeWhatIsPossibleTitle>
        {t('seeWhatIsPossibleLabel')}
      </SeeWhatIsPossibleTitle>
      <SeeWhatIsPossibleBox>
        <SeeWhatsIsPossibleImageContainer>
          <SeeWhatsIsPossibleImage
            src={'/static/img/desktop-homepage/see-what-is-possible.jpg'}
            fill={true}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            alt=""
          />
        </SeeWhatsIsPossibleImageContainer>
        <SeeWhatsIsPossibleDescription>
          <SeeWhatsIsPossibleDescriptionBox>
            <div>
              <HomePageOneOnOneIcon />
            </div>
            <SeeWhatsIsPossibleDescriptionLabel>
              {t('seeWhatIsPossibleLabelDescription-1')}
            </SeeWhatsIsPossibleDescriptionLabel>
          </SeeWhatsIsPossibleDescriptionBox>
          <SeeWhatsIsPossibleDescriptionBox>
            <div>
              <HomePageSearchExpert />
            </div>
            <SeeWhatsIsPossibleDescriptionLabel>
              {t('seeWhatIsPossibleLabelDescription-2')}
            </SeeWhatsIsPossibleDescriptionLabel>
          </SeeWhatsIsPossibleDescriptionBox>
          <SeeWhatsIsPossibleDescriptionBox>
            <div>
              <HomePageSearchProfileIcon />
            </div>
            <SeeWhatsIsPossibleDescriptionLabel>
              {t('seeWhatIsPossibleLabelDescription-3')}
            </SeeWhatsIsPossibleDescriptionLabel>
          </SeeWhatsIsPossibleDescriptionBox>
          <SeeWhatsIsPossibleDescriptionBox>
            <div>
              <HomepageStopwatchIcon />
            </div>
            <SeeWhatsIsPossibleDescriptionLabel>
              {t('seeWhatIsPossibleLabelDescription-4')}
            </SeeWhatsIsPossibleDescriptionLabel>
          </SeeWhatsIsPossibleDescriptionBox>
          <SeeWhatsIsPossibleDescriptionBox>
            <div>
              <HomepageProfileBiosIcon />
            </div>
            <SeeWhatsIsPossibleDescriptionLabel>
              {t('seeWhatIsPossibleLabelDescription-5')}
            </SeeWhatsIsPossibleDescriptionLabel>
          </SeeWhatsIsPossibleDescriptionBox>
          <SeeWhatsIsPossibleButton variant="contained" color="primary">
            {t('seeWhatIsPossibleLabelDescriptionButton')}
          </SeeWhatsIsPossibleButton>
        </SeeWhatsIsPossibleDescription>
      </SeeWhatIsPossibleBox>
    </SeeWhatIsPossibleContainer>
  )
}
