import logProviderFactory from 'utils/logger/logProviderFactory'

/**
 * A simple utility method that helps us safely convert a string to JSON
 * Null is returned if the object cannot be parsed
 * @param jsonString
 * @returns
 */
export const getJsonObjectFromString = <T>(
  jsonString: string,
  logError?: boolean
): T | null => {
  try {
    return JSON.parse(jsonString)
  } catch (e: unknown) {
    if (logError) logProviderFactory.logError(e)
    return null
  }
}
