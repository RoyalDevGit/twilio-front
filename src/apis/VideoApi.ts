import urlJoin from 'proper-url-join'

import { BaseApi } from 'apis/BaseApi'
import { Video } from 'interfaces/Video'
import { Config } from 'utils/config'
import { QueryRequest, QueryResponse } from 'interfaces/Query'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'

const API_URL = Config.getString('API_URL')

export interface UpdateVideoRequest {
  videoData?: Partial<Video>
  thumbnailFile?: File
}

export interface QueryVideosRequest extends QueryRequest {
  expertId?: string
  favorites?: boolean
}

export type QueryVideosResponse = QueryResponse<Video>

class VideoApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/videos')
  }

  async getById(videoId: string) {
    return super.httpGet<Video>(`/${videoId}`)
  }

  async update(videoId: string, req: UpdateVideoRequest) {
    const formData = new FormData()
    const { videoData, thumbnailFile } = req
    if (thumbnailFile) {
      formData.append('thumbnailFile', thumbnailFile)
    }

    if (videoData) {
      formData.append('videoData', JSON.stringify(videoData))
    }

    return super.httpPatch<Video>(`/${videoId}`, {
      body: formData,
    })
  }

  async delete(videoId: string) {
    return super.httpDelete<Video>(`/${videoId}`)
  }

  async query(options: QueryVideosRequest) {
    return super.httpGet<QueryVideosResponse>(urlJoinWithQuery('/', options))
  }
}

export const VideoApi = new VideoApiClass()
