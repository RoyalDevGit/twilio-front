import styled from '@emotion/styled'

import { Image } from 'components/Image'

export const ImageSection = styled.div`
  background: ${({ theme }) =>
    theme.customComponents.desktopSignupWallpaper.imageSection.styleOverrides
      .background};
`

export const WallpaperImage = styled(Image)``
