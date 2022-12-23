import { deleteCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'

import { Config } from 'utils/config'
import {
  getCookieServerSide,
  setCookieServerSide,
} from 'utils/cookies/cookieUtils'

interface OAuthState {
  token: string
}

const OAUTH_STATE_COOKIE_NAME = Config.getString('OAUTH_STATE_COOKIE_NAME')
const SESSION_COOKIE_DOMAIN = Config.getString('SESSION_COOKIE_DOMAIN')
const SESSION_COOKIE_SECURE = Config.getBoolean('SESSION_COOKIE_SECURE')
const SESSION_COOKIE_HTTP_ONLY = Config.getBoolean('SESSION_COOKIE_HTTP_ONLY')

/**
 * We want to set a tmp state for maintaining the current oauth state
 * For exmaple, if 2FA is required, the user will be prompted for their 2fa code; however
 * we want to hang on to their session token for subsequent validation once they submit their code
 * @param res
 * @param state
 */
export const setOAuthCookie = (res: NextApiResponse, state: OAuthState) => {
  try {
    setCookieServerSide(res, OAUTH_STATE_COOKIE_NAME, JSON.stringify(state), {
      secure: SESSION_COOKIE_SECURE,
      httpOnly: SESSION_COOKIE_HTTP_ONLY,
      domain: SESSION_COOKIE_DOMAIN,
    })
  } catch (e) {
    console.error(e)
  }
}

/**
 * We want to set a tmp state for maintaining the current oauth state
 * For exmaple, if 2FA is required, the user will be prompted for their 2fa code; however
 * we want to hang on to their session token for subsequent validation once they submit their code
 * @param res
 * @param state
 */
export const deleteOAuthCookie = (res: NextApiResponse) => {
  try {
    deleteCookie(OAUTH_STATE_COOKIE_NAME, { res })
    // res.clearCookie(OAUTH_STATE_COOKIE_NAME, {
    //   secure: SESSION_COOKIE_SECURE,
    //   httpOnly: SESSION_COOKIE_HTTP_ONLY,
    //   domain: SESSION_COOKIE_DOMAIN,
    // })
  } catch (e) {
    console.error(e)
  }
}

/**
 * When we are ready to read the cookie from the server side
 * @param req
 * @returns
 */
export const getOAuthCookieState = (req: NextApiRequest): OAuthState | null =>
  getCookieServerSide<OAuthState>(
    req,
    OAUTH_STATE_COOKIE_NAME,
    true
  ) as OAuthState | null
