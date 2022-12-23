import { useState } from 'react'
import { useMount } from 'react-use'

import { MessagingApi } from 'apis/MessagingApi'
import { MessagingChannel } from 'interfaces/MessagingChannel'
import { useUserSocket } from 'hooks/useUserSocket'
import { useMessagingSession } from 'hooks/useMessagingSession'

export const useMessagingChannels = () => {
  const [channels, setChannels] = useState<MessagingChannel[]>([])

  useUserSocket({
    onMessagingChannelCreation: (newChannel) => {
      setChannels((current) => [newChannel, ...current])
    },
    onMessagingChannelMarkedAsRead: (updatedChannel) => {
      setChannels((current) =>
        current.map((channel) => {
          if (channel.id === updatedChannel.id) {
            return updatedChannel
          }
          return channel
        })
      )
    },
  })

  useMessagingSession({
    onMessage: (newMessage) => {
      setChannels((current) =>
        current.map((channel) => {
          if (channel.chimeChatChannelArn === newMessage.chimeChatChannelArn) {
            return {
              ...channel,
              unreadCount: channel.unreadCount + 1,
              lastMessage: newMessage,
            }
          }
          return channel
        })
      )
    },
  })

  useMount(() => {
    const loadChannels = async () => {
      const result = await MessagingApi.queryChannels({
        onlyStarted: false,
        page: 1,
        limit: 100,
        sort: 'messagingChannel.lastMessage.createdAt',
        sortDirection: 'desc',
      })

      const channelsResponse = await result.getData()
      setChannels(channelsResponse.items)
    }
    loadChannels()
  })

  return {
    channels,
  }
}
