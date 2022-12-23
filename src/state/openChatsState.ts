import { atom } from 'recoil'

import { MessagingChannel } from 'interfaces/MessagingChannel'

export const openChatsState = atom<MessagingChannel[]>({
  key: 'openChats',
  default: [],
})
