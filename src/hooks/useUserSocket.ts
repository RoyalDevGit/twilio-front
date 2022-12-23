import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

import { useCurrentUser } from 'hooks/useCurrentUser'
import { createSocket } from 'utils/sockets/createSocket'
import { MessagingChannel } from 'interfaces/MessagingChannel'
import { TrayNotification } from 'interfaces/TrayNotification'
import { SessionExtensionRequest } from 'interfaces/SessionExtensionRequest'

export type UserRealTimeEvent =
  | 'notificationCreated'
  | 'messagingChannelCreated'
  | 'messagingChannelMarkedAsRead'
  | 'sessionExtensionCreated'
  | 'sessionExtensionDeclined'
  | 'sessionExtensionAccepted'
  | 'sessionExtensionWithdrawn'
  | 'sessionExtensionComplete'

export interface UseUserSocketProps {
  onNotificationReceived?: (notification: TrayNotification) => unknown
  onMessagingChannelCreation?: (notification: MessagingChannel) => unknown
  onMessagingChannelMarkedAsRead?: (notification: MessagingChannel) => unknown
  onSessionExtensionCreated?: (request: SessionExtensionRequest) => unknown
  onSessionExtensionDeclined?: (request: SessionExtensionRequest) => unknown
  onSessionExtensionAccepted?: (request: SessionExtensionRequest) => unknown
  onSessionExtensionWithdrawn?: (request: SessionExtensionRequest) => unknown
  onSessionExtensionComplete?: (request: SessionExtensionRequest) => unknown
}

let userSocket: Socket | undefined

export const useUserSocket = ({
  onNotificationReceived,
  onMessagingChannelCreation,
  onMessagingChannelMarkedAsRead,
  onSessionExtensionCreated,
  onSessionExtensionDeclined,
  onSessionExtensionAccepted,
  onSessionExtensionWithdrawn,
  onSessionExtensionComplete,
}: UseUserSocketProps) => {
  const user = useCurrentUser()

  useEffect(() => {
    if (!user || user.isGuest) {
      if (userSocket) {
        userSocket.close()
      }
      userSocket = undefined
      return
    }

    if (!userSocket) {
      userSocket = createSocket('/users')
    }

    const onAny = (eventName: UserRealTimeEvent, data: unknown) => {
      switch (eventName) {
        case 'notificationCreated':
          onNotificationReceived?.(data as TrayNotification)
          break
        case 'messagingChannelCreated':
          onMessagingChannelCreation?.(data as MessagingChannel)
          break
        case 'messagingChannelMarkedAsRead':
          onMessagingChannelMarkedAsRead?.(data as MessagingChannel)
          break
        case 'sessionExtensionCreated':
          onSessionExtensionCreated?.(data as SessionExtensionRequest)
          break
        case 'sessionExtensionDeclined':
          onSessionExtensionDeclined?.(data as SessionExtensionRequest)
          break
        case 'sessionExtensionAccepted':
          onSessionExtensionAccepted?.(data as SessionExtensionRequest)
          break
        case 'sessionExtensionWithdrawn':
          onSessionExtensionWithdrawn?.(data as SessionExtensionRequest)
          break
        case 'sessionExtensionComplete':
          onSessionExtensionComplete?.(data as SessionExtensionRequest)
          break
      }
    }

    userSocket.onAny(onAny)

    return () => {
      if (userSocket) {
        userSocket.offAny(onAny)
      }
    }
  }, [
    user?.id,
    onNotificationReceived,
    onMessagingChannelCreation,
    onMessagingChannelMarkedAsRead,
    onSessionExtensionCreated,
    onSessionExtensionDeclined,
    onSessionExtensionAccepted,
    onSessionExtensionWithdrawn,
    onSessionExtensionComplete,
  ])
}
