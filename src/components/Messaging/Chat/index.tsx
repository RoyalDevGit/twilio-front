import { FC, useEffect, useRef, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import InfiniteScroll from 'react-infinite-scroller'
import { useDebounce, useIntersection, useMount, useUnmount } from 'react-use'
import animateScrollTo from 'animated-scroll-to'
import useSize from '@react-hook/size'

import {
  ChatMessageScroller,
  LoadingContainer,
} from 'components/Messaging/Chat/styles'
import { MessagingChannel } from 'interfaces/MessagingChannel'
import { useMessagingChannel } from 'hooks/useMessagingChannel'
import {
  MessageToolbar,
  SentMessage,
} from 'components/Messaging/MessageToolbar'
import { MessageList } from 'components/Messaging/MessageList'
import { useOpenChats } from 'hooks/useOpenChats'
import { ChannelMessage } from 'interfaces/ChannelMessage'

const SCROLL_DELAY_MS = 100
const AUTO_SCROLL_PX = 300

export interface ChatProps {
  channel: MessagingChannel
  hideToolbar?: boolean
  messageToolbarForceDark?: boolean
  messageToolbarForceLight?: boolean
}

export const Chat: FC<ChatProps> = ({
  channel,
  hideToolbar = false,
  messageToolbarForceDark,
  messageToolbarForceLight,
}) => {
  const [messages, setMessages] = useState<ChannelMessage[]>([])
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [width, height] = useSize(scrollerRef, {
    initialWidth: 0,
    initialHeight: 0,
  })
  const [sendMarkAsRead, setSendMarkAsRead] = useState(false)
  const { addOpenChat, removeOpenChat } = useOpenChats()
  const intersection = useIntersection(scrollerRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  })

  const scrollToBottom = (animated: boolean) => {
    if (!scrollerRef.current) {
      return
    }
    const scroller = scrollerRef.current

    const bottomY = scroller.scrollHeight
    if (animated) {
      animateScrollTo(bottomY, {
        elementToScroll: scroller,
      })
    } else {
      scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight
    }
  }

  const isAtBottom = () => {
    if (!scrollerRef.current) {
      return true
    }
    const scroller = scrollerRef.current

    const scrollerPosition = scroller.scrollHeight - scroller.scrollTop
    const difference = scrollerPosition - scroller.clientHeight
    const atBottom = difference < AUTO_SCROLL_PX
    return atBottom
  }

  const {
    isLoading,
    markAsRead,
    sendMessage,
    hasMoreMessages,
    loadMoreMessages,
  } = useMessagingChannel({
    channel,
    onInitialMessagesLoaded: (messages) => {
      if (!messages.length) {
        return
      }
      setTimeout(() => scrollToBottom(false), SCROLL_DELAY_MS)
      setMessages(messages)
    },
    onAdditionalMessagesLoaded: (messages) => {
      if (!messages.length) {
        return
      }
      if (isAtBottom()) {
        setTimeout(() => scrollToBottom(false), SCROLL_DELAY_MS)
      }
      setMessages((current) => [...messages, ...current])
    },
    onMessage: (message) => {
      const atBottom = isAtBottom()
      if (atBottom) {
        setTimeout(() => scrollToBottom(true), SCROLL_DELAY_MS)
      }
      setMessages((current) => [...current, message])
      setSendMarkAsRead(true)
    },
  })

  useDebounce(
    async () => {
      if (!sendMarkAsRead) {
        return
      }
      markAsRead()
      setSendMarkAsRead(false)
    },
    500,
    [sendMarkAsRead]
  )

  useMount(() => {
    setSendMarkAsRead(true)
  })

  useUnmount(() => {
    removeOpenChat(channel)
  })

  useEffect(() => {
    if (width === 0 || height === 0) {
      removeOpenChat(channel)
      return
    }
    if (intersection?.isIntersecting) {
      addOpenChat(channel)
    } else {
      removeOpenChat(channel)
    }
  }, [intersection?.isIntersecting, width, height])

  const handleOnSend = (message: SentMessage) => {
    sendMessage(message.content, message.attachments)
  }

  return (
    <>
      <ChatMessageScroller ref={scrollerRef}>
        <InfiniteScroll
          isReverse
          useWindow={false}
          initialLoad={false}
          pageStart={1}
          loadMore={loadMoreMessages}
          hasMore={hasMoreMessages}
          loader={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '12px',
              }}
            >
              <CircularProgress />
            </div>
          }
          style={{ height: '100%' }}
        >
          {isLoading ? (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          ) : (
            <MessageList messages={messages} channel={channel} />
          )}
        </InfiniteScroll>
      </ChatMessageScroller>
      {!hideToolbar && (
        <MessageToolbar
          channel={channel}
          messageToolbarForceDark={messageToolbarForceDark}
          messageToolbarForceLight={messageToolbarForceLight}
          onSend={handleOnSend}
        />
      )}
    </>
  )
}
