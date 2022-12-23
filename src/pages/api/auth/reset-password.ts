import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'
import urlJoin from 'proper-url-join'

import { TokenResponse } from 'interfaces/TokenResponse'
import { sessionLogin } from 'server/utils/auth/session'
import { Config } from 'utils/config'
import logProviderFactory from 'utils/logger/logProviderFactory'
import { ApiErrorCode } from 'utils/error/ApiError'
const API_URL = Config.getString('API_URL')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req
  const { password, token } = body

  try {
    const apiRes = await axios.put(urlJoin(API_URL, '/auth/reset-password'), {
      password,
      token,
    })
    const tokenResponse = apiRes.data as TokenResponse
    await sessionLogin(req, res, tokenResponse)
    res.status(204)
    res.json({})
  } catch (e) {
    const axiosError = e as AxiosError
    logProviderFactory.logError(axiosError)
    res.status(axiosError.response?.status || 500).json(
      axiosError.response?.data || {
        message: ApiErrorCode.Unknown,
        code: ApiErrorCode.Unknown,
      }
    )
  }
}
