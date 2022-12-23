/* eslint-disable import/no-default-export */
import { useMount } from 'react-use'
import Head from 'next/head'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { appWithTranslation } from 'next-i18next'
import { AppProps as NextAppProps } from 'next/app'
import { MutableSnapshot, RecoilRoot } from 'recoil'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { SnackbarProvider } from 'notistack'
import Script from 'next/script'

import { ThemeProvider } from 'theming/ThemeProvider'
import { GlobalStyle } from 'styles/GlobalStyle'
import { userState } from 'state/userState'
import { AppState } from 'interfaces/AppState'
import { createEmotionCache } from 'utils/styles/createEmotionCache'
import { expertState } from 'state/expertState'
import { drawerCollapsedState } from 'state/drawerState'
import { TrayNotification } from 'interfaces/TrayNotification'
import { NotificationSnack } from 'components/Snacks/Notification'
import { MessageSnack } from 'components/Snacks/Message'
import { ChannelMessage } from 'interfaces/ChannelMessage'
import { ExtendSessionConsumerSnack } from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionConsumer'
import { ExtendSessionExpertSnack } from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionExpert'
import { ExtendSessionSuccessfulSnack } from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionSuccessful'
import { ExtendSessionDeclinedSnack } from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionDeclined'
import { ExtendSessionCheckoutSnack } from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionCheckout'
import { SessionExtensionRequest } from 'interfaces/SessionExtensionRequest'
import { Session } from 'interfaces/Session'
import { ExtendSessionPendingSnack } from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionPending'
import { ExtendSessionWithdrawnSnack } from 'pageComponents/SessionRoom/ExtensionPrompts/ExtendSessionWithdrawn'
import { ExpertInstantAvailability } from 'interfaces/ExpertAvailability'
import { Config } from 'utils/config'
import AppWideComponentsWrapper from 'pageComponents/AppWideComponents/AppWideComponentWrapper'
import ClientSideStateSync from 'components/ClientSideStateSync'

const GTM_ID = Config.getString('GTM_ID')

declare module 'notistack' {
  interface VariantOverrides {
    notification: {
      notification: TrayNotification
    }
    message: {
      incomingMessage: ChannelMessage
    }
    extendSessionConsumer: {
      session: Session
      extensionRequest?: SessionExtensionRequest
    }
    extendSessionExpert: {
      session: Session
      availability: ExpertInstantAvailability
      extensionRequest?: SessionExtensionRequest
    }
    extendSessionSuccessful: {
      extensionRequest: SessionExtensionRequest
    }
    extendSessionDeclined: {
      extensionRequest: SessionExtensionRequest
    }
    extendSessionCheckout: {
      extensionRequest: SessionExtensionRequest
    }
    extendSessionPending: {
      extensionRequest: SessionExtensionRequest
    }
    extendSessionWithdrawn: {
      extensionRequest: SessionExtensionRequest
    }
  }
}

const clientSideEmotionCache = createEmotionCache()

const initializeRecoilState =
  (
    initialRecoilState: AppState
  ): ((mutableSnapshot: MutableSnapshot) => void) =>
  ({ set }): void => {
    if (!initialRecoilState) {
      return
    }
    const {
      user,
      expert,
      drawerCollapsedState: drawerCollapsedStateValue,
    } = initialRecoilState
    if (user) {
      set(userState, user)
    }
    if (expert) {
      set(expertState, expert)
    }
    if (drawerCollapsedStateValue) {
      set(drawerCollapsedState, drawerCollapsedStateValue)
    }
  }

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache
  pageProps: {
    initialState: AppState
  }
}

const App = (props: NextAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props as AppProps
  const { initialState } = pageProps

  useMount(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  })
  return (
    <CacheProvider value={emotionCache}>
      <RecoilRoot initializeState={initializeRecoilState(initialState)}>
        <ClientSideStateSync initialState={initialState}>
          <ThemeProvider>
            <Head>
              <title>Expert Session</title>
              <meta
                name="theme-color"
                media="(prefers-color-scheme: light)"
                content="#F3F7FB"
              />
              <meta
                name="theme-color"
                media="(prefers-color-scheme: dark)"
                content="#090B1B"
              />
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
              />
              <link rel="manifest" href="/site.webmanifest" />
              <link
                rel="mask-icon"
                href="/safari-pinned-tab.svg"
                color="#5bbad5"
              />
              <meta name="msapplication-TileColor" content="#3349a5" />
              <meta name="theme-color" content="#3349a5" />
            </Head>
            {GTM_ID && (
              <>
                <Script id="google-tag-manager" strategy="afterInteractive">
                  {`
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_ID}');
              `}
                </Script>
                <noscript
                  dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                  }}
                />
              </>
            )}
            <GlobalStyle />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <SnackbarProvider
                maxSnack={10}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                Components={{
                  notification: NotificationSnack,
                  message: MessageSnack,
                  extendSessionConsumer: ExtendSessionConsumerSnack,
                  extendSessionExpert: ExtendSessionExpertSnack,
                  extendSessionSuccessful: ExtendSessionSuccessfulSnack,
                  extendSessionDeclined: ExtendSessionDeclinedSnack,
                  extendSessionCheckout: ExtendSessionCheckoutSnack,
                  extendSessionPending: ExtendSessionPendingSnack,
                  extendSessionWithdrawn: ExtendSessionWithdrawnSnack,
                }}
              >
                {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
                <Component {...(pageProps as any)} />
                <AppWideComponentsWrapper />
              </SnackbarProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </ClientSideStateSync>
      </RecoilRoot>
    </CacheProvider>
  )
}

export default appWithTranslation(App)
