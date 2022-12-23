import urlJoin from 'proper-url-join'
import { DateTime } from 'luxon'

import { BaseApi } from 'apis/BaseApi'
import { Event, EventReservation } from 'interfaces/Event'
import { Config } from 'utils/config'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'

const API_URL = Config.getString('API_URL')

export interface CreateReservationBody {
  user: string
  eventInstanceStartDate?: DateTime
}

class EventApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/events')
  }

  async getById(eventId: string) {
    return super.httpGet<Event>(urlJoinWithQuery(`/${eventId}`))
  }

  async updateEvent(eventId: string, event: Partial<Event>) {
    return super.httpPatch<Event>(`/${eventId}`, {
      body: JSON.stringify(event),
    })
  }

  async deleteEvent(eventId: string) {
    return super.httpDelete<Event>(`/${eventId}`)
  }

  async makeReservation(eventId: string, body: CreateReservationBody) {
    const { user, eventInstanceStartDate } = body
    return super.httpPost<EventReservation>(urlJoinWithQuery(`/${eventId}`), {
      body: JSON.stringify({
        user: user,
        eventInstanceStartDate: eventInstanceStartDate || null,
      }),
    })
  }

  async cancelReservation(eventId: string, reservationId: string) {
    return super.httpDelete(urlJoinWithQuery(`/${eventId}/${reservationId}`))
  }
}

export const EventApi = new EventApiClass()
