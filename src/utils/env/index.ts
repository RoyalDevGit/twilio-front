import { Config } from 'utils/config'

export const inBrowser = (): boolean => typeof window !== 'undefined'
export const inServer = (): boolean => typeof window === 'undefined'
export const inDevMode = (): boolean =>
  Config.getString('NODE_ENV') === 'development'
