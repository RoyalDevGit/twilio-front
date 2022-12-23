import { AxiosError, isAxiosError } from 'axios'

import { parseAxiosError } from 'server/utils/axiosParser'
import { LogProviderInterface } from 'utils/logger/logProviderFactory'

/**
 * Log generic messages here
 * @param {*} message
 */
const logMessage = (message: string) => {
  console.log(message)
}

/**
 * Log warning messages here
 * @param {*} message
 */
const logWarning = (message: string) => {
  console.warn(message)
}

const logError = (error: Error | AxiosError | string | unknown) => {
  if (isAxiosError(error)) {
    console.error(parseAxiosError(error))
    return
  }
  console.error(error)
}

// Will refactor with named exports upon adding the New Relic integration
// eslint-disable-next-line import/no-default-export
export default {
  logMessage,
  logError,
  logWarning,
} as LogProviderInterface
