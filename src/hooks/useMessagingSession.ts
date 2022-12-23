import {
  LogLevel,
  ConsoleLogger,
  DefaultMessagingSession,
  MessagingSessionConfiguration,
  MessagingSessionObserver,
} from 'amazon-chime-sdk-js'
import { useUnmount } from 'react-use'
import { ChimeSDKMessaging } from '@aws-sdk/client-chime-sdk-messaging'
import { useEffect, useState } from 'react'

import { useCurrentUser } from 'hooks/useCurrentUser'
import { getUuid } from 'utils/uuid/getUuid'
import { MessagingApi } from 'apis/MessagingApi'
import { Config } from 'utils/config'
import { User } from 'interfaces/User'
import { parseChimeMessageEvent } from 'utils/messaging/parseChimeMessageEvent'
import { convertChimeMessageToChannelMessage } from 'utils/messaging/convertChimeMessageToChannelMessage'
import { ChannelMessage } from 'interfaces/ChannelMessage'
import { isGuestUser } from 'utils/user/isGuestUser'

const AWS_REGION = Config.getString('AWS_REGION')

interface InitializationResponse {
  chimeMessagingClient: ChimeSDKMessaging
  session: DefaultMessagingSession
}

let messagingSessionPromise: Promise<InitializationResponse> | undefined
let chimeMessagingClient: ChimeSDKMessaging | undefined
let session: DefaultMessagingSession | undefined

export const initializeMessagingSession = async (user: User) => {
  if (!messagingSessionPromise) {
    messagingSessionPromise = _initMessagingSession(user)
  }
  return messagingSessionPromise
}

const _initMessagingSession = async (
  user: User
): Promise<InitializationResponse> => {
  const logger = new ConsoleLogger('Expert Session Chat', LogLevel.ERROR)
  const messagingCredentialsResult =
    await MessagingApi.getChimeMessagingCredentials()
  const messagingCredentials = await messagingCredentialsResult.getData()
  const chimeMessagingClient = new ChimeSDKMessaging({
    region: AWS_REGION,
    credentials: {
      accessKeyId: messagingCredentials.AccessKeyId,
      secretAccessKey: messagingCredentials.SecretAccessKey,
      sessionToken: messagingCredentials.SessionToken,
    },
  })
  const messagingEndpoint =
    await chimeMessagingClient.getMessagingSessionEndpoint({})
  const sessionConfig = new MessagingSessionConfiguration(
    user.chimeAppInstanceUserArn as string,
    getUuid(),
    messagingEndpoint.Endpoint?.Url || '',
    chimeMessagingClient
  )

  const session = new DefaultMessagingSession(sessionConfig, logger)
  await session.start()

  return { chimeMessagingClient, session }
}

export interface UseMessagingSessionOption {
  observer?: MessagingSessionObserver
  onMessage?: (message: ChannelMessage) => unknown
}

export const useMessagingSession = ({
  observer,
  onMessage,
}: UseMessagingSessionOption) => {
  const user = useCurrentUser()
  const [canSend, setCanSend] = useState(false)

  const isGuest = isGuestUser(user)

  useUnmount(() => {
    if (!session) {
      return
    }

    if (observer) {
      session.removeObserver(observer)
    }
  })

  useEffect(() => {
    const messagingSessionObserver: MessagingSessionObserver = {
      messagingSessionDidStart: () => {
        setCanSend(true)
      },
      messagingSessionDidStartConnecting: () => {
        setCanSend(false)
      },
      messagingSessionDidStop: () => {
        setCanSend(false)
      },
      messagingSessionDidReceiveMessage: (messageEvent) => {
        const messageType = messageEvent.headers['x-amz-chime-message-type']
        if (messageType === 'STANDARD') {
          const chimeMessage = parseChimeMessageEvent(messageEvent)

          if (messageEvent.type === 'CREATE_CHANNEL_MESSAGE') {
            const newMessage = convertChimeMessageToChannelMessage(chimeMessage)
            if (onMessage) {
              onMessage(newMessage)
            }
          }
        } else if (messageType === 'CONTROL') {
          console.log(messageType, messageEvent)
        } else if (messageType === 'SYSTEM') {
          console.log(messageType, messageEvent)
        }
      },
    }
    let cancelled = false
    const initialize = async (currentUser: User) => {
      if (!session) {
        if (!messagingSessionPromise) {
          messagingSessionPromise = initializeMessagingSession(currentUser)
        }
        const result = await messagingSessionPromise
        chimeMessagingClient = result.chimeMessagingClient
        session = result.session
      }

      if (cancelled) {
        return
      }

      session.addObserver(messagingSessionObserver)
      if (observer) {
        session.addObserver(observer)
      }

      setCanSend(true)
    }

    if (!isGuest) {
      initialize(user as User)
    }

    return () => {
      cancelled = true
      if (!session) {
        return
      }
      session.removeObserver(messagingSessionObserver)
    }
  }, [user?.id, onMessage])

  return {
    canSend,
    chimeMessagingClient,
  }
}
