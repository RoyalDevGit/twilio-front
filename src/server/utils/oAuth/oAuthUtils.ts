import urlJoin from 'proper-url-join'
import { NextApiRequest, NextApiResponse } from 'next'

import { TokenResponse } from 'interfaces/TokenResponse'
import { sessionLogin } from 'server/utils/auth/session'
import { ApiError, ApiErrorCode } from 'utils/error/ApiError'
import { safelyParseJsonResponse } from 'server/utils/json/jsonUtils'
import logProviderFactory from 'utils/logger/logProviderFactory'
import {
  getOAuthCookieState,
  setOAuthCookie,
} from 'server/utils/cookies/oAuthCookie'
import { TwoFactorAuthMethod, UserRole } from 'interfaces/User'
import { setErrorCookie } from 'server/utils/cookies/errorCookie'
import { OAuthCallbackResponse, OAuthType } from 'interfaces/OAuth'
import { Config } from 'utils/config'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'

const API_URL = Config.getString('API_URL')

/**
 * Retrofit our errors to the context of OAuth
 * @param error
 * @returns
 */
const oAuthWrapper = (error: ApiError) => {
  if (error.message === 'This authorization code has expired.') {
    error.code = ApiErrorCode.OAuthCodeExpired
  } else if (error.message === 'This authorization code has been used.') {
    error.code = ApiErrorCode.OAuthCodeAlreadyUsed
  }
  return error
}

/**
 * This method will handle the OAuth redirection response
 * @param props
 */
export const convertOAuthResponse = (
  query: Record<string, unknown>
): OAuthCallbackResponse => {
  const body: OAuthCallbackResponse = {}
  const { method, error, accessToken, tokenType, expiresIn } = query

  // GET METHOD IF PROVIDED
  if (method) body.method = method as TwoFactorAuthMethod

  if (error) {
    body.error = new ApiError({
      message: 'There was an issue authenticating...',
      type: 'OAuthError',
      code: error as ApiErrorCode,
    })
    if (body.method) {
      body.error.data = {
        method: body.method,
      }
    }
  }
  // GET ACCESS TOKEN IF ONE EXISTS

  if (accessToken && tokenType && expiresIn) {
    body.token = {
      accessToken: accessToken as string,
      tokenType: tokenType as string,
      expiresIn: parseInt(expiresIn as string),
    }
  }
  // Pass back to our handler and let the UI take over
  return body
}

/**
 * Each OAuth provider will redirect back to this endpoint.
 * This will in turn send the provider token to the API and process it response.
 * If successful, a session token will be sent back.
 * Can be a POST or GET request. Apple sends a POST; whereas, others send GET
 * @param type
 * @param role
 * @param provider
 * @returns
 */
export const oAuthAuthenticateCallback =
  (type: OAuthType, role: UserRole) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const response = convertOAuthResponse(req.query)

      if (response.error) {
        setErrorCookie(res, response.error.code)
        if (response.token) {
          setOAuthCookie(res, { token: response.token.accessToken })
        }
        logProviderFactory.logError(response.error)
        return res.redirect(
          urlJoinWithQuery(`/${type}?oauth=true&role=${role}`, {
            method: response.method,
          })
        )
      }

      // If successful, a session token will be sent back.
      if (response.token) {
        await sessionLogin(req, res, response.token)
        return res.redirect('/')
      }

      throw new Error('A token was not sent back from the API server...')
    } catch (e) {
      logProviderFactory.logError(e as Error)
      setErrorCookie(res, ApiErrorCode.Unknown)
      res.redirect(`/${type}?oauth=true&role=${role}`)
    }
  }

/**
 * Will get called when the user needs to enter a 2FA token under the context of OAuth
 * Gets trigged on both login and signup if the user has it set
 * @param path
 * @returns
 */
export const oAuth2FA =
  (path: string) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { otp, twoFactorAuthMethod } = req.body
      const oAuthCookieState = getOAuthCookieState(req)
      const token: string = oAuthCookieState?.token || ''
      if (!token) {
        throw new Error('A token must be inluced in the body of this request.')
      }
      const apiRes = await fetch(urlJoin(API_URL, path), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp,
          twoFactorAuthMethod,
          token,
        }),
      })
      if (apiRes.ok) {
        const data = await apiRes.json()
        const tokenResponse = data as TokenResponse
        const user = await sessionLogin(req, res, tokenResponse)
        res.status(200).json(user)
      } else {
        const errorData: ApiError = oAuthWrapper(
          await safelyParseJsonResponse(apiRes)
        )
        logProviderFactory.logError(errorData)
        res.status(apiRes.status).send(errorData)
      }
    } catch (e) {
      logProviderFactory.logError(e)
      res.status(500).send({
        message: '',
        code: ApiErrorCode.OAuthCodeUnknown,
        stack: e,
      })
    }
  }
