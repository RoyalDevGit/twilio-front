/* eslint-disable @typescript-eslint/no-explicit-any */
import urlJoin from 'proper-url-join'
import urlParse from 'url-parse'

export const urlJoinWithQuery = (...args: any[]): string => {
  let query = {}
  let urlSegments
  if (args.length > 1) {
    const lastArg = args[args.length - 1]
    if (typeof lastArg === 'object') {
      query = lastArg
      urlSegments = args.slice(0, args.length - 1)
    } else {
      urlSegments = args
    }
  } else {
    urlSegments = args
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const joinedUrl = urlJoin(...urlSegments)
  const parsedUrl = urlParse(joinedUrl, {}, true)
  let urlWithoutQuery
  if (parsedUrl.host) {
    urlWithoutQuery = urlJoin(parsedUrl.origin, parsedUrl.pathname)
  } else {
    urlWithoutQuery = parsedUrl.pathname
  }

  const mergedQuery = { ...parsedUrl.query, ...query }

  const queryKeys = Object.keys(mergedQuery)

  if (!queryKeys.length) {
    return urlWithoutQuery
  }

  const urlParams = new URLSearchParams()
  queryKeys.forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = mergedQuery[key]
    if (value == undefined || value === null) {
      return
    }
    if (Array.isArray(value)) {
      value.forEach((item) => {
        urlParams.append(key, item.toString())
      })
    } else {
      urlParams.append(key, value.toString())
    }
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (Array.from(urlParams.entries()).length) {
    return urlJoin(urlWithoutQuery, `?${urlParams.toString()}`)
  }
  return urlWithoutQuery
}
