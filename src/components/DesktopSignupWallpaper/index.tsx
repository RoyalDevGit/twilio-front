import { FC } from 'react'

import {
  ImageSection,
  WallpaperImage,
} from 'components/DesktopSignupWallpaper/styles'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

export const DesktopSignupWallpaper: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const useDarkMode = usePrefersDarkMode()

  const imageSrc = useDarkMode
    ? '/static/img/desktop-signup/signup-wallpaper-dark.png'
    : '/static/img/desktop-signup/signup-wallpaper-light.png'
  return (
    <ImageSection>
      <WallpaperImage
        src={imageSrc}
        height={860}
        width={730}
        alt=""
        unoptimized={false}
      />
    </ImageSection>
  )
}
