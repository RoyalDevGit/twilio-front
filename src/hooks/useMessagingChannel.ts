import { useDebounce } from 'react-use'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useCurrentUserAsserted } from 'hooks/useCurrentUser'
import { MessagingApi, QueryMessagesResponse } from 'apis/MessagingApi'
import { ChannelMessage } from 'interfaces/ChannelMessage'
import {
  MessagingChannel,
  MessagingChannelStatus,
} from 'interfaces/MessagingChannel'
import { useMessagingSession } from 'hooks/useMessagingSession'

export interface UseChatOptions {
  channel: MessagingChannel
  onMessage?: (message: ChannelMessage) => unknown
  onInitialMessagesLoaded?: (messages: ChannelMessage[]) => unknown
  onAdditionalMessagesLoaded?: (messages: ChannelMessage[]) => unknown
}

export const useMessagingChannel = ({
  channel,
  onMessage,
  onInitialMessagesLoaded,
  onAdditionalMessagesLoaded,
}: UseChatOptions) => {
  const user = useCurrentUserAsserted()
  const currentChannelRef = useRef(channel)

  const [lastMessagesResponse, setLastMessageResponse] = useState<
    QueryMessagesResponse | undefined
  >()

  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const fetchMessages = async (
    channelId: string,
    nextToken?: string | null
  ) => {
    const result = await MessagingApi.paginateMessages(channelId, {
      nextToken,
      limit: 10,
    })

    const messagesResponse = await result.getData()
    return messagesResponse
  }

  const loadMoreMessages = useCallback(async () => {
    if (lastMessagesResponse && !lastMessagesResponse.nextToken) {
      return
    }
    const messagesResponse = await fetchMessages(
      channel.id,
      lastMessagesResponse?.nextToken
    )
    setLastMessageResponse(messagesResponse)
    if (onAdditionalMessagesLoaded) {
      onAdditionalMessagesLoaded(messagesResponse.items.slice().reverse())
    }
  }, [channel.id, lastMessagesResponse])

  useEffect(() => {
    currentChannelRef.current = channel
    setLastMessageResponse(undefined)

    const loadMessages = async () => {
      try {
        setIsLoading(true)
        const messagesResponse = await fetchMessages(channel.id)
        setLastMessageResponse(messagesResponse)
        if (onInitialMessagesLoaded) {
          onInitialMessagesLoaded(messagesResponse.items.slice().reverse())
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [channel.id])

  const { canSend, chimeMessagingClient } = useMessagingSession({
    onMessage: (newMessage) => {
      if (
        newMessage.chimeChatChannelArn !==
        currentChannelRef.current.chimeChatChannelArn
      ) {
        return
      }

      if (!onMessage) {
        return
      }
      onMessage(newMessage)
    },
  })

  const markAsRead = async () => {
    await MessagingApi.markChannelAsRead(channel.id)
  }

  const setStatus = async (status: MessagingChannelStatus) => {
    await MessagingApi.setChannelStatus(channel.id, status)
  }

  const sendMessage = async (content: string, attachments: File[] = []) => {
    await MessagingApi.sendChannelMessage(channel.id, {
      content,
      attachments,
    })
  }

  useDebounce(
    async () => {
      if (!isTyping || !chimeMessagingClient) {
        return
      }
      chimeMessagingClient.sendChannelMessage({
        ChannelArn: channel.chimeChatChannelArn,
        Content: JSON.stringify({ typing: 1 }),
        Type: 'CONTROL',
        Persistence: 'NON_PERSISTENT',
        ChimeBearer: user.chimeAppInstanceUserArn as string,
      })
      setIsTyping(false)
    },
    500,
    [isTyping]
  )

  return {
    isLoading,
    canSend,
    markAsRead,
    setStatus,
    sendTypingEvent: () => {
      setIsTyping(true)
    },
    loadMoreMessages,
    sendMessage,
    hasMoreMessages: !!lastMessagesResponse?.hasNextPage,
  }
}
