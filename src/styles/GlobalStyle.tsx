import { Global, css, useTheme } from '@emotion/react'

export const GlobalStyle = () => {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        .Typewriter__cursor {
          color: ${theme.palette.primary.main};
        }
      `}
    />
  )
}
