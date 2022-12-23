import urlJoin from 'proper-url-join'

import { Config } from 'utils/config'

const CONTENT_FILES_URL = Config.getString('CONTENT_FILES_URL')

export const getStorageBucketFileUrl = (fileKey: string) =>
  urlJoin(CONTENT_FILES_URL, fileKey)
