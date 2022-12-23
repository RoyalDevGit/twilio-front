import { atom } from 'recoil'

import { MessagingChannel } from 'interfaces/MessagingChannel'

export const selectedChatState = atom<MessagingChannel | null>({
  key: 'selectedChat',
  default: null,
})
