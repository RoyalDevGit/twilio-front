import { AppThemeOptions, CustomComponents } from 'theming/AppTheme'

interface CommonThemeOptions extends Omit<AppThemeOptions, 'customComponents'> {
  customComponents?: Partial<CustomComponents>
}

export const CommonTheme: CommonThemeOptions = {
  breakpoints: {
    values: {
      mobileS: 320,
      mobileM: 375,
      mobileL: 425,
      tablet: 768,
      laptop: 1024,
      laptopL: 1440,
      fourK: 2560,
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-colorError': {
            background: 'rgba(234, 82, 48, 0.4)',
            color: '#1a1a1a',
          },
        },
      },
    },
  },
  customComponents: {
    videoEditor: {
      videoPreview: {
        backgroundColor: 'black',
      },
    },
  },
}
