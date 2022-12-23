/* eslint-disable @typescript-eslint/no-explicit-any */
import { Duration } from 'luxon'
import getConfig from 'next/config'
import ms from 'ms'
import bytes from 'bytes'

import { inBrowser } from 'utils/env'
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

const booleanFalseValues = ['false', '0', 'no', 'off']

export class Config {
  static getConfig(): {
    [key: string]: any
  } {
    const config = inBrowser() ? publicRuntimeConfig : serverRuntimeConfig
    return config
  }
  static getString(key: string): string {
    const config = Config.getConfig()
    return config[key]
  }
  static getNumber(key: string): number {
    const value = Config.getString(key)
    if (value) {
      return +value
    }
    return 0
  }
  static getBoolean(key: string): boolean {
    const value = Config.getString(key)
    if (!value) {
      return false
    }
    if (booleanFalseValues.includes(value)) {
      return false
    }
    return true
  }
  static getDuration(key: string): Duration {
    const value = Config.getString(key)
    if (!value) {
      return Duration.fromMillis(0)
    }
    const millis = ms(value)
    return Duration.fromMillis(millis)
  }
  static getBytes(key: string): number {
    const value = Config.getString(key)
    if (!value) {
      return 0
    }
    return bytes(value)
  }
}
