import urlJoin from 'proper-url-join'

import { BaseApi } from 'apis/BaseApi'
import { Config } from 'utils/config'
import { AwsAssumeRoleCredentials } from 'interfaces/AwsAssumeRoleCredentials'
import { QueryRequest, QueryResponse } from 'interfaces/Query'
import { urlJoinWithQuery } from 'utils/url/urlJoinWithQuery'
import {
  ChannelMessageMetadata,
  MessagingChannel,
  MessagingChannelStatus,
} from 'interfaces/MessagingChannel'
import { ChannelMessage } from 'interfaces/ChannelMessage'

const API_URL = Config.getString('API_URL')

export interface QueryMessagesRequest extends Pick<QueryRequest, 'limit'> {
  nextToken?: string | null
}

export interface QueryChannelsRequest extends QueryRequest {
  status?: MessagingChannelStatus[]
  onlyStarted?: boolean
}

export interface SendMessageData {
  content: string
  attachments?: File[]
}

export interface QueryMessagesResponse
  extends Pick<
    QueryResponse<ChannelMessage>,
    'items' | 'limit' | 'hasNextPage'
  > {
  nextToken: string | null
}

class MessagingApiClass extends BaseApi {
  constructor() {
    super()
    this.prefix = urlJoin(API_URL, '/messaging')
  }

  async getChimeMessagingCredentials() {
    return super.httpGet<AwsAssumeRoleCredentials>(
      '/chime-messaging-credentials'
    )
  }

  async queryChannels(req: QueryChannelsRequest) {
    return super.httpGet<QueryResponse<MessagingChannel>>(
      urlJoinWithQuery('/channels', req)
    )
  }

  async paginateMessages(channelId: string, req: QueryMessagesRequest) {
    return super.httpGet<QueryMessagesResponse>(
      urlJoinWithQuery(`/channels/${channelId}/messages`, req)
    )
  }

  async sendChannelMessage(channelId: string, data: SendMessageData) {
    const { content, attachments } = data
    const formData = new FormData()
    formData.append('messageData', JSON.stringify({ content }))
    if (attachments?.length) {
      attachments.forEach((file, i) => {
        formData.append(`attachment${i}`, file)
      })
    }
    return super.httpPost<QueryMessagesResponse>(
      `/channels/${channelId}/messages`,
      {
        body: formData,
      }
    )
  }

  async markChannelAsRead(channelId: string) {
    return super.httpPatch<MessagingChannel>(
      `/channels/${channelId}/mark-as-read`
    )
  }

  async setChannelStatus(channelId: string, status: MessagingChannelStatus) {
    return super.httpPatch<MessagingChannel>(
      `/channels/${channelId}/open-status`,
      { body: JSON.stringify({ status }) }
    )
  }

  async getMessageMetadata(chimeMessageId: string) {
    return await super.httpGet<ChannelMessageMetadata>(
      `/messages/${chimeMessageId}`
    )
  }

  async getChannelByArn(chimeChatChannelArn: string) {
    return super.httpGet<MessagingChannel>(
      `/channels/arn/${encodeURIComponent(chimeChatChannelArn)}`
    )
  }
}

export const MessagingApi = new MessagingApiClass()
