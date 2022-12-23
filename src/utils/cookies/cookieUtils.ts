import { IncomingMessage } from 'http'

import { setCookie, getCookie, deleteCookie } from 'cookies-next'
import { OptionsType } from 'cookies-next/lib/types'
import Cookies, { CookieAttributes } from 'js-cookie'
import { pick } from 'lodash'
import { NextApiResponse } from 'next'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

import { DrawerCollapsedState } from 'state/drawerState'
import { Expert } from 'interfaces/Expert'
import { User } from 'interfaces/User'
import { Config } from 'utils/config'
import { getJsonObjectFromString } from 'utils/json/getJsonFromString'

const SESSION_COOKIE_DOMAIN = Config.getString('SESSION_COOKIE_DOMAIN')
const SESSION_COOKIE_SECURE = Config.getBoolean('SESSION_COOKIE_SECURE')
const SESSION_COOKIE_HTTP_ONLY = Config.getBoolean('SESSION_COOKIE_HTTP_ONLY')
const TOKEN_COOKIE_NAME = Config.getString('TOKEN_COOKIE_NAME')
const USER_COOKIE_NAME = Config.getString('USER_COOKIE_NAME')
const EXPERT_COOKIE_NAME = Config.getString('EXPERT_COOKIE_NAME')
const DRAWER_STATE_COOKIE = Config.getString('DRAWER_STATE_COOKIE')

export const setCookieServerSide = (
  res: NextApiResponse,
  key: string,
  value: string | object,
  _settings?: OptionsType
) => {
  setCookie(key, value, { res })
  // res.cookie(key, value, {
  //   secure: SESSION_COOKIE_SECURE,
  //   httpOnly: SESSION_COOKIE_HTTP_ONLY,
  //   ...settings,
  // })
}

export const setCookieClientSide = (
  key: string,
  value: string | object,
  settings?: CookieAttributes
) => {
  Cookies.set(key, value, {
    secure: SESSION_COOKIE_SECURE,
    httpOnly: SESSION_COOKIE_HTTP_ONLY,
    ...settings,
  })
}

export const getCookieClientSide = <T>(
  key: string,
  isJSON?: boolean
): T | string | undefined | null => {
  const cookieValue: string | undefined = Cookies.get(key)
  if (!cookieValue) {
    return undefined
  }
  if (isJSON) {
    return getJsonObjectFromString(cookieValue)
  }
  return cookieValue
}

export const getCookieServerSide = <T>(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  key: string,
  isJSON?: boolean
): T | string | null => {
  const cookieValue: string | undefined = req.cookies?.[key]
  if (!cookieValue) {
    return null
  }
  if (isJSON) {
    return getJsonObjectFromString(cookieValue)
  }
  return cookieValue
}

export const trimUserProps = (user: User) => {
  const props: string[] = [
    'id',
    'firstName',
    'lastName',
    'profilePicture',
    'roles',
    'settings',
    'status',
    'chimeAppInstanceUserArn',
  ]
  return pick(user, props) as Partial<User>
}

export const trimExpertProps = (user: Expert) => {
  const props: string[] = [
    'id',
    'introWizardStatus',
    'user.firstName',
    'user.lastName',
  ]
  return pick(user, props) as Partial<Expert>
}

// ------------------------------------------------------------ GETTERS -----------------------------------------------------

export const getAccessTokenCookie = (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
) => {
  const accessToken = getCookie(TOKEN_COOKIE_NAME, {
    req,
    httpOnly: SESSION_COOKIE_HTTP_ONLY,
    secure: SESSION_COOKIE_SECURE,
    domain: SESSION_COOKIE_DOMAIN,
  })
  return accessToken
}

export const getUserCookie = (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
) => getCookieServerSide<User>(req, USER_COOKIE_NAME, true) as User | null

export const getExpertCookie = (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
) => getCookieServerSide<Expert>(req, EXPERT_COOKIE_NAME, true) as Expert | null

export const getDrawerStateCookie = (
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
) =>
  getCookieServerSide<Expert>(
    req,
    DRAWER_STATE_COOKIE
  ) as DrawerCollapsedState | null

// ------------------------------------------------------------ SETTERS -----------------------------------------------------

export const setAccessTokenCookie = (token: string, options?: OptionsType) => {
  setCookie(TOKEN_COOKIE_NAME, token, {
    ...options,
    httpOnly: SESSION_COOKIE_HTTP_ONLY,
    secure: SESSION_COOKIE_SECURE,
    domain: SESSION_COOKIE_DOMAIN,
  })
}

export const deleteAccessTokenCookie = (options?: OptionsType) => {
  deleteCookie(TOKEN_COOKIE_NAME, {
    ...options,
    httpOnly: SESSION_COOKIE_HTTP_ONLY,
    secure: SESSION_COOKIE_SECURE,
    domain: SESSION_COOKIE_DOMAIN,
  })
}

export const setUserCookie = (user: User, options?: OptionsType) => {
  setCookie(USER_COOKIE_NAME, trimUserProps(user), {
    ...options,
    secure: SESSION_COOKIE_SECURE,
  })
}

export const setExpertCookie = (expert: Expert, options?: OptionsType) => {
  setCookie(EXPERT_COOKIE_NAME, trimExpertProps(expert), {
    ...options,
    secure: SESSION_COOKIE_SECURE,
  })
}
