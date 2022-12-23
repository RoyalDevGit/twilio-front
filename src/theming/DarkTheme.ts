import merge from 'lodash/merge'

import { AppThemeOptions } from 'theming/AppTheme'
import { CommonTheme } from 'theming/CommonTheme'

const defaultBackground = '#090B1B'
const paperBackground = '#181928'
const primaryTextColor = '#FFFFFF'
const secondaryTextColor = '#B8CEE3'

export const DarkThemeDefinition: AppThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3FA3FF',
    },
    secondary: {
      main: '#ABD1F5',
    },
    tertiary: {
      main: '#FFFFFF',
    },
    background: {
      default: defaultBackground,
      paper: paperBackground,
    },
    text: {
      primary: primaryTextColor,
      secondary: secondaryTextColor,
    },
    action: {
      active: '#414157',
    },
    error: {
      main: '#EA5230',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: defaultBackground,
          boxShadow: 'none',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: '600',
          color: '#FFFFFF',
          marginBottom: '6px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: paperBackground,
          color: '#FFFFFF',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3FA3FF',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3FA3FF',
          },
          '&.Mui-error': {
            background: '#FACBBF',
            color: '#1A1A1A',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#EA5230',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#EA5230',
            },
            '&.Mui-disabled': {
              '& .MuiOutlinedInput-input': {
                color: '#1A1A1A',
                webkitTextFillColor: '#1A1A1A',
              },
              '& .MuiInputAdornment-root ': {
                color: '#1A1A1A',
                webkitTextFillColor: '#1A1A1A',
              },
            },
            '& .MuiInputAdornment-root ': {
              color: '#1A1A1A',
              webkitTextFillColor: '#1A1A1A',
            },
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
              transform: 'translateX(16px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                backgroundColor: '#3FA3FF',
                opacity: 1,
                border: 0,
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
              },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              color: '#3FA3FF',
              border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              color: '#757575',
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.7,
            },
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
          },
          '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: '#39393D',
            opacity: 1,
            transition:
              'background-color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#3FA3FF',
            '&:hover': {
              backgroundColor: '#FFFFFF',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(147, 203, 255, 0.5)',
              color: 'rgba(255, 255, 255, 0.4)',
            },
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: '#ABD1F5',
            '&:hover': {
              backgroundColor: '#FFFFFF',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              color: 'rgba(9, 11, 27, 0.4)',
            },
          },
          '&.MuiButton-outlinedPrimary': {
            borderColor: '#FFFFFF',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: '#1A1A1A',
            },
            '&.Mui-disabled': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: 'rgba(255, 255, 255, 0.5)',
            },
          },
        },
      },
    },
    MuiPickerStaticWrapper: {
      styleOverrides: {
        root: {
          '.MuiButtonBase-root': {
            background: 'transparent',
          },
          '.MuiIconButton-edgeEnd,.MuiIconButton-edgeStart': {
            color: 'white',
          },
        },
        content: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
  customComponents: {
    logo: {
      styleOverrides: {
        color: '#FFFFFF',
      },
    },
    availableSessions: {
      availableSessionsContainer: {
        styleOverrides: {
          border: '1px solid rgba(255, 255, 255, 0.3)',
        },
      },
      availableDate: {
        styleOverrides: {
          border: '1px solid 3FA3FF',
          background: '#181928',
        },
      },
      availableTime: {
        styleOverrides: {
          border: '1px solid rgba(248, 249, 250, 0.7)',
          background: '#181928',
        },
      },
      connectWithExpertButton: {
        styleOverrides: {
          background: 'rgba(130, 255, 210, 0.9);',
          border: '1px solid #82FFD2',
          backgroundColor: '#F0FFFA',
        },
      },
      availabilitySectionHeader: {
        styleOverrides: {
          borderBottom: '1px solid rgb(255, 255, 255, 0.2)',
        },
      },
      availableSessionButton: {
        styleOverrides: {
          background: '#8CA4BA',
        },
      },
    },
    inputFieldStates: {
      inputField: {
        styleOverrides: {
          borderColor: '#23BE86',
          color: '#23BE86',
        },
      },
    },
    homePageGradient: {
      homePageGradientBanner: {
        styleOverrides: {
          backgroundColor: '#25273B',
          background: '#3365EF',
        },
      },
    },
    homePageFAQ: {
      homePageAccordionColor: {
        styleOverrides: {
          backgroundColor: '#61617D',
        },
      },
    },
    bannerGradient: {
      expertBannerGradient: {
        styleOverrides: {
          background:
            'linear-gradient(0deg,rgba(9, 11, 26, 0.996453956582633) 20%, rgba(9, 11, 26, 0.871608018207283) 35%, rgba(9, 11, 26, 0.59625787815126055) 50%,rgba(255, 255, 255, 0.006061799719887961) 100%)',
        },
      },
    },
    upcomingAppointmentCard: {
      appointmentCardBorder: {
        styleOverrides: {
          border: '1px solid #61617D',
        },
      },
      appointmentCardBackground: {
        styleOverrides: {
          background: '#414157',
        },
      },
    },
    availableHoursSelect: {
      addAnotherTimeButton: {
        styleOverrides: {
          color: '#FFFFFF',
        },
      },
    },
    expertProfile: {
      expertFavoriteButton: {
        styleOverrides: {
          color: '#1A1A1A',
        },
      },
      expertBookASessionContainer: {
        styleOverrides: {
          background: 'rgb(9 11 26 / 50%)',
        },
      },
      expertMobileCheckoutSheet: {
        styleOverrides: {
          background: '#181928',
        },
      },
      paymentMethodStepButton: {
        styleOverrides: {
          background: '#414157',
        },
      },
      avatarOutlineColor: {
        styleOverrides: {
          boxShadow: '0 0 0 2px rgba(9, 11, 17, 1)',
        },
      },
      expertLabel: {
        styleOverrides: {
          color: '#8CA4BA',
        },
      },
    },
    filterComponent: {
      filterChipSelected: {
        styleOverrides: {
          backgroundColor: '#ffffff',
        },
      },
      filterDividers: {
        styleOverrides: {
          borderColor: 'rgba(255, 255, 255, 0.25)',
        },
      },
    },
    morePage: {
      morePageTopSectionBackground: {
        styleOverrides: {
          background: '#25273B',
        },
      },
      morePageAvatarBorder: {
        styleOverrides: {
          backgroundColor: 'rgb(46,48,67)',
          background:
            'linear-gradient(0deg, rgba(46,48,67,1) 36%, rgba(94,96,117,1) 63%)',
        },
      },
      morePageCircleOne: {
        styleOverrides: {
          background:
            'linear-gradient(181.13deg, rgba(255, 255, 255, 0.04) 0.97%, rgba(255, 255, 255, 0) 61.38%);',
        },
      },
      morePageCircleTwo: {
        styleOverrides: {
          background:
            'linear-gradient(181.13deg, rgba(255, 255, 255, 0.08) 0.97%, rgba(255, 255, 255, 0) 61.38%)',
        },
      },
      unreadCounterBadge: {
        styleOverrides: {
          color: '#1A1A1A',
        },
      },
    },
    messagesPage: {
      messagesPageBorder: {
        styleOverrides: {
          border: '1px solid rgba(255, 255, 255, 0.3)',
        },
      },
      messagesDateColor: {
        styleOverrides: {
          color: '#B8CEE3',
        },
      },
      messagesMobileHeaderColor: {
        styleOverrides: {
          background: '#1A192A',
        },
      },
      messagesMobileDialogColor: {
        styleOverrides: {
          background: '#090B1B',
        },
      },
      messagesMobileDialogBorder: {
        styleOverrides: {
          border: '1px solid rgba(255, 255, 255, 0.3)',
        },
      },
      mobilePopupChatColor: {
        styleOverrides: {
          backgroundColor: '#262836',
        },
      },
      mobilePopupChatBorder: {
        styleOverrides: {
          border: '0.466391px solid #60667C',
        },
      },
    },
    sessionCard: {
      sessionCardBackground: {
        styleOverrides: {
          background: '#25273b',
          backgroundColor: '#5C6E9F',
          boxShadow: '0px 4px 8px #1B1D2D',
          borderColor: 'rgba(37, 39, 59, 0.2)',
        },
      },
      sessionCardIconButton: {
        styleOverrides: {
          background: 'rgba(9, 11, 27, 0.4)',
        },
      },
    },
    consumerWizard: {
      consumerWizardCardBackground: {
        styleOverrides: {
          background: '#414157',
        },
      },
    },
    expertWizard: {
      expertWizardThumbnailBackground: {
        styleOverrides: {
          backgroundColor: '#212436',
        },
      },
    },
    consumerAccount: {
      consumerAccountInputLabel: {
        styleOverrides: {
          color: '#B8CEE3',
        },
      },
    },
    messagesToolbar: {
      messageToolbarColor: {
        styleOverrides: {
          backgroundColor: '#414157',
        },
      },
      messageToolbarHover: {
        styleOverrides: {
          borderColor: 'rgba(35, 190, 134, 1)',
        },
      },
      lockedToolbar: {
        styleOverrides: {
          backgroundColor: '#252639',
        },
      },
    },
    orderCard: {
      orderCardBorderColor: {
        styleOverrides: {
          borderColor: '#61617D',
        },
      },
      orderStatusColor: {
        styleOverrides: {
          color: '#abd1f5',
        },
      },
    },
    paymentMethods: {
      paymentMethodCard: {
        styleOverrides: {
          border: '1px solid #090B1B',
        },
      },
      addPaymentMethodCard: {
        styleOverrides: {
          background: 'rgba(65, 65, 87, 0.3)',
          border: '1px dashed rgba(184, 206, 227, 0.6)',
        },
      },
      bankAccount: {
        styleOverrides: {
          color: '#b8cee3',
          borderColor: 'rgba(184, 206, 227, 0.3)',
        },
      },
      mobileState: {
        styleOverrides: {
          borderColor: 'rgba(184, 206, 227, 0.3)',
        },
      },
    },
    sessionDetails: {
      sessionDetailsBorder: {
        styleOverrides: {
          borderColor: 'rgba(184, 206, 227, 0.3)',
        },
      },
      SessionCostAndNotesLabel: {
        styleOverrides: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
      dialogs: {
        dialog: {
          styleOverrides: {
            backgroundColor: '#414157',
          },
        },
        cancellationField: {
          styleOverrides: {
            backgroundColor: '#2D2D40',
          },
        },
        calendar: {
          styleOverrides: {
            backgroundColor: '#3fa3ff',
          },
        },
      },
    },
    pageWithWallpaper: {
      wallpaperGradient: {
        styleOverrides: {
          background:
            'linear-gradient(211deg,rgb(139 151 185) 0%,rgb(9 11 27) 28%)',
        },
      },
      main: {
        styleOverrides: {
          background: defaultBackground,
        },
      },
    },
    globalSearch: {
      button: {
        background: '#2F2E44',
        borderStyle: 'solid',
        borderColor: '#4F4F5D',
        borderWidth: '0 0 0 1px',
        borderRadius: '0',
      },
      mobileBackgroundColor: {
        styleOverrides: {
          backgroundColor: '#1A192A',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.65)',
        },
      },
    },
    drawer: {
      listItem: {
        icon: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        selected: {
          backgroundColor: '#414157',
        },
      },
    },
    signupAs: {
      cardButton: {
        styleOverrides: {
          border: '1px solid rgb(140, 164, 186, 0.4)',
        },
      },
      expertCardTop: {
        styleOverrides: {
          background: defaultBackground,
        },
      },
      expertCardBottom: {
        styleOverrides: {
          background: '#232539',
        },
      },
      expertCardText: {
        styleOverrides: {
          color: '#3FA3FF',
        },
      },
    },
    consumerDrawer: {
      drawerListItem: {
        backgroundColor: '#414157',
      },
      drawerListItemIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
      scheduleCount: {
        styleOverrides: {
          color: '#FFFFFF',
          background: '#2f303d',
        },
      },
    },
    miniStarRating: {
      ratingValue: {
        styleOverrides: {
          color: '#dcb555',
        },
      },
      ratingContainer: {
        styleOverrides: {
          color: primaryTextColor,
        },
      },
      ratingCount: {
        styleOverrides: {
          color: primaryTextColor,
        },
      },
    },
    mobileNavigation: {
      mobileNavigationContainer: {
        styleOverrides: {
          background: paperBackground,
        },
      },
      navigationIndicator: {
        styleOverrides: {
          background: '#FFFFFF',
        },
      },
      navigationLink: {
        styleOverrides: {
          background: '#090b1b',
        },
      },
    },
    chatComponent: {
      messagingChannelSelectedState: {
        styleOverrides: {
          backgroundColor: '#181928',
        },
      },
      popupChat: {
        styleOverrides: {
          boxShadow: '0px 1.86556px 8px rgba(0, 0, 0, 0.35)',
        },
      },
      messagingExpiring: {
        styleOverrides: {
          backgroundColor: '#E3B749',
        },
      },
    },
    postSessionRating: {
      submitCommentButton: {
        styleOverrides: {
          background: '#ffffff',
          opacity: 0.3,
          color: 'rgba(9, 11, 27, 0.4)',
        },
      },
      shareReviewText: {
        styleOverrides: {
          color: '#3FA3FF',
        },
      },
    },
    meetingControls: {
      meetingControlButton: {
        styleOverrides: {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
    expertCardBig: {
      userAvatar: {
        styleOverrides: {
          border: `2px solid ${paperBackground}`,
        },
      },
      interestedInExpertCard: {
        styleOverrides: {
          border: 'none',
        },
      },
    },
    expertCardSmall: {
      userAvatar: {
        styleOverrides: {
          border: `1px solid ${paperBackground}`,
        },
      },
      interestedInExpertCard: {
        styleOverrides: {
          border: 'none',
        },
      },
    },
    ratePerHour: {
      ratePerHourContainer: {
        styleOverrides: {
          color: primaryTextColor,
        },
      },
    },
    calendar: {
      calendar: {
        calendar: {
          styleOverrides: {
            color: '#FFFFFF',
          },
        },
        appointments: {
          styleOverrides: {
            background: '#3FA3FF',
            color: '#000000',
          },
        },
      },
      sessionListContainer: {
        mobileState: {
          styleOverrides: {
            backgroundColor: '#1a1c2f', //'transparent',
            color: '#25283c',
          },
        },
      },
      sessionCard: {
        sessionCard: {
          styleOverrides: {
            border: '1px solid rgba(255, 255, 255, 0.3)',
          },
        },
        checkInButton: {
          normalState: {
            styleOverrides: {
              border: '1px solid #FFFFFF',
              color: '#FFFFFF',
              background: 'transparent',
            },
          },
          hoverState: {
            styleOverrides: {
              border: '1px solid #FFFFFF',
              color: '#1A1A1A',
              background: '#FFFFFF',
            },
          },
        },
      },
      emptySessionDisplay: {
        styleOverrides: {
          color: '#FFFFFF',
          opacity: 0.6,
        },
      },
    },
    horizontalScrollableContainer: {
      arrowButton: {
        normalState: {
          styleOverrides: {
            backgroundColor: '#414157',
            borderColor: '#181928',
          },
        },
        hoverState: {
          styleOverrides: {
            backgroundColor: '#181928',
            borderColor: '#414157',
          },
        },
      },
      arrowButtonContainer: {
        left: {
          styleOverrides: {
            background: `linear-gradient(
              89.6deg,
              #090b1b 0.35%,
              rgba(9, 11, 27, 0) 99.66%
            )`,
          },
        },
        right: {
          styleOverrides: {
            background: `linear-gradient(
              89.6deg,
              rgba(9, 11, 27, 0) 0.35%,
              #090b1b 99.66%
            )`,
          },
        },
      },
    },
    QRCodeStep: {
      codeInstructionsSection: {
        styleOverrides: {
          border: '1px solid rgb(255, 255, 255, 0.2)',
        },
      },
      codeToEnter: {
        styleOverrides: {
          color: 'rgba(63, 163, 255, 1)',
        },
      },
      qrCodeSection: {
        styleOverrides: {
          backgroundImage: 'url("/static/img/dark-mode-corners.svg")',
        },
      },
    },
    codeVerificationDialog: {
      authCodeSection: {
        input: {
          styleOverrides: {
            background: 'rgb(43, 45, 61, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            color: primaryTextColor,
          },
        },
      },
    },
    phoneNumberStep: {
      phoneNumberLabel: {
        styleOverrides: {
          color: '#B8CEE3',
        },
      },
    },
    explorePage: {
      recommendedSection: {
        styleOverrides: {
          backgroundColor: 'rgba(26, 25, 42, 0.6)',
        },
      },
    },
    expertResultCard: {
      expertName: {
        styleOverrides: {
          color: '#3FA3FF',
        },
      },
    },
    securityPage: {
      changePasswordDialog: {
        changePasswordLabel: {
          styleOverrides: {
            color: '#B8CEE3',
          },
        },
        changePasswordInput: {
          styleOverrides: {
            backgroundColor: 'rgba(38, 40, 54, 0.8)',
          },
        },
        dialog: {
          styleOverrides: {
            backgroundColor: '#090B1B',
          },
        },
      },
    },
    notificationItem: {
      notificationItemContainer: {
        styleOverrides: {
          background: 'rgb(51, 101, 239, 0.3)',
        },
      },
      styledDivider: {
        styleOverrides: {
          background: 'rgba(38, 40, 54, 1)',
        },
      },
    },
    sessionRecording: {
      videoRecordingContainer: {
        styleOverrides: {},
      },
    },
    desktopSignupWallpaper: {
      wallpaperImage: {
        styleOverrides: {
          background:
            'url("/static/img/desktop-signup/signup-wallpaper-dark.png") no-repeat',
        },
      },
      imageSection: {
        styleOverrides: {
          background: defaultBackground,
        },
      },
    },
    notificationTray: {
      styledBadge: {
        styleOverrides: {
          color: 'rgba(0, 0, 0, 0.87)',
          backgroundColor: '#ABD1F5',
        },
      },
    },
    attachment: {
      attachmentContainer: {
        styleOverrides: {
          background: '#61617d',
        },
      },
    },
    guestUserAuthReasonMessage: {
      messageSection: {
        styleOverrides: {
          background: 'rgba(26, 47, 112, 1)',
        },
      },
    },
    consumerHomePage: {
      guestUserHomePageContainer: {
        styleOverrides: {
          backgroundImage:
            'url("/static/img/home-page/background-hero-dark.png")',
          backgroundColor: '#25273b',
        },
      },
    },
    guestHomePageFooter: {
      mobileSection: {
        styleOverrides: {
          backgroundColor: '#25273b',
        },
      },
      styledDivider: {
        styleOverrides: {
          backgroundColor: '#16182b',
        },
      },
    },
    desktopLogin: {
      loginFormContainer: {
        styleOverrides: {
          backgroundColor: '#090b1b',
        },
      },
    },
  },
}

export const DarkTheme = merge({}, CommonTheme, DarkThemeDefinition)
