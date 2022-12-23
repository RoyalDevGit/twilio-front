import urlJoin from 'proper-url-join'
import { DateTime } from 'luxon'

import { Expert } from 'interfaces/Expert'
import { BaseApi } from 'apis/BaseApi'
import { Event, Weekday } from 'interfaces/Event'
import { Config } from 'utils/config'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { Video } from 'interfaces/Video'
import { AvailabilityOption } from 'interfaces/AvailabilityOption'
import { SessionDurationOption } from 'interfaces/SessionDurationOption'
import { BlockoutDate } from 'interfaces/BlockoutDate'
import { QueryRequest, QueryResponse } from 'interfaces/Query'
import {
  ExpertAvailability,
  ExpertInstantAvailability,
} from 'interfaces/ExpertAvailability'
import { SearchResult } from 'interfaces/Search'
import { ExpertFilterQueryParams } from 'interfaces/ExpertFilterQueryParams'

const API_URL = Config.getString('API_URL')

export interface QueryEventsRequest {
  from: DateTime
  to: DateTime
}

export interface GetAvailabilityRequest extends Pick<RequestInit, 'signal'> {
  from: DateTime
  to: DateTime
  selectedDate?: DateTime
  selectedDuration?: number
}

export interface GetInstantSessionAvailabilityRequest
  extends Pick<RequestInit, 'signal'> {
  ignoreActiveSession: boolean
}

export interface UploadVideoRequest {
  videoFile: File
  videoData?: Partial<Video>
  thumbnailFile?: File
  onProgress?: (event: ProgressEvent) => unknown
  onError?: (event: ProgressEvent) => unknown
  onAbort?: (event: ProgressEvent) => unknown
  onSuccess?: (event: ProgressEvent) => unknown
}

export interface CreateExpertRequest {
  bannerImageFile?: File
  expertData?: Partial<Expert>
}

export interface QueryExpertsRequest
  extends QueryRequest,
    Partial<ExpertFilterQueryParams> {}

export interface QueryRecommendedExpertsRequest
  extends QueryRequest,
    Partial<ExpertFilterQueryParams> {}

export interface SearchExpertsRequest extends Partial<ExpertFilterQueryParams> {
  query: string
}

class ExpertApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/experts')
  }

  async getCurrent() {
    return super.httpGet<Expert>('/me')
  }

  async getById(expertId: string) {
    return super.httpGet<Expert>(`/${expertId}`)
  }

  async create(userId: string, createRequest: CreateExpertRequest) {
    const formData = new FormData()
    const { bannerImageFile, expertData } = createRequest
    if (bannerImageFile) {
      formData.append('bannerImage', bannerImageFile)
    }

    if (expertData) {
      formData.append('expertData', JSON.stringify(expertData))
    }

    return super.httpPost<Expert>(`/${userId}`, {
      body: formData,
    })
  }

  async update(expertId: string, requestData: CreateExpertRequest) {
    const formData = new FormData()
    const { bannerImageFile, expertData } = requestData
    if (bannerImageFile) {
      formData.append('bannerImage', bannerImageFile)
    }

    if (expertData) {
      formData.append('expertData', JSON.stringify(expertData))
    }

    return super.httpPatch<Expert>(`/${expertId}`, {
      body: formData,
    })
  }

  async createEvent(expertId: string, event: Partial<Event>) {
    return super.httpPost<Event>(`/${expertId}/events`, {
      body: JSON.stringify(event),
    })
  }

  async queryEvents(expertId: string, options: QueryEventsRequest) {
    const { from, to } = options
    const queryParams = {
      from: from.toUTC().toISO(),
      to: to.toUTC().toISO(),
    }
    return super.httpGet<Event[]>(
      urlJoinWithQuery(`/${expertId}/events`, queryParams)
    )
  }

  async uploadVideo(expertId: string, req: UploadVideoRequest) {
    const formData = new FormData()
    const {
      videoFile,
      videoData,
      thumbnailFile,
      onProgress,
      onAbort,
      onError,
      onSuccess,
    } = req
    formData.append('videoFile', videoFile)
    if (thumbnailFile) {
      formData.append('thumbnailFile', thumbnailFile)
    }

    if (videoData) {
      formData.append('videoData', JSON.stringify(videoData))
    }

    return super.httpPost<Video>(`/${expertId}/videos`, {
      body: formData,
      xhrRequestOptions: {
        onProgress,
        onAbort,
        onError,
        onSuccess,
      },
    })
  }

  async favoriteExpert(expertId: string) {
    return super.httpPatch<Expert>(`${expertId}/favorite`)
  }

  async unfavoriteExpert(expertId: string) {
    return super.httpPatch<Expert>(`${expertId}/unfavorite`)
  }

  async getAvailabilityOptions(expertId: string) {
    return super.httpGet<AvailabilityOption[]>(
      `/${expertId}/availability-options`
    )
  }

  async saveAvailabilityOption(
    expertId: string,
    option: Partial<AvailabilityOption>
  ) {
    if (option.id) {
      return super.httpPatch<AvailabilityOption>(
        `/${expertId}/availability-options/${option.id}`,
        {
          body: JSON.stringify(option),
        }
      )
    } else {
      return super.httpPost<AvailabilityOption>(
        `/${expertId}/availability-options`,
        {
          body: JSON.stringify(option),
        }
      )
    }
  }

  async applyAvailabilityOptionToAll(expertId: string, sourceWeekday: Weekday) {
    return super.httpPost<AvailabilityOption[]>(
      `/${expertId}/availability-options/apply-to-all`,
      {
        body: JSON.stringify({ sourceWeekday }),
      }
    )
  }

  async getSessionDurationOptions(expertId: string) {
    return super.httpGet<SessionDurationOption[]>(
      `/${expertId}/session-duration-options`
    )
  }

  async saveSessionDurationOption(
    expertId: string,
    option: Partial<SessionDurationOption>
  ) {
    if (option.id) {
      return super.httpPatch<SessionDurationOption>(
        `/${expertId}/session-duration-options/${option.id}`,
        {
          body: JSON.stringify(option),
        }
      )
    } else {
      return super.httpPost<SessionDurationOption>(
        `/${expertId}/session-duration-options`,
        {
          body: JSON.stringify(option),
        }
      )
    }
  }

  async deleteSessionDurationOption(expertId: string, optionId: string) {
    return super.httpDelete<SessionDurationOption>(
      `/${expertId}/session-duration-options/${optionId}`
    )
  }

  async getBlockoutDates(expertId: string) {
    return super.httpGet<BlockoutDate[]>(`/${expertId}/blockout-dates`)
  }

  async createBlockoutDate(
    expertId: string,
    blockoutDate: Partial<BlockoutDate>
  ) {
    return super.httpPost<BlockoutDate>(`/${expertId}/blockout-dates`, {
      body: JSON.stringify(blockoutDate),
    })
  }

  async deleteBlockoutDate(expertId: string, blockoutDate: string) {
    return super.httpDelete<BlockoutDate>(
      `/${expertId}/blockout-dates/${blockoutDate}`
    )
  }

  async query(request: QueryExpertsRequest) {
    return super.httpGet<QueryResponse<Expert>>(urlJoinWithQuery('/', request))
  }

  async queryFavorites(request: QueryExpertsRequest) {
    return super.httpGet<QueryResponse<Expert>>(
      urlJoinWithQuery('/favorites', request)
    )
  }

  async queryFeatured(request: QueryRecommendedExpertsRequest) {
    return super.httpGet<QueryResponse<Expert>>(
      urlJoinWithQuery('/featured', request)
    )
  }

  async queryRecommended(request: QueryRecommendedExpertsRequest) {
    return super.httpGet<QueryResponse<Expert>>(
      urlJoinWithQuery('/recommended', request)
    )
  }

  async search(request: SearchExpertsRequest) {
    return super.httpGet<SearchResult<Expert>>(
      urlJoinWithQuery('/search', request)
    )
  }

  async getAvailability(expertId: string, options: GetAvailabilityRequest) {
    const { from, to, selectedDate, selectedDuration, signal } = options
    const queryParams = {
      from: from.toUTC().toISO(),
      to: to.toUTC().toISO(),
      selectedDate: selectedDate ? selectedDate.toUTC().toISO() : undefined,
      selectedDuration,
    }
    return super.httpGet<ExpertAvailability>(
      urlJoinWithQuery(`/${expertId}/availability`, queryParams),
      {
        signal,
      }
    )
  }

  async getInstantSessionAvailability(
    expertId: string,
    options: GetInstantSessionAvailabilityRequest
  ) {
    const { ignoreActiveSession, signal } = options
    const queryParams = {
      ignoreActiveSession,
    }
    return super.httpGet<ExpertInstantAvailability>(
      urlJoinWithQuery(`/${expertId}/availability/instant`, queryParams),
      {
        signal,
      }
    )
  }

  async getReviewEligibiity(expertId: string) {
    return await super.httpGet<boolean>(
      urlJoin(`/${expertId}/review-eligibility`)
    )
  }
}

export const ExpertApi = new ExpertApiClass()
