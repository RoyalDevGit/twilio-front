import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteCookie } from 'cookies-next'
import urlJoin from 'proper-url-join'

import { Config } from 'utils/config'
import { User } from 'interfaces/User'
import { TokenResponse } from 'interfaces/TokenResponse'
import { ApiError, ApiErrorData } from 'utils/error/ApiError'
import { deleteOAuthCookie } from 'server/utils/cookies/oAuthCookie'
import {
  deleteAccessTokenCookie,
  setAccessTokenCookie,
  setExpertCookie,
  setUserCookie,
} from 'utils/cookies/cookieUtils'
import getCurrentExpert from 'hooks/api/expert/getExpert'

const USER_COOKIE_NAME = Config.getString('USER_COOKIE_NAME')
const EXPERT_COOKIE_NAME = Config.getString('EXPERT_COOKIE_NAME')
const API_URL = Config.getString('API_URL')

export const getRequestCurrentUser = async (
  accessToken: string
): Promise<User> => {
  const apiRes = await fetch(urlJoin(API_URL, '/users/me'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (apiRes.ok) {
    const data = await apiRes.json()
    const user = data as User
    return user
  }

  const errorData = (await apiRes.json()) as ApiErrorData
  throw new ApiError(errorData)
}

export const sessionLogin = async (
  req: NextApiRequest,
  res: NextApiResponse,
  tokenResponse: TokenResponse
) => {
  try {
    /**
     * Check to make sure the user exists
     * TODO: Send the user data back upon login vs just the token
     */
    const user = await getRequestCurrentUser(tokenResponse.accessToken)
    if (!user) {
      sessionLogout(req, res)
      return
    }

    const expert = await getCurrentExpert(user, req, tokenResponse.accessToken)
    if (expert) {
      setExpertCookie(expert, { req, res })
    }

    setUserCookie(user, { req, res })
    deleteOAuthCookie(res)
    setAccessTokenCookie(tokenResponse.accessToken, { req, res })
    return user
  } catch (e) {
    console.error(e)
    sessionLogout(req, res)
  }
}

export const sessionLogout = (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  new Promise((resolve) => {
    deleteAccessTokenCookie({ req, res })
    deleteCookie(USER_COOKIE_NAME, { res, req })
    deleteCookie(EXPERT_COOKIE_NAME, { res, req })
    deleteOAuthCookie(res)
    resolve()
  })
