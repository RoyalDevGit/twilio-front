// eslint-disable-next-line no-restricted-imports
import { NextRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

import { TwoFactorAuthMethod } from 'interfaces/User'
import { getErrorCookieAndDelete } from 'utils/cookies/errorCookie'
import { getEnumValues } from 'utils/enum/enumUtils'
import { ApiError, ApiErrorCode } from 'utils/error/ApiError'

/**
 * The query fields that need to be present in order to trigger the OAuth state change
 * This would only happen if they had an issue logging in
 */
const oAuthQueryFields: string[] = ['oauth', 'role']

/**
 * Once the user logs in and we redirect the user, we want to strip the query parameters from the string that relate to OAuth
 */

export const stripOAuthFromQuery = (queryObj: ParsedUrlQuery) => {
  const copyObj = { ...queryObj }
  for (const key in copyObj) {
    if (copyObj[key] && oAuthQueryFields.indexOf(key) !== -1) {
      delete copyObj[key]
    }
  }
  return copyObj
}

/**
 * Will check the query parameters to determine if the user is actively trying to log in via OAuth.
 * Note: The user will only be redirected back to the client side login or signup page if there is an error or missing 2FA token
 * @param router
 * @returns
 */
export const isOAuthStateActive = (router: NextRouter) => {
  const { query } = router
  if (!query) {
    return false
  }
  for (const key of oAuthQueryFields) {
    if (!query[key]) {
      return false
    }
  }
  return true
}

/**
 * Call this method when you want to retrieve any errors sent back
 * from the server in regards to OAuth. The cookie is read once and deleted
 * @param router
 * @returns
 */
export const getOAuthErrorCookieAndDelete = (
  router: NextRouter
): ApiError | null => {
  const errorCookieValue = getErrorCookieAndDelete()
  if (errorCookieValue) {
    const apiErrorCode = getEnumValues(ApiErrorCode).find(
      (code) => code.toString() === errorCookieValue
    )
    return {
      name: 'ApiError',
      message: 'An OAuth Error has Occurred...',
      type: 'oAuthError',
      code: apiErrorCode as ApiErrorCode,
      data: {
        method: router?.query?.method || TwoFactorAuthMethod.Authenticator,
      },
    }
  }
  return null
}
