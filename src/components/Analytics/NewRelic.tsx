import { Config } from 'utils/config'

const NEW_RELIC_LICENSE_KEY = Config.getString('NEW_RELIC_LICENSE_KEY')
const NEW_RELIC_APP_NAME = Config.getString('NEW_RELIC_APP_NAME')
const NEW_RELIC_BROWSER_ENABLED = Config.getBoolean('NEW_RELIC_BROWSER_ENABLED')

export const isNewRelicBrowserEnabled = (): boolean => {
  if (
    NEW_RELIC_APP_NAME &&
    NEW_RELIC_LICENSE_KEY &&
    NEW_RELIC_BROWSER_ENABLED
  ) {
    return true
  }
  return false
}
