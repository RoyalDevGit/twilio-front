import urlJoin from 'proper-url-join'
import { DateTime } from 'luxon'

import { BaseApi } from 'apis/BaseApi'
import { Config } from 'utils/config'
import { Order, OrderStatus } from 'interfaces/Order'
import { QueryRequest, QueryResponse } from 'interfaces/Query'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { SessionStatus } from 'interfaces/Session'

const API_URL = Config.getString('API_URL')

type OrdersQueryOnly = 'parents' | 'children'

export interface QueryOrdersRequest extends QueryRequest {
  from: DateTime
  to: DateTime
  status?: OrderStatus[] | OrderStatus | null
  sessionStatus?: SessionStatus[] | SessionStatus | null
  sessionStart?: DateTime
  sessionEnd?: DateTime
  only?: OrdersQueryOnly
}

class OrderApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/orders')
  }

  async create(order: Partial<Order> = {}) {
    return super.httpPost<Order>('/', {
      body: JSON.stringify(order),
    })
  }

  async update(orderId: string, updateData: Partial<Order>) {
    return super.httpPatch<Order>(`${orderId}`, {
      body: JSON.stringify(updateData),
    })
  }

  async process(orderId: string) {
    return super.httpPost<Order>(`${orderId}/process`)
  }

  async getById(orderId: string) {
    return super.httpGet<Order>(`${orderId}`)
  }

  async getCurrent() {
    return super.httpGet<Order | null>('/current')
  }

  async query(options: QueryOrdersRequest) {
    const { from, to, ...otherProps } = options
    return super.httpGet<QueryResponse<Order>>(
      urlJoinWithQuery('/', {
        from: from.toISO(),
        to: to.toISO(),
        ...otherProps,
      })
    )
  }

  async updateFailedPayment(orderId: string, paymentMethodId: string) {
    return super.httpPatch<Order>(`${orderId}/update-failed-payment`, {
      body: JSON.stringify({ paymentMethodId }),
    })
  }
}

export const OrderApi = new OrderApiClass()
