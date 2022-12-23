/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestResult } from 'apis/BaseApi'

export const throwIfErrorResponse = async (apiResult: RequestResult<any>) => {
  if (apiResult.ok()) {
    return
  }
  const apiError = await apiResult.getError()
  throw apiError
}
