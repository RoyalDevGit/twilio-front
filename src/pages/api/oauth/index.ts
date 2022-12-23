import type { NextApiRequest, NextApiResponse } from 'next'

import { sessionLogin } from 'server/utils/auth/session'
import { setErrorCookie } from 'server/utils/cookies/errorCookie'
import { setOAuthCookie } from 'server/utils/cookies/oAuthCookie'
import { convertOAuthResponse } from 'server/utils/oAuth/oAuthUtils'
import logProviderFactory from 'utils/logger/logProviderFactory'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'

export const defaultOAuthHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const [type, role] = req.query.params || []
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
}
