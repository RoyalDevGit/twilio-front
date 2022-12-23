import urlJoin from 'proper-url-join'

import { BaseApi } from 'apis/BaseApi'
import { Config } from 'utils/config'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import {
  Comment,
  CommentEntityType,
  CommentType,
  Ratings,
} from 'interfaces/Comment'
import { QueryRequest, QueryResponse } from 'interfaces/Query'

const API_URL = Config.getString('API_URL')

interface CreateCommentBody {
  commentType: CommentType
  entityType: CommentEntityType
  entityId: string
  content: string
  ratings?: Ratings
  subject?: string
}

interface QueryCommentsOptions extends QueryRequest {
  commentType: CommentType
  entityType: CommentEntityType
  entityId: string
  createdBy?: string
}

class CommentApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/comments')
  }

  async create(body: CreateCommentBody) {
    return super.httpPost<Comment>('', { body: JSON.stringify(body) })
  }

  async query(options: QueryCommentsOptions) {
    return super.httpGet<QueryResponse<Comment>>(urlJoinWithQuery('', options))
  }

  async like(id: string) {
    return super.httpPatch<Comment>(`/${id}/like`)
  }

  async dislike(id: string) {
    return super.httpPatch<Comment>(`/${id}/dislike`)
  }

  async clearLikeStatus(id: string) {
    return super.httpPatch<Comment>(`/${id}/clear-like`)
  }

  async update(
    id: string,
    body: Partial<Pick<Comment, 'content' | 'pinned' | 'ratings'>>
  ) {
    return super.httpPatch<Comment>(`/${id}`, {
      body: JSON.stringify(body),
    })
  }

  async delete(id: string) {
    return super.httpDelete(`/${id}`)
  }
}

export const CommentApi = new CommentApiClass()
