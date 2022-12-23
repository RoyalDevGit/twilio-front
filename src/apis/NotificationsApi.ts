import urlJoin from 'proper-url-join'
import { DateTime } from 'luxon'

import { BaseApi } from 'apis/BaseApi'
import { Config } from 'utils/config'
import { QueryRequest, QueryResponse } from 'interfaces/Query'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import {
  TrayNotification,
  NotificationStatus,
} from 'interfaces/TrayNotification'

const API_URL = Config.getString('API_URL')

export interface QueryNotificationsRequest extends QueryRequest {
  from: DateTime
  to: DateTime
  status?: NotificationStatus[]
}

class NotificationsApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/notifications')
  }

  async getById(id: string) {
    return super.httpGet<TrayNotification>(`${id}`)
  }

  async markAsRead(notificationIds: string[]) {
    return await super.httpPost('/mark-as-read', {
      body: JSON.stringify({ notificationIds }),
    })
  }

  async query(options: QueryNotificationsRequest) {
    const { from, to, status, ...otherProps } = options
    return super.httpGet<QueryResponse<TrayNotification>>(
      urlJoinWithQuery('/', {
        from: from.toISO(),
        to: to.toISO(),
        status,
        ...otherProps,
      })
    )
  }
}

export const NotificationsApi = new NotificationsApiClass()
