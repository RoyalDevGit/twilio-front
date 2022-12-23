import { deleteCookie, setCookie } from 'cookies-next'
import { NextApiResponse } from 'next'

import { Config } from 'utils/config'

const ERROR_COOKIE_NAME = Config.getString('ERROR_COOKIE_NAME')

export const setErrorCookie = (res: NextApiResponse, error: string): void => {
  setCookie(ERROR_COOKIE_NAME, error, { res })

  // res.cookie(ERROR_COOKIE_NAME, error, {
  //   secure: ERROR_COOKIE_SECURE,
  // })
}

export const clearErrorCookie = (res: NextApiResponse): void => {
  // res.clearCookie(ERROR_COOKIE_NAME, {
  //   secure: ERROR_COOKIE_SECURE,
  // })
  deleteCookie(ERROR_COOKIE_NAME, { res })
}
