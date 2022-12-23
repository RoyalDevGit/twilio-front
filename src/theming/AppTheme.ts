import type * as CSS from 'csstype'
import {
  Theme,
  ThemeOptions,
  PaletteOptions,
  Palette,
  PaletteColor,
  PaletteColorOptions,
} from '@mui/material/styles'

import type {} from '@mui/x-date-pickers/themeAugmentation'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    mobileS: true
    mobileM: true
    mobileL: true
    tablet: true
    laptop: true
    laptopL: true
    fourK: true
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true
  }
}

export interface AppPalette extends Palette {
  tertiary: PaletteColor
}

export interface AppPaletteOptions extends PaletteOptions {
  tertiary: PaletteColorOptions
}

export interface CustomComponentOptions {
  styleOverrides: CSS.Properties
}

export interface CustomComponents {
  logo: CustomComponentOptions
  availableSessions: {
    availableSessionsContainer: CustomComponentOptions
    availableDate: CustomComponentOptions
    connectWithExpertButton: CustomComponentOptions
    availableTime: CustomComponentOptions
    availabilitySectionHeader: CustomComponentOptions
    availableSessionButton: CustomComponentOptions
  }
  inputFieldStates: {
    inputField: CustomComponentOptions
  }
  homePageGradient: {
    homePageGradientBanner: CustomComponentOptions
  }
  homePageFAQ: {
    homePageAccordionColor: CustomComponentOptions
  }
  bannerGradient: {
    expertBannerGradient: CustomComponentOptions
  }
  upcomingAppointmentCard: {
    appointmentCardBorder: CustomComponentOptions
    appointmentCardBackground: CustomComponentOptions
  }
  availableHoursSelect: {
    addAnotherTimeButton: CustomComponentOptions
  }
  expertProfile: {
    expertFavoriteButton: CustomComponentOptions
    expertBookASessionContainer: CustomComponentOptions
    expertMobileCheckoutSheet: CustomComponentOptions
    paymentMethodStepButton: CustomComponentOptions
    avatarOutlineColor: CustomComponentOptions
    expertLabel: CustomComponentOptions
  }
  filterComponent: {
    filterChipSelected: CustomComponentOptions
    filterDividers: CustomComponentOptions
  }
  morePage: {
    morePageTopSectionBackground: CustomComponentOptions
    morePageAvatarBorder: CustomComponentOptions
    morePageCircleOne: CustomComponentOptions
    morePageCircleTwo: CustomComponentOptions
    unreadCounterBadge: CustomComponentOptions
  }
  messagesPage: {
    messagesPageBorder: CustomComponentOptions
    messagesDateColor: CustomComponentOptions
    messagesMobileHeaderColor: CustomComponentOptions
    messagesMobileDialogColor: CustomComponentOptions
    messagesMobileDialogBorder: CustomComponentOptions
    mobilePopupChatColor: CustomComponentOptions
    mobilePopupChatBorder: CustomComponentOptions
  }
  sessionCard: {
    sessionCardBackground: CustomComponentOptions
    sessionCardIconButton: CustomComponentOptions
  }
  consumerWizard: {
    consumerWizardCardBackground: CustomComponentOptions
  }
  expertWizard: {
    expertWizardThumbnailBackground: CustomComponentOptions
  }
  consumerAccount: {
    consumerAccountInputLabel: CustomComponentOptions
  }
  messagesToolbar: {
    messageToolbarColor: CustomComponentOptions
    messageToolbarHover: CustomComponentOptions
    lockedToolbar: CustomComponentOptions
  }
  orderCard: {
    orderCardBorderColor: CustomComponentOptions
    orderStatusColor: CustomComponentOptions
  }
  paymentMethods: {
    paymentMethodCard: CustomComponentOptions
    addPaymentMethodCard: CustomComponentOptions
    bankAccount: CustomComponentOptions
    desktopState?: CustomComponentOptions
    mobileState: CustomComponentOptions
  }
  sessionDetails: {
    sessionDetailsBorder: CustomComponentOptions
    SessionCostAndNotesLabel: CustomComponentOptions
    dialogs?: {
      dialog?: CustomComponentOptions
      cancellationField?: CustomComponentOptions
      calendar: CustomComponentOptions
    }
  }
  pageWithWallpaper: {
    wallpaperGradient: CustomComponentOptions
    main: CustomComponentOptions
  }
  videoEditor: {
    videoPreview: CSS.Properties
  }
  globalSearch: {
    button: CSS.Properties
    mobileBackgroundColor: CustomComponentOptions
  }
  drawer: {
    listItem: CSS.Properties & {
      selected: CSS.Properties
      icon: CSS.Properties
    }
  }
  signupAs: {
    cardButton: CustomComponentOptions
    expertCardTop: CustomComponentOptions
    expertCardBottom: CustomComponentOptions
    expertCardText: CustomComponentOptions
  }
  consumerDrawer: {
    drawerListItem: CSS.Properties & {
      backgroundColor: CSS.Properties
    }
    drawerListItemIcon: CSS.Properties & {
      backgroundColor: CSS.Properties
    }
    scheduleCount: CustomComponentOptions
  }
  miniStarRating: {
    ratingValue: CustomComponentOptions
    ratingContainer: CustomComponentOptions
    ratingCount: CustomComponentOptions
  }
  mobileNavigation: {
    mobileNavigationContainer: CustomComponentOptions
    navigationIndicator: CustomComponentOptions
    navigationLink: CustomComponentOptions
  }
  chatComponent: {
    messagingChannelSelectedState: CustomComponentOptions
    popupChat: CustomComponentOptions
    messagingExpiring: CustomComponentOptions
  }
  postSessionRating: {
    submitCommentButton: CustomComponentOptions
    shareReviewText: CustomComponentOptions
  }
  meetingControls: {
    meetingControlButton: CustomComponentOptions
  }
  expertCardBig: {
    userAvatar: CustomComponentOptions
    interestedInExpertCard: CustomComponentOptions
  }
  expertCardSmall: {
    userAvatar: CustomComponentOptions
    interestedInExpertCard: CustomComponentOptions
  }
  ratePerHour: {
    ratePerHourContainer: CustomComponentOptions
  }
  calendar: {
    calendar: {
      calendar: CustomComponentOptions
      appointments?: CustomComponentOptions
    }
    sessionListContainer: {
      desktopState?: CustomComponentOptions
      mobileState: CustomComponentOptions
    }
    sessionCard: {
      sessionCard?: CustomComponentOptions
      checkInButton: {
        normalState: CustomComponentOptions
        hoverState: CustomComponentOptions
      }
    }
    emptySessionDisplay: CustomComponentOptions
  }
  horizontalScrollableContainer: {
    arrowButton: {
      normalState: CustomComponentOptions
      hoverState: CustomComponentOptions
    }
    arrowButtonContainer: {
      left: CustomComponentOptions
      right: CustomComponentOptions
    }
  }
  QRCodeStep: {
    codeInstructionsSection: CustomComponentOptions
    codeToEnter: CustomComponentOptions
    qrCodeSection: CustomComponentOptions
  }
  codeVerificationDialog: {
    authCodeSection: {
      input: CustomComponentOptions
    }
  }
  phoneNumberStep: {
    phoneNumberLabel: CustomComponentOptions
  }
  explorePage: {
    recommendedSection: CustomComponentOptions
  }
  securityPage: {
    changePasswordDialog: {
      changePasswordLabel: CustomComponentOptions
      changePasswordInput: CustomComponentOptions
      dialog: CustomComponentOptions
    }
  }
  expertResultCard: {
    expertName: CustomComponentOptions
  }
  notificationItem: {
    notificationItemContainer: CustomComponentOptions
    styledDivider: CustomComponentOptions
  }
  sessionRecording: {
    videoRecordingContainer: CustomComponentOptions
  }
  desktopSignupWallpaper: {
    wallpaperImage: CustomComponentOptions
    imageSection: CustomComponentOptions
  }
  notificationTray: {
    styledBadge: CustomComponentOptions
  }
  attachment: {
    attachmentContainer: CustomComponentOptions
  }
  guestUserAuthReasonMessage: {
    messageSection: CustomComponentOptions
  }
  consumerHomePage: {
    guestUserHomePageContainer: CustomComponentOptions
  }
  guestHomePageFooter: {
    mobileSection: CustomComponentOptions
    styledDivider: CustomComponentOptions
  }
  desktopLogin: {
    loginFormContainer: CustomComponentOptions
  }
}

export interface AppThemeOptions extends ThemeOptions {
  palette?: AppPaletteOptions
  customComponents: Partial<CustomComponents>
}

export interface AppTheme
  extends Theme,
    Pick<AppThemeOptions, 'customComponents'> {
  palette: AppPalette
  customComponents: CustomComponents
}
