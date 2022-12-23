/* eslint-disable import/no-default-export */
import { FC, useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Settings as LuxonSettings } from 'luxon'
import { enqueueSnackbar } from 'notistack'
import { useMount } from 'react-use'

import { useRouter } from 'hooks/useRouter'
import { AppShellBodyId } from 'components/AppShell'
import { useUserSocket } from 'hooks/useUserSocket'
import { useOpenChats } from 'hooks/useOpenChats'
import { ResponsiveChatPopup } from 'components/Messaging/ResponsiveChatPopup'
import { selectedChatState } from 'state/selectedChatState'
import { usePreventChatPopup } from 'hooks/usePreventChatPopup'
import { useCurrentUser } from 'hooks/useCurrentUser'
import { MessagingApi } from 'apis/MessagingApi'
import { MessagingChannelStatus } from 'interfaces/MessagingChannel'
import { isGuestUser } from 'utils/user/isGuestUser'
import { User } from 'interfaces/User'
import { getCurrentTimeZone } from 'utils/date/getCurrentTimeZone'
import { UserApi } from 'apis/UserApi'
import { throwIfErrorResponse } from 'utils/error/throwIfErrorResponse'
import { useRefreshUserState } from 'hooks/useRefreshUserState'
import { ChannelMessage } from 'interfaces/ChannelMessage'
import {
  initializeMessagingSession,
  useMessagingSession,
} from 'hooks/useMessagingSession'

const AppWideComponents: FC = () => {
  const router = useRouter()
  const { openChats, removeOpenChat } = useOpenChats()
  const { chatsPreventedFromPopup } = usePreventChatPopup()
  const [selectedChannel, setSelectedChannel] =
    useRecoilState(selectedChatState)
  const user = useCurrentUser()
  const refreshUserState = useRefreshUserState()

  const isGuest = isGuestUser(user)

  const onMessage = useCallback(
    (newMessage: ChannelMessage) => {
      if (newMessage.sender.id === user?.id) {
        return
      }
      if (
        openChats.find(
          (c) => c.chimeChatChannelArn === newMessage.chimeChatChannelArn
        )
      ) {
        return
      }
      enqueueSnackbar(newMessage.content, {
        variant: 'message',
        incomingMessage: newMessage,
      })
    },
    [openChats]
  )

  useUserSocket({
    onNotificationReceived: (notification) => {
      if (notification.quiet) {
        return
      }
      enqueueSnackbar(notification.message, {
        variant: 'notification',
        notification,
      })
    },
  })

  useMessagingSession({
    onMessage,
  })

  useMount(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }

    // const handleRouteChangeStart = (url: string) => {}

    const handleRouteChangeComplete = (_url: string) => {
      const appShellBody = document.getElementById(AppShellBodyId)
      if (!appShellBody) {
        return
      }
      appShellBody.scrollTop = 0
    }

    // router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    const loadOpenChannels = async () => {
      const result = await MessagingApi.queryChannels({
        page: 1,
        limit: 50,
      })
      if (!result.ok()) {
        return
      }
      const channelRes = await result.getData()
      const openChannel = channelRes.items.find((c) =>
        [
          MessagingChannelStatus.Open,
          MessagingChannelStatus.Minimized,
        ].includes(c.status)
      )
      if (openChannel) {
        setSelectedChannel(openChannel)
      }
    }
    if (!isGuest) {
      loadOpenChannels()
    }
  })

  const updateUserTimeZone = async (timeZone?: string) => {
    if (timeZone) {
      LuxonSettings.defaultZone = timeZone
    }
    if (user) {
      const result = await UserApi.update(user.id, {
        userData: {
          settings: {
            timeZone: timeZone,
          },
        },
      })

      await throwIfErrorResponse(result)
      await refreshUserState()
    }
  }

  useEffect(() => {
    if (!isGuest) {
      initializeMessagingSession(user as User)
    } else {
      if (user) {
        const { timeZone } = user.settings
        const currentTimeZone = getCurrentTimeZone()

        if (currentTimeZone !== timeZone) {
          updateUserTimeZone(currentTimeZone)
        }
      }
    }
  }, [user])

  const unselectChannel = useCallback(() => {
    if (!selectedChannel) {
      return
    }
    removeOpenChat(selectedChannel)
    setSelectedChannel(null)
  }, [selectedChannel])

  return (
    <>
      {!isGuest &&
        !chatsPreventedFromPopup.some((c) => c.id === selectedChannel?.id) && (
          <ResponsiveChatPopup
            open={!!selectedChannel}
            channel={selectedChannel}
            onClose={() => unselectChannel()}
          />
        )}
    </>
  )
}

export default AppWideComponents
