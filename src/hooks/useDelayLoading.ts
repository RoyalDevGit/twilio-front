import { useEffect } from 'react'
import { useTimeout } from 'react-use'

export const useDelayLoading = (loadingValue?: boolean, delayMs = 300) => {
  const [isReady, cancel, reset] = useTimeout(delayMs)
  useEffect(() => {
    if (!loadingValue) {
      cancel()
      return
    }

    reset()
  }, [loadingValue])

  if (!loadingValue) {
    return false
  }

  return isReady() ? loadingValue : false
}
