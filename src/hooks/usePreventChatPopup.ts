import { useRecoilState } from 'recoil'

import { MessagingChannel } from 'interfaces/MessagingChannel'
import { preventChatPopupState } from 'state/preventChatPopupState'

export const usePreventChatPopup = () => {
  const [chatsPreventedFromPopup, setPreventedChats] = useRecoilState(
    preventChatPopupState
  )

  const preventChatPopup = (channel: MessagingChannel) => {
    setPreventedChats((current) => {
      const existingChat = current.find((c) => c.id === channel.id)
      if (existingChat) {
        return current
      }

      return [...current, channel]
    })
  }

  const allowChatPopup = (channel: MessagingChannel) => {
    setPreventedChats((current) => current.filter((c) => c.id !== channel.id))
  }
  return { chatsPreventedFromPopup, preventChatPopup, allowChatPopup }
}
