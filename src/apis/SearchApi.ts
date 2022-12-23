import urlJoin from 'proper-url-join'

import { BaseApi } from 'apis/BaseApi'
import { Config } from 'utils/config'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import {
  GlobalSearchIndex,
  GlobalSearchResult,
  SearchRequest,
} from 'interfaces/Search'
import { ExpertFilterQueryParams } from 'interfaces/ExpertFilterQueryParams'

const API_URL = Config.getString('API_URL')

export interface GlobalSearchRequest extends SearchRequest {
  query: string
  index?: GlobalSearchIndex | GlobalSearchIndex[]
  filters?: Partial<ExpertFilterQueryParams>
}

class SearchApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/search')
  }

  async globalSearch(request: GlobalSearchRequest) {
    return super.httpGet<GlobalSearchResult>(urlJoinWithQuery('/', request))
  }
}

export const SearchApi = new SearchApiClass()
