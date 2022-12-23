import urlJoin from 'proper-url-join'

import { BaseApi } from 'apis/BaseApi'
import { Config } from 'utils/config'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { TimeZone } from 'interfaces/TimeZone'

const API_URL = Config.getString('API_URL')

class TimeZoneApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/time-zones')
  }

  async getByName(timeZoneName: string) {
    return super.httpGet<TimeZone[]>(urlJoinWithQuery(`/${timeZoneName}`))
  }

  async query() {
    return super.httpGet<TimeZone[]>('/')
  }
}

export const TimeZoneApi = new TimeZoneApiClass()
