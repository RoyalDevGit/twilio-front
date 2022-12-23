import { IncomingMessage } from 'http'

import { NextApiRequestCookies } from 'next/dist/server/api-utils'

import { AppState } from 'interfaces/AppState'
import { DrawerCollapsedState } from 'state/drawerState'
import {
  getDrawerStateCookie,
  getExpertCookie,
  getUserCookie,
} from 'utils/cookies/cookieUtils'

export const buildInitialStateFromRequest = (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
) => {
  const user = getUserCookie(req)
  const expert = getExpertCookie(req)
  const drawerCollapsedState =
    getDrawerStateCookie(req) || DrawerCollapsedState.Expanded

  const initialState: Partial<AppState> = {
    user,
    expert,
    drawerCollapsedState,
  }

  return initialState
}
