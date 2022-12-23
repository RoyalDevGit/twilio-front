const NEW_RELIC_LICENSE_KEY = process.env.NEW_RELIC_LICENSE_KEY
const NEW_RELIC_APP_NAME = process.env.NEW_RELIC_APP_NAME

export const isNewRelicAvailable = (): boolean => {
  if (NEW_RELIC_APP_NAME && NEW_RELIC_LICENSE_KEY) {
    return true
  }
  return false
}
