import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'
import urlJoin from 'proper-url-join'

import { TokenResponse } from 'interfaces/TokenResponse'
import { sessionLogin } from 'server/utils/auth/session'
import { Config } from 'utils/config'
import { ApiErrorCode } from 'utils/error/ApiError'
import logProviderFactory from 'utils/logger/logProviderFactory'
const API_URL = Config.getString('API_URL')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req
  const { emailAddress, password, otp, twoFactorAuthMethod, guestUserId } = body
  try {
    const apiRes = await axios.post(urlJoin(API_URL, '/auth/login'), {
      emailAddress,
      password,
      otp,
      twoFactorAuthMethod,
      guestUserId,
    })
    const tokenResponse = apiRes.data as TokenResponse
    const user = await sessionLogin(req, res, tokenResponse)
    res.status(200).json(user)
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
