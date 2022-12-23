import { AxiosError } from 'axios'

export const parseAxiosError = (e: AxiosError) => {
  if (typeof e !== 'string' && e.response) {
    const obj = {
      baseURL: e.response.config.baseURL,
      path: e.response.config.url,
      method: e.response.config.method,
      body: e.response.config.data,
      status: e.response.status,
      statusText: e.response.statusText,
      headers: e.response.config.headers,
      error: e.response.data || {},
    }
    return obj
  } else {
    return e
  }
}
