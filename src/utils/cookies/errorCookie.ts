import Cookies from 'js-cookie'

import { Config } from 'utils/config'

const ERROR_COOKIE_NAME = Config.getString('ERROR_COOKIE_NAME')
const ERROR_COOKIE_SECURE = Config.getBoolean('ERROR_COOKIE_SECURE')

export const getErrorCookieAndDelete = (): string | undefined => {
  const errorCookieValue = Cookies.get(ERROR_COOKIE_NAME)
  Cookies.remove(ERROR_COOKIE_NAME, { secure: ERROR_COOKIE_SECURE })
  return errorCookieValue
}
