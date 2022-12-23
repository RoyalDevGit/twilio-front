import urlJoin from 'proper-url-join'

import { BaseApi } from 'apis/BaseApi'
import { Config } from 'utils/config'
import { PaymentMethod, PaymentMethodStatus } from 'interfaces/PaymentMethod'
import { QueryRequest, QueryResponse } from 'interfaces/Query'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'

const API_URL = Config.getString('API_URL')

export interface QueryPaymentMethodsRequest extends QueryRequest {
  status?: PaymentMethodStatus | PaymentMethodStatus[]
}

class PaymentMethodApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/payment-methods')
  }

  async create(paymentMethod: Partial<PaymentMethod>) {
    return super.httpPost<PaymentMethod>('/', {
      body: JSON.stringify(paymentMethod),
    })
  }

  async update(paymentMethodId: string, updateData: Partial<PaymentMethod>) {
    return super.httpPatch<PaymentMethod>(`${paymentMethodId}`, {
      body: JSON.stringify(updateData),
    })
  }

  async getById(paymentMethodId: string) {
    return super.httpGet<PaymentMethod>(`${paymentMethodId}`)
  }

  async delete(paymentMethodId: string) {
    return super.httpDelete<void>(`${paymentMethodId}`)
  }

  async query(
    options: QueryPaymentMethodsRequest = {
      page: 1,
      limit: 10,
    }
  ) {
    return super.httpGet<QueryResponse<PaymentMethod>>(
      urlJoinWithQuery('/', { ...options })
    )
  }
}

export const PaymentMethodApi = new PaymentMethodApiClass()
