export interface QueryRequest {
  page: number
  limit: number
  sort?: string
  sortDirection?: 'asc' | 'desc'
}

export interface QueryResponse<Item> {
  items: Item[]
  total: number
  page?: number
  offset?: number
  limit?: number
  hasPrevPage: boolean
  hasNextPage: boolean
  totalPages: number
  prevPage?: number | null
  nextPage?: number | null
  pagingCounter: number
}
