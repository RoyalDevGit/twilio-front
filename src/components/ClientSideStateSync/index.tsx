import React, { FC, ReactNode } from 'react'
import { Settings as LuxonSettings } from 'luxon'
import { useSetRecoilState } from 'recoil'
import { usePrevious } from 'react-use'

import { DrawerCollapsedState, drawerCollapsedState } from 'state/drawerState'
import { userState } from 'state/userState'
import { expertState } from 'state/expertState'
import { AppState } from 'interfaces/AppState'
import { Config } from 'utils/config'
import { getCookieClientSide } from 'utils/cookies/cookieUtils'
import { User } from 'interfaces/User'
import { Expert } from 'interfaces/Expert'

interface AppBodyProps {
  initialState?: AppState
  children?: ReactNode
}

const DRAWER_STATE_COOKIE = Config.getString('DRAWER_STATE_COOKIE')
const USER_COOKIE_NAME = Config.getString('USER_COOKIE_NAME')
const EXPERT_COOKIE_NAME = Config.getString('EXPERT_COOKIE_NAME')

/**
 * Highly experimental code that helps hydrate state on the client side
 * in the event a user lands on a page that was statically generated (ISR getStaticProps etc)
 * @param param0
 * @returns
 */
const ClientSideStateSync: FC<AppBodyProps> = ({ children, initialState }) => {
  const setUser = useSetRecoilState(userState)
  const setDrawerState = useSetRecoilState(drawerCollapsedState)
  const setExpert = useSetRecoilState(expertState)
  const previousInitialState = usePrevious(initialState)

  React.useEffect(() => {
    if (previousInitialState !== initialState) {
      if (initialState) {
        if (initialState.user) {
          LuxonSettings.defaultZone =
            initialState.user.settings.timeZone === 'UTC'
              ? 'system'
              : initialState.user.settings.timeZone
          setUser(initialState.user)
        }
        if (initialState.expert) {
          setExpert(initialState.expert)
        }
        if (initialState.drawerCollapsedState) {
          setDrawerState(initialState.drawerCollapsedState)
        }
      }
    }
  })

  React.useEffect(() => {
    // this means the page was statically baked and we need to fetch variables from the client side
    if (!initialState) {
      // ---------------- SETTING DRAWER STATE -------------------------------
      let targetDrawerState = DrawerCollapsedState.Expanded
      const drawerStateAsCookie =
        getCookieClientSide<DrawerCollapsedState>(DRAWER_STATE_COOKIE)
      if (drawerStateAsCookie) {
        targetDrawerState = drawerStateAsCookie as DrawerCollapsedState
      }
      setDrawerState(targetDrawerState)

      // ---------------- SETTING USER STATE -------------------------------
      const userStateAsCookie = getCookieClientSide<string>(USER_COOKIE_NAME)
      if (userStateAsCookie) {
        const userData = JSON.parse(userStateAsCookie) as User
        LuxonSettings.defaultZone =
          userData.settings.timeZone === 'UTC'
            ? 'system'
            : userData.settings.timeZone
        setUser(userData)
      }

      // ---------------- SETTING Expert STATE -------------------------------
      const expertStateAsCookie =
        getCookieClientSide<string>(EXPERT_COOKIE_NAME)
      if (expertStateAsCookie) {
        const expertData = JSON.parse(expertStateAsCookie) as Expert
        setExpert(expertData)
      }
      return
    }
  }, [])

  return <>{children}</>
}

export default ClientSideStateSync
