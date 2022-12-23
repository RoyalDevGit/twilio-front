import urlJoin from 'proper-url-join'
import { DateTime } from 'luxon'

import { BaseApi } from 'apis/BaseApi'
import { Session, SessionAttendee, SessionStatus } from 'interfaces/Session'
import { Config } from 'utils/config'
import { QueryRequest, QueryResponse } from 'interfaces/Query'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import { SessionExtensionRequest } from 'interfaces/SessionExtensionRequest'

const API_URL = Config.getString('API_URL')

interface SessionJoinInfo {
  session: Session
  attendee: SessionAttendee
}

export interface SessionRescheduleRequest {
  date: DateTime
  timeSlotId: string
}

export interface CancelSessionRequest {
  cancellationReason: string
}

export interface QuerySessionsRequest extends QueryRequest {
  status?: SessionStatus[]
  from?: DateTime
  to?: DateTime
  minEndDate?: DateTime
}

export interface ProcessExtensionData {
  paymentMethodId: string
  duration: number
}

class SessionApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/sessions')
  }

  async getById(sessionId: string) {
    return super.httpGet<Session>(`/${sessionId}`)
  }

  async getAttendeeById(sessionId: string, chimeAttendeeId: string) {
    return super.httpGet<SessionAttendee>(
      `/${sessionId}/attendee/${chimeAttendeeId}`
    )
  }

  async query(
    options: QuerySessionsRequest = {
      page: 1,
      limit: 10,
    }
  ) {
    const { status, from, to, minEndDate, sort, sortDirection } = options
    return super.httpGet<QueryResponse<Session>>(
      urlJoinWithQuery('/', {
        status,
        from: from ? from.toUTC().toISO() : undefined,
        to: to ? to.toUTC().toISO() : undefined,
        minEndDate: minEndDate ? minEndDate.toUTC().toISO() : undefined,
        sort,
        sortDirection,
      })
    )
  }

  async create() {
    return super.httpPost<Session>('/')
  }

  async join(sessionId: string) {
    return super.httpPost<SessionJoinInfo>(`/${sessionId}/join`)
  }

  async end(sessionId: string) {
    return super.httpPost<void>(`/${sessionId}/end`)
  }

  async startRecording(sessionId: string) {
    return super.httpPost<void>(`/${sessionId}/start-recording`)
  }

  async stopRecording(sessionId: string) {
    return super.httpPost<void>(`/${sessionId}/stop-recording`)
  }

  async reschedule(sessionId: string, request: SessionRescheduleRequest) {
    return await super.httpPatch<Session>(`/${sessionId}/reschedule`, {
      body: JSON.stringify(request),
    })
  }

  async cancel(sessionId: string, request: CancelSessionRequest) {
    return await super.httpPatch<Session>(`/${sessionId}/cancel`, {
      body: JSON.stringify(request),
    })
  }

  async getCurrentSessionExtensionRequest(sessionId: string) {
    return super.httpGet<SessionExtensionRequest | null>(
      `/${sessionId}/extensions/current`
    )
  }

  async createSessionExtensionRequest(
    sessionId: string,
    request?: Pick<SessionExtensionRequest, 'duration' | 'maxDuration'>
  ) {
    return await super.httpPost<Session>(`/${sessionId}/extensions`, {
      body: JSON.stringify(request || {}),
    })
  }

  async acceptSessionExtensionRequest(
    sessionId: string,
    request?: Pick<SessionExtensionRequest, 'duration' | 'maxDuration'>
  ) {
    return await super.httpPatch<Session>(`/${sessionId}/extensions/accept`, {
      body: JSON.stringify(request || {}),
    })
  }

  async declineSessionExtensionRequest(sessionId: string) {
    return await super.httpPatch<Session>(`/${sessionId}/extensions/decline`)
  }

  async withdrawSessionExtensionRequest(sessionId: string) {
    return await super.httpPatch<Session>(`/${sessionId}/extensions/withdraw`)
  }

  async processSessionExtensionRequest(
    sessionId: string,
    request: ProcessExtensionData
  ) {
    return await super.httpPost<Session>(`/${sessionId}/extensions/process`, {
      body: JSON.stringify(request),
    })
  }
}

export const SessionApi = new SessionApiClass()
