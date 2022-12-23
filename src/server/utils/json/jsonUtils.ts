import { ApiError, ApiErrorCode } from 'utils/error/ApiError'

export const safelyParseJsonResponse = async (
  response: globalThis.Response
): Promise<ApiError> => {
  const textResponse = await response.text()
  try {
    return JSON.parse(textResponse)
  } catch (err) {
    return {
      message: response.statusText,
      code: ApiErrorCode.Unknown,
      stack: textResponse,
    } as ApiError
  }
}
