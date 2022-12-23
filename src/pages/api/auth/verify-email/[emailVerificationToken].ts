import type { NextApiRequest, NextApiResponse } from 'next'
import urlJoin from 'proper-url-join'

import { Config } from 'utils/config'
import { ApiError } from 'utils/error/ApiError'
import { setErrorCookie } from 'server/utils/cookies/errorCookie'
const API_URL = Config.getString('API_URL')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { emailVerificationToken } = req.query
  const apiRes = await fetch(urlJoin(API_URL, '/auth/verify-email'), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ emailVerificationToken }),
  })
  if (apiRes.ok) {
    res.redirect('/email-verification')
  } else {
    const errorData = (await apiRes.json()) as ApiError
    setErrorCookie(res, errorData.code)
    res.redirect('/email-verification')
  }
}
