import urlJoin from 'proper-url-join'

import { Config } from 'utils/config'

const VIDEO_ASSETS_URL = Config.getString('VIDEO_ASSETS_URL')

export const getVideoAssetUrl = (fileKey: string) =>
  urlJoin(VIDEO_ASSETS_URL, fileKey)
