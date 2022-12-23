import { Category } from 'interfaces/Category'
import { Expert } from 'interfaces/Expert'
import { QueryRequest, QueryResponse } from 'interfaces/Query'

export interface SearchRequest extends QueryRequest {
  searchAfter?: string
  pit?: string
}

export interface SearchResult<T> extends QueryResponse<T> {
  took: number
  timedOut: boolean
}

export type GlobalSearchIndex = 'experts' | 'subcategories'
type GlobalSearchDataType = Expert | Category

export interface GlobalSearchHit {
  index: GlobalSearchIndex
  data: GlobalSearchDataType
}

export type GlobalSearchResult = SearchResult<GlobalSearchHit>
