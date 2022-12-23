import { FC, ReactNode } from 'react'

import {
  Wallpaper,
  Main,
  WallpaperPageContainer,
  WallpaperLogo,
  SignUpPageWallpaper,
  SignUpPageWallpaperPageContainer,
  MainSignUp,
  LoginAndSignupWallpaper,
} from 'components/PageWithWallpaper/styles'
import { Link } from 'components/Link'

interface Props {
  wallPaperChildren: ReactNode
  isSignUp?: boolean
}

export const PageWithWallpaper: FC<React.PropsWithChildren<Props>> = ({
  children,
  wallPaperChildren,
  isSignUp,
}) => (
  <Main isSignUpPage={isSignUp}>
    {isSignUp && (
      <MainSignUp>
        <SignUpPageWallpaper>{wallPaperChildren}</SignUpPageWallpaper>
        <SignUpPageWallpaperPageContainer>
          {children}
        </SignUpPageWallpaperPageContainer>
      </MainSignUp>
    )}

    {!isSignUp && (
      <Wallpaper>
        <LoginAndSignupWallpaper
          src={'/static/img/desktop-signup/left-panel-signup-wallpaper.png'}
          fill={true}
          alt=""
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={false}
        />
        <Link href="/">
          <WallpaperLogo />
        </Link>

        {wallPaperChildren}
      </Wallpaper>
    )}
    {!isSignUp && <WallpaperPageContainer>{children}</WallpaperPageContainer>}
  </Main>
)
