import urlJoin from 'proper-url-join'

import { BaseApi } from 'apis/BaseApi'
import { Config } from 'utils/config'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { SearchResult } from 'interfaces/Search'
import { Language } from 'interfaces/Language'

const API_URL = Config.getString('API_URL')

export interface LanguageSearchRequest {
  query?: string
}

class LanguageApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/languages')
  }

  async search(request: LanguageSearchRequest = {}) {
    return super.httpGet<SearchResult<Language>>(
      urlJoinWithQuery('/search', request)
    )
  }
}

export const LanguageApi = new LanguageApiClass()
