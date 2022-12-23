import { FC } from 'react'
import { useTranslation } from 'next-i18next'

import {
  Description,
  LoginAndSignupDescription,
  LoginAndSignupDescriptionContainer,
  LoginAndSignupHeading,
  LoginAndSignupWallpaperContainer,
  LoginAndSignupWallpaperTextContainer,
} from 'components/LoginFeaturedExperts/styles'
import { LocaleNamespace } from 'utils/locale/LocaleNamespace'
import { FilterMiniIcon } from 'icons/LoginAndSignupWallpaper/FilterMini'
import { MiniProfileCardsIcon } from 'icons/LoginAndSignupWallpaper/MiniProfileCards'
import { ProfileBiosIcon } from 'icons/LoginAndSignupWallpaper/ProfileBios'
import { ProfileCustomizedIcon } from 'icons/LoginAndSignupWallpaper/ProfileCustomized'
import { SearchProfileIcon } from 'icons/LoginAndSignupWallpaper/SearchProfile'
import { StopwatchIcon } from 'icons/LoginAndSignupWallpaper/Stopwatch'

export const LoginAndSignUpWallpaper: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { t } = useTranslation(LocaleNamespace.LoginPage)

  return (
    <LoginAndSignupWallpaperContainer>
      <LoginAndSignupWallpaperTextContainer>
        <LoginAndSignupHeading>
          {t('loginAndSignUpHeading')}
        </LoginAndSignupHeading>
        <LoginAndSignupDescriptionContainer>
          <LoginAndSignupDescription>
            <ProfileCustomizedIcon />
            <Description>{t('loginAndSignUpDescription-1')}</Description>
          </LoginAndSignupDescription>
          <LoginAndSignupDescription>
            <MiniProfileCardsIcon />
            <Description>{t('loginAndSignUpDescription-2')}</Description>
          </LoginAndSignupDescription>
          <LoginAndSignupDescription>
            <SearchProfileIcon />
            <Description>{t('loginAndSignUpDescription-3')}</Description>
          </LoginAndSignupDescription>
        </LoginAndSignupDescriptionContainer>
        <LoginAndSignupDescriptionContainer>
          <LoginAndSignupDescription>
            <StopwatchIcon />
            <Description>{t('loginAndSignUpDescription-4')}</Description>
          </LoginAndSignupDescription>
          <LoginAndSignupDescription>
            <FilterMiniIcon />
            <Description>{t('loginAndSignUpDescription-5')}</Description>
          </LoginAndSignupDescription>
          <LoginAndSignupDescription>
            <ProfileBiosIcon />
            <Description>{t('loginAndSignUpDescription-6')}</Description>
          </LoginAndSignupDescription>
        </LoginAndSignupDescriptionContainer>
      </LoginAndSignupWallpaperTextContainer>
    </LoginAndSignupWallpaperContainer>
  )
}
