import { useRecoilState } from 'recoil'

import { MessagingChannel } from 'interfaces/MessagingChannel'
import { openChatsState } from 'state/openChatsState'

export const useOpenChats = () => {
  const [openChats, setOpenChats] = useRecoilState(openChatsState)

  const addOpenChat = (channel: MessagingChannel) => {
    setOpenChats((current) => {
      const existingChat = current.find((c) => c.id === channel.id)
      if (existingChat) {
        return current
      }

      return [...current, channel]
    })
  }

  const removeOpenChat = (channel: MessagingChannel) => {
    setOpenChats((current) => {
      const indexToRemove = current.findIndex((c) => c.id === channel.id)
      if (indexToRemove === -1) {
        return current
      }
      return current.filter((_c, i) => i !== indexToRemove)
    })
  }
  return { openChats, addOpenChat, removeOpenChat }
}
