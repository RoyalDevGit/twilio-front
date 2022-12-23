import consoleLogger from './providers/console'
// import { IS_DEV } from 'src/settings/variables'

const logProviders: LogProviderInterface[] = [consoleLogger]

export interface LogProviderInterface {
  logMessage: (message: string) => void
  logWarning: (message: string) => void
  logError: (message: Error | string | unknown) => void
}

/**
 * Log generic messages here
 * @param {*} message string
 */
const logMessage = (message: string) => {
  for (const provider of logProviders) {
    provider.logMessage(message)
  }
}

/**
 * Log warning messages here
 * @param {*} message string
 */
const logWarning = (message: string) => {
  for (const provider of logProviders) {
    provider.logMessage(message)
  }
}

/**
 * Log error messages here
 * @param {*} message string || Error
 */
const logError = (error: Error | string | unknown) => {
  for (const provider of logProviders) {
    provider.logError(error)
  }
}

// Will refactor with named exports upon adding the New Relic integration
// eslint-disable-next-line import/no-default-export
export default {
  logMessage,
  logWarning,
  logError,
} as LogProviderInterface
