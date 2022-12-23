import urlJoin from 'proper-url-join'

import { BaseApi } from 'apis/BaseApi'
import { Config } from 'utils/config'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { SearchResult } from 'interfaces/Search'
import { Category } from 'interfaces/Category'
import { QueryRequest, QueryResponse } from 'interfaces/Query'

const API_URL = Config.getString('API_URL')

export interface CategorySearchRequest {
  query: string
}

export interface QueryCategoriesRequest extends QueryRequest {
  only?: 'parents' | 'subcategories'
}

class CategoryApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/categories')
  }

  async subcategorySearch(request: CategorySearchRequest) {
    return super.httpGet<SearchResult<Category>>(
      urlJoinWithQuery('/subcategories/search', request)
    )
  }

  async query(options: QueryCategoriesRequest) {
    return super.httpGet<QueryResponse<Category>>(
      urlJoinWithQuery('/', options)
    )
  }

  async queryRecommended(options: QueryRequest) {
    return super.httpGet<QueryResponse<Category>>(
      urlJoinWithQuery('/recommended', options)
    )
  }
}

export const CategoryApi = new CategoryApiClass()
