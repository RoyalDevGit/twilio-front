import { IncomingMessage } from 'http'

import urlJoin from 'proper-url-join'
import merge from 'lodash/merge'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

import { inBrowser } from 'utils/env'
import { ApiError, ApiErrorData } from 'utils/error/ApiError'
import { getAccessTokenCookie } from 'utils/cookies/cookieUtils'

const LOGOUT_RESPONSE_CODE = 401

export interface RequestResult<T> {
  getData: () => Promise<T>
  getError: () => Promise<ApiError>
  response?: Response
  xhrRequest?: XMLHttpRequest
  ok: () => boolean
}

export interface XhrRequestOptions {
  onProgress?: (event: ProgressEvent) => unknown
  onError?: (event: ProgressEvent) => unknown
  onAbort?: (event: ProgressEvent) => unknown
  onSuccess?: (event: ProgressEvent) => unknown
}
export interface RequestOptions extends RequestInit {
  prefix?: string
  xhrRequestOptions?: XhrRequestOptions
}

const postDefaultOptions: RequestOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const putDefaultOptions: RequestOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export class BaseApi {
  prefix?: string
  serverRequest?:
    | (IncomingMessage & {
        cookies: NextApiRequestCookies
      })
    | null
  accessToken?: string

  setServerRequest(
    req:
      | (IncomingMessage & {
          cookies: NextApiRequestCookies
        })
      | null,
    accessToken?: string
  ) {
    this.serverRequest = req
    this.accessToken = accessToken
    return this
  }

  protected async sendRequest<T = unknown>(
    url: string,
    options: RequestOptions = {}
  ): Promise<RequestResult<T>> {
    const serverRequest = this.serverRequest
    this.serverRequest = undefined
    const defaultOptions: RequestOptions = {
      credentials: 'include',
    }
    const mergedOptions = merge({}, defaultOptions, options)
    const headers = new Headers(mergedOptions.headers)
    const { body } = mergedOptions
    const bodyIsFormData =
      typeof FormData !== 'undefined' && body && body instanceof FormData

    // If the body is a form, let the browser set the content type
    if (bodyIsFormData) {
      headers.delete('Content-Type')
    }

    const prefix = mergedOptions.prefix || this.prefix
    const requestUrl = urlJoin(prefix, url)

    const isServer = typeof window === 'undefined'
    if (isServer && serverRequest) {
      const token = getAccessTokenCookie(serverRequest)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      } else if (this.accessToken) {
        headers.set('Authorization', `Bearer ${this.accessToken}`)
      }
    }

    mergedOptions.headers = headers

    let response: Response | undefined
    let xhrRequest: XMLHttpRequest | undefined
    if (
      mergedOptions.method === 'POST' &&
      bodyIsFormData &&
      mergedOptions.xhrRequestOptions
    ) {
      const { onProgress, onError, onAbort, onSuccess } =
        mergedOptions.xhrRequestOptions
      await new Promise((resolve, reject) => {
        xhrRequest = new XMLHttpRequest()
        xhrRequest.withCredentials = true
        xhrRequest.addEventListener('load', resolve, false)
        xhrRequest.addEventListener('error', reject, false)
        if (onProgress) {
          xhrRequest.upload.addEventListener('progress', onProgress, false)
        }
        if (onSuccess) {
          xhrRequest.addEventListener('load', onSuccess, false)
        }
        if (onError) {
          xhrRequest.addEventListener('error', onError, false)
        }
        if (onAbort) {
          xhrRequest.addEventListener('abort', onAbort, false)
        }

        xhrRequest.open('POST', requestUrl)
        headers.forEach((value, key) => {
          // ts is reporting that xhrRequest could be null, ignoring it
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          xhrRequest.setRequestHeader(key, value)
        })
        xhrRequest.send(body)
      })
    } else {
      response = await fetch(requestUrl, mergedOptions)

      if (inBrowser()) {
        if (!response.ok) {
          if (response.status === LOGOUT_RESPONSE_CODE) {
            const { logout } = await import('utils/auth/logout')
            await logout()
          }
        }
      }
    }

    return {
      response,
      xhrRequest,
      ok: () => {
        if (response) {
          return response.ok
        }
        if (xhrRequest) {
          const isOk = xhrRequest.status >= 200 && xhrRequest.status <= 299
          return isOk
        }
        throw new Error('No request was made')
      },
      getData: () => {
        if (response) {
          return this.parseData<T>(response)
        }
        if (xhrRequest) {
          return this.parseData<T>(xhrRequest)
        }
        throw new Error('No request was made')
      },
      getError: () => {
        if (response) {
          return this.parseError(response)
        }
        if (xhrRequest) {
          return this.parseError(xhrRequest)
        }
        throw new Error('No request was made')
      },
    }
  }

  private async parseData<T>(response: Response | XMLHttpRequest): Promise<T> {
    if (response instanceof Response) {
      if (!response.ok) {
        throw new Error('Request was not successful')
      }

      if (response.status === 204) {
        return null as unknown as T
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await response.json()
        return data as T
      }
    }
    if (
      typeof XMLHttpRequest !== 'undefined' &&
      response instanceof XMLHttpRequest
    ) {
      const xhrRequest = response
      const isOk = xhrRequest.status >= 200 && xhrRequest.status <= 299
      if (!isOk) {
        throw new Error('Request was not successful')
      }

      if (xhrRequest.status === 204) {
        return null as unknown as T
      }

      const contentType = xhrRequest.getResponseHeader('content-type')
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = JSON.parse(xhrRequest.response)
        return data as T
      }
    }
    throw new Error('Data could not be deserialized')
  }

  private async parseError(
    response: Response | XMLHttpRequest
  ): Promise<ApiError> {
    if (response instanceof Response) {
      if (response.ok) {
        throw new Error('Request successful')
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const errorData = (await response.json()) as ApiErrorData
        return new ApiError(errorData)
      }
    }
    if (
      typeof XMLHttpRequest !== 'undefined' &&
      response instanceof XMLHttpRequest
    ) {
      const xhrRequest = response
      const isOk = xhrRequest.status >= 200 && xhrRequest.status <= 299
      if (isOk) {
        throw new Error('Request successful')
      }

      const contentType = xhrRequest.getResponseHeader('content-type')
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const errorData = JSON.parse(xhrRequest.response) as ApiErrorData
        return new ApiError(errorData)
      }
    }

    throw new Error('Error could not be deserialized')
  }

  protected async httpGet<T = unknown>(
    url: string,
    options: RequestOptions = {}
  ): Promise<RequestResult<T>> {
    const mergedOptions = merge({}, options, { method: 'GET' })
    return this.sendRequest<T>(url, mergedOptions)
  }

  protected async httpPost<T = unknown>(
    url: string,
    options: RequestOptions = {}
  ): Promise<RequestResult<T>> {
    const mergedOptions = merge({}, postDefaultOptions, options, {
      method: 'POST',
    })
    return this.sendRequest<T>(url, mergedOptions)
  }

  protected async httpPut<T = unknown>(
    url: string,
    options: RequestOptions = {}
  ): Promise<RequestResult<T>> {
    const mergedOptions = merge({}, putDefaultOptions, options, {
      method: 'PUT',
    })
    return this.sendRequest<T>(url, mergedOptions)
  }

  protected async httpPatch<T = unknown>(
    url: string,
    options: RequestOptions = {}
  ): Promise<RequestResult<T>> {
    const mergedOptions = merge({}, putDefaultOptions, options, {
      method: 'PATCH',
    })
    return this.sendRequest<T>(url, mergedOptions)
  }

  protected async httpDelete<T = unknown>(
    url: string,
    options: RequestOptions = {}
  ): Promise<RequestResult<T>> {
    const mergedOptions = merge({}, options, { method: 'DELETE' })
    return this.sendRequest<T>(url, mergedOptions)
  }
}
