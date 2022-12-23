// eslint-disable-next-line no-restricted-imports
import { NextRouter, useRouter as useNextRouter } from 'next/router'

export const useRouter = (): NextRouter => {
  const router = useNextRouter()

  return {
    ...router,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    push: (url: never, as?: never, options?: never) => {
      router.push(url, as, options)
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    replace: (url: never, as?: never, options?: never) => {
      router.replace(url, as, options)
    },
  }
}
