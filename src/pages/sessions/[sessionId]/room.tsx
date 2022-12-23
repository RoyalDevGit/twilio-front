/* eslint-disable import/no-default-export */
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'
import { useMemo } from 'react'
import { NextPage } from 'next'
import {
  BackgroundBlurProvider,
  MeetingProvider,
  VoiceFocusProvider,
  lightTheme as chimeLightTheme,
  darkTheme as chimeDarkTheme,
  GlobalStyles as ChimeGlobalStyles,
} from 'amazon-chime-sdk-component-library-react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

import {
  SessionRoomPage,
  SessionRoomPageProps,
} from 'pageComponents/SessionRoom'
import { requireAuth } from 'utils/auth/requireAuth'
import { SessionApi } from 'apis/SessionApi'
import {
  getLocaleNamespaces,
  LocaleNamespaceBundle,
} from 'utils/locale/LocaleNamespace'
import { usePrefersDarkMode } from 'hooks/usePrefersDarkMode'

const PageWithChime: NextPage<SessionRoomPageProps> = (props) => {
  const prefersDarkMode = usePrefersDarkMode()
  const chimeTheme = useMemo(() => {
    if (prefersDarkMode) {
      return chimeDarkTheme
    } else {
      return chimeLightTheme
    }
  }, [prefersDarkMode])

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <StyledComponentsThemeProvider theme={chimeTheme}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <ChimeGlobalStyles />
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <MeetingProvider>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <VoiceFocusProvider>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <BackgroundBlurProvider>
              {/*eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
              <SessionRoomPage {...props} />
            </BackgroundBlurProvider>
          </VoiceFocusProvider>
        </MeetingProvider>
      </StyledComponentsThemeProvider>
    </>
  )
}

export default dynamic(() => Promise.resolve(PageWithChime), {
  ssr: false,
})

interface Params extends ParsedUrlQuery {
  sessionId: string
}

export const getServerSideProps = requireAuth(async (ctx) => {
  const { locale, req } = ctx
  const params = ctx.params as Params
  const { sessionId } = params

  const sessionResult = await SessionApi.setServerRequest(req).getById(
    sessionId
  )

  let pageProps: SessionRoomPageProps | null = null

  if (sessionResult.ok()) {
    pageProps = {
      initialSession: await sessionResult.getData(),
    }
  }

  const rtn = {
    notFound: !sessionResult.ok(),
    props: {
      ...(await serverSideTranslations(
        locale,
        getLocaleNamespaces([
          LocaleNamespaceBundle.AppShell,
          LocaleNamespaceBundle.SessionRoom,
        ])
      )),
    },
  }

  if (pageProps) {
    rtn.props = { ...rtn.props, ...pageProps }
  }

  return rtn
})
