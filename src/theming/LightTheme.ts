import merge from 'lodash/merge'

import { AppThemeOptions } from 'theming/AppTheme'
import { CommonTheme } from 'theming/CommonTheme'

const primaryColor = '#3365EF'
const defaultBackground = '#F3F7FB'
const paperBackground = '#FDFFFF;'
const primaryTextColor = '#1A1A1A'
const secondaryTextColor = '#5C6E9F'

export const LightThemeDefinition: AppThemeOptions = {
  ...CommonTheme,
  palette: {
    mode: 'light',
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: '#B8CEE3',
    },
    tertiary: {
      main: '#5C6E9F',
    },
    text: {
      primary: primaryTextColor,
      secondary: secondaryTextColor,
    },
    background: {
      default: defaultBackground,
      paper: paperBackground,
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: paperBackground,
          color: '#1A1A1A',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3365EF',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3365EF',
          },
          '&.Mui-error': {
            background: '#FACBBF',
            color: '#1A1A1A',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF6B49',
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
                backgroundColor: '#3365EF',
                opacity: 1,
                border: 0,
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
              },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
              color: '#3365EF',
              border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
              color: '#757575',
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.3,
            },
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
          },
          '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: '#E9E9EA',
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
            backgroundColor: '#3365EF',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#293F98',
            },
            '&.Mui-disabled': {
              color: 'rgb(41, 63, 152, 0.3)',
              backgroundColor: 'rgba(51, 101, 239, 0.15)',
            },
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: '#B8CEE3',
            '&:hover': {
              backgroundColor: '#96B3CE',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(171, 209, 245, 0.5)',
              color: 'rgba(9, 11, 27, 0.4)',
            },
          },
          '&.MuiButton-outlinedPrimary': {
            borderColor: '#5C6E9F',
            color: '#5C6E9F',
            '&:hover': {
              backgroundColor: '#5C6E9F',
              color: '#FFFFFF',
            },
            '&.Mui-disabled': {
              borderColor: 'rgba(92, 110, 159, 0.3)',
              color: 'rgba(9, 11, 27, 0.4)',
            },
          },
        },
      },
    },
  },
  customComponents: {
    logo: {
      styleOverrides: {
        color: '#293F98',
      },
    },
    availableSessions: {
      availableSessionsContainer: {
        styleOverrides: {
          border: '1px solid #b8cee3',
          background: '#FFFFFF',
        },
      },
      availableDate: {
        styleOverrides: {
          border: '1px solid #b8cee3',
        },
      },
      availableTime: {
        styleOverrides: {
          border: '1px solid #B8CEE3',
          background: '#FFFFFF',
        },
      },
      connectWithExpertButton: {
        styleOverrides: {
          background: 'rgba(66, 191, 147, 0.3)',
          border: '1px solid #3D9A79',
          backgroundColor: 'rgba(66, 191, 147, 0.7)',
        },
      },
      availabilitySectionHeader: {
        styleOverrides: {
          borderBottom: '1px solid rgb(92, 110, 159, 0.2)',
        },
      },
      availableSessionButton: {
        styleOverrides: {
          background: '#D7E2EC',
        },
      },
    },
    inputFieldStates: {
      inputField: {
        styleOverrides: {
          borderColor: '#2A9680',
          color: '#39C5A9',
        },
      },
    },
    homePageGradient: {
      homePageGradientBanner: {
        styleOverrides: {
          backgroundColor: '#B8CEE3',
          background: '#FFFFFF',
        },
      },
    },
    homePageFAQ: {
      homePageAccordionColor: {
        styleOverrides: {
          backgroundColor: '#FFFFFF',
          border: '1px solid #B8CEE3',
        },
      },
    },
    bannerGradient: {
      expertBannerGradient: {
        styleOverrides: {
          background:
            'linear-gradient(0deg, #F3F7FB 9.55%, rgba(243, 247, 251, 0) 55.73%)',
        },
      },
    },
    upcomingAppointmentCard: {
      appointmentCardBorder: {
        styleOverrides: {
          border: '1px solid #B8CEE3;',
        },
      },
      appointmentCardBackground: {
        styleOverrides: {
          background: '#F8F9FA',
        },
      },
    },
    availableHoursSelect: {
      addAnotherTimeButton: {
        styleOverrides: {
          color: '#5C6E9F',
        },
      },
    },
    expertProfile: {
      expertFavoriteButton: {
        styleOverrides: {
          color: '#ffffff',
        },
      },
      expertBookASessionContainer: {
        styleOverrides: {
          background: 'rgb(243 247 251 / 50%)',
        },
      },
      expertMobileCheckoutSheet: {
        styleOverrides: {
          background: '#FFFFFF',
        },
      },
      paymentMethodStepButton: {
        styleOverrides: {
          background: '#D7E2EC',
        },
      },
      avatarOutlineColor: {
        styleOverrides: {
          boxShadow: '0 0 0 2px rgba(243, 247, 251, 1)',
        },
      },
      expertLabel: {
        styleOverrides: {
          color: '#5C6E9F',
        },
      },
    },
    filterComponent: {
      filterChipSelected: {
        styleOverrides: {
          backgroundColor: '#B8CEE3',
        },
      },
      filterDividers: {
        styleOverrides: {
          borderColor: 'rgba(0, 0, 0, 0.12)',
        },
      },
    },
    morePage: {
      morePageTopSectionBackground: {
        styleOverrides: {
          background: '#FFFFFF',
        },
      },
      morePageAvatarBorder: {
        styleOverrides: {
          backgroundColor: 'rgb(239, 242, 246)',
          background:
            'linear-gradient(0deg, rgba(239, 242, 246, 1) 29%,rgba(162, 170, 195, 1) 66%)',
        },
      },
      morePageCircleOne: {
        styleOverrides: {
          background:
            'linear-gradient(181.13deg, rgba(92, 110, 159, 0.1) 0.97%, rgba(178, 199, 219, 0) 61.38%)',
        },
      },
      morePageCircleTwo: {
        styleOverrides: {
          background:
            'linear-gradient(181.13deg, rgba(92, 110, 159, 0.2) 0.97%, rgba(178, 199, 219, 0.06) 61.38%)',
        },
      },
      unreadCounterBadge: {
        styleOverrides: {
          color: '#FFFFFF',
        },
      },
    },
    messagesPage: {
      messagesPageBorder: {
        styleOverrides: {
          border: '1px solid rgba(140, 164, 186, 0.6)',
        },
      },
      messagesDateColor: {
        styleOverrides: {
          color: '#5C6E9F',
        },
      },
      messagesMobileHeaderColor: {
        styleOverrides: {
          background: '#F3F7FB',
        },
      },
      messagesMobileDialogColor: {
        styleOverrides: {
          background: '#FFFFFF',
        },
      },
      messagesMobileDialogBorder: {
        styleOverrides: {
          border: '1px solid rgba(28, 35, 58, 0.1)',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
      mobilePopupChatColor: {
        styleOverrides: {
          backgroundColor: '#F8F9FA',
        },
      },
      mobilePopupChatBorder: {
        styleOverrides: {
          border: '0.466391px solid #5C6E9F',
        },
      },
    },
    sessionCard: {
      sessionCardBackground: {
        styleOverrides: {
          background: '#FFFFFF',
          border: '1px solid #B8CEE3',
          backgroundColor: '#F3F7FB',
          boxShadow: '0px 4px 8px rgba(27, 29, 45, 0.1)',
          borderColor: '#B8CEE3',
        },
      },
      sessionCardIconButton: {
        styleOverrides: {
          background: 'rgb(150 150 150 / 40%)',
        },
      },
    },
    consumerWizard: {
      consumerWizardCardBackground: {
        styleOverrides: {
          background: '#E6ECF2',
        },
      },
    },
    expertWizard: {
      expertWizardThumbnailBackground: {
        styleOverrides: {
          backgroundColor: '#d3d5df',
        },
      },
    },
    consumerAccount: {
      consumerAccountInputLabel: {
        styleOverrides: {
          color: '#5C6E9F',
        },
      },
    },
    messagesToolbar: {
      messageToolbarColor: {
        styleOverrides: {
          backgroundColor: '#FFFFFF',
        },
      },
      messageToolbarHover: {
        styleOverrides: {
          borderColor: 'rgba(42, 150, 128, 1)',
        },
      },
      lockedToolbar: {
        styleOverrides: {
          backgroundColor: '#E6ECF2',
        },
      },
    },
    orderCard: {
      orderCardBorderColor: {
        styleOverrides: {
          borderColor: '#B8CEE3',
        },
      },
      orderStatusColor: {
        styleOverrides: {
          color: '#5C6E9F',
        },
      },
    },
    paymentMethods: {
      paymentMethodCard: {
        styleOverrides: {
          border: '1px solid #8CA4BA',
        },
      },
      addPaymentMethodCard: {
        styleOverrides: {
          background: 'rgba(184, 206, 227, 0.3)',
          border: '1px dashed #5C6E9F',
        },
      },
      bankAccount: {
        styleOverrides: {
          color: '#5C6E9F',
          borderColor: '#5C6E9F',
        },
      },
      mobileState: {
        styleOverrides: {
          borderColor: 'rgba(92, 110, 159, 0.4)',
        },
      },
    },
    sessionDetails: {
      sessionDetailsBorder: {
        styleOverrides: {
          borderColor: 'rgb(0 0 0 / 30%)',
        },
      },
      SessionCostAndNotesLabel: {
        styleOverrides: {
          color: 'rgb(26, 26, 26, 0.6)',
        },
      },
      dialogs: {
        calendar: {
          styleOverrides: {
            backgroundColor: '#3365EF',
          },
        },
      },
    },
    pageWithWallpaper: {
      wallpaperGradient: {
        styleOverrides: {
          background:
            'linear-gradient(227deg,rgb(179 199 255) 1%,rgba(246, 246, 246, 1) 28%)',
        },
      },
      main: {
        styleOverrides: {
          background: '#FFFFFF',
        },
      },
    },
    globalSearch: {
      button: {
        background: 'rgba(209, 221, 233, 0.4)',
        borderStyle: 'solid',
        borderColor: '#B8CEE3',
        borderWidth: '0 0 0 1px',
        borderRadius: '0',
      },
      mobileBackgroundColor: {
        styleOverrides: {
          backgroundColor: '#F3F7FB',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    drawer: {
      listItem: {
        icon: {
          backgroundColor: 'rgba(63, 163, 255, 0.1)',
        },
        selected: {
          backgroundColor: '#3FA3FF',
        },
      },
    },
    signupAs: {
      cardButton: {
        styleOverrides: {
          border: '1px solid rgb(26, 26, 26, 0.15)',
        },
      },
      expertCardTop: {
        styleOverrides: {
          background: '#D7ECFF',
        },
      },
      expertCardBottom: {
        styleOverrides: {
          background: '#FFFFFF',
        },
      },
      expertCardText: {
        styleOverrides: {
          color: '#3365ef',
        },
      },
    },
    consumerDrawer: {
      drawerListItem: {
        backgroundColor: 'rgb(63, 163, 255, 0.1)',
      },
      drawerListItemIcon: {
        backgroundColor: 'rgb(63, 163, 255, 0.1)',
      },
      scheduleCount: {
        styleOverrides: {
          color: '#1A1A1A',
          background: '#B8CEE3',
        },
      },
    },
    miniStarRating: {
      ratingValue: {
        styleOverrides: {
          color: '#AF8211',
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
          background: '#FFFFFF',
        },
      },
      navigationIndicator: {
        styleOverrides: {
          background: '#000000',
        },
      },
      navigationLink: {
        styleOverrides: {
          background: '#F3F7FB',
        },
      },
    },
    chatComponent: {
      messagingChannelSelectedState: {
        styleOverrides: {
          backgroundColor: '#E6ECF2',
        },
      },
      popupChat: {
        styleOverrides: {
          boxShadow: '0px 1.86556px 8px rgba(51, 101, 239, 0.15)',
        },
      },
      messagingExpiring: {
        styleOverrides: {
          backgroundColor: '#F8DB94',
        },
      },
    },
    postSessionRating: {
      submitCommentButton: {
        styleOverrides: {
          background: '#3365ef',
          opacity: 0.15,
          color: 'rgba(41, 63, 152, 1)',
        },
      },
      shareReviewText: {
        styleOverrides: {
          color: '#3365EF',
        },
      },
    },
    meetingControls: {
      meetingControlButton: {
        styleOverrides: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
          border: '1px solid #B8CEE3',
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
          border: '1px solid #B8CEE3',
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
            color: '#1A1A1A',
          },
        },
        appointments: {
          styleOverrides: {
            background: '#3365EF',
          },
        },
      },
      sessionListContainer: {
        mobileState: {
          styleOverrides: {
            backgroundColor: '#C9CED6',
            color: '#F3F7FB',
          },
        },
      },
      sessionCard: {
        sessionCard: {
          styleOverrides: {
            border: '1px solid #B8CEE3',
          },
        },
        checkInButton: {
          normalState: {
            styleOverrides: {
              border: '1px solid #5C6E9F',
              color: '#5C6E9F',
              background: 'transparent',
            },
          },
          hoverState: {
            styleOverrides: {
              border: '1px solid #5C6E9F',
              color: '#FFFFFF',
              background: '#5C6E9F',
            },
          },
        },
      },
      emptySessionDisplay: {
        styleOverrides: {
          color: '#1A1A1A',
          opacity: 0.6,
        },
      },
    },
    horizontalScrollableContainer: {
      arrowButton: {
        normalState: {
          styleOverrides: {
            backgroundColor: '#FFFFFF',
            borderColor: '#B8CEE3',
          },
        },
        hoverState: {
          styleOverrides: {
            backgroundColor: '#B8CEE3',
            borderColor: '#FFFFFF',
          },
        },
      },
      arrowButtonContainer: {
        left: {
          styleOverrides: {
            background: `linear-gradient(
              89.6deg,
              #F3F7FB 0.35%,
              rgba(9, 11, 27, 0) 99.66%
            )`,
          },
        },
        right: {
          styleOverrides: {
            background: `linear-gradient(
              89.6deg,
              rgba(9, 11, 27, 0) 0.35%,
              #F3F7FB 99.66%
            )`,
          },
        },
      },
    },
    QRCodeStep: {
      codeInstructionsSection: {
        styleOverrides: {
          border: '1px solid rgb(92, 110, 159, 0.3)',
        },
      },
      codeToEnter: {
        styleOverrides: {
          color: 'rgba(63, 163, 255, 1)',
        },
      },
      qrCodeSection: {
        styleOverrides: {
          backgroundImage: 'url("/static/img/light-mode-corners.svg")',
        },
      },
    },
    codeVerificationDialog: {
      authCodeSection: {
        input: {
          styleOverrides: {
            background: 'rgba(43, 45, 61, 0.1)',
            border: '1px solid  rgb(22, 40, 89, 0.2)',
            color: primaryTextColor,
          },
        },
      },
    },
    phoneNumberStep: {
      phoneNumberLabel: {
        styleOverrides: {
          color: 'rgba(92, 110, 159, 1)',
        },
      },
    },
    explorePage: {
      recommendedSection: {
        styleOverrides: {
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        },
      },
    },
    expertResultCard: {
      expertName: {
        styleOverrides: {
          color: '#3365EF',
        },
      },
    },
    securityPage: {
      changePasswordDialog: {
        changePasswordLabel: {
          styleOverrides: {
            color: '#5C6E9F',
          },
        },
        changePasswordInput: {
          styleOverrides: {
            backgroundColor: 'transparent',
          },
        },
        dialog: {
          styleOverrides: {
            backgroundColor: '#F3F7FB',
          },
        },
      },
    },
    notificationItem: {
      notificationItemContainer: {
        styleOverrides: {
          background: 'rgb(171, 209, 245, 0.5)',
        },
      },
      styledDivider: {
        styleOverrides: {
          background: 'rgba(184, 206, 227, 1)',
        },
      },
    },
    sessionRecording: {
      videoRecordingContainer: {
        styleOverrides: {
          border: '1px solid #b8cee3',
        },
      },
    },
    desktopSignupWallpaper: {
      wallpaperImage: {
        styleOverrides: {
          background:
            'url("/static/img/desktop-signup/signup-wallpaper-light.png") no-repeat',
        },
      },
      imageSection: {
        styleOverrides: {
          background: '#FFFFFF',
        },
      },
    },
    notificationTray: {
      styledBadge: {
        styleOverrides: {
          color: '#FFFFFF',
          backgroundColor: '#3365EF',
        },
      },
    },
    attachment: {
      attachmentContainer: {
        styleOverrides: {
          background: '#c6cee0',
        },
      },
    },
    guestUserAuthReasonMessage: {
      messageSection: {
        styleOverrides: {
          background: 'rgb(51, 101, 239, 0.1)',
        },
      },
    },
    consumerHomePage: {
      guestUserHomePageContainer: {
        styleOverrides: {
          backgroundImage:
            'url("/static/img/home-page/background-hero-light.jpg")',
          backgroundColor: '#dce7f1',
        },
      },
    },
    guestHomePageFooter: {
      mobileSection: {
        styleOverrides: {
          backgroundColor: '#b8cee3',
        },
      },
      styledDivider: {
        styleOverrides: {
          backgroundColor: '#97B1CA',
        },
      },
    },
    desktopLogin: {
      loginFormContainer: {
        styleOverrides: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
}

export const LightTheme = merge({}, CommonTheme, LightThemeDefinition)
