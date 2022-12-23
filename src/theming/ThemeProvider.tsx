import { FC, ReactNode, useMemo } from 'react'
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

import { useRouter } from 'hooks/useRouter'
import { AppTheme } from 'theming/AppTheme'
import { DarkTheme } from 'theming/DarkTheme'
import { LightTheme } from 'theming/LightTheme'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends AppTheme {}
}

export const ThemeProvider: FC<
  React.PropsWithChildren<{ children: ReactNode }>
> = ({ children }) => {
  const router = useRouter()
  let useDarkMode = usePrefersDarkMode()

  if (router.pathname === '/sessions/[sessionId]/room') {
    useDarkMode = true
  }

  const theme = useMemo(() => {
    let colorTheme
    if (useDarkMode) {
      colorTheme = DarkTheme
    } else {
      colorTheme = LightTheme
    }

    const muiTheme = createTheme(colorTheme)
    return responsiveFontSizes(muiTheme)
  }, [useDarkMode]) as AppTheme

  return (
    <MuiThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </EmotionThemeProvider>
    </MuiThemeProvider>
  )
}
